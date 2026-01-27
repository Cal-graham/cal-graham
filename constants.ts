import { ExperienceItem, EducationItem, ProjectItem, SkillCategory, VolunteerItem } from './types';

export const SOCIAL_LINKS = {
  email: "c.graham@stroudinternational.com",
  linkedin: "https://linkedin.com/in/calum-graham",
  github: "https://github.com/cal-graham",
  portfolio: "https://cal-graham.io"
};

export const ABOUT_TEXT = `I bridge the gap between technical engineering and high-level operations strategy. With a foundation in Engineering Physics and a track record in international consulting, I specialize in identifying inefficiencies and driving multi-million dollar improvements in industrial processes. Based in London (UK) with project experience across the EU and North America, I am driven by a commitment to sustainable efficiency—using data, physics, and technology to reduce waste and optimize performance. Outside of work, I am an avid rock climber, photographer, and coffee enthusiast.`;

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
    title: 'IoT Telemetry Espresso Machine',
    categories: ['IoT', 'Python'],
    description: 'Engineered a real-time sensor array integrated into an espresso machine. Developed a Raspberry Pi network interface (B.E.A.N.S.) to stream pressure telemetry for precise brew control.',
    technologies: ['Python', 'IoT', 'Raspberry Pi', 'Sensors'],
    imageUrl: './profile.png',
    hoverImageUrl: './profile.png'
  },
  {
    id: 'climbing',
    title: 'Adjustable Climbing Wall',
    categories: ['Design', 'Fabrication'],
    description: 'Designed and fabricated a 300 sq ft adjustable climbing wall. Utilized SolidWorks for structural modeling and 3D printing for custom ergonomic hold manufacturing.',
    technologies: ['SolidWorks', '3D Printing', 'Fabrication'],
    imageUrl: './climbing wall.jpg',
    hoverImageUrl: './climbing wall.jpg'
  },
  {
    id: 'printer',
    title: 'Networked 3D Printer Controller',
    categories: ['Python', 'HTML'],
    description: 'Deployed and customized an Octoprint-based server for remote 3D printer management. Integrated custom electronics and server logic to enhance print reliability.',
    technologies: ['Python', 'HTML', 'Octoprint', 'Hardware'],
    imageUrl: './3dprinter.jpg',
    hoverImageUrl: './3dprinter.jpg'
  },
  {
    id: 'mqttlights',
    title: 'MQTT Synchronous Lights',
    categories: ['Fabrication', 'IoT', 'C'],
    description: 'Used HiveMQ to create an example MQTT Pub/Sub system to synchronize 2 sets of lights using ESP8266 boards.',
    technologies: ['Fabrication', 'IoT', 'C'],
    imageUrl: './ESP8266.jpg',
    hoverImageUrl: './ESP8266.jpg'
  },
  {
    id: 'camera',
    title: 'Camera Repair & Lens Adaptors',
    categories: ['Design'],
    description: 'Reverse-engineered and repaired digital camera mechanisms. Designed 3D-printed adaptors to interface vintage film lenses with modern digital bodies.',
    technologies: ['CAD', 'Repair', 'Optics'],
    imageUrl: './adaptor.jpg',
    hoverImageUrl: './adaptor.jpg'
  },
  {
    id: 'eclipse',
    title: 'Radio Telescope Array',
    categories: ['Optics', 'Sensors'],
    description: 'Designed optical geometry and sensor configuration for a low-cost radio telescope, successfully capturing data during the 2024 solar eclipse.',
    technologies: ['Optics', 'Sensors', 'Data Collection'],
    imageUrl: './radiotele.jpg',
    hoverImageUrl: './radiotele.jpg'
  },
    {
    id: 'headband',
    title: '3D Printed Covid Faceshields',
    categories: ['Design', 'Fabrication', 'Additive Manufacturing'],
    description: 'Designed, fabricated, and donated 3D printed faceshields for local hospital staff during Covid-19 shortages.',
    technologies: ['Design', 'Fabrication', 'Additive Manufacturing'],
    imageUrl: './headband.jpg',
    hoverImageUrl: './headband.jpg'
  },
  {
    id: 'OutreachAI',
    title: 'Internal Agentic AI Tools',
    categories: ['Agentic AI', 'Python', 'REST API'],
    description: 'Created an internal-facing Agentic AI tool to speed up and improve the rate at which potential clients are targeted .',
    technologies: ['AgenticAI', 'Python', 'REST API'],
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
  }
];