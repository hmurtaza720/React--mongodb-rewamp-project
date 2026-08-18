// Base URL of the Express/MongoDB API.
// Defaults to relative '/api' on Vercel deployment, or http://localhost:5000/api in local dev.
export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');
