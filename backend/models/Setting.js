import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  // Section: Hero
  hero: {
    role: { type: String, default: 'Web Developer' },
    welcomeText: { type: String, default: 'Hello I’m' },
    name: { type: String, default: 'Yonatan Girmachew' },
    bio: { type: String, default: 'I’m a passionate developer who enjoys turning ideas into clean, efficient, and user-friendly digital experiences.' },
    stats: [
      {
        value: { type: String },
        label1: { type: String },
        label2: { type: String }
      }
    ]
  },
  
  // Section: About
  about: {
    codeBlock: {
      firstName: { type: String, default: 'Yonatan' },
      lastName: { type: String, default: 'Girmachew' },
      role: { type: String, default: 'Full Stack Engineer' },
      traits: [{ type: String }],
      bioLines: [{ type: String }]
    },
    title: { type: String, default: 'Coding with' },
    subtitle: { type: String, default: 'purpose & passion.' },
    paragraphs: [{ type: String }]
  },

  // Section: Site Identity
  site: {
    logoText: { type: String, default: 'Yonatan' },
    resumeLink: { type: String, default: '/resume/CV.pdf' },
    profileImage: { type: String, default: '/assets/profile-image/profile-image.png' }
  },

  // Section: Social Links
  socials: {
    github: { type: String, default: 'https://github.com/yonatan1611' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/yonatan-girmachew-b693b3291/' },
    email: { type: String, default: 'yonatangirmachew3@gmail.com' },
    twitter: { type: String, default: '' }
  },
  education: [
    {
      degree: { type: String },
      school: { type: String },
      period: { type: String }
    }
  ],
  contact: {
    capabilities: [{ type: String }],
    tools: [{ type: String }],
    availability: { type: String, default: 'Taking new projects starting next month.' }
  },

}, {
  timestamps: true,
  capped: { size: 4096, max: 1 } // Only one document allowed
});

// Since capped doesn't strictly prevent multiple inserts via mongoose sometimes if not handled, 
// we will handle it in the controller/route logic to ensure only one exists.

export default mongoose.model('Setting', settingSchema);
