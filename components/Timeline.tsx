import React, { ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;
  compact?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ children, compact = false }) => (
  <div className={`relative border-l-2 border-slate-200 ${compact ? 'ml-2 space-y-10' : 'ml-3 md:ml-6 space-y-12'}`}>
    {children}
  </div>
);

interface TimelineEntryProps {
  title: string;
  period: string;
  meta?: ReactNode;
  compact?: boolean;
  children?: ReactNode;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({ title, period, meta, compact = false, children }) => {
  const isCurrent = /present/i.test(period);

  const badges = (
    <div className="flex items-center gap-2 shrink-0">
      {isCurrent && (
        <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
          Current
        </span>
      )}
      <span className="text-sm font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
        {period}
      </span>
    </div>
  );

  return (
    <div className={`relative ${compact ? 'pl-6 md:pl-8' : 'pl-8 md:pl-12'}`}>
      {/* Timeline Dot, vertically centred on the title's first line */}
      <div className={`absolute -left-[9px] w-4 h-4 rounded-full bg-accent border-4 border-white shadow-sm ${compact ? 'top-1.5' : 'top-1.5 md:top-2'}`}></div>

      {compact ? (
        <>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
          {/* Compact columns are narrow, so the dates sit beside the organisation rather than the title */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 text-slate-600">
            {meta}
            {badges}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h3>
            {badges}
          </div>
          {meta && <div className="mb-4 text-slate-600">{meta}</div>}
        </>
      )}

      {children}
    </div>
  );
};

export const Bullet: React.FC<{ children: ReactNode; className?: string; hollow?: boolean }> = ({ children, className = '', hollow = false }) => (
  <li className={`flex items-start gap-2 ${className}`}>
    <span className={`mt-2.5 w-1.5 h-1.5 rounded-full shrink-0 ${hollow ? 'border border-slate-400' : 'bg-slate-400'}`}></span>
    <span>{children}</span>
  </li>
);
