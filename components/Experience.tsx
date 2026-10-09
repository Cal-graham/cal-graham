import React from 'react';
import Section from './Section';
import { EXPERIENCES } from '../constants';
import { Briefcase, MapPin } from 'lucide-react';
import FadeIn from './FadeIn';
import { Bullet, Timeline, TimelineEntry } from './Timeline';

// Renders **text** segments in bold so results stand out
const emphasize = (text: string) =>
  text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-slate-800">{part}</strong> : part
  );

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Experience" isDark>
      <Timeline>
        {EXPERIENCES.map((exp, index) => (
          <FadeIn key={exp.id} delay={index * 80}>
            <TimelineEntry
              title={exp.role}
              period={exp.period}
              meta={
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
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
              }
            >
              <ul className="space-y-3 text-slate-600 text-base leading-relaxed">
                {exp.description.map((point, i) => {
                  const afterGroup = i > 0 && typeof exp.description[i - 1] !== 'string';
                  return typeof point === 'string' ? (
                    <Bullet key={i} className={afterGroup ? 'pt-3' : ''}>{emphasize(point)}</Bullet>
                  ) : (
                    <li key={i} className={i > 0 ? 'pt-3' : ''}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{point.label}</p>
                      <ul className="space-y-3">
                        <Bullet>{emphasize(point.text)}</Bullet>
                        <li>
                          <ul className="pl-8 space-y-2">
                            {point.subItems.map((sub, subIndex) => (
                              <Bullet key={subIndex} hollow className="text-slate-500">{emphasize(sub)}</Bullet>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </TimelineEntry>
          </FadeIn>
        ))}
      </Timeline>
    </Section>
  );
};

export default Experience;
