import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const AnimatedText = ({ text, className }) => {
  const letters = Array.from(text);
  
  // Generate random values once per text so it doesn't re-render chaotically
  const randomValues = useMemo(() => letters.map(() => ({
    x: (Math.random() - 0.5) * 800, // Random X offset
    y: (Math.random() - 0.5) * 800, // Random Y offset
    rotate: (Math.random() - 0.5) * 360, // Random rotation
    delay: Math.random() * 0.5 // Random delay
  })), [letters]);

  return (
    <div className={className} style={{ display: 'flex', overflow: 'visible', justifyContent: 'flex-start' }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: randomValues[i].x, y: randomValues[i].y, rotate: randomValues[i].rotate, scale: 0.2 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            type: "spring",
            damping: 15,
            stiffness: 80,
            delay: randomValues[i].delay
          }}
          style={{ display: 'inline-block', whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

const LoadingScreen = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="loading-logo">
            <AnimatedText text="SCALORA" className="loading-text-top" />
            <AnimatedText text="SCHOOLS" className="loading-text-bottom" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
