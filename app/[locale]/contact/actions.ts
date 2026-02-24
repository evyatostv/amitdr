'use server';

import nodemailer from 'nodemailer';
import {headers} from 'next/headers';
import {isRateLimited} from '@/lib/rate-limit';

export type ContactActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const initialState: ContactActionState = {
  status: 'idle',
  message: ''
};

export {initialState};

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const hp = String(formData.get('website') || '');
  if (hp) {
    return {status: 'success', message: 'ok'};
  }

  const hdrs = headers();
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    hdrs.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return {
      status: 'error',
      message: 'Too many requests. Please try again later.'
    };
  }

  const payload = {
    name: String(formData.get('name') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    reason: String(formData.get('reason') || '').trim()
  };

  if (!payload.name || !payload.phone || !payload.email || !payload.reason) {
    return {status: 'error', message: 'Please complete all fields.'};
  }

  try {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO_EMAIL;

    if (host && user && pass && to) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {user, pass}
      });

      await transporter.sendMail({
        from: process.env.CONTACT_FROM_EMAIL || user,
        to,
        subject: `Website lead: ${payload.name}`,
        text: `Name: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nReason: ${payload.reason}`
      });
    } else {
      console.log('Contact lead placeholder', payload);
    }

    return {
      status: 'success',
      message: 'Your request was sent successfully.'
    };
  } catch {
    return {
      status: 'error',
      message: 'Could not send your request. Please call 03-9775355.'
    };
  }
}
