import { ExperienceItem, EducationItem, ProjectItem, SkillCategory, VolunteerItem } from './types';

export const SOCIAL_LINKS = {
  email: "c.graham@stroudinternational.com",
  linkedin: "https://linkedin.com/in/calum-graham",
  github: "https://github.com/cal-graham",
  portfolio: "https://cal-graham.io"
};

export const ABOUT_TEXT = `I am an early-career professional who's passionate about new technologies, operational improvement, and sustainable outcomes. Leveraging my Engineering Physics background, I’ve worked as an Operations Consultant - bridging the gap between complex industrial processes and bottom line operations impact.

Currently based in London, with experience across the EU and North America, my work has been to find hidden inefficiencies and turn them into multi-million dollar improvements. I’m at my best when I can align operational excellence with environmental stewardship—optimizing performance while actively reducing inefficiencies.

In addition to technical industrial processes, I get to exercise my interest in new technologies internally - managing IT for my organization and developing AgenticAI tools.

When I’m not managing operations projects, you’ll find me rock climbing, geeking out over new tech, or exploring stunning places where I can take mediocre photos.`;

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'stroud',
    role: 'Operations Consultant',
    company: 'Stroud International',
    location: 'Canada, US, UK, Germany',
    period: '2023 - Present',
    description: [
      {
        text: 'Lead on-site client teams to solve complex operational challenges, delivering measurable ROI.',
        subItems: [
          'Doubled value of client’s improvement portfolio, securing ~€5M in waste reductions and ~300 tonnes of CO2e savings.',
          'Identified and mapped ~$8.2M of raw material waste opportunities within a commercial food packaging facility.',
          'Diagnosed root cause of a decades-old process failure at a regulated medical manufacturing site, resolving a ~10% waste driver.'
        ]
      },
      'Serve as Global Head of IT, leading cybersecurity initiatives, cloud service optimization, and AI tool implementation.',
      'Founded the Carbon Accounting team to integrate climate-oriented metrics into operational improvement strategies.'
    ]
  },
  {
    id: 'viavi',
    role: 'Optical Engineer',
    company: 'VIAVI Solutions',
    period: '2021 - 2022',
    description: [
      'Managed key stakeholder relationships to maintain and expand a critical $10M project.',
      'Developed a cloud-based logistics applet, reclaiming ~5% of internal R&D engineering time.',
      'Executed rigorous testing of next-gen optical technologies to inform product development roadmaps.'
    ]
  },
  {
    id: 'queens-work',
    role: 'Work Study Program',
    company: "Queen's University",
    period: '2018 - 2023',
    description: [
      'Managed operations for a student-run Carbon Neutral Cafe.',
      'Contributed to Engineering course curriculum development.',
      'Provided technical assistance for Civil Engineering laboratories.'
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'queens-edu',
    degree: 'Bachelor of Applied Science, Engineering Physics (Electrical Specialization)',
    institution: "Queen's University",
    period: '2018 - 2023',
    details: [
      '3.9 Cumulative GPA, Dean’s List.',
      'Co-author: Design of a Simulator for Testing Satellite Attitude Determination and Control.',
      'Applied Science Class of ’68 Scholarship and Victor Alfred Betts Scholarship recipient.'
    ]
  }
];

