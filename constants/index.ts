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
    title: "SSD Expert Zone",
    category: "E-Commerce",
    description: "An Amazon affiliate website for purchasing SSDs.",
    challenge: "The SSD market is saturated, making it hard for users to find the right product.",
    idea: "A visually rich experience that guides users through the SSD selection process.",
    execution: "Unify a simple yet effective design with a robust backend for product recommendations.",
    link: "https://ssdexpertzone.com",
    color: "from-purple-900/20 to-fuchsia-900/20",
    image: '/ssdexpertzone.png'
  },
  {
    id: "03",
    title: "Inuka 034 Initiative",
    category: "Non-governmental Organization",
    description: "A holistic community driven platform for the residents of Kajiado County.",
    challenge: "Limited access to information and resources for community members.",
    idea: "A community-driven platform that connects residents with available resources and opportunities.",
    execution: "Rich content to engage the community and provide valuable information.",
    link: "https://inukainitiative.org",
    color: "from-emerald-900/20 to-teal-900/20",
    image: '/inuka.png'
  }
];
