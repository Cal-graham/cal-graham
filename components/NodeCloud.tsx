import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PROJECTS } from '../constants';
import { GraphNode, GraphLink } from '../types';

const SPHERE_RADIUS = 280;
const FOCAL_LENGTH = 800;
const ROTATION_SPEED = 0.001;
const DRAG_SENSITIVITY = 0.005;

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, title: string) => {
  const target = e.currentTarget;
  target.onerror = null; 
  target.src = `https://placehold.co/800x600/1e293b/0ea5e9?text=${encodeURIComponent(title)}`;
};

interface NodeCloudProps {
  interactive?: boolean;
  onNodeClick?: (id: string, type: 'project' | 'skill') => void;
  className?: string;
  showLabels?: boolean;
  scale?: number;
}

const NodeCloud: React.FC<NodeCloudProps> = ({ 
  interactive = true, 
  onNodeClick, 
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

    nodesRef.current = newNodes;
    linksRef.current = newLinks;
    setNodes(newNodes);
  }, [scale]);

  // Animation Loop
  const animate = useCallback(() => {
    if (!containerRef.current) return;
    
    // Update Rotation
    if (!isDraggingRef.current && !hoveredNodeIdRef.current) {
        targetRotationRef.current.y += ROTATION_SPEED;
    }
    
    rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
    rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;

    const ctx = canvasRef.current?.getContext('2d');
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const cx = width / 2;
    const cy = height / 2;

    if (canvasRef.current) {
        // Handle resizing without clearing too aggressively if possible, but standard is reset
        if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
             canvasRef.current.width = width;
             canvasRef.current.height = height;
        }
    }
    if (ctx) ctx.clearRect(0, 0, width, height);

    const hoveredId = hoveredNodeIdRef.current;
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

        const scale = FOCAL_LENGTH / (FOCAL_LENGTH - z);
        const px = x * scale + cx;
        const py = y * scale + cy;

        return { ...node, px, py, scale, zIndex: Math.floor(scale * 100) };
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
        const isHoverMode = !!hoveredId && interactive;
        const isHighlighted = highlightedIds.has(node.id);

        if (el) {
            let scale = node.scale;
            let opacity = Math.max(0.3, node.scale - 0.2);
            let zIndex = node.zIndex;
            let filter = 'none';

            if (isHoverMode) {
                if (isHighlighted) {
                    scale *= 1.1;
                    opacity = 1;
                    zIndex = 1000;
                } else {
                    opacity = 0.1;
                    filter = 'grayscale(100%) blur(2px)';
                    zIndex = 0;
                }
            }

            el.style.transform = `translate3d(${node.px}px, ${node.py}px, 0) scale(${scale})`;
            el.style.zIndex = zIndex.toString();
            el.style.opacity = opacity.toString();
            el.style.filter = filter;
            
            if (showLabels) {
                el.style.marginLeft = node.type === 'project' ? '-48px' : '-40px'; 
                el.style.marginTop = node.type === 'project' ? '-48px' : '-10px';
            } else {
                el.style.marginLeft = '-6px'; 
                el.style.marginTop = '-6px';
            }
        }
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [interactive, showLabels]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    targetRotationRef.current = { ...rotationRef.current };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    
    targetRotationRef.current.y += dx * DRAG_SENSITIVITY;
    targetRotationRef.current.x += dy * DRAG_SENSITIVITY;
    
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleNodeClickInternal = (nodeId: string) => {
      if (!interactive || !onNodeClick) return;
      const node = nodesRef.current.find(n => n.id === nodeId);
      if (node) {
          onNodeClick(node.id, node.type);
      }
  };

  return (
    <div 
        ref={containerRef} 
        className={`relative w-full h-full overflow-hidden ${interactive ? 'cursor-grab active:cursor-grabbing' : ''} ${className}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none" 
        />
        
        {nodes.map(node => (
            <div
            key={node.id}
            ref={el => { if (el) nodeElementsRef.current.set(node.id, el); }}
            onClick={(e) => {
                e.stopPropagation();
                handleNodeClickInternal(node.id);
            }}
            onMouseEnter={() => { if (interactive) hoveredNodeIdRef.current = node.id; }}
            onMouseLeave={() => { if (interactive) hoveredNodeIdRef.current = null; }}
            className={`absolute top-0 left-0 will-change-transform flex items-center justify-center transition-colors duration-200
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
  );
};

export default NodeCloud;