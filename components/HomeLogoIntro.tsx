'use client';

import {useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {usePathname} from 'next/navigation';

export function HomeLogoIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isHome = useMemo(() => /^\/(he|en)?\/?$/.test(pathname || '/'), [pathname]);

  useEffect(() => {
    if (!isHome || typeof window === 'undefined') {
      setVisible(false);
      return;
    }

    const seenKey = 'home-logo-intro-seen';
    const alreadySeen = sessionStorage.getItem(seenKey) === '1';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadySeen || prefersReducedMotion) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const lock = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem(seenKey, '1');
      document.body.style.overflow = lock;
      setVisible(false);
    }, 700);

    return () => {
      window.clearTimeout(doneTimer);
      document.body.style.overflow = lock;
    };
  }, [isHome]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[120] bg-[radial-gradient(circle_at_20%_18%,rgba(106,209,173,0.28),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(30,58,138,0.16),transparent_44%),linear-gradient(180deg,#edf8f4_0%,#f7fbfc_58%,#ffffff_100%)]"
          initial={{opacity: 1}}
          animate={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.55, ease: 'easeOut'}}
          aria-hidden="true"
        />
      ) : null}
    </AnimatePresence>
  );
}
