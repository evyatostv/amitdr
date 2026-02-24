'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {PropsWithChildren} from 'react';

export function MotionReveal({
  children,
  delay = 0,
  y = 12
}: PropsWithChildren<{delay?: number; y?: number}>) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{opacity: 0, y}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.15}}
      transition={{duration: 0.42, ease: 'easeOut', delay}}
    >
      {children}
    </motion.div>
  );
}
