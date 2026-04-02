export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  idea: string;
  execution: string;
  link: string;
  color: string;
  image: string;
}