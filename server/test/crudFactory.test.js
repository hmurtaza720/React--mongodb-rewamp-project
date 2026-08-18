// Exercises the real Express route logic (crudFactory) end-to-end over HTTP,
// but against a small in-memory fake standing in for a Mongoose Model.
// This sandbox has no network access to a real MongoDB Atlas cluster, so this
// test proves the API's request/response behaviour is correct; you should
// also run `npm run seed` and hit the routes against your real Atlas cluster
// once you have MONGODB_URI configured (see server/.env.example).

import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createCrudRouter } from '../routes/crudFactory.js';

let nextId = 1;
function fakeId() {
  return String(nextId++).padStart(24, '0');
}

// Minimal stand-in for a Mongoose Model exposing only what crudFactory uses.
function makeFakeModel() {
  let store = [];

  class Query {
    constructor(results) { this.results = results; }
    sort() { return this; }
    then(resolve, reject) { return Promise.resolve(this.results).then(resolve, reject); }
  }

  return {
    schema: { path: () => undefined }, // no "order" field -> sorts by _id
    find() { return new Query([...store]); },
    findById(id) { return Promise.resolve(store.find((d) => d._id === id) || null); },
    async create(body) {
      const doc = { _id: fakeId(), ...body };
      store.push(doc);
      return doc;
    },
    async findByIdAndUpdate(id, body) {
      const doc = store.find((d) => d._id === id);
      if (!doc) return null;
      Object.assign(doc, body);
      return doc;
    },
    async findByIdAndDelete(id) {
      const idx = store.findIndex((d) => d._id === id);
      if (idx === -1) return null;
      const [doc] = store.splice(idx, 1);
      return doc;
    },
    _store: () => store
  };
}

async function withServer(t, fn) {
  const Model = makeFakeModel();
  const app = express();
  app.use(express.json());
  app.use('/api/things', createCrudRouter(Model));
  const server = app.listen(0);
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}/api/things`;
  try {
    await fn(base, Model);
  } finally {
    server.close();
  }
}

test('POST creates a document, GET / lists it', async (t) => {
  await withServer(t, async (base) => {
    const createRes = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Deluxe Room', price: 260 })
    });
    assert.equal(createRes.status, 201);
    const created = await createRes.json();
    assert.equal(created.name, 'Deluxe Room');
    assert.ok(created._id);

    const listRes = await fetch(base);
    assert.equal(listRes.status, 200);
    const list = await listRes.json();
    assert.equal(list.length, 1);
    assert.equal(list[0].price, 260);
  });
});

test('GET /:id returns 404 for a missing document', async (t) => {
  await withServer(t, async (base) => {
    const res = await fetch(`${base}/000000000000000000000000`);
    assert.equal(res.status, 404);
  });
});

test('PUT updates a document', async (t) => {
  await withServer(t, async (base) => {
    const createRes = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Superior Room', price: 200 })
    });
    const created = await createRes.json();

    const updateRes = await fetch(`${base}/${created._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: 240 })
    });
    assert.equal(updateRes.status, 200);
    const updated = await updateRes.json();
    assert.equal(updated.price, 240);
    assert.equal(updated.name, 'Superior Room');
  });
});

test('DELETE removes a document', async (t) => {
  await withServer(t, async (base, Model) => {
    const createRes = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Temp Room' })
    });
    const created = await createRes.json();

    const delRes = await fetch(`${base}/${created._id}`, { method: 'DELETE' });
    assert.equal(delRes.status, 200);
    assert.equal(Model._store().length, 0);
  });
});
