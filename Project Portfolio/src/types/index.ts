export type TechStack = 
  | 'React'
  | 'TypeScript'
  | 'JavaScript'
  | 'HTML'
  | 'CSS'
  | 'Sass'
  | 'MUI'
  | 'Tailwind'
  | 'Bootstrap'
  | 'Redux'
  | 'Git'
  | 'GitHub'
  | 'Node.js'
  | 'Express'
  | 'MongoDB'

export type Skill = {
  name: string;
  level: number; // 0-100
  color: string;
};

export type FrontendProject = {
  id: string;
  title: string;
  description: string;
  techStack: TechStack[];
  liveDemoUrl: string;
  githubUrl: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  screenshots: string[];
  thumbnail: string;
  featured: boolean;
};

export type Theme = 'light' | 'dark';