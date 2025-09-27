import { useState, useEffect } from 'react';
import { ANIMATION_DURATION } from '../constants';

/**
 * Custom hook to handle consistent loading delays across components
 * @param delay - Custom delay in milliseconds (defaults to standard loading delay)
 * @returns loading state boolean
 */
export const useLoadingDelay = (delay: number = ANIMATION_DURATION.LOADING_DELAY) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
};