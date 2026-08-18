import { API_BASE_URL } from './config';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    // No JSON body (e.g. some error responses) — leave body as null.
  }

  if (!res.ok) {
    const message = body?.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body;
}

export const apiGet = (path) => request(path, { method: 'GET' });
export const apiPost = (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) });
export const apiPut = (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) });
export const apiDelete = (path) => request(path, { method: 'DELETE' });
