import express from 'express';
import nodemailer from 'nodemailer';
import ContactMessage from '../models/ContactMessage.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

const getNotifyEmail = () => {
  return (
    process.env.CONTACT_NOTIFY_EMAIL ||
    process.env.SMTP_FROM_EMAIL ||
    process.env.SMTP_EMAIL
  );
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, company = '', budget = '', message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    const emailLooksValid = /\S+@\S+\.\S+/.test(email);
    if (!emailLooksValid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const created = await ContactMessage.create({
      name,
      email,
      company,
      budget,
      message
    });

    let emailSent = false;
    const notifyTo = getNotifyEmail();
    if (notifyTo && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_EMAIL,
          to: notifyTo,
          subject: `New contact form submission from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nBudget: ${budget}\n\nMessage:\n${message}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || '—'}</p>
            <p><strong>Budget:</strong> ${budget || '—'}</p>
            <p><strong>Message:</strong></p>
            <p>${String(message).replace(/\n/g, '<br/>')}</p>
          `
        });
        emailSent = true;
      } catch (mailError) {
        console.error('Contact notification email failed:', mailError);
      }
    }

    res.status(201).json({
      success: true,
      data: {
        id: created._id,
        emailSent
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error submitting message'
    });
  }
});

// @desc    Get contact messages
// @route   GET /api/contact
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching messages'
    });
  }
});

// @desc    Update contact message status
// @route   PATCH /api/contact/:id
// @access  Private
router.patch('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'read', 'archived'];

    if (status && !allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value.'
      });
    }

    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating message'
    });
  }
});

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting message'
    });
  }
});

export default router;
