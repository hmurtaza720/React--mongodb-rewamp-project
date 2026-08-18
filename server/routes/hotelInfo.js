import express from 'express';
import HotelInfo from '../models/HotelInfo.js';

const router = express.Router();

// There is only ever one hotel-info document. GET creates a default one
// the first time it's requested so the frontend never has to handle "null".
async function getOrCreateSingleton() {
  let doc = await HotelInfo.findOne();
  if (!doc) {
    doc = await HotelInfo.create({});
  }
  return doc;
}

router.get('/', async (req, res) => {
  try {
    const doc = await getOrCreateSingleton();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hotel info', error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const doc = await getOrCreateSingleton();
    Object.assign(doc, req.body);
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update hotel info', error: err.message });
  }
});

export default router;
