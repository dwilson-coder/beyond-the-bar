// src/services/api.js — thin fetch wrapper for the Express API
const BASE_URL = process.env.REACT_APP_API_URL || '/api';

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

export const request = async (path, { method = 'GET', body } = {}) => {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      credentials: 'include', // send the httpOnly auth cookie
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Can't reach the server. Please try again in a moment.", 0);
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.message || "Can't reach the server. Please try again in a moment.", res.status, data.errors);
  }

  return data;
};
