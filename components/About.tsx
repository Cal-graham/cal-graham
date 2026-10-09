import React from 'react';
import Section from './Section';
import { ABOUT_TEXT } from '../constants';
import FadeIn from './FadeIn';
import AboutGraphic from './AboutGraphic';
import AboutCloud from './AboutCloud';

// Which graphic sits beside the bio: 'cloud' (3D icon web) or 'planet' (popping icons)
const GRAPHIC: 'cloud' | 'planet' = 'cloud';

const About: React.FC = () => {
  return (
    <Section id="about" title="About Me">
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-12 lg:gap-20 items-center">
          <div className="max-w-3xl space-y-6">
            {ABOUT_TEXT.split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index} className="text-lg text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="hidden md:block">
            {GRAPHIC === 'cloud' ? <AboutCloud /> : <AboutGraphic />}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
};

export default About;
