const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 5

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

/**
 * Check whether a given identifier (typically an IP address) is within
 * the rate limit window. Returns true if the request is allowed,
 * false if the rate limit has been exceeded.
 */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // Lazy cleanup: if the window expired, remove stale entry
  if (entry && now > entry.resetAt) {
    rateLimitMap.delete(identifier)
  }

  const current = rateLimitMap.get(identifier)

  if (!current) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (current.count >= MAX_REQUESTS) {
    return false
  }

  current.count += 1
  return true
}

// Defense-in-depth: periodic cleanup of stale entries.
// Not relied upon — lazy cleanup above handles the critical path.
// In serverless environments this interval may not fire reliably.
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetAt) {
        rateLimitMap.delete(key)
      }
    }
  }, WINDOW_MS)
}
