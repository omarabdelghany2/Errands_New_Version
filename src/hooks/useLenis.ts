import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    // Initialize Lenis with smooth scrolling options
    const lenis = new Lenis({
      duration: 1.2, // Animation duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      orientation: 'vertical', // Scroll direction
      gestureOrientation: 'vertical', // Gesture direction
      smoothWheel: true, // Enable smooth wheel scrolling
      wheelMultiplier: 1, // Wheel scroll speed multiplier
      touchMultiplier: 2, // Touch scroll speed multiplier
      infinite: false, // Disable infinite scroll
    });

    // Synchronize Lenis with requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);
};
