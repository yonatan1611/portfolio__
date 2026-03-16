import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  budget: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    default: 'medium'
  },
  status: {
    type: String,
    default: 'new'
  },
  source: {
    type: String,
    default: 'portfolio'
  }
}, {
  timestamps: true
});

export default mongoose.model('ContactMessage', contactMessageSchema);
