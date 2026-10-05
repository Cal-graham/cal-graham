import React, { useLayoutEffect, useRef, useState } from 'react';
import { LayoutGrid, Network, Orbit } from 'lucide-react';
import { GraphLayout } from './NodeCloud';

export type ProjectsView = GraphLayout | 'grid';

interface GraphViewSwitchProps {
  view: ProjectsView;
  onChange: (view: ProjectsView) => void;
  // Popup explaining the switch, shown after the graph changes to 2D on its own
  showCallout: boolean;
  // 'overlay' floats over the graph without taking space; 'row' sits above the grid cards
  placement: 'overlay' | 'row';
}

const OPTIONS: { value: ProjectsView; label: string; shortLabel: string; Icon: typeof Network }[] = [
  { value: 'sphere', label: '3D Web', shortLabel: '3D', Icon: Network },
  { value: 'radial', label: '2D Connections', shortLabel: '2D', Icon: Orbit },
  { value: 'grid', label: 'Grid', shortLabel: 'Grid', Icon: LayoutGrid },
];

// Segmented slider for the Projects section: 3D web, 2D connection graph or grid.
// It sticks just below the fixed navbar, so it never scrolls out of sight.
const GraphViewSwitch: React.FC<GraphViewSwitchProps> = ({ view, onChange, showCallout, placement }) => {
  const activeIndex = OPTIONS.findIndex(o => o.value === view);
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Options size to their labels, so the highlight is measured from the active button
  const [highlight, setHighlight] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const button = buttonRefs.current[activeIndex];
      if (button) setHighlight({ left: button.offsetLeft, width: button.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (groupRef.current) observer.observe(groupRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  return (
    // Top-right: the corners of the graph stay clear in both graph layouts
    <div
      className={`sticky top-20 z-[1500] flex justify-end pointer-events-none ${
        // Over the graph the row is zero-height so the graph isn't pushed down
        placement === 'overlay' ? 'h-0' : 'mb-6'
      }`}
    >
    <div className={`flex flex-col items-end pointer-events-auto ${placement === 'overlay' ? 'pt-4 pr-4 md:pr-6' : ''}`}>
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label="Projects view"
        className="relative flex p-1 rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-600 shadow-lg shadow-black/30"
      >
        {/* Sliding highlight behind the active option */}
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-0 rounded-full bg-accent shadow-md transition-[transform,width] duration-500 ease-out"
          style={{ width: highlight.width, transform: `translateX(${highlight.left}px)` }}
        />
        {OPTIONS.map(({ value, label, shortLabel, Icon }, i) => {
          const active = value === view;
          return (
            <button
              key={value}
              ref={el => { buttonRefs.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={label}
              onClick={() => onChange(value)}
              className={`relative z-10 flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${active ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{shortLabel}</span>
            </button>
          );
        })}
      </div>

      {showCallout && (
        <div role="status" className="mt-3 relative max-w-[17rem] px-3.5 py-2.5 rounded-lg bg-white text-slate-700 text-xs leading-relaxed shadow-lg">
          <span aria-hidden="true" className="absolute -top-1 right-[calc(50%-0.25rem)] w-2 h-2 rotate-45 bg-white" />
          <span className="block font-semibold text-slate-900 mb-0.5">Three ways to explore</span>
          Switch between the rotating 3D web, the 2D connection graph and a simple grid here.
        </div>
      )}
    </div>
    </div>
  );
};

export default GraphViewSwitch;
