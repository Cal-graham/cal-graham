import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { ProjectItem } from '../types';
import { X, LayoutGrid, Network, ExternalLink } from 'lucide-react';
import FadeIn from './FadeIn';
import NodeCloud from './NodeCloud';
import ProjectMedia from './ProjectMedia';

// Control the spacing of the nodes in the 3D cloud
const NODE_CLOUD_SCALE = 1.0;

// Modal behaviour: close on Escape, lock page scroll, focus the close button
const useModal = (onClose: () => void) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return closeButtonRef;
};

// Grid is the default on small screens where the 3D web is cramped
const prefersGrid = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

// --- Components ---

const ProjectModal: React.FC<{ project: ProjectItem; onClose: () => void }> = ({ project, onClose }) => {
  const closeButtonRef = useModal(onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-title-${project.id}`}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-100">
          <ProjectMedia project={project} alt={project.title} controls />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:hidden" />
          <p aria-hidden="true" className="absolute bottom-4 left-4 text-2xl font-bold text-white md:hidden drop-shadow-md">{project.title}</p>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 id={`project-title-${project.id}`} className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 sr-only md:not-sr-only">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.categories.map(cat => (
                  <span key={cat} className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-blue-50 rounded-md">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="prose prose-slate mb-8 text-slate-600 leading-relaxed">
            <p>{project.description}</p>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex w-fit items-center gap-2 px-5 py-2.5 rounded-full bg-accent hover:bg-cyan-600 text-white text-sm font-medium transition-colors"
            >
              {project.linkLabel ?? 'Visit site'}
              <ExternalLink size={16} />
            </a>
          )}

          <div className="mt-auto">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>(() => (prefersGrid() ? 'grid' : '3d'));
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const closeProject = React.useCallback(() => setSelectedProject(null), []);

  return (
    <section id="projects" className="py-20 bg-white">
      {/* Header Container - Constrained Width */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 relative inline-block">
          Projects
          <span className="absolute -bottom-3 left-0 w-1/2 h-1 bg-accent rounded-full"></span>
        </h2>

        <div className="flex justify-between items-center mb-8">
            <p className="text-sm text-slate-500 hidden md:block">
                {viewMode === '3d' ? 'Drag to rotate • Click a project or skill to explore it' : 'Click a project for details'}
            </p>
            <div className="bg-slate-100 p-1 rounded-lg flex items-center shadow-inner ml-auto">
                <button
                    onClick={() => setViewMode('3d')}
                    aria-pressed={viewMode === '3d'}
                    aria-label="3D web view"
                    className={`p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium ${viewMode === '3d' ? 'bg-white text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Network size={18} />
                    <span className="hidden sm:inline">3D Web</span>
                </button>
                <button
                    onClick={() => setViewMode('grid')}
                    aria-pressed={viewMode === 'grid'}
                    aria-label="Grid view"
                    className={`p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium ${viewMode === 'grid' ? 'bg-white text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <LayoutGrid size={18} />
                    <span className="hidden sm:inline">Grid View</span>
                </button>
            </div>
        </div>
      </div>

      <FadeIn className="w-full">
        {viewMode === '3d' ? (
          <div className="w-full h-[95vh] bg-slate-900 relative overflow-hidden shadow-inner">
             {/* Dark background grid effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
            <NodeCloud
              interactive={true}
              scale={NODE_CLOUD_SCALE}
            />
          </div>
        ) : (
          /* Grid View Fallback - Constrained Width */
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => (
                    <button
                    type="button"
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col hover:-translate-y-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                    <div className="h-48 overflow-hidden relative">
                        <ProjectMedia project={project} alt="" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-2">
                        <span className="text-xs font-bold tracking-wider text-accent uppercase">
                            {project.categories.slice(0, 3).join(' • ')}
                        </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                            {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="text-xs bg-slate-50 text-slate-400 px-2 py-1 rounded-md font-medium">+{project.technologies.length - 3}</span>
                        )}
                        </div>
                    </div>
                    </button>
                ))}
            </div>
          </div>
        )}
      </FadeIn>

      {/* Modals */}
      {selectedProject && (
        <ProjectModal
            project={selectedProject}
            onClose={closeProject}
        />
      )}
    </section>
  );
};

export default Projects;
