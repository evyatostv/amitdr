# Dr Amit Druvin Website (Next.js)

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion (light use)
- next-intl (Hebrew RTL default + English LTR)

## Quick start
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Pages
- `/` Home
- `/about`
- `/conditions`
- `/services`
- `/articles`
- `/articles/[slug]`
- `/faq`
- `/book`
- `/contact`
- `/privacy`
- `/accessibility`
- English equivalents under `/en/*`

## Booking slug fix
Redirects are configured in `next.config.mjs` from typo/legacy booking URLs to `/book` (or `/:locale/book`).

## Content editing workflow (simple admin)
1. Edit conditions in `content/conditions.json`.
2. Edit articles/videos in `content/articles.json`.
3. Keep both Hebrew (`*He`) and English (`*En`) fields updated.
4. Deploy.

## Contact form
- Server action: `app/[locale]/contact/actions.ts`
- Includes honeypot (`website`) and in-memory rate limit.
- Email sending via SMTP env vars.
- If SMTP is not configured, submissions are logged as placeholder.

## SEO & compliance
- Per-page metadata in both locales.
- OpenGraph and Twitter metadata.
- JSON-LD for Physician and MedicalClinic on home page.
- `app/sitemap.ts` and `app/robots.ts` included.

## Accessibility & performance notes
- Keyboard-focus styles and ARIA labels on key controls.
- Motion respects reduced motion.
- Mobile-first layout with large tap targets.
- Keep image assets compressed and avoid large client-side dependencies to maintain Lighthouse 90+.

## Vercel deployment
1. Push repository to GitHub.
2. Import project in Vercel.
3. Set environment variables from `.env.example`.
4. Deploy (`npm run build` as default build command).