export const VOLUNTEERING: VolunteerItem[] = [
  {
    id: 'qset',
    role: 'Attitude Determination Control (ADCS) Manager',
    organization: "Queen's Space Engineering Team (QSET)",
    period: '2018 - 2021',
    details: [
      'Led an engineering team in the end-to-end development and launch of an ADCS payload on a CSA stratospheric balloon.',
      'Defined technical roadmap aligning with Canadian Satellite Design Challenge milestones.'
    ]
  },
  {
    id: 'duke',
    role: 'Gold Award Recipient',
    organization: "Duke of Edinburgh Award",
    period: '2015 - 2018',
    details: [
      'Completed 500+ hours of service, skill development, and physical recreation, including leading wilderness expeditions.'
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming & Tech",
    items: ["Python", "MATLAB/Simulink", "C", "Javascript", "HTML", "Git", "IoT"]
  },
  {
    category: "Engineering & Design",
    items: ["SolidWorks", "3D Printing", "Optical Engineering", "Control Theory", "Data Analysis"]
  },
  {
    category: "Languages",
    items: ["English (Fluent)", "French (Intermediate)", "German (Intermediate)", "Mandarin Chinese (Intermediate)"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'espresso',
    title: 'IoT Espresso Machine',
    categories: ['IoT', 'Python', 'Hardware'],
    description: 'Engineered a real-time sensor array integrated into an espresso machine. Developed a Raspberry Pi network interface (B.E.A.N.S.) to stream pressure telemetry for precise brew control.',
    technologies: ['Python', 'IoT', 'Hardware'],
    imageUrl: 'https://cal-graham.github.io/cal-graham/profile.png',
    hoverImageUrl: './profile.png'
  },
  {
    id: 'climbing',
    title: 'Adjustable Climbing Wall',
    categories: ['Fabrication', 'SolidWorks', 'Addative Manufacturing'],
    description: 'Designed and fabricated a 300 sq ft adjustable climbing wall. Utilized SolidWorks for structural modeling and 3D printing for custom holds manufacturing.',
    technologies: ['Fabrication', 'SolidWorks', 'Addative Manufacturing'],
    imageUrl: './climbing wall.jpg',
    hoverImageUrl: './climbing wall.jpg'
  },
  {
    id: 'printer',
    title: 'Networked 3D Printer Controller',
    categories: ['Python', 'HTML', 'IoT'],
    description: 'Deployed and customized an Octoprint-based server for remote 3D printer management. Integrated custom electronics and server logic to enhance print reliability.',
    technologies: ['Python', 'HTML', 'IoT'],
    imageUrl: './3dprinter.jpg',
    hoverImageUrl: './3dprinter.jpg'
  },
  {
    id: 'mqttlights',
    title: 'MQTT Synchronous Lights',
    categories: ['Hardware', 'IoT', 'C'],
    description: 'Used HiveMQ to create an example MQTT Pub/Sub system to synchronize 2 sets of lights using ESP8266 boards.',
    technologies: ['Hardware', 'IoT', 'C'],
    imageUrl: './ESP8266.jpg',
    hoverImageUrl: './ESP8266.jpg'
  },
  {
    id: 'camera',
    title: 'Cameras - Adapting and Repairing Lenses',
    categories: ['SolidWorks', 'Reclamation', 'Optics'],
    description: 'Reverse-engineered and repaired digital camera mechanisms. Designed 3D-printed adaptors to interface vintage film lenses with modern digital bodies.',
    technologies: ['SolidWorks', 'Reclamation', 'Optics'],
    imageUrl: './adaptor.jpg',
    hoverImageUrl: './adaptor.jpg'
  },
  {
    id: 'eclipse',
    title: 'Radio Telescope Thesis',
    categories: ['Optics', 'Data Collection', 'MatLab', 'SolidWorks'],
    description: 'Designed optical geometry and sensor configuration for a low-cost radio telescope with the intention of capturing spacial eclipse data through cloud cover.',
    technologies: ['Optics', 'Data Collection', 'MatLab', 'SolidWorks'],
    imageUrl: './radiotele.jpg',
    hoverImageUrl: './radiotele.jpg'
  },
    {
    id: 'headband',
    title: '3D Printed Covid Faceshields',
    categories: ['SolidWorks', 'Fabrication', 'Additive Manufacturing'],
    description: 'Designed, fabricated, and donated 200+ 3D printed faceshields for local hospital staff during Covid-19 shortages.',
    technologies: ['SolidWorks', 'Fabrication', 'Additive Manufacturing'],
    imageUrl: './headband.jpg',
    hoverImageUrl: './headband.jpg'
  },
  {
    id: 'OutreachAI',
    title: 'Agentic AI BD Tools',
    categories: ['Agentic AI', 'Python', 'REST API'],
    description: 'Created an internal-facing Agentic AI tool to improve the quality of client outreach.',
    technologies: ['Agentic AI', 'Python', 'REST API'],
    imageUrl: './headband.jpg',
    hoverImageUrl: './headband.jpg'
  },
  {
    id: 'adcs',
    title: 'Satellite Attitude Controller',
    categories: ['Python', 'C'],
    description: 'Developed firmware and hardware for a "1U" CubeSat reaction-wheel control system, implementing PID control logic for precise orientation stability.',
    technologies: ['Python', 'C', 'Control Systems', 'Hardware'],
    imageUrl: './attitudecontrol.jpg',
    hoverImageUrl: './attitudecontrol.jpg'
  },
  {
    id: 'photoHistory',
    title: 'Educational Photo Display',
    categories: ['Python', 'AI', 'REST API'],
    description: 'Created an application that leverages metadata and AI tools to create interesting and informative electronic postcards.',
    technologies: ['Python', 'AI', 'REST API'],
    imageUrl: './attitudecontrol.jpg',
    hoverImageUrl: './attitudecontrol.jpg'
  }
];
