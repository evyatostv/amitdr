'use client';

import {motion, useReducedMotion, useScroll, useTransform} from 'framer-motion';

export function HeroBubbles() {
  const reduceMotion = useReducedMotion();
  const {scrollY} = useScroll();

  const yA = useTransform(scrollY, [0, 700], [0, 90]);
  const xA = useTransform(scrollY, [0, 700], [0, -20]);
  const yB = useTransform(scrollY, [0, 700], [0, -110]);
  const xB = useTransform(scrollY, [0, 700], [0, 26]);

  if (reduceMotion) {
    return (
      <>
        <div className="orb orb-a" />
        <div className="orb orb-b" />
      </>
    );
  }

  return (
    <>
      <motion.div
        className="orb orb-a"
        style={{y: yA, x: xA}}
        animate={{scale: [1, 1.05, 1], opacity: [0.82, 0.98, 0.82]}}
        transition={{duration: 7.2, repeat: Infinity, ease: 'easeInOut'}}
      />
      <motion.div
        className="orb orb-b"
        style={{y: yB, x: xB}}
        animate={{scale: [1, 1.09, 1], opacity: [0.76, 0.94, 0.76]}}
        transition={{duration: 8.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4}}
      />
    </>
  );
}
