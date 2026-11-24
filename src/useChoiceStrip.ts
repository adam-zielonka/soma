import { useLayoutEffect, useRef } from "react";

// Reveal a shared or newly selected choice without scrolling the page away from the figure.
export function useChoiceStrip(selection: string, language: string) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const strip = ref.current;
    const choice = strip?.querySelector<HTMLButtonElement>(
      'button[aria-pressed="true"]',
    );
    if (!strip || !choice) return;
    const reveal = () => {
      if (strip.scrollWidth <= strip.clientWidth) return;
      const bounds = strip.getBoundingClientRect();
      const active = choice.getBoundingClientRect();
      if (active.left < bounds.left)
        strip.scrollLeft += active.left - bounds.left - 4;
      else if (active.right > bounds.right)
        strip.scrollLeft += active.right - bounds.right + 4;
    };
    reveal();
    const observer = new ResizeObserver(reveal);
    observer.observe(strip);
    observer.observe(choice);
    return () => observer.disconnect();
  }, [selection, language]);
  return ref;
}
