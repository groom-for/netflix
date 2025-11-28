import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of the provided value.
 * @template T
 * @param {T} value
 * @param {number} delay
 * @returns {T}
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
