export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  features: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  images: {
    url: string;
    caption: string;
  }[];
  organization: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "ai-ml" | "frontend" | "backend" | "databases" | "tools";
  iconName: string; // corresponding Lucide icon name or tool label
  logoUrl?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  iconName: string;
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
