const tries = new Map();
const WINDOW = 15 * 60 * 1000;
const MAX = 8;

export function loginLimit(req, res, next) {
  if (req.method !== 'POST') return next();
  const ip = req.ip || 'unknown';
  const now = Date.now();
  let r = tries.get(ip);
  if (!r || now - r.start > WINDOW) { r = { start: now, n: 0 }; tries.set(ip, r); }
  if (r.n >= MAX) {
    return res.status(429).json({ error: 'Too many attempts. Try again in a few minutes.' });
  }
  res.on('finish', () => { if (res.statusCode === 401) r.n++; });
  next();
}

setInterval(() => {
  const now = Date.now();
  for (const [k, v] of tries) if (now - v.start > WINDOW) tries.delete(k);
}, WINDOW).unref();
