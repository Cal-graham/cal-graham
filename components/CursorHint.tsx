import React, { useEffect, useRef, useState } from 'react';

// How long the hint follows the cursor, from the first time the mouse enters the graph
const HINT_DURATION_MS = 10000;
// Offset from the pointer so the label doesn't sit under it
const OFFSET_X = 18;
const OFFSET_Y = 22;

interface CursorHintProps {
  // The element the hint follows the mouse within (positioned, so the hint can be absolute inside it)
  areaRef: React.RefObject<HTMLElement | null>;
  text: string;
}

// A small label that follows the mouse over the graph for the first few seconds, then is gone for good.
// Mouse only: touch and pen users don't have a cursor to follow.
const CursorHint: React.FC<CursorHintProps> = ({ areaRef, text }) => {
  const hintRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'waiting' | 'showing' | 'done'>('waiting');
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const area = areaRef.current;
    if (!area || phase === 'done') return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      // Stay out of the way while a details panel is open
      const overPanel = (e.target as HTMLElement).closest('[role="region"]');
      setHovering(!overPanel);
      if (phase === 'waiting') setPhase('showing');
      const rect = area.getBoundingClientRect();
      if (hintRef.current) {
        hintRef.current.style.transform = `translate(${e.clientX - rect.left + OFFSET_X}px, ${e.clientY - rect.top + OFFSET_Y}px)`;
      }
    };
    const onLeave = () => setHovering(false);

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    return () => {
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
    };
  }, [areaRef, phase]);

  useEffect(() => {
    if (phase !== 'showing') return;
    const timer = window.setTimeout(() => setPhase('done'), HINT_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      ref={hintRef}
      aria-hidden="true"
      className={`absolute top-0 left-0 z-[1600] pointer-events-none px-2.5 py-1.5 rounded-md bg-white/95 text-slate-800 text-xs font-medium shadow-lg whitespace-nowrap transition-opacity duration-300 ${phase === 'showing' && hovering ? 'opacity-100' : 'opacity-0'}`}
    >
      {text}
    </div>
  );
};

export default CursorHint;
