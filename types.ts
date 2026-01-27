export type DescriptionPoint = string | { text: string; subItems: string[] };

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: DescriptionPoint[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  categories: string[];
  description: string;
  technologies: string[];
  imageUrl: string;
  hoverImageUrl?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  details: string[];
}

export type NodeType = 'project' | 'skill';

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface GraphNode extends Point3D {
  id: string;
  type: NodeType;
  text: string;
  img?: string;
  relatedIds: string[];
}

export interface GraphLink {
  source: string;
  target: string;
}