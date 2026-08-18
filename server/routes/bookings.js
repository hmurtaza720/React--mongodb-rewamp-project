import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Public: the check-in/check-out booking bar and the room-detail
// "Confirm Reservation" button both post here.
router.post('/', async (req, res) => {
  try {
    const { checkIn, checkOut } = req.body;
    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: 'checkIn and checkOut are required' });
    }
    const doc = await Booking.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create booking', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const docs = await Booking.find().sort({ createdAt: -1 }).populate('roomId');
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const doc = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update booking', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await Booking.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete booking', error: err.message });
  }
});

export default router;
