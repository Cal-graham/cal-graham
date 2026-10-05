import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PROJECTS } from '../constants';
import { GraphNode, GraphLink } from '../types';
import FocusPanel from './FocusPanel';

const SPHERE_RADIUS = 280;
const FOCAL_LENGTH = 800;
const ROTATION_SPEED = 0.001;
const DRAG_SENSITIVITY = 0.005;

// Padding around the sphere so project nodes (96px) are not clipped at the edges
const FIT_PADDING = 100;
// Pointer travel (px) beyond which a press counts as a drag rather than a click
const DRAG_THRESHOLD = 5;

// Focus animation: bubbles fly between the sphere and the focus panel
const FLIGHT_MS = 700;
const FLIGHT_STAGGER_MS = 60;
const PANEL_EXIT_MS = 250;
const MAX_BACKGROUND_BLUR_PX = 6;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

interface NodeVisual { x: number; y: number; s: number; o: number; }
interface Flight { from: NodeVisual; start: number; }

interface NodeCloudProps {
  interactive?: boolean;
  className?: string;
  showLabels?: boolean;
  scale?: number;
}

const NodeCloud: React.FC<NodeCloudProps> = ({
  interactive = true,
  className = '',
  showLabels = true,
  scale = 1
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const nodeElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const requestRef = useRef<number>(0);
  const hoveredNodeIdRef = useRef<string | null>(null);

  // 3D State
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const dragDistanceRef = useRef(0);
  const isVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  // Focus State: React state drives the panel, refs drive the animation loop
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [panelClosing, setPanelClosing] = useState(false);
  const focusSetRef = useRef<Set<string>>(new Set());
  const slotElementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const displayRef = useRef<Map<string, NodeVisual>>(new Map());
  const flightsRef = useRef<Map<string, Flight>>(new Map());
  const backgroundBlurRef = useRef({ from: 0, to: 0, start: 0 });
  const closeTimerRef = useRef<number>(0);
  const lastFocusedRef = useRef<string | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = query.matches;
    const onChange = (e: MediaQueryListEvent) => { reducedMotionRef.current = e.matches; };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Initialize Data (Spherical Layout)
  useEffect(() => {
    const newNodes: GraphNode[] = [];
    const newLinks: GraphLink[] = [];
    const effectiveRadius = SPHERE_RADIUS * scale;

    // Helper to get point on sphere
    const getSpherePoint = (i: number, total: number, radius: number, offset: number = 0) => {
        const phi = Math.acos(-1 + (2 * i) / total);
        const theta = Math.sqrt(total * Math.PI) * phi + offset;
        return {
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi)
        };
    };

    // 1. Create Project Nodes (Outer Shell)
    PROJECTS.forEach((p, i) => {
      const pos = getSpherePoint(i, PROJECTS.length, effectiveRadius);
      newNodes.push({
        id: p.id,
        type: 'project',
        text: p.title,
        img: p.imageUrl,
        relatedIds: [],
        ...pos
      });
    });

    // 2. Create Skill Nodes (Inner random distribution or secondary shell)
    const uniqueSkills = Array.from(new Set(PROJECTS.flatMap(p => p.technologies)));
    uniqueSkills.forEach((skill, i) => {
      const skillId = `skill-${skill}`;
      const pos = getSpherePoint(i, uniqueSkills.length, effectiveRadius * 0.6, 2);

      newNodes.push({
        id: skillId,
        type: 'skill',
        text: skill,
        relatedIds: [],
        ...pos
      });

      // Link Skills to Projects
      const connectedProjects = PROJECTS.filter(p => p.technologies.includes(skill));
      connectedProjects.forEach(p => {
        newLinks.push({ source: p.id, target: skillId });

        const pNode = newNodes.find(n => n.id === p.id);
        const sNode = newNodes.find(n => n.id === skillId);
        if (pNode) pNode.relatedIds.push(skillId);
        if (sNode) sNode.relatedIds.push(p.id);
      });
    });

    // A project's skills are listed in the order the project declares them
    newNodes.forEach(node => {
      if (node.type !== 'project') return;
      const project = PROJECTS.find(p => p.id === node.id);
      if (project) node.relatedIds = project.technologies.map(t => `skill-${t}`);
    });

    nodesRef.current = newNodes;
    linksRef.current = newLinks;
    setNodes(newNodes);
  }, [scale]);

  // --- Focus mode ---

  const getBackgroundBlur = (now: number) => {
    const { from, to, start } = backgroundBlurRef.current;
    const t = reducedMotionRef.current ? 1 : Math.min(1, Math.max(0, (now - start) / FLIGHT_MS));
    return mix(from, to, easeInOutCubic(t));
  };

  // Send the given node (and its related nodes) to the panel, or everything back to the sphere when id is null
  const changeFocus = useCallback((id: string | null) => {
    const now = performance.now();
    const node = id ? nodesRef.current.find(n => n.id === id) : undefined;
    const order = node ? [node.id, ...node.relatedIds] : [];
    const previous = focusSetRef.current;
    const next = new Set(order);

    // Only nodes entering, leaving or moving between slots need to fly
    nodesRef.current.forEach(n => {
      if (!previous.has(n.id) && !next.has(n.id)) return;
      const current = displayRef.current.get(n.id);
      if (!current) return;
      const index = order.indexOf(n.id);
      flightsRef.current.set(n.id, {
        from: { ...current },
        start: now + (index > 0 ? index * FLIGHT_STAGGER_MS : 0),
      });
    });

    backgroundBlurRef.current = { from: getBackgroundBlur(now), to: node ? 1 : 0, start: now };
    focusSetRef.current = next;
    hoveredNodeIdRef.current = null;
    isDraggingRef.current = false;
  }, []);

  const openFocus = useCallback((id: string) => {
    window.clearTimeout(closeTimerRef.current);
    // Bring the whole web into view (below the fixed navbar) so the panel's top-left is visible
    containerRef.current?.scrollIntoView({
      behavior: reducedMotionRef.current ? 'auto' : 'smooth',
      block: 'start',
    });
    lastFocusedRef.current = id;
    changeFocus(id);
    setFocusedId(id);
    setPanelClosing(false);
  }, [changeFocus]);

  // Keyboard users get focus handed back to the node they opened; mouse users don't need it
  const closeFocus = useCallback((viaKeyboard: boolean = false) => {
    if (!viaKeyboard) lastFocusedRef.current = null;
    changeFocus(null);
    setPanelClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setFocusedId(null);
      setPanelClosing(false);
    }, PANEL_EXIT_MS);
  }, [changeFocus]);

  // Once the panel is gone (and the nodes are no longer inert), return keyboard focus to the node that was opened
  useEffect(() => {
    if (focusedId || !lastFocusedRef.current) return;
    nodeElementsRef.current.get(lastFocusedRef.current)?.focus({ preventScroll: true });
    lastFocusedRef.current = null;
  }, [focusedId]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    if (!focusedId || panelClosing) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFocus(true);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [focusedId, panelClosing, closeFocus]);

  const registerSlot = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) slotElementsRef.current.set(id, el);
    else slotElementsRef.current.delete(id);
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    if (!containerRef.current) return;
    requestRef.current = requestAnimationFrame(animate);

    // Skip all work while scrolled out of view
    if (!isVisibleRef.current) return;

    const now = performance.now();
    const isFocused = focusSetRef.current.size > 0;

    // Update Rotation (held still while a node is focused)
    if (!isDraggingRef.current && !hoveredNodeIdRef.current && !reducedMotionRef.current && !isFocused) {
        targetRotationRef.current.y += ROTATION_SPEED;
    }

    rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
    rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;

    const ctx = canvasRef.current?.getContext('2d');
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const cx = width / 2;
    const cy = height / 2;
    // Shrink the sphere on small containers (e.g. phones) so it stays on screen
    const fit = Math.min(1, Math.min(width, height) / (2 * (SPHERE_RADIUS * scale + FIT_PADDING)));

    if (canvasRef.current) {
        // Handle resizing without clearing too aggressively if possible, but standard is reset
        if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
             canvasRef.current.width = width;
             canvasRef.current.height = height;
        }
    }
    if (ctx) ctx.clearRect(0, 0, width, height);

    // Blur and dim the sphere behind the focus panel
    const backgroundBlur = getBackgroundBlur(now);
    if (canvasRef.current) {
        canvasRef.current.style.filter = backgroundBlur > 0.01 ? `blur(${backgroundBlur * MAX_BACKGROUND_BLUR_PX}px)` : 'none';
        canvasRef.current.style.opacity = String(1 - 0.75 * backgroundBlur);
    }

    const hoveredId = isFocused ? null : hoveredNodeIdRef.current;
    const highlightedIds = new Set<string>();

    if (hoveredId && interactive) {
        highlightedIds.add(hoveredId);
        const hoveredNode = nodesRef.current.find(n => n.id === hoveredId);
        if (hoveredNode) {
            hoveredNode.relatedIds.forEach(id => highlightedIds.add(id));
        }
    }

    const sinX = Math.sin(rotationRef.current.x);
    const cosX = Math.cos(rotationRef.current.x);
    const sinY = Math.sin(rotationRef.current.y);
    const cosY = Math.cos(rotationRef.current.y);

    const projectedNodes = nodesRef.current.map(node => {
        let x = node.x * cosY - node.z * sinY;
        let z = node.z * cosY + node.x * sinY;
        let y = node.y * cosX - z * sinX;
        z = z * cosX + node.y * sinX;

        const depthScale = FOCAL_LENGTH / (FOCAL_LENGTH - z);
        const px = x * depthScale * fit + cx;
        const py = y * depthScale * fit + cy;

        return { ...node, px, py, scale: depthScale, zIndex: Math.floor(depthScale * 100) };
    });

    if (ctx) {
        linksRef.current.forEach(link => {
            const source = projectedNodes.find(n => n.id === link.source);
            const target = projectedNodes.find(n => n.id === link.target);

            if (source && target) {
                const isConnected = hoveredId && (link.source === hoveredId || link.target === hoveredId);
                const isHoverMode = !!hoveredId && interactive;

                ctx.beginPath();
                ctx.moveTo(source.px, source.py);
                ctx.lineTo(target.px, target.py);

                if (isHoverMode) {
                    if (isConnected) {
                        ctx.strokeStyle = '#0ea5e9';
                        ctx.lineWidth = 2.5;
                        ctx.globalAlpha = 1;
                    } else {
                        ctx.strokeStyle = '#cbd5e1';
                        ctx.lineWidth = 0.5;
                        ctx.globalAlpha = 0.05;
                    }
                } else {
                    const avgScale = (source.scale + target.scale) / 2;
                    ctx.strokeStyle = '#cbd5e1';
                    ctx.lineWidth = 1.5;
                    ctx.globalAlpha = Math.max(0.1, avgScale - 0.4);
                }
                ctx.stroke();
            }
        });
        ctx.globalAlpha = 1;
    }

    projectedNodes.forEach(node => {
        const el = nodeElementsRef.current.get(node.id);
        if (!el) return;

        const isHoverMode = !!hoveredId && interactive;
        const isHighlighted = highlightedIds.has(node.id);

        // Where the node sits in the sphere
        let target: NodeVisual = {
            x: node.px,
            y: node.py,
            s: node.scale * Math.max(fit, 0.65),
            o: Math.max(0.3, node.scale - 0.2),
        };
        let zIndex = node.zIndex;
        let filter = 'none';

        if (isHoverMode) {
            if (isHighlighted) {
                target.s *= 1.1;
                target.o = 1;
                zIndex = 1000;
            } else {
                target.o = 0.1;
                filter = 'grayscale(100%) blur(2px)';
                zIndex = 0;
            }
        }

        // Focused nodes land on their slot in the panel; the rest blur into the background
        const slot = focusSetRef.current.has(node.id) ? slotElementsRef.current.get(node.id) : undefined;
        if (slot) {
            const r = slot.getBoundingClientRect();
            target = {
                x: r.left + r.width / 2 - containerRect.left,
                y: r.top + r.height / 2 - containerRect.top,
                s: 1,
                o: 1,
            };
        } else if (backgroundBlur > 0.01) {
            target.o = mix(target.o, 0.12, backgroundBlur);
            filter = `grayscale(60%) blur(${backgroundBlur * MAX_BACKGROUND_BLUR_PX}px)`;
        }

        // Blend from where the node was when focus changed towards its target
        let display = target;
        const flight = flightsRef.current.get(node.id);
        if (flight) {
            const t = reducedMotionRef.current ? 1 : Math.min(1, Math.max(0, (now - flight.start) / FLIGHT_MS));
            const e = easeInOutCubic(t);
            display = {
                x: mix(flight.from.x, target.x, e),
                y: mix(flight.from.y, target.y, e),
                s: mix(flight.from.s, target.s, e),
                o: mix(flight.from.o, target.o, e),
            };
            if (t >= 1) flightsRef.current.delete(node.id);
        }
        displayRef.current.set(node.id, display);

        // Flying and focused nodes travel above the panel
        if (slot || flight) {
            zIndex = 3000;
            filter = 'none';
        }

        el.style.transform = `translate3d(${display.x}px, ${display.y}px, 0) translate(-50%, -50%) scale(${display.s})`;
        el.style.zIndex = zIndex.toString();
        el.style.opacity = display.o.toString();
        el.style.filter = filter;
    });
  }, [interactive, showLabels, scale]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // Pause the animation loop while the cloud is off screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Interaction Handlers (pointer events cover mouse, touch and pen)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive || focusSetRef.current.size > 0) return;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    targetRotationRef.current = { ...rotationRef.current };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!interactive || !isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    dragDistanceRef.current += Math.abs(dx) + Math.abs(dy);

    targetRotationRef.current.y += dx * DRAG_SENSITIVITY;
    // Touch drags only rotate horizontally so vertical swipes still scroll the page
    if (e.pointerType === 'mouse') {
      targetRotationRef.current.x += dy * DRAG_SENSITIVITY;
    }

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleNodeClickInternal = (nodeId: string) => {
      if (!interactive) return;
      // Ignore the click that ends a rotate-drag
      if (dragDistanceRef.current > DRAG_THRESHOLD) return;
      openFocus(nodeId);
  };

  const focusedNode = focusedId ? nodes.find(n => n.id === focusedId) : undefined;
  const relatedNodes = focusedNode
    ? focusedNode.relatedIds.map(id => nodes.find(n => n.id === id)).filter((n): n is GraphNode => !!n)
    : [];

  return (
    <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden scroll-mt-24 ${interactive && !focusedId ? 'cursor-grab active:cursor-grabbing touch-pan-y select-none' : ''} ${className}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        aria-hidden={interactive ? undefined : true}
    >
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Nodes are inert while focused: the panel's slots take clicks and keyboard focus instead */}
        <div className="absolute inset-0" inert={!!focusedId}>
        {nodes.map(node => (
            <div
            key={node.id}
            ref={el => { if (el) nodeElementsRef.current.set(node.id, el); }}
            {...(interactive ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': node.type === 'project' ? `Project: ${node.text}` : `Skill: ${node.text}`,
            } : {})}
            onClick={(e) => {
                e.stopPropagation();
                handleNodeClickInternal(node.id);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dragDistanceRef.current = 0;
                    handleNodeClickInternal(node.id);
                }
            }}
            onMouseEnter={() => { if (interactive) hoveredNodeIdRef.current = node.id; }}
            onMouseLeave={() => { if (interactive) hoveredNodeIdRef.current = null; }}
            onFocus={() => { if (interactive) hoveredNodeIdRef.current = node.id; }}
            onBlur={() => { if (interactive) hoveredNodeIdRef.current = null; }}
            className={`absolute top-0 left-0 will-change-transform flex items-center justify-center transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                ${showLabels ? (node.type === 'project' ? 'w-24 h-24' : 'w-auto h-auto') : 'w-3 h-3'}
                ${interactive ? 'cursor-pointer' : ''}`}
            >
            {showLabels ? (
                node.type === 'project' ? (
                    <div className={`w-full h-full rounded-full border-2 border-cyan-500/30 bg-slate-800/90 backdrop-blur-sm flex items-center justify-center p-2 text-center shadow-[0_0_20px_rgba(6,182,212,0.15)] z-10 ${interactive ? 'hover:border-cyan-400 hover:bg-slate-800 hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]' : ''}`}>
                        <span className="text-slate-100 font-bold text-xs md:text-sm leading-tight drop-shadow-sm select-none">
                            {node.text}
                        </span>
                    </div>
                ) : (
                    <div className={`bg-slate-800/80 backdrop-blur-sm text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700 whitespace-nowrap shadow-sm ${interactive ? 'hover:border-accent hover:text-white hover:bg-accent hover:scale-110' : ''}`}>
                        {node.text}
                    </div>
                )
            ) : (
                <div className={`w-full h-full rounded-full shadow-sm ${node.type === 'project' ? 'bg-cyan-500' : 'bg-slate-600'}`} />
            )}
            </div>
        ))}
        </div>

        {focusedNode && (
            <FocusPanel
                focused={focusedNode}
                related={relatedNodes}
                closing={panelClosing}
                registerSlot={registerSlot}
                onSelect={openFocus}
                onClose={closeFocus}
            />
        )}
    </div>
  );
};

export default NodeCloud;
