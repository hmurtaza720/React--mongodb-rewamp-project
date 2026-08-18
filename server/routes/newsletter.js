import express from 'express';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

const router = express.Router();

// Public: both newsletter forms (main section + footer) post here.
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'email is required' });

    const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ message: 'Already subscribed', subscriber: existing });
    }

    const doc = await NewsletterSubscriber.create({ email });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Failed to subscribe', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const docs = await NewsletterSubscriber.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subscribers', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete subscriber', error: err.message });
  }
});

export default router;
