'use client';

import {useEffect, useMemo, useState} from 'react';
import Image from 'next/image';
import {AnimatePresence, motion} from 'framer-motion';
import {usePathname} from 'next/navigation';
import {withBasePath} from '@/lib/asset-path';

type Point = {x: number; y: number};

function getViewportCenter(): Point {
  return {x: window.innerWidth / 2, y: window.innerHeight / 2};
}

function getHeaderLogoCenter(): Point {
  const target = document.querySelector('[data-logo-anchor="header-logo"]') as HTMLElement | null;
  if (!target) {
    return {x: window.innerWidth - 46, y: 42};
  }

  const rect = target.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

export function HomeLogoIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState<Point>({x: 0, y: 0});
  const [phase, setPhase] = useState<'hold' | 'move' | 'fade'>('hold');

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
    setPhase('hold');

    const lock = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const recalcOffset = () => {
      const from = getViewportCenter();
      const to = getHeaderLogoCenter();
      setOffset({x: to.x - from.x, y: to.y - from.y});
    };

    const rafId = window.requestAnimationFrame(() => {
      recalcOffset();
    });

    const moveTimer = window.setTimeout(() => {
      recalcOffset();
      setPhase('move');
    }, 700);

    const fadeTimer = window.setTimeout(() => {
      setPhase('fade');
    }, 1400);

    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem(seenKey, '1');
      document.body.style.overflow = lock;
      setVisible(false);
    }, 1700);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(moveTimer);
      window.clearTimeout(fadeTimer);
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
          animate={{opacity: phase === 'fade' ? 0 : 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.35, ease: 'easeOut'}}
          aria-hidden="true"
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-brand-100/70 bg-white/85 p-3 shadow-2xl backdrop-blur-sm sm:h-32 sm:w-32"
            initial={{scale: 0.86, opacity: 0}}
            animate={
              phase === 'move'
                ? {
                    x: offset.x,
                    y: offset.y,
                    scale: 0.38,
                    opacity: 0.96
                  }
                : {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1
                  }
            }
            transition={
              phase === 'move'
                ? {duration: 0.7, ease: [0.22, 1, 0.36, 1]}
                : {duration: 0.45, ease: 'easeOut'}
            }
          >
            <motion.div
              className="h-full w-full"
              animate={{rotate: phase === 'hold' ? [0, -4, 4, 0] : 0}}
              transition={{duration: 0.55, repeat: phase === 'hold' ? 1 : 0, ease: 'easeInOut'}}
            >
              <Image
                src={withBasePath('/images/logo-icon.png')}
                alt=""
                width={120}
                height={120}
                className="h-full w-full object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
