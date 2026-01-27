import React from 'react';
import Section from './Section';
import { ABOUT_TEXT, EDUCATION, VOLUNTEERING } from '../constants';
import { GraduationCap, HeartHandshake } from 'lucide-react';
import FadeIn from './FadeIn';

const About: React.FC = () => {
  return (
    <Section id="about" title="About Me">
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Bio */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              {ABOUT_TEXT}
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4 text-slate-800">
                <GraduationCap className="text-accent" />
                Education
              </h3>
              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h4 className="font-bold text-slate-800">{edu.institution}</h4>
                      <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{edu.period}</span>
                    </div>
                    <p className="text-accent font-medium mb-3">{edu.degree}</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm">
                      {edu.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow duration-300">
               <h3 className="text-xl font-semibold flex items-center gap-2 mb-4 text-slate-800">
                <HeartHandshake className="text-accent" />
                Volunteering
              </h3>
              <div className="space-y-6">
                {VOLUNTEERING.map((vol) => (
                  <div key={vol.id}>
                    <h4 className="font-bold text-slate-800 text-sm">{vol.organization}</h4>
                    <p className="text-accent text-xs mb-1">{vol.role}</p>
                    <p className="text-xs text-slate-500 mb-2">{vol.period}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {vol.details[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
};

export default About;