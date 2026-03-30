export const defaultProjects = [
  {
    title: "FoodShare",
    description: "A scalable and community-driven food donation and distribution platform that connects donors, volunteers, and recipients to reduce food waste and hunger.",
    image: "/Project_Images/FoodShare2.png",
    technologies: ["React", "Tailwind", "MongoDB", "Express", "Socket.io"],
    githubLink: "https://github.com/yonatan1611/FoodShare",
    liveLink: "https://pinquest-app.onrender.com/",
    category: "Full Stack",
    featured: true,
    order: 1
  },
  {
    title: "Fere Inventory",
    description: "A comprehensive inventory management system built with modern web technologies to help businesses track and manage their products efficiently.",
    image: "/Project_Images/inventory.png",
    technologies: ["React", "TailwindCSS", "Node.js", "PostgreSQL", "JWT"],
    githubLink: "https://github.com/yonatan1611/inventory-system",
    liveLink: "",
    category: "Full Stack",
    featured: true,
    order: 2
  },
  {
    title: "Saas-Dashboard",
    description: "SaaS dashboard built with React, TypeScript, Tailwind, Framer Motion, Recharts, and Zustand.",
    image: "/Project_Images/Saas.png",
    technologies: ["React", "Vite", "Tailwind", "TypeScript", "Framer Motion"],
    githubLink: "https://github.com/yonatan1611/saas-dashboard",
    liveLink: "https://saas-dashboard-beta.vercel.app/",
    category: "Frontend",
    featured: true,
    order: 3
  },
  {
    title: "Case Craft",
    description: "Case Craft is a cinematic, motion‑forward case‑study experience customized for Asteria Health. The interface focuses on storytelling clarity, immersive visuals, and patient‑first impact narratives.",
    image: "/Project_Images/Case.png",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    githubLink: "https://github.com/yonatan1611/CaseCraft",
    liveLink: "https://case-craft-dusky.vercel.app/",
    category: "Frontend",
    featured: true,
    order: 4
  },
];

export const defaultSkills = [
  { name: "JavaScript (ES6+)", category: "Languages", proficiency: 92, order: 1 },
  { name: "TypeScript", category: "Languages", proficiency: 85, order: 2 },
  { name: "React.js", category: "Frontend", proficiency: 95, order: 3 },
  { name: "Next.js", category: "Frontend", proficiency: 88, order: 4 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 90, order: 5 },
  { name: "Node.js", category: "Backend", proficiency: 88, order: 6 },
  { name: "Express.js", category: "Backend", proficiency: 85, order: 7 },
  { name: "MongoDB", category: "Database", proficiency: 90, order: 8 },
  { name: "PostgreSQL", category: "Database", proficiency: 85, order: 9 },
  { name: "REST APIs", category: "Backend", proficiency: 90, order: 10 },
  { name: "Git & GitHub", category: "Tools", proficiency: 92, order: 11 },
  { name: "Figma", category: "Tools", proficiency: 80, order: 12 }
];

export const defaultExperiences = [
  {
    company: "Freelance",
    position: "Full Stack Software Engineer",
    startDate: "2022-01-01",
    current: true,
    description: "Designing and building full-stack web applications with a focus on real-world problem solving and performance.",
    responsibilities: [
      "Built and deployed full-stack applications including a food sharing platform and a movie ticket booking system using the MERN stack.",
      "Designed RESTful APIs and implemented authentication systems using JWT for secure user access.",
      "Optimized frontend performance and state management, improving user experience and reducing load times.",
      "Developed responsive and user-friendly interfaces using React and Tailwind CSS."
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "TypeScript", "JWT"],
    location: "Remote",
    type: "Freelance"
  },
  {
    company: "Prodigy InfoTech",
    position: "Software Developer Intern",
    startDate: "2024-10-01",
    current: false,
    description: "Worked on modern frontend development and contributed to scalable web applications in a collaborative environment.",
    responsibilities: [
      "Developed reusable React components and improved UI consistency across projects.",
      "Enhanced application performance through better state handling and rendering optimization.",
      "Collaborated with team members using Git-based workflows in an agile setup."
    ],
    technologies: ["React.js", "Tailwind CSS", "JavaScript"],
    location: "Remote",
    type: "Internship"
  }, 
    {
    company: "Soleni Construction",
    position: "Software Developer Intern",
    startDate: "2020-10-01",
    current: false,
    description: "Worked on modern frontend development and contributed to scalable web applications in a collaborative environment.",
    responsibilities: [
      "Ensure user satisfaction and retention by providing responsive tech support.",
      "Build and maintain software documentation sites using various programming languages.",
      "Increase productivity by using software to organize, track bug patches and add feature requests.",
      "Collaborate with other developers to update the website and create new features."
    ],
    technologies: ["React.js", "Tailwind CSS", "JavaScript"],
    location: "OnSite",
    type: "Internship"
  }
];