'use client';

import {useState} from 'react';
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
                className="w-full cursor-pointer text-start text-base font-semibold text-slate-900"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.q}
              </button>
              {isOpen ? (
                <div id={answerId} className="mt-2">
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
              ) : null}
            </div>
          </MotionReveal>
        );
      })}
    </div>
  );
}
