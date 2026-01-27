import React from 'react';
import Section from './Section.tsx';
import { EXPERIENCES } from '../constants.ts';
import { Briefcase, MapPin } from 'lucide-react';
import FadeIn from './FadeIn.tsx';

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Experience" isDark>
      <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-12">
        {EXPERIENCES.map((exp, index) => (
          <FadeIn key={exp.id} delay={index * 200}>
            <div className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-sm hover:scale-125 transition-transform duration-300"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-accent transition-colors">{exp.role}</h3>
                <span className="text-sm font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 mt-2 sm:mt-0 w-fit">
                  {exp.period}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4 text-slate-600">
                <div className="flex items-center gap-1">
                  <Briefcase size={16} />
                  <span className="font-medium">{exp.company}</span>
                </div>
                {exp.location && (
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin size={16} />
                    <span>{exp.location}</span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 text-slate-600 text-base leading-relaxed">
                {exp.description.map((point, index) => (
                  <React.Fragment key={index}>
                    {typeof point === 'string' ? (
                      <li className="flex items-start gap-2">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ) : (
                      <li className="flex flex-col gap-3">
                        <div className="flex items-start gap-2">
                           <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                           <span>{point.text}</span>
                        </div>
                        <ul className="pl-8 space-y-2">
                          {point.subItems.map((sub, subIndex) => (
                            <li key={subIndex} className="flex items-start gap-2 text-slate-500">
                               <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-transparent border border-slate-400 shrink-0"></span>
                               <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

export default Experience;