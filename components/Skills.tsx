import React from 'react';
import Section from './Section.tsx';
import { SKILLS } from '../constants.ts';
import { Code2, Wrench, Languages } from 'lucide-react';
import FadeIn from './FadeIn.tsx';

const iconMap = {
  "Programming & Tech": <Code2 size={24} />,
  "Engineering & Design": <Wrench size={24} />,
  "Languages": <Languages size={24} />
};

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Skills" isDark>
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((skillGroup, index) => (
            <div 
              key={skillGroup.category} 
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6 text-accent">
                {iconMap[skillGroup.category as keyof typeof iconMap]}
                <h3 className="text-lg font-bold text-slate-800">{skillGroup.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200 hover:border-accent hover:text-accent transition-colors cursor-default hover:bg-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
};

export default Skills;