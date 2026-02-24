const requestMap = new Map<string, {count: number; resetAt: number}>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 4;

export function isRateLimited(key: string) {
  const now = Date.now();
  const current = requestMap.get(key);

  if (!current || current.resetAt < now) {
    requestMap.set(key, {count: 1, resetAt: now + WINDOW_MS});
    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  requestMap.set(key, current);
  return false;
}
