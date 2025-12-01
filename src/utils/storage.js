export const load = (k, fallback) => {
  try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};
export const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
