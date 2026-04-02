import { Project } from "@/types/types";

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "EaziWage",
    category: "Fintech",
    description: "Reimagining payroll for the African workforce.",
    challenge: "Payroll systems in emerging markets are fragmented and manual.",
    idea: "A unified, mobile-first dashboard that automates meaningful disbursements.",
    execution: "Built with Next.js and Supabase for real-time processing.",
    link: "https://eaziwage.com",
    color: "from-blue-900/20 to-indigo-900/20",
    image: '/eaziwage.png'
  },
  {
    id: "02",
    title: "Splyt",
    category: "E-Commerce",
    description: "A showcase of milk products.",
    challenge: "Standard e-commerce templates lack soul and narrative.",
    idea: "Treating products as art pieces with immersive storytelling.",
    execution: "GSAP Scrolltrigger and cinematic transition states.",
    link: "#",
    color: "from-purple-900/20 to-fuchsia-900/20",
    image: '/splyt.png'
  },
  {
    id: "03",
    title: "SkillsConnect",
    category: "Experimental",
    description: "A platform for connecting skills and opportunities.",
    challenge: "Too many platforms exist but none connect skills to real opportunities.",
    idea: "An open hub for opportunities.",
    execution: "Built with Next.js and Supabase for real-time processing.",
    link: "#",
    color: "from-emerald-900/20 to-teal-900/20",
    image: '/skills.png'
  }
];
