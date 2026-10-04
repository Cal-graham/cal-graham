import { ExperienceItem, EducationItem, ProjectItem, SkillCategory, VolunteerItem } from './types';

export const SOCIAL_LINKS = {
  email: "17ceg5@queensu.ca",
  linkedin: "https://linkedin.com/in/calum-graham",
  github: "https://github.com/cal-graham",
  photos: "https://decisive-mapper-306615.web.app/",
  portfolio: "https://cal-graham.github.io/cal-graham"
};

export const ABOUT_TEXT = `I am an early-career professional who's passionate about new technologies, sustainable outcomes, and operational improvement. Leveraging my Engineering Physics background, I work as an Operations Consultant - bridging the gap between complex industrial processes and bottom line operations impact.

Currently based in Toronto, with experience across the EU and North America, my work has been to find hidden inefficiencies and turn them into multi-million dollar improvements. In addition to technical industrial processes, I get to exercise my interest in new technologies internally - managing IT for my organization and developing AI-enabled software tools for internal business and clients.

When I’m not running operational improvement projects you’ll find me rock climbing, hobbying with new tech, or travelling and taking photos.`;

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
    items: ["Python", "Flask", "Agentic AI & LLM Tooling", "Google Cloud (GCP)", "MATLAB/Simulink", "C / Embedded C", "JavaScript", "Git", "IoT", "MQTT", "ESP8266"]
  },
  {
    category: "Operations & Consulting",
    items: ["Lean / Six Sigma", "Process Mapping", "Carbon Accounting", "Data Analysis"]
  },
  {
    category: "Engineering & Design",
    items: ["SolidWorks", "3D Printing", "Optical Engineering", "Control Theory"]
  },
  {
    category: "Languages",
    items: ["English (Fluent)", "French (Intermediate)", "German (Intermediate)", "Mandarin Chinese (Intermediate)"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'OutreachAI',
    title: 'Agentic AI Tools',
    categories: ['Agentic AI', 'Python', 'REST API', 'Google Cloud Computing', 'Value-Driven Design'],
    description: 'Created an internal-facing Agentic AI tool to improve the quality of client outreach. The tool runs on GCP (Google Cloud Compute), using AgenticAI to leverage tools such as TavilyAPI, automating a large portion of the client discovery process.',
    technologies: ['Software'],
    imageUrl: './OutreachAI.jpg',
    hoverImageUrl: './OutreachAI.jpg'
  },
  {
    id: 'adcs',
    title: 'Satellite Attitude Controller',
    categories: ['Python', 'C', 'MATLAB', 'Simulink', 'PID Control', 'SolidWorks', 'Additive Manufacturing', 'Hardware Design'],
    description: 'Developed firmware and testbench hardware for a "1U" CubeSat reaction-wheel control system, implementing PID control logic for precise orientation stability. This includes Simulink and MATLAB simulations and a 3D printed testbench with computational and electrical hardware required to run and test PID control systems in a single axis.',
    technologies: ['Software', 'Control Systems', 'Hardware', 'Simulation', 'CAD'],
    imageUrl: './attitudecontrol.png',
    hoverImageUrl: './attitudecontrol.png',
    videoUrl: './adcs-testbench.mp4'
  },
  {
    id: 'geophoto',
    title: 'GeoPhoto Explorer',
    categories: ['Web App', 'Gemini API', 'Adobe Lightroom API', 'Interactive Maps', 'Firebase Hosting'],
    description: 'A web app that plots my geotagged travel photography on an interactive world map. Albums sync automatically from Adobe Lightroom, and each photo is paired with an AI-generated history fact about its location using Google Gemini. A screensaver mode flies between locations around the map.',
    technologies: ['Software', 'AI'],
    imageUrl: './travel-map.jpg',
    hoverImageUrl: './travel-map.jpg',
    videoUrl: './travel-map.mp4',
    link: 'https://decisive-mapper-306615.web.app/'
  },
  {
    id: 'eclipse',
    title: 'Radio Telescope Thesis',
    categories: ['Optical Design', 'MATLAB', 'Python', 'SolidWorks', 'Research'],
    description: 'Designed optical geometry and sensor configuration for a low-cost radio telescope with the intention of capturing spatial eclipse data through cloud cover. Created simulation to understand effective dynamic range given different design choices and use-cases.',
    technologies: ['Optics', 'CAD', 'Simulation'],
    imageUrl: './radiotele.png',
    hoverImageUrl: './radiotele.png'
  },
  {
    id: 'VIAVIapp',
    title: 'Lab Organizer',
    categories: ['Python-Flask', 'User-Oriented Design', 'Networked Computing'],
    description: 'Created an internal-facing tool to automate organization and tracking of customer and internal samples in Optical Telecom R&D laboratory. The tool passively scanned the lab network to locate and maintain last-known use for all samples.',
    technologies: ['Software'],
    imageUrl: './VIAVIcats.jpg',
    hoverImageUrl: './VIAVIcats.jpg'
  },
  {
    id: 'headband',
    title: 'Volunteering - Face Shields',
    categories: ['SolidWorks', 'SketchUp', 'Additive Manufacturing', 'User-Oriented Design'],
    description: 'Designed, fabricated, and donated 200+ 3D printed face shields for local hospital staff during Covid-19 shortages.',
    technologies: ['CAD', 'Fabrication'],
    imageUrl: './headband.jpg',
    hoverImageUrl: './headband.jpg'
  },
  {
    id: 'espresso',
    title: 'IoT Espresso Machine',
    categories: ['IoT', 'Python-Flask', 'Data Analysis', 'Sensors', 'Networked Computing'],
    description: 'Engineered a real-time sensor array integrated into an espresso machine. Developed a network interface in Python (Flask) to stream pressure telemetry for precise brew control.',
    technologies: ['Software', 'IoT', 'Hardware'],
    imageUrl: './profile.png',
    hoverImageUrl: './profile.png'
  },
  {
    id: 'climbing',
    title: 'Adjustable Climbing Wall',
    categories: ['SolidWorks', '3D-Printing', 'Additive Manufacturing'],
    description: 'Designed and fabricated a 300 sq ft adjustable climbing wall. Utilized SolidWorks for structural modeling and 3D printing for custom holds manufacturing.',
    technologies: ['Fabrication', 'CAD'],
    imageUrl: './climbing wall.jpg',
    hoverImageUrl: './climbing wall.jpg'
  },
  {
    id: 'printer',
    title: 'Networked 3D Printer Controller',
    categories: ['Python', 'HTML', 'CSS', 'IoT', 'Networking', 'Additive Manufacturing'],
    description: 'Deployed and customized an Octoprint-based server for remote 3D printer management. Integrated custom electronics and server logic to enhance print reliability.',
    technologies: ['Software', 'Hardware', 'IoT'],
    imageUrl: './3dprinter.jpg',
    hoverImageUrl: './3dprinter.jpg'
  },
  {
    id: 'mqttlights',
    title: 'MQTT Synchronous Lights',
    categories: ['ESP8266', 'IoT-HiveMQ', 'C', 'Sensors', 'Networked Computing'],
    description: 'Used HiveMQ to create an example MQTT Pub/Sub system to synchronize 2 sets of lights using ESP8266 boards. Created my own RLC circuit functioning as capacitive sensors to control the lights.',
    technologies: ['Hardware', 'IoT', 'Software'],
    imageUrl: './ESP8266.jpg',
    hoverImageUrl: './ESP8266.jpg'
  },
  {
    id: 'camera',
    title: 'Camera Repair',
    categories: ['SolidWorks', 'Optics', 'Hardware-diagnosis', 'Reclamation', 'Additive Manufacturing'],
    description: 'Reverse-engineered and repaired digital camera mechanisms. Designed 3D-printed adaptors to interface vintage film lenses with modern digital bodies.',
    technologies: ['CAD', 'Optics', 'Hardware'],
    imageUrl: './adaptor.jpg',
    hoverImageUrl: './adaptor.jpg'
  }
];
