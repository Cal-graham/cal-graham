import React, { useEffect, useRef } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import { GraphNode, ProjectItem } from '../types';
import ProjectMedia, { handleImageError } from './ProjectMedia';

// Delay before text and media fade in, so the bubbles land first
const REVEAL_DELAY_MS = 380;
const REVEAL_STAGGER_MS = 70;

interface FocusPanelProps {
  focused: GraphNode;
  related: GraphNode[];
  closing: boolean;
  // Placeholder slots the node bubbles fly into; NodeCloud reads their positions every frame
  registerSlot: (id: string) => (el: HTMLElement | null) => void;
  onSelect: (id: string) => void;
  onClose: (viaKeyboard?: boolean) => void;
}

const projectFor = (node: GraphNode): ProjectItem | undefined =>
  node.type === 'project' ? PROJECTS.find(p => p.id === node.id) : undefined;

const projectsUsing = (skill: string) => PROJECTS.filter(p => p.technologies.includes(skill));

const revealStyle = (index: number): React.CSSProperties => ({
  animationDelay: `${REVEAL_DELAY_MS + index * REVEAL_STAGGER_MS}ms`,
});

// Empty box the matching bubble lands on. Sized like the bubble so the layout leaves room for it;
// it is a button because the bubble above it ignores pointer events while focused.
const Slot: React.FC<{ node: GraphNode; registerSlot: FocusPanelProps['registerSlot']; onClick?: () => void; label: string }> = ({ node, registerSlot, onClick, label }) => (
  <button
    type="button"
    ref={registerSlot(node.id)}
    onClick={onClick}
    aria-label={label}
    disabled={!onClick}
    className={`shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${onClick ? 'cursor-pointer' : 'cursor-default'} ${node.type === 'project' ? 'w-24 h-24' : 'w-24 h-10'}`}
  />
);

const FocusPanel: React.FC<FocusPanelProps> = ({ focused, related, closing, registerSlot, onSelect, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const project = projectFor(focused);

  // New selection: start at the top and move keyboard focus into the panel
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    closeRef.current?.focus({ preventScroll: true });
  }, [focused.id]);

  const closeOnBackground = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.closeArea !== undefined) onClose();
  };

  return (
    <>
      <div
        ref={scrollRef}
        role="region"
        aria-label={`${focused.type === 'project' ? 'Project' : 'Skill'}: ${focused.text}`}
        className={`absolute inset-0 z-[2000] overflow-y-auto bg-slate-950/55 ${closing ? 'focus-fade-out pointer-events-none' : 'focus-fade-in'}`}
        onClick={closeOnBackground}
        data-close-area
      >
        <div key={focused.id} className="max-w-5xl px-5 py-8 md:px-12 md:py-12" data-close-area>
          {/* Selected entity */}
          <div className="grid grid-cols-[6rem_1fr] md:grid-cols-[6rem_1fr_20rem] gap-x-6 gap-y-4 items-start" data-close-area>
            <div className="row-span-2 md:row-span-1">
              <Slot node={focused} registerSlot={registerSlot} label={focused.text} />
            </div>

            <div className="focus-reveal min-w-0" style={revealStyle(0)}>
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-1">
                {focused.type === 'project' ? 'Project' : 'Skill'}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{focused.text}</h3>

              {project ? (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.categories.map(cat => (
                      <span key={cat} className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-md">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent hover:bg-cyan-600 text-white text-sm font-medium transition-colors"
                    >
                      {project.linkLabel ?? 'Visit site'}
                      <ExternalLink size={16} />
                    </a>
                  )}
                </>
              ) : (
                <p className="text-slate-300 leading-relaxed">
                  Used in {related.length} project{related.length === 1 ? '' : 's'}.
                </p>
              )}
            </div>

            {project && (
              <div className="focus-reveal col-start-2 md:col-start-3 md:row-start-1 aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl" style={revealStyle(1)}>
                <ProjectMedia project={project} alt={project.title} controls />
              </div>
            )}
          </div>

          {/* Related entities, hanging off the selected one */}
          {related.length > 0 && (
            <div className="mt-8 ml-4 pl-4 sm:ml-12 sm:pl-6 md:pl-10 border-l border-cyan-500/30 space-y-8" data-close-area>
              <p className="focus-reveal text-xs font-semibold uppercase tracking-widest text-slate-400" style={revealStyle(1)}>
                {focused.type === 'project' ? 'Skills used' : `Projects using ${focused.text}`}
              </p>

              {related.map((node, i) => {
                const relatedProject = projectFor(node);
                const select = () => onSelect(node.id);
                return (
                  <div key={node.id} className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] md:grid-cols-[6rem_1fr_14rem] gap-x-6 gap-y-3 items-start" data-close-area>
                    <div className="sm:row-span-2 md:row-span-1 flex sm:justify-center">
                      <Slot node={node} registerSlot={registerSlot} onClick={select} label={`Show ${node.text}`} />
                    </div>

                    {relatedProject ? (
                      <>
                        <div className="focus-reveal min-w-0" style={revealStyle(i + 2)}>
                          <button type="button" onClick={select} className="text-left text-lg font-semibold text-white hover:text-cyan-300 transition-colors">
                            {relatedProject.title}
                          </button>
                          <p className="mt-1 text-sm text-slate-400 leading-relaxed line-clamp-3">{relatedProject.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={select}
                          tabIndex={-1}
                          className="focus-reveal sm:col-start-2 md:col-start-3 md:row-start-1 aspect-video rounded-lg overflow-hidden border border-slate-700 bg-slate-800 hover:border-cyan-400 transition-colors"
                          style={revealStyle(i + 2)}
                        >
                          <ProjectMedia project={relatedProject} alt="" />
                        </button>
                      </>
                    ) : (
                      <div className="focus-reveal min-w-0 md:col-span-2" style={revealStyle(i + 2)}>
                        <button type="button" onClick={select} className="text-left text-lg font-semibold text-white hover:text-cyan-300 transition-colors">
                          {node.text}
                        </button>
                        {(() => {
                          const others = projectsUsing(node.text).filter(p => p.id !== focused.id);
                          return others.length > 0 ? (
                            <>
                              <p className="mt-1 mb-3 text-sm text-slate-400">Also used in:</p>
                              <div className="flex flex-wrap gap-3">
                                {others.map(p => (
                                  <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => onSelect(p.id)}
                                    className="group w-28 text-left"
                                  >
                                    <div className="aspect-video rounded-md overflow-hidden border border-slate-700 group-hover:border-cyan-400 transition-colors bg-slate-800">
                                      <img src={p.imageUrl} alt="" loading="lazy" className="w-full h-full object-cover" onError={(e) => handleImageError(e, p.title)} />
                                    </div>
                                    <span className="mt-1 block text-xs text-slate-400 group-hover:text-cyan-300 leading-tight">{p.title}</span>
                                  </button>
                                ))}
                              </div>
                            </>
                          ) : (
                            <p className="mt-1 text-sm text-slate-400">Only used in this project.</p>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        // detail is 0 when the button is activated from the keyboard
        onClick={(e) => onClose(e.detail === 0)}
        aria-label="Close details"
        className={`absolute top-4 right-4 z-[3100] p-2.5 rounded-full bg-slate-800/90 border border-slate-600 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors ${closing ? 'focus-fade-out pointer-events-none' : 'focus-fade-in'}`}
      >
        <X size={20} />
      </button>
    </>
  );
};

export default FocusPanel;
