import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

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