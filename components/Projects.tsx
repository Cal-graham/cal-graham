import React, { useEffect, useRef, useState, useCallback } from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';
import { ProjectItem } from '../types';
import { X, LayoutGrid, Network, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';

// --- Types & Constants ---

type NodeType = 'project' | 'skill';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface GraphNode extends Point3D {
  id: string;
  type: NodeType;
  text: string;
  img?: string;
  relatedIds: string[];
}

interface GraphLink {
  source: string;
  target: string;
}

const SPHERE_RADIUS = 280;
const FOCAL_LENGTH = 800;
const ROTATION_SPEED = 0.001;
const DRAG_SENSITIVITY = 0.005;

// --- Helper for Image Fallback ---
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, title: string) => {
  const target = e.currentTarget;
  // Debug log to help identifying path issues
  console.warn(`[Image Load Fail] Project: "${title}" | Tried path: ${target.src}`);
  
  target.onerror = null; // Prevent infinite loop
  // Use a professional placeholder service if local image fails
  target.src = `https://placehold.co/800x600/1e293b/0ea5e9?text=${encodeURIComponent(title)}`;
};

// --- Components ---

const ProjectModal: React.FC<{ project: ProjectItem; onClose: () => void }> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-100">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={(e) => handleImageError(e, project.title)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:hidden" />
          <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white md:hidden drop-shadow-md">{project.title}</h2>
        </div>
        
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 hidden md:block mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.categories.map(cat => (
                  <span key={cat} className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-blue-50 rounded-md">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="prose prose-slate mb-8 text-slate-600 leading-relaxed">
            <p>{project.description}</p>
          </div>

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

const SkillModal: React.FC<{ skill: string; projects: ProjectItem[]; onSelectProject: (p: ProjectItem) => void; onClose: () => void }> = ({ skill, projects, onSelectProject, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Projects using <span className="text-accent">{skill}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-3">
          {projects.map(p => (
            <button
              key={p.id}
              onClick={() => onSelectProject(p)}
              className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group text-left"
            >
              <div className="w-12 h-12 rounded-md overflow-hidden bg-slate-200 shrink-0">
                <img 
                  src={p.imageUrl} 
                  alt="" 
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, p.title)}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-700 group-hover:text-accent transition-colors">{p.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{p.categories.join(', ')}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-accent" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]); // State to trigger render
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const nodeElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const requestRef = useRef<number>(0);
  
  // 3D State
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Initialize Data (Spherical Layout)
  useEffect(() => {
    const newNodes: GraphNode[] = [];
    const newLinks: GraphLink[] = [];
    
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
      const pos = getSpherePoint(i, PROJECTS.length, SPHERE_RADIUS);
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
      // Distribute skills slightly more randomly but generally spherical
      const pos = getSpherePoint(i, uniqueSkills.length, SPHERE_RADIUS * 0.6, 2); 
      
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
    setNodes(newNodes); // Trigger render to create DOM elements
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    if (viewMode !== '3d' || !containerRef.current) return;
    
    // Update Rotation (Ease towards target or auto-rotate)
    if (!isDraggingRef.current) {
        targetRotationRef.current.y += ROTATION_SPEED;
    }
    
    // Smooth damping
    rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
    rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;

    const ctx = canvasRef.current?.getContext('2d');
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const cx = width / 2;
    const cy = height / 2;

    if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
    }
    if (ctx) ctx.clearRect(0, 0, width, height);

    // Calculate Positions
    const sinX = Math.sin(rotationRef.current.x);
    const cosX = Math.cos(rotationRef.current.x);
    const sinY = Math.sin(rotationRef.current.y);
    const cosY = Math.cos(rotationRef.current.y);

    const projectedNodes = nodesRef.current.map(node => {
        // Rotate Y
        let x = node.x * cosY - node.z * sinY;
        let z = node.z * cosY + node.x * sinY;
        // Rotate X
        let y = node.y * cosX - z * sinX;
        z = z * cosX + node.y * sinX;

        // Project
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH - z);
        const px = x * scale + cx;
        const py = y * scale + cy;

        return { ...node, px, py, scale, zIndex: Math.floor(scale * 100) };
    });

    // Draw Links
    if (ctx) {
        ctx.strokeStyle = '#cbd5e1'; // slate-300
        ctx.lineWidth = 2.5; // Made lines thicker
        
        linksRef.current.forEach(link => {
            const source = projectedNodes.find(n => n.id === link.source);
            const target = projectedNodes.find(n => n.id === link.target);
            
            if (source && target) {
                // Fade lines based on depth
                const avgScale = (source.scale + target.scale) / 2;
                ctx.globalAlpha = Math.max(0.2, avgScale - 0.3); // Fade distant lines
                ctx.beginPath();
                ctx.moveTo(source.px, source.py);
                ctx.lineTo(target.px, target.py);
                ctx.stroke();
            }
        });
        ctx.globalAlpha = 1;
    }

    // Update DOM Nodes
    projectedNodes.forEach(node => {
        const el = nodeElementsRef.current.get(node.id);
        if (el) {
            el.style.transform = `translate3d(${node.px}px, ${node.py}px, 0) scale(${node.scale})`;
            el.style.zIndex = node.zIndex.toString();
            el.style.opacity = Math.max(0.3, node.scale - 0.2).toString();
            // Center element
            el.style.marginLeft = node.type === 'project' ? '-48px' : '-40px'; 
            el.style.marginTop = node.type === 'project' ? '-48px' : '-10px';
        }
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === '3d') {
        requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate, viewMode]);

  // Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    targetRotationRef.current = { ...rotationRef.current }; // Sync target to stop auto-rotation jump
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    
    targetRotationRef.current.y += dx * DRAG_SENSITIVITY;
    targetRotationRef.current.x += dy * DRAG_SENSITIVITY;
    
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Node Click Handlers
  const handleNodeClick = (nodeId: string) => {
    const node = nodesRef.current.find(n => n.id === nodeId);
    if (!node) return;

    if (node.type === 'project') {
      const project = PROJECTS.find(p => p.id === node.id);
      if (project) setSelectedProject(project);
    } else {
      setSelectedSkill(node.text);
    }
  };

  return (
    <Section id="projects" title="Projects">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-slate-500 hidden md:block">
            {viewMode === '3d' ? 'Drag to rotate • Click nodes to explore' : ''}
        </p>
        <div className="bg-slate-100 p-1 rounded-lg flex items-center shadow-inner ml-auto">
            <button 
                onClick={() => setViewMode('3d')}
                className={`p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium ${viewMode === '3d' ? 'bg-white text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Network size={18} />
                <span className="hidden sm:inline">3D Web</span>
            </button>
            <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium ${viewMode === 'grid' ? 'bg-white text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <LayoutGrid size={18} />
                <span className="hidden sm:inline">Grid View</span>
            </button>
        </div>
      </div>

      <FadeIn>
        {viewMode === '3d' ? (
          <div 
            ref={containerRef} 
            className="relative w-full h-[600px] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing group"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Dark background grid effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
            
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-none" 
            />
            
            {nodes.map(node => (
              <div
                key={node.id}
                ref={el => { if (el) nodeElementsRef.current.set(node.id, el); }}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent drag start on click if possible, or handle nicely
                    handleNodeClick(node.id);
                }}
                className={`absolute top-0 left-0 will-change-transform flex items-center justify-center cursor-pointer transition-colors duration-200
                    ${node.type === 'project' ? 'w-24 h-24' : 'w-auto h-auto'}`}
              >
                {node.type === 'project' ? (
                    <div className="w-full h-full rounded-full border-2 border-cyan-500/30 bg-slate-800/90 backdrop-blur-sm flex items-center justify-center p-2 text-center hover:border-cyan-400 hover:bg-slate-800 hover:scale-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] z-10">
                        <span className="text-slate-100 font-bold text-xs md:text-sm leading-tight drop-shadow-sm select-none">
                            {node.text}
                        </span>
                    </div>
                ) : (
                    <div className="bg-slate-800/80 backdrop-blur-sm text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700 hover:border-accent hover:text-white hover:bg-accent hover:scale-110 transition-all whitespace-nowrap shadow-sm">
                        {node.text}
                    </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Grid View Fallback */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {PROJECTS.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col hover:-translate-y-1 cursor-pointer"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, project.title)}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs font-bold tracking-wider text-accent uppercase">
                        {project.categories.join(' & ')}
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
                </div>
              ))}
          </div>
        )}
      </FadeIn>

      {/* Modals */}
      {selectedProject && (
        <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
        />
      )}

      {selectedSkill && (
          <SkillModal 
            skill={selectedSkill}
            projects={PROJECTS.filter(p => p.technologies.includes(selectedSkill))}
            onSelectProject={(p) => {
                setSelectedSkill(null);
                setSelectedProject(p);
            }}
            onClose={() => setSelectedSkill(null)}
          />
      )}
    </Section>
  );
};

export default Projects;