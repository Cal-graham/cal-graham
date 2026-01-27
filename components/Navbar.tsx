import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className={`font-bold text-xl tracking-tight cursor-pointer ${scrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          CALUM<span className="text-accent">GRAHAM</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-colors hover:text-accent ${scrolled ? 'text-slate-600' : 'text-slate-300'}`}
            >
              {item.label}
            </button>
          ))}
          <a 
            href="mailto:c.graham@stroudinternational.com"
            className="px-4 py-2 rounded-full bg-accent hover:bg-cyan-600 text-white text-sm font-medium transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${scrolled ? 'text-slate-900' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-slate-600 font-medium py-2 hover:text-accent"
            >
              {item.label}
            </button>
          ))}
          <a 
            href="mailto:c.graham@stroudinternational.com"
            className="text-center px-4 py-3 rounded-lg bg-accent text-white font-medium"
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;