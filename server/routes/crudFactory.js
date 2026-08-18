import express from 'express';

/**
 * Builds a standard REST router for a Mongoose model:
 *   GET    /          -> list all documents (sorted by `order` then _id if the schema has one)
 *   GET    /:id       -> get a single document
 *   POST   /          -> create a document
 *   PUT    /:id       -> update a document
 *   DELETE /:id       -> delete a document
 *
 * Using one factory for every simple content collection (rooms, offers,
 * testimonials, gallery, news, etc.) keeps the fetch/store/update/manage
 * behaviour identical and consistent across the whole API.
 */
export function createCrudRouter(Model) {
  const router = express.Router();
  const hasOrderField = !!Model.schema.path('order');
  const sort = hasOrderField ? { order: 1, _id: 1 } : { _id: 1 };

  router.get('/', async (req, res) => {
    try {
      const docs = await Model.find().sort(sort);
      res.json(docs);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch data', error: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(400).json({ message: 'Invalid id', error: err.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ message: 'Failed to create document', error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) {
      res.status(400).json({ message: 'Failed to update document', error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted', id: req.params.id });
    } catch (err) {
      res.status(400).json({ message: 'Failed to delete document', error: err.message });
    }
  });

  return router;
}

export default createCrudRouter;
