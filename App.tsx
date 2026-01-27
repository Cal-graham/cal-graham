import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Experience from './components/Experience.tsx';
import Projects from './components/Projects.tsx';
import Skills from './components/Skills.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="antialiased text-slate-900 bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default App;