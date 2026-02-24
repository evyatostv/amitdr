'use client';

import {FormEvent, useState} from 'react';
import type {Locale} from '@/lib/i18n/routing';

export function ContactForm({locale}: {locale: Locale}) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const reason = String(formData.get('reason') || '').trim();

    if (!name || !phone || !email || !reason) {
      setStatus('error');
      return;
    }

    const subject = encodeURIComponent(
      locale === 'he' ? 'פנייה חדשה מהאתר' : 'New Website Inquiry'
    );
    const body = encodeURIComponent(
      `${locale === 'he' ? 'שם' : 'Name'}: ${name}\n` +
        `${locale === 'he' ? 'טלפון' : 'Phone'}: ${phone}\n` +
        `${locale === 'he' ? 'אימייל' : 'Email'}: ${email}\n` +
        `${locale === 'he' ? 'סיבת פנייה' : 'Reason'}: ${reason}`
    );

    window.location.href = `mailto:info@amitdr.com?subject=${subject}&body=${body}`;
    setStatus('success');
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4" noValidate>
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
        <button type="submit" className="btn-primary w-full sm:w-auto">
          {locale === 'he' ? 'שליחה' : 'Send'}
        </button>
        {status !== 'idle' && (
          <p
            className={`text-sm ${status === 'success' ? 'text-emerald-700' : 'text-red-700'}`}
            aria-live="polite"
          >
            {locale === 'he'
              ? status === 'success'
                ? 'הטופס הוכן לשליחה במייל.'
                : 'אנא מלאו את כל השדות.'
              : status === 'success'
                ? 'Your mail app was opened with the prepared message.'
                : 'Please complete all fields.'}
          </p>
        )}
      </div>
    </form>
  );
}
