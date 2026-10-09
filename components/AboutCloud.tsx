import React, { useEffect, useRef, useState } from 'react';
import {
  Camera, CodeXml, Cog, Cpu, DraftingCompass, Factory, Layers, Leaf, LucideIcon, MountainSnow, Plane, Satellite,
  ScanEye, Telescope,
} from 'lucide-react';

// A small cousin of the Projects 3D web: the same sphere of linked nodes, but the nodes
// are concrete things from the bio, experience and projects, and it tumbles top-to-bottom instead of spinning sideways
const ITEMS: { label: string; icon: LucideIcon }[] = [
  // Work
  { label: 'Process improvement', icon: Cog },
  { label: 'Manufacturing', icon: Factory },
  { label: 'Carbon accounting', icon: Leaf },
  // Building things
  { label: 'Software development', icon: CodeXml },
  { label: 'Computer vision', icon: ScanEye },
  { label: 'IoT & embedded systems', icon: Cpu },
  { label: '3D printing', icon: Layers },
  { label: 'CAD', icon: DraftingCompass },
  { label: 'Satellite controls', icon: Satellite },
  { label: 'Optics', icon: Telescope },
  // Outside work
  { label: 'Rock climbing', icon: MountainSnow },
  { label: 'Photography', icon: Camera },
  { label: 'Travel', icon: Plane },
];

const RADIUS_FRACTION = 0.33; // sphere radius as a share of the container's width
const FOCAL_LENGTH = 4.5; // in sphere radii; lower means stronger perspective
const ROTATION_SPEED = 0.004;
const TILT = 0.45; // fixed lean so the tumble isn't a plain vertical roll
const LINKS_PER_NODE = 3;

type Point = { x: number; y: number; z: number };

// Evenly spread points on a unit sphere (Fibonacci lattice)
const spherePoints = (count: number): Point[] =>
  Array.from({ length: count }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const theta = i * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });

// Join each node to its nearest neighbours so the sphere reads as a web
const nearestLinks = (points: Point[]): [number, number][] => {
  const seen = new Set<string>();
  const links: [number, number][] = [];
  points.forEach((p, i) => {
    points
      .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, LINKS_PER_NODE)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          links.push([i, j]);
        }
      });
  });
  return links;
};

const POINTS = spherePoints(ITEMS.length);
const LINKS = nearestLinks(POINTS);

const AboutCloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleRef = useRef(0);
  const hoveredRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(container);

    let frameId = 0;
    const draw = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Tumble around the X axis, then lean the whole sphere around Y
      const a = angleRef.current;
      const sinA = Math.sin(a), cosA = Math.cos(a);
      const sinT = Math.sin(TILT), cosT = Math.cos(TILT);
      const cx = width / 2, cy = height / 2;
      const radius = Math.min(width, height) * RADIUS_FRACTION;

      const projected = POINTS.map((p) => {
        const y1 = p.y * cosA - p.z * sinA;
        const z1 = p.y * sinA + p.z * cosA;
        const x2 = p.x * cosT + z1 * sinT;
        const z2 = -p.x * sinT + z1 * cosT;
        const depth = FOCAL_LENGTH / (FOCAL_LENGTH - z2);
        return { x: cx + x2 * radius * depth, y: cy + y1 * radius * depth, depth };
      });

      const hoveredIndex = hoveredRef.current;
      LINKS.forEach(([i, j]) => {
        const s = projected[i], t = projected[j];
        const touchesHover = hoveredIndex === i || hoveredIndex === j;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = touchesHover ? '#0ea5e9' : '#cbd5e1';
        ctx.lineWidth = touchesHover ? 2 : 1.25;
        ctx.globalAlpha = touchesHover ? 1 : Math.max(0.15, (s.depth + t.depth) / 2 - 0.45);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      projected.forEach((p, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const isHovered = hoveredIndex === i;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${p.depth * (isHovered ? 1.15 : 1)})`;
        el.style.opacity = String(isHovered ? 1 : Math.min(1, Math.max(0.35, p.depth - 0.25)));
        el.style.zIndex = String(isHovered ? 1000 : Math.round(p.depth * 100));
      });
    };

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      if (!visibleRef.current) return;
      // Hold still while a node is hovered so its label can be read
      if (hoveredRef.current === null) angleRef.current += ROTATION_SPEED;
      draw();
    };

    if (reducedMotion) {
      angleRef.current = 0.6;
      draw();
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  const setHover = (index: number | null) => {
    hoveredRef.current = index;
    setHovered(index);
  };

  return (
    <div ref={containerRef} onMouseLeave={() => setHover(null)} className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto" aria-hidden="true">
      <div className="absolute inset-8 rounded-full bg-sky-50" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {ITEMS.map(({ label, icon: Icon }, i) => (
        <div
          key={label}
          ref={(el) => { nodeRefs.current[i] = el; }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          className="absolute top-0 left-0 will-change-transform"
        >
          <div className={`w-12 h-12 rounded-full bg-white border shadow-sm flex items-center justify-center transition-colors duration-200 ${hovered === i ? 'border-accent shadow-sky-200' : 'border-sky-100'}`}>
            <Icon size={22} strokeWidth={1.75} className="text-accent" />
          </div>
          {hovered === i && (
            <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-white text-xs font-medium shadow-md pop-in">
              {label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default AboutCloud;
