import { useState, useEffect } from "react";

export default function useLocalStorage(key, initial = {}) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, isLoaded]);

  return [value, setValue];
}
