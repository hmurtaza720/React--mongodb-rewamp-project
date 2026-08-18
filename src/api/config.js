// Base URL of the Express/MongoDB API.
// Set VITE_API_URL in a .env file at the project root to point at a
// deployed backend; defaults to the local dev server started by
// `npm run dev` inside /server (see server/.env.example for PORT).
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
