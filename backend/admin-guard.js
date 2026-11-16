import { timingSafeEqual } from 'node:crypto';

const KEY = process.env.ADMIN_KEY || '';

export function adminGuard(req, res, next) {
  if (!KEY) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({ error: 'Admin key is not configured.' });
    }
    return next();
  }
  const given = Buffer.from(String(req.get('x-admin-key') || ''));
  const wanted = Buffer.from(KEY);
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}
