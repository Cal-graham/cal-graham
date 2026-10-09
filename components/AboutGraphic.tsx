import React, { useEffect, useState } from 'react';
import { Camera, Cog, Cpu, Leaf, LucideIcon, MountainSnow, Plane, Wrench } from 'lucide-react';

type Item = { label: string; icon?: LucideIcon };

// The planet (no icon) opens the loop; the rest follow the order they come up in the bio
const ITEMS: Item[] = [
  { label: 'North America & Europe' },
  { label: 'Engineering', icon: Wrench },
  { label: 'Operations', icon: Cog },
  { label: 'Sustainability', icon: Leaf },
  { label: 'New tech', icon: Cpu },
  { label: 'Rock climbing', icon: MountainSnow },
  { label: 'Photography', icon: Camera },
  { label: 'Travel', icon: Plane },
];

const HOLD_MS = 2600;
const POP_OUT_MS = 300;

const Planet: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-44 h-44">
    <defs>
      <clipPath id="planet-clip">
        <circle cx="100" cy="100" r="58" />
      </clipPath>
    </defs>
    <g transform="rotate(-18 100 100)">
      {/* Back half of the ring, behind the planet */}
      <path d="M 12 100 A 88 22 0 0 1 188 100" className="fill-none stroke-sky-300" strokeWidth="6" strokeLinecap="round" />
    </g>
    <circle cx="100" cy="100" r="58" className="fill-sky-400" />
    {/* Surface features drift sideways on a loop, so the planet looks like it's turning */}
    <g clipPath="url(#planet-clip)">
      <g className="planet-surface">
        {[0, 140].map((offset) => (
          <g key={offset} transform={`translate(${offset} 0)`} className="fill-sky-500">
            <ellipse cx="60" cy="72" rx="22" ry="9" />
            <ellipse cx="110" cy="96" rx="30" ry="11" />
            <ellipse cx="72" cy="128" rx="18" ry="7" />
            <circle cx="130" cy="64" r="6" className="fill-sky-300" />
            <circle cx="48" cy="104" r="4" className="fill-sky-300" />
          </g>
        ))}
      </g>
      {/* Shading on the night side */}
      <circle cx="122" cy="116" r="58" className="fill-slate-900/10" />
    </g>
    <g transform="rotate(-18 100 100)">
      {/* Front half of the ring, over the planet */}
      <path d="M 12 100 A 88 22 0 0 0 188 100" className="fill-none stroke-sky-300" strokeWidth="6" strokeLinecap="round" />
    </g>
  </svg>
);

const AboutGraphic: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let swapTimer: number;
    const holdTimer = window.setInterval(() => {
      setLeaving(true);
      swapTimer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % ITEMS.length);
        setLeaving(false);
      }, POP_OUT_MS);
    }, HOLD_MS);

    return () => {
      window.clearInterval(holdTimer);
      window.clearTimeout(swapTimer);
    };
  }, []);

  const item = ITEMS[index];
  const Icon = item.icon;

  return (
    <div className="relative w-72 h-72 lg:w-80 lg:h-80 mx-auto" aria-hidden="true">
      {/* Backdrop and slowly turning orbit */}
      <div className="absolute inset-6 rounded-full bg-sky-50" />
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-200 orbit-spin">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent" />
        <span className="absolute -bottom-1 left-1/4 w-2 h-2 rounded-full bg-sky-300" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div key={index} className={leaving ? 'pop-out' : 'pop-in'}>
          {Icon ? (
            <div className="w-36 h-36 rounded-full bg-white shadow-lg shadow-sky-100 border border-sky-100 flex items-center justify-center">
              <Icon size={72} strokeWidth={1.5} className="text-accent" />
            </div>
          ) : (
            <Planet />
          )}
        </div>
      </div>

      <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
        <span
          key={index}
          className={`px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600 shadow-sm ${leaving ? 'pop-out' : 'pop-in'}`}
        >
          {item.label}
        </span>
      </div>
    </div>
  );
};

export default AboutGraphic;
