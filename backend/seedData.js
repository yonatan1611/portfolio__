import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';
import Setting from './models/Setting.js';
import Service from './models/Service.js';
import User from './models/User.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-admin');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

const servicesData = [
  {
    title: "Full-Stack Web Development",
    blurb: "Building complete, scalable web applications from front to back.",
    details: "I deliver end-to-end solutions, seamlessly integrating robust backends with dynamic frontends using modern frameworks like React, Next.js, and Node.js.",
    tags: ["React", "Node.js", "Next.js", "Full-Stack"],
    iconName: "CommandLineIcon",
    order: 1
  },
  {
    title: "Frontend Development",
    blurb: "Crafting beautiful, responsive, and interactive user interfaces.",
    details: "I specialize in creating pixel-perfect, accessible, and high-performance UIs that provide delightful user experiences across all devices.",
    tags: ["React", "Tailwind CSS", "JavaScript", "UI/UX"],
    iconName: "PaintBrushIcon",
    order: 2
  },
  {
    title: "Backend Development & APIs",
    blurb: "Architecting secure and efficient server-side logic and APIs.",
    details: "I design and build scalable RESTful and GraphQL APIs, ensuring meaningful data exchange, security, and high availability for your applications.",
    tags: ["Node.js", "Express", "GraphQL", "REST"],
    iconName: "ServerIcon",
    order: 3
  },
  {
    title: "Mobile App Development",
    blurb: "Building cross-platform mobile experiences with React Native.",
    details: "I develop high-quality, performant mobile applications for iOS and Android, ensuring consistent branding and functionality across all platforms.",
    tags: ["React Native", "Expo", "Mobile", "UI/UX"],
    iconName: "DevicePhoneMobileIcon",
    order: 4
  },
  {
    title: "Database Design & Management",
    blurb: "Organizing your data for speed, reliability, and scalability.",
    details: "I implement efficient database schemas and management strategies using SQL and NoSQL technologies like PostgreSQL, MySQL, and MongoDB.",
    tags: ["SQL", "NoSQL", "MongoDB", "PostgreSQL"],
    iconName: "CircleStackIcon",
    order: 5
  },
  {
    title: "UI/UX Design & Prototyping",
    blurb: "Designing high-fidelity prototypes and user-centric interfaces.",
    details: "I focus on user psychology and modern design principles to create interfaces that are not only beautiful but also intuitive and functional.",
    tags: ["Figma", "UI/UX", "Prototyping", "A/B Testing"],
    iconName: "BeakerIcon",
    order: 6
  },
  {
    title: "Authentication & Authorization",
    blurb: "Securing your applications with robust user management systems.",
    details: "I implement secure login flows, role-based access control, and protect sensitive data using industry standards like OAuth, JWT, and Auth0.",
    tags: ["OAuth", "JWT", "Security", "Auth0"],
    iconName: "LockClosedIcon",
    order: 7
  },
  {
    title: "Performance Optimization",
    blurb: "Speeding up your web apps for better engagement and SEO.",
    details: "I analyze and optimize code, assets, and delivery pipelines to achieve lightning-fast load times and smooth interactions.",
    tags: ["Web Vitals", "Optimization", "Speed", "SEO"],
    iconName: "RocketLaunchIcon",
    order: 8
  },
  {
    title: "Maintenance & Feature Enhancements",
    blurb: "Keeping your digital products up-to-date and evolving.",
    details: "I provide ongoing support, bug fixes, and feature additions to ensure your application remains modern, secure, and competitive.",
    tags: ["Support", "Refactoring", "Updates", "CI/CD"],
    iconName: "WrenchScrewdriverIcon",
    order: 9
  },
  {
    title: "Responsive & Cross-Browser Design",
    blurb: "Ensuring your site looks perfect on every screen and browser.",
    details: "I utilize responsive design principles and testing strategies to guarantee a consistent and high-quality experience for all users, regardless of their device.",
    tags: ["Responsive", "Mobile-First", "CSS", "Testing"],
    iconName: "ComputerDesktopIcon",
    order: 10
  }
];

const settingsData = {
  hero: {
    role: "Full Stack Software Engineer",
    welcomeText: "Hello I'm",
    name: "Yonatan Girmachew",
    bio: "Full Stack Software Engineer specializing in modern web technologies. I build scalable web applications, design efficient backend systems, and create clean, responsive user interfaces that solve real-world problems.",
    stats: [
      { value: "3+", label1: "Years of", label2: "Development" },
      { value: "10+", label1: "Projects", label2: "Completed" },
      { value: "15+", label1: "Technologies", label2: "Used" },
      { value: "500+", label1: "Code", label2: "Commits" }
    ]
  },

  about: {
    codeBlock: {
      firstName: "Yonatan",
      lastName: "Girmachew",
      role: "Full Stack Software Engineer",
      traits: ["Problem Solver", "Reliable", "Continuous Learner"],
      bioLines: [
        "I build modern web applications",
        "that are scalable, efficient,",
        "and designed to solve real problems."
      ]
    },
    title: "Engineering Solutions",
    subtitle: "Through Code & Innovation.",
    paragraphs: [
      "I'm a Full Stack Software Engineer focused on building high-quality web applications using modern development tools and frameworks. I enjoy working across the entire stack — from designing intuitive user interfaces to developing robust backend systems.",
      "My goal is to create software that is efficient, scalable, and maintainable while delivering meaningful solutions for users and businesses."
    ]
  },

  site: {
    logoText: "Yonatan",
    resumeLink: "/resume/CV.pdf",
    profileImage: "/assets/profile-image/profile-image.png"
  },

  socials: {
    github: "https://github.com/yonatan1611",
    linkedin: "https://www.linkedin.com/in/yonatan-girmachew-b693b3291/",
    email: "yonatangirmachew3@gmail.com",
    twitter: ""
  },

  education: [
    {
      degree: "B.Sc. in Computer Science",
      school: "Unity University",
      period: "2022 — 2026"
    }
  ],

  contact: {
    capabilities: [
      "Full Stack Web Development",
      "REST API Development",
      "Database Design",
      "Performance Optimization"
    ],
    tools: [
      "React",
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "JavaScript",
      "Git"
    ],
    availability: "Open to full-time roles, freelance work, and collaboration opportunities."
  }

};

const adminUser = {
  name: "Yonatan Girmachew",
  email: "yonatangirmachew3@gmail.com",
  password: "Yonatan@123",
  role: "admin",
  isActive: true
};

const projectsData = [
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

const skillsData = [
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

const experienceData = [
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
  }
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('Clearing existing data...');
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await User.deleteMany({});
    await Setting.deleteMany({});
    await Service.deleteMany({});

    console.log('Inserting data...');
    await Project.insertMany(projectsData);
    await Skill.insertMany(skillsData);
    await Experience.insertMany(experienceData);
    await Setting.create(settingsData);
    await Service.insertMany(servicesData);
    await User.create(adminUser);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();