import React, { useEffect, useState } from 'react';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import FadeIn from './FadeIn';
import NodeCloud from './NodeCloud';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />
      
      {/* Background Node Cloud */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
         <NodeCloud interactive={false} showLabels={false} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
            Calum Graham
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light tracking-wide drop-shadow-md">
            Engineer & Operations Consultant
          </p>          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a 
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 hover:text-cyan-400 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 hover:text-cyan-400 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 hover:text-cyan-400 transition-all duration-300 hover:scale-110 shadow-lg"
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
      </div>
    </div>
  );
};

export default Hero;