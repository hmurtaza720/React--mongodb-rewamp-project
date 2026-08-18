# Royella – Resort & Luxury Hotel (React + Express + MongoDB)

A full-stack revamp of the Royella Luxury Hotel & Resort site. The **React
(Vite) frontend** now talks to an **Express API backend** that reads and
writes all content — rooms, offers, testimonials, gallery, facilities,
services, news, hotel info, contact messages, newsletter signups, and
bookings — from **MongoDB**.

```
html project/
├── src/                 React frontend (Vite)
│   ├── api/              fetch wrapper + base URL config
│   ├── hooks/useApiData.js   shared "fetch from API" hook
│   └── components/        every section now fetches its data via the API
├── server/               Express + Mongoose API backend
│   ├── config/db.js       MongoDB connection
│   ├── models/            one Mongoose schema per collection
│   ├── routes/            REST routes (generic CRUD + custom routes)
│   ├── seed/               seeds MongoDB with the site's original content
│   └── test/               automated tests for the API layer
├── .env.example           frontend env template (VITE_API_URL)
└── server/.env.example    backend env template (MONGODB_URI, PORT, CORS_ORIGIN)
```

## 1. Get a MongoDB connection string

Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (free
tier is enough):

1. Create a free cluster.
2. Database Access -> add a database user (username + password).
3. Network Access -> allow your IP (or 0.0.0.0/0 for development).
4. Connect -> Drivers -> copy the connection string, it looks like:
   `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`

## 2. Set up and run the backend

```bash
cd server
npm install
cp .env.example .env
```

Open `server/.env` and paste your connection string into `MONGODB_URI`
(add a database name before the `?`, e.g. `.../royella?retryWrites=...`).

Populate the database with the site's original content (rooms, offers,
testimonials, etc.) so the frontend isn't empty on first load:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

You should see:
```
[MongoDB] Connected: <your-cluster-host>/royella
[Server] Royella API running on http://localhost:5000
```

Sanity check it's alive: open `http://localhost:5000/api/rooms` in a
browser -- you should get back a JSON array of 4 rooms.

## 3. Set up and run the frontend

In a **second terminal**, from the project root (`html project/`):

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The site now loads every section's content
from MongoDB via the API instead of hardcoded arrays.

If your backend runs somewhere other than `http://localhost:5000`, copy
`.env.example` to `.env` in the project root and set `VITE_API_URL`.

## What's wired up to MongoDB

| Frontend feature | API endpoint | Behaviour |
|---|---|---|
| Hero slider | GET /api/hero-slides | fetch |
| Rooms & Suites carousel + detail modal | GET /api/rooms | fetch |
| "Confirm Reservation" in room modal | POST /api/bookings | store |
| Booking search bar | POST /api/bookings | store |
| Facilities grid | GET /api/facilities | fetch |
| Featured services | GET /api/services | fetch |
| Limited period offers | GET /api/offers | fetch |
| Testimonials | GET /api/testimonials | fetch |
| Photo gallery | GET /api/gallery | fetch |
| Latest blog posts | GET /api/news | fetch |
| Header / sidebar / contact-page hotel details | GET /api/hotel-info | fetch |
| Footer gallery + partner logos | GET /api/footer-gallery, GET /api/partners | fetch |
| "Send Us A Message" contact form | POST /api/contact | store |
| Newsletter signup (footer + newsletter section) | POST /api/newsletter | store |

Every collection also supports `PUT /api/<collection>/:id` and
`DELETE /api/<collection>/:id` for updating/managing existing documents
(useful if you build an admin panel later, or want to edit content
directly with a tool like MongoDB Compass or mongosh).

## Testing

Backend route logic is covered by automated tests:

```bash
cd server
npm test
```

The tests exercise the real Express routes over real HTTP, using a
lightweight in-memory stand-in for the Mongoose model (this sandbox
had no network access to a live MongoDB cluster to test against, so
this validates the request/response contract; run it again against
your real Atlas cluster by hitting the endpoints once `npm run dev`
is up, e.g. with curl or Postman, to confirm end-to-end).

The frontend build is verified with:

```bash
npm run build
```

## Notes for your teacher / submission

- All data (rooms, offers, testimonials, facilities, services, hero
  slides, gallery, footer gallery, partner logos, news, hotel info) is
  now fetched from MongoDB through the Express API -- nothing is
  hardcoded in the React components anymore.
- Contact form submissions, newsletter subscriptions, and room bookings
  are stored in MongoDB via POST requests.
- The original hardcoded content still exists as the **seed data**
  (server/seed/seedData.js) purely so the database starts with the
  same content the design originally had -- the frontend never imports
  it directly.
