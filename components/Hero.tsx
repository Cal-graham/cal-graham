import React, { useEffect, useState } from 'react';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import FadeIn from './FadeIn';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({
        x: (event.clientX - window.innerWidth / 2),
        y: (event.clientY - window.innerHeight / 2),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />
      
      {/* Abstract Animated Shapes with Mouse Parallax */}
      {/* Blob 1 */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
      >
        <div className="w-full h-full bg-blue-500/10 rounded-full blur-3xl animate-blob" />
      </div>

      {/* Blob 2 */}
      <div 
        className="absolute bottom-1/4 left-1/4 w-64 h-64 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translate(${mousePos.x * -0.03}px, ${mousePos.y * -0.03}px)` }}
      >
        <div className="w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Blob 3 */}
      <div 
        className="absolute top-1/2 left-1/2 w-80 h-80 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translate(${mousePos.x * 0.04}px, ${mousePos.y * 0.04}px)` }}
      >
        <div className="w-full h-full bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Calum Graham
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light tracking-wide">
            Engineer & Operations Consultant
          </p>
          <p className="text-md md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Leveraging Engineering Physics and Operations Strategy to deliver measurable value in complex, high-stakes environments.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a 
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/40 hover:-translate-y-1"
            >
              <FileText size={20} />
              <span>Resume</span>
            </a>
          </div>
        </FadeIn>

        <button 
          onClick={scrollToAbout}
          className="animate-bounce absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors"
          aria-label="Scroll Down"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </div>
  );
};

export default Hero;