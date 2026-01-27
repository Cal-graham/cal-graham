import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-white font-bold text-lg tracking-tight">CALUM GRAHAM</span>
          <p className="text-sm mt-2">Engineer & Operations Consultant</p>
        </div>

        <div className="flex gap-6">
           <a href={SOCIAL_LINKS.email} className="hover:text-white transition-colors"><Mail size={20} /></a>
           <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
           <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={20} /></a>
        </div>

        <div className="text-sm">
          &copy; {new Date().getFullYear()} Calum Graham.
        </div>
      </div>
    </footer>
  );
};

export default Footer;