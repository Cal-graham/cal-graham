import React from 'react';
import Section from './Section';
import { EDUCATION, VOLUNTEERING } from '../constants';
import { GraduationCap, HeartHandshake } from 'lucide-react';
import FadeIn from './FadeIn';
import { Bullet, Timeline, TimelineEntry } from './Timeline';

const Background: React.FC = () => {
  return (
    <Section id="education" title="Education & Volunteering">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <FadeIn>
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-8 text-slate-800">
            <GraduationCap className="text-accent" />
            Education
          </h3>
          <Timeline compact>
            {EDUCATION.map((edu) => (
              <TimelineEntry
                key={edu.id}
                compact
                title={edu.degree}
                period={edu.period}
                meta={<span className="font-medium">{edu.institution}</span>}
              >
                {edu.publication && (
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    <span className="font-medium text-slate-700">Co-author:</span> {edu.publication}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {edu.honours.map((honour) => (
                    <span
                      key={honour}
                      className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200"
                    >
                      {honour}
                    </span>
                  ))}
                </div>
              </TimelineEntry>
            ))}
          </Timeline>
        </FadeIn>

        <FadeIn delay={80}>
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-8 text-slate-800">
            <HeartHandshake className="text-accent" />
            Volunteering
          </h3>
          <Timeline compact>
            {VOLUNTEERING.map((vol) => (
              <TimelineEntry
                key={vol.id}
                compact
                title={vol.role}
                period={vol.period}
                meta={<span className="font-medium">{vol.organization}</span>}
              >
                <ul className="space-y-3 text-slate-600 text-base leading-relaxed">
                  {vol.details.map((detail, index) => (
                    <Bullet key={index}>{detail}</Bullet>
                  ))}
                </ul>
              </TimelineEntry>
            ))}
          </Timeline>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Background;
