import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Setting from '../models/Setting.js';
import { defaultProjects, defaultSkills, defaultExperiences } from '../../frontend/src/data/defaults.js';

dotenv.config();

const defaultSettings = {
  hero: {
    role: "Full Stack Software Engineer",
    welcomeText: "Hello I'm",
    name: "Yonatan Girmachew",
    bio: "Full Stack Software Engineer specializing in modern web technologies. I build scalable web applications, design efficient backend systems, and create clean, responsive user interfaces that solve real-world problems.",
    stats: [
      { value: "3+", label1: "Years of", label2: "Development" },
      { value: "10+", label1: "Projects", label2: "Completed" },
      { value: "15+", label1: "Technologies", label2: "Used" },
      { value: "300+", label1: "Code", label2: "Commits" }
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
      "I'm a Full Stack Software Engineer focused on building high-quality web applications using modern development tools and frameworks. I enjoy working across the entire stack - from designing intuitive user interfaces to developing robust backend systems.",
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
      period: "2022 - 2026"
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

const upsertByKey = async (Model, filter, data) => {
  return Model.findOneAndUpdate(filter, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  });
};

const restore = async () => {
  await connectDB();

  console.log('🔁 Restoring settings...');
  await Setting.findOneAndUpdate({}, defaultSettings, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  });

  console.log('🔁 Restoring projects...');
  for (const p of defaultProjects) {
    await upsertByKey(Project, { title: p.title }, p);
  }

  console.log('🔁 Restoring skills...');
  for (const s of defaultSkills) {
    await upsertByKey(Skill, { name: s.name }, s);
  }

  console.log('🔁 Restoring experience...');
  for (const e of defaultExperiences) {
    const payload = {
      ...e,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : null
    };
    await upsertByKey(
      Experience,
      { company: e.company, position: e.position, startDate: payload.startDate },
      payload
    );
  }

  console.log('✅ Restore complete.');
  await mongoose.connection.close();
};

restore().catch((err) => {
  console.error('❌ Restore failed:', err);
  mongoose.connection.close();
  process.exit(1);
});
