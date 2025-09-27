// Animation and timing constants
export const ANIMATION_DURATION = {
  LOADING_DELAY: 500,
  MODAL_CLOSE: 300,
  HOVER_TRANSITION: 200,
  ACCORDION_EXPAND: 300,
} as const;

// Rate limiting constants
export const RATE_LIMIT = {
  CLEANUP_THRESHOLD: 10 * 60 * 1000, // 10 minutes
  REQUEST_TIMEOUT: 60 * 1000, // 1 minute
} as const;

// Safe area inset constants for Notice positioning
export const SAFE_AREA = {
  TOP_OFFSET: 'calc(env(safe-area-inset-top, 0px) + 3.5rem)',
  LEFT_OFFSET: 'calc(env(safe-area-inset-left, 0px) + 1rem)',
} as const;