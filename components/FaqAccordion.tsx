'use client';

import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {MotionReveal} from '@/components/MotionReveal';

type FaqItem = {
  q: string;
  a: string;
  linkText?: string;
};

export function FaqAccordion({
  items,
  questionnaireUrl
}: {
  items: FaqItem[];
  questionnaireUrl: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;

        return (
          <MotionReveal key={item.q} delay={0.04 * index}>
            <div className="card">
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-3 text-start text-base font-semibold text-slate-900"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.q}</span>
                <span
                  className={`inline-flex text-lg text-brand-700 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={answerId}
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.25, ease: 'easeInOut'}}
                    className="overflow-hidden"
                  >
                    <div className="mt-2">
                      <p className="text-sm text-slate-700">{item.a}</p>
                      {item.linkText ? (
                        <a
                          href={questionnaireUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm font-semibold text-brand-700 underline"
                        >
                          {item.linkText}
                        </a>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </MotionReveal>
        );
      })}
    </div>
  );
}
