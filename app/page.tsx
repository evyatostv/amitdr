import Link from 'next/link';

export default function RootPage() {
  return (
    <main className="container-main section-space">
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('./he/');"
        }}
      />
      <h1 className="mb-4 text-2xl font-bold">Dr Amit Druyan Website</h1>
      <p className="mb-3">Redirecting to Hebrew home page...</p>
      <Link href="/he" className="btn-primary">
        Continue
      </Link>
    </main>
  );
}

