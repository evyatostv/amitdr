'use client';

import {useFormState, useFormStatus} from 'react-dom';
import type {Locale} from '@/lib/i18n/routing';
import {initialState, submitContactForm} from '@/app/[locale]/contact/actions';

function SubmitButton({locale}: {locale: Locale}) {
  const {pending} = useFormStatus();

  return (
    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={pending}>
      {pending ? (locale === 'he' ? 'שולח...' : 'Sending...') : locale === 'he' ? 'שליחה' : 'Send'}
    </button>
  );
}

export function ContactForm({locale}: {locale: Locale}) {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <form action={formAction} className="card space-y-4" noValidate>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-800">
          {locale === 'he' ? 'שם מלא' : 'Full name'}
          <input name="name" required className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
        </label>
        <label className="text-sm font-medium text-slate-800">
          {locale === 'he' ? 'טלפון' : 'Phone'}
          <input name="phone" required className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
        </label>
      </div>

      <label className="text-sm font-medium text-slate-800">
        {locale === 'he' ? 'אימייל' : 'Email'}
        <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
      </label>

      <label className="text-sm font-medium text-slate-800">
        {locale === 'he' ? 'סיבת פנייה' : 'Reason for inquiry'}
        <textarea name="reason" required rows={4} className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton locale={locale} />
        {state.status !== 'idle' && (
          <p
            className={`text-sm ${state.status === 'success' ? 'text-emerald-700' : 'text-red-700'}`}
            aria-live="polite"
          >
            {locale === 'he'
              ? state.status === 'success'
                ? 'הפנייה נשלחה בהצלחה.'
                : 'לא ניתן לשלוח כרגע. נסו שוב או התקשרו 03-9775355.'
              : state.message}
          </p>
        )}
      </div>
    </form>
  );
}
