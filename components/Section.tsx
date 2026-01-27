import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
  isDark?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = "", isDark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-20 px-6 md:px-12 lg:px-24 ${isDark ? 'bg-slate-50' : 'bg-white'} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 relative inline-block">
            {title}
            <span className="absolute -bottom-3 left-0 w-1/2 h-1 bg-accent rounded-full"></span>
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;