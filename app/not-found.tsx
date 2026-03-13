import Link from 'next/link';

export default function RootNotFound() {
  return (
    <main className="relative isolate overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(106,209,173,0.34),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(40,60,140,0.24),transparent_37%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.17),transparent_42%),linear-gradient(160deg,#ebf8f2_0%,#f6fbff_52%,#ffffff_100%)]" />
        <div className="absolute -start-24 top-12 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
        <div className="absolute -end-24 top-24 h-72 w-72 rounded-full bg-blue-900/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(40,60,140,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(40,60,140,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30 [mask-image:radial-gradient(circle_at_center,black_38%,transparent_100%)]" />
      </div>

      <div className="container-main relative">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-[0_30px_70px_-35px_rgba(30,58,138,0.45)] backdrop-blur-xl sm:p-10">
          <p className="mb-2 text-sm font-bold tracking-wide text-brand-700">404</p>
          <h1 className="mb-3 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">Page not found</h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            The page does not exist. Choose a language to continue.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/he/" className="btn-primary px-6">
              עברית
            </Link>
            <Link href="/en/" className="btn-secondary px-6">
              English
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
