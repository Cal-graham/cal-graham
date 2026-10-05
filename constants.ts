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
    role: 'Consultant',
    company: 'Stroud International',
    location: 'North America & Europe',
    period: '2023 - Present',
    description: [
      {
        text: 'Owned on-site delivery of projects across North America and Europe, leading client teams and direct reports to deliver solutions to high-value challenges such as:',
        subItems: [
          'Restructured a client’s improvement portfolio to more than double its original value, including €5M in waste reductions that correspond to 300 tonnes of CO₂e.',
          'Built a roadmap to scale operations with 2.5x organic revenue growth over 5 years, addressing operational challenges and saving $1.8M/yr in improved efficiencies.',
          'Identified $8.2M of raw material waste within a commercial food packer.',
          'Pinpointed a previously unknown phenomenon in a decades-old process causing 10% of waste at a highly regulated medical manufacturing site.'
        ]
      },
      {
        text: 'As Global Tech Lead, enacted improvements to accounting, cybersecurity and cloud services, designed and maintained financial dashboards, and developed custom software tools, such as:',
        subItems: [
          'Created a cloud training pipeline (PatchCore) for anomaly detection in industrial settings, enabling improvement teams to target low-frequency downtime events.',
          'Deployed AI-based research tools (an agentic pipeline and a RAG interface) to support business development through network mapping, lead selection and outreach generation.'
        ]
      },
      'Proposed and carried out a Carbon Accounting scope, using the GHG Protocol to understand client impact.'
    ]
  },
  {
    id: 'viavi',
    role: 'Optical Engineer',
    company: 'VIAVI Solutions',
    period: '2021 - 2022',
    description: [
      'Designed and carried out test programs, turning experimental results into client outcomes.',
      'Developed an internal logistics app (Python/Django/Flask) used by 10-20 R&D engineers, saving ~5% of internal R&D engineering time.'
    ]
  },
  {
    id: 'queens-work',
    role: 'Faculty Support',
    company: "Queen's University",
    period: '2018 - 2023',
    description: [
      'Multiple positions: Carbon Neutral Café, Engineering Course Development and Laboratory Technician.'
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
    period: '2018 - 2023',
    details: [
      'Led a team of 5 engineers in the end-to-end development and launch of an ADCS payload on a CSA stratospheric balloon.',
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
    items: ["Python", "Flask", "Agentic AI & LLM Tooling", "Claude Code", "Computer Vision (PatchCore)", "Google Cloud (GCP)", "MATLAB/Simulink", "C / Embedded C", "JavaScript", "Git", "IoT", "MQTT", "ESP8266"]
  },
  {
    category: "Operations & Consulting",
    items: ["Lean / Six Sigma", "Process Mapping", "Carbon Accounting", "Data Analysis", "Power BI", "Microsoft 365", "Google Workspace"]
  },
  {
    category: "Engineering & Design",
    items: ["SolidWorks", "3D Printing", "Optical Engineering", "Control Theory"]
  },
  {
    category: "Languages",
    items: ["English (Native)", "French (Intermediate)", "German (Intermediate)", "Mandarin Chinese (Intermediate)"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'OutreachAI',
    title: 'Agentic AI Tools',
    categories: ['Agentic AI', 'RAG', 'Python', 'Google Cloud Platform', 'Tavily API'],
    description: 'Built AI research tools that automated one of the largest time-sinks in our business development pipeline. An agentic pipeline on Google Cloud Platform uses web research tools such as the Tavily API for network mapping and lead selection, and a RAG interface helps generate outreach, replacing discovery work that was previously done by hand.',
    technologies: ['Software'],
    imageUrl: './outreach-app.jpg',
    hoverImageUrl: './outreach-app.jpg',
    videoUrl: './outreach-app.mp4'
  },
  {
    id: 'patchcore',
    title: 'Downtime Detection (PatchCore)',
    categories: ['Computer Vision', 'Anomaly Detection', 'PatchCore', 'Python', 'Cloud ML Pipelines'],
    description: 'Built an unsupervised cloud training pipeline for a PatchCore anomaly-detection model that recognizes, highlights and categorizes downtime events on manufacturing lines. Because it needs no labelled data, improvement teams can target rare, low-frequency downtime events that are hard to catch by hand.',
    technologies: ['Software', 'AI'],
    imageUrl: './patchcore.png',
    hoverImageUrl: './patchcore.png'
  },
  {
    id: 'travel',
    title: 'Travel & Expense Automation',
    categories: ['Gemini API', 'OCR', 'Gmail & Calendar APIs', 'Cloud Run & Pub/Sub', 'Firestore', 'Zoho Expense API', 'Slack Bot'],
    description: 'A two-part system that takes the admin out of business travel. The first service watches each user\'s Gmail through Pub/Sub and uses Gemini with structured schemas to extract flight, hotel, train and car-rental confirmations. It matches updates to existing trips by vendor and confirmation code, so changes and cancellations flow straight through to their Google Calendar, and a Slack bot answers travel questions and sends weekly digests. Chargeable bookings are handed to the second app, which files them in Zoho Expense and uses Gemini Vision OCR to match scanned bank-statement transactions to each expense, recording the amount actually charged with the receipt attached.',
    technologies: ['Software', 'AI'],
    imageUrl: './transactions.png',
    hoverImageUrl: './transactions.png'
  },
  {
    id: 'adcs',
    title: 'Satellite Attitude Controller',
    categories: ['Python', 'C', 'MATLAB', 'Simulink', 'PID Control', 'SolidWorks', 'Additive Manufacturing', 'Hardware Design'],
    description: 'Five years on Queen\'s Space Engineering Team (QSET): first as a team member, then leading the five-engineer Attitude Determination and Control (ADCS) subteam, and finally as technical advisor. As lead, my subteam designed and built an ADCS payload that flew on a stratospheric balloon later that year. The work included firmware and a 3D-printed single-axis testbench for a 1U CubeSat reaction wheel, with PID control validated in MATLAB/Simulink simulations.',
    technologies: ['Software', 'Control Systems', 'Hardware', 'Simulation', 'CAD'],
    imageUrl: './attitudecontrol.png',
    hoverImageUrl: './attitudecontrol.png',
    videoUrl: './adcs-testbench.mp4'
  },
  {
    id: 'geophoto',
    title: 'GeoPhoto Explorer',
    categories: ['React', 'Leaflet', 'Gemini API', 'Adobe Lightroom API', 'Firebase'],
    description: 'A web app that maps my travel photography. It reads GPS coordinates from each photo\'s EXIF data, syncs albums from Adobe Lightroom (OAuth with PKCE) and plots them on a Leaflet world map. Google Gemini, called through Firebase AI Logic, writes a short history fact for each location using Google Search data based on location and photo content tags.',
    technologies: ['Software', 'AI'],
    imageUrl: './travel-map.jpg',
    hoverImageUrl: './travel-map.jpg',
    videoUrl: './travel-map.mp4',
    link: 'https://decisive-mapper-306615.web.app/'
  },
  {
    id: 'eclipse',
    title: 'Radio Telescope Thesis',
    categories: ['Radio Astronomy', 'Optical Design', 'MATLAB', 'Python', 'SolidWorks', 'Research'],
    description: 'Undergraduate thesis: designed a low-cost radio telescope to observe a solar eclipse through cloud cover. The design fits a 9-pixel receiver array into a 2 m Cassegrain dish, with enough dynamic range to pierce cloud cover and resolve each stage of the eclipse. Built simulations to compare how design choices affected dynamic range across use cases.',
    technologies: ['Optics', 'CAD', 'Simulation'],
    imageUrl: './radiotele.png',
    hoverImageUrl: './radiotele.png'
  },
  {
    id: 'VIAVIapp',
    title: 'Lab Organizer',
    categories: ['Python', 'Flask', 'User-Oriented Design', 'Networked Computing'],
    description: 'Built a cloud-based tool to organize and track customer and internal samples in VIAVI\'s optical telecom R&D lab. It passively scanned the lab network to keep each sample\'s location and last use up to date. Used by 10-20 engineers on the R&D team, it reclaimed about 5% of their engineering time.',
    technologies: ['Software'],
    imageUrl: './VIAVIcats.jpg',
    hoverImageUrl: './VIAVIcats.jpg'
  },
  {
    id: 'headband',
    title: 'COVID-19 Face Shields',
    categories: ['SolidWorks', 'SketchUp', 'Additive Manufacturing', 'User-Oriented Design'],
    description: 'During early COVID-19 shortages, designed, 3D-printed and donated 200+ face shields to hospital staff in Port Perry and Burlington, all within a month.',
    technologies: ['CAD', 'Fabrication'],
    imageUrl: './headband.jpg',
    hoverImageUrl: './headband.jpg'
  },
  {
    id: 'espresso',
    title: 'IoT Espresso Machine',
    categories: ['IoT', 'Raspberry Pi', 'ESP8266', 'Python', 'Flask', 'Sensors', 'Data Analysis'],
    description: 'Built a real-time sensor system into an espresso machine: a Raspberry Pi reads boiler pressure, group-head and boiler temperature, and group-head flow through two ADS1115 ADCs, with acquisition and smoothing on separate threads. A Python (Flask) web app plots the live data against brew profiles, such as a light-roast pressure ramp, for precise brew control. A later version moved the sensors onto ESP8266 boards that stream readings to the Pi.',
    technologies: ['Software', 'IoT', 'Hardware'],
    imageUrl: './beans.1.png',
    hoverImageUrl: './beans.1.png'
  },
  {
    id: 'climbing',
    title: 'Adjustable Climbing Wall',
    categories: ['SolidWorks', '3D Printing', 'Additive Manufacturing'],
    description: 'Designed and built a 300 sq ft climbing wall with an adjustable angle. Modelled the structure in SolidWorks, then designed and 3D-printed about 100 custom holds over roughly three months.',
    technologies: ['Fabrication', 'CAD'],
    imageUrl: './climbing wall.jpg',
    hoverImageUrl: './climbing wall.jpg'
  },
  {
    id: 'printer',
    title: 'Networked 3D Printer Controller',
    categories: ['Raspberry Pi', 'OctoPrint', 'Python', 'IoT', 'Sensors', 'Additive Manufacturing'],
    description: 'Turned a Raspberry Pi running a customized OctoPrint server into a networked controller for my 3D printer. It handles remote file upload, print job control and webcam monitoring, with temperature and humidity sensors to keep prints reliable.',
    technologies: ['Software', 'Hardware', 'IoT'],
    imageUrl: './3dprinter.jpg',
    hoverImageUrl: './3dprinter.jpg'
  },
  {
    id: 'mqttlights',
    title: 'MQTT Synchronous Lights',
    categories: ['ESP8266', 'MQTT', 'HiveMQ', 'C', 'Sensors', 'Networked Computing'],
    description: 'Built an MQTT publish/subscribe system on HiveMQ that keeps two sets of lights on separate ESP8266 boards in sync within a few seconds. Each set is controlled by my own RLC circuit acting as a capacitive sensor.',
    technologies: ['Hardware', 'IoT', 'Software'],
    imageUrl: './ESP8266.jpg',
    hoverImageUrl: './ESP8266.jpg'
  },
  {
    id: 'camera',
    title: 'Camera Repair & Lens Adapters',
    categories: ['SolidWorks', 'Optics', 'Hardware Diagnosis', 'Reclamation', 'Additive Manufacturing'],
    description: 'Reverse-engineered and repaired digital camera mechanisms, and designed 3D-printed adapters to mount Nikon, Canon and Sony film lenses on a Sony E-mount body. Most of my photography is shot this way; see examples on my travel photo site.',
    technologies: ['CAD', 'Optics', 'Hardware'],
    imageUrl: './adaptor.jpg',
    hoverImageUrl: './adaptor.jpg',
    link: 'https://decisive-mapper-306615.web.app/',
    linkLabel: 'See the photos'
  }
];
