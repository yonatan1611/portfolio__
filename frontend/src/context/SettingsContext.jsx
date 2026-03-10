import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

// Default settings fallback
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
      "MongoDB",
      "JavaScript",
      "Git"
    ],
    availability: "Open to full-time roles, freelance work, and collaboration opportunities."
  },
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
      const result = await response.json();
      if (result.success) {
        setSettings(result.data);
      } else {
        console.warn('Settings API returned unsuccessful, using defaults');
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error fetching settings, using defaults:', error);
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};