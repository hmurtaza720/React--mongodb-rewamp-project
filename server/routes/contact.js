import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// Public: the "Send Us A Message" form posts here.
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'name, email, subject and message are all required' });
    }
    const doc = await ContactMessage.create({ name, email, subject, message });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit message', error: err.message });
  }
});

// Admin-style listing/management endpoints.
router.get('/', async (req, res) => {
  try {
    const docs = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const doc = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update message', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete message', error: err.message });
  }
});

export default router;
