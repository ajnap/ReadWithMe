export function Footer() {
  return (
    <footer className="border-t-[3px] border-rwm-ink bg-rwm-blue-deep px-5 py-12 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/Logo_Color.avif"
        alt="Read With Me"
        className="mx-auto h-12 w-auto"
      />
      <p className="mx-auto mt-4 max-w-md text-sm font-semibold text-white/70">
        A personalized reading adventure built by two veteran kindergarten
        teachers. Made with love for new readers everywhere.
      </p>

      <div className="mt-6 flex justify-center">
        <a
          href="https://www.instagram.com/readwithme.co/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Read With Me on Instagram"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-rwm-ink bg-white text-rwm-ink transition hover:-translate-y-0.5"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" r="1.4" fill="currentColor" />
          </svg>
        </a>
      </div>

      <p className="mt-6 text-xs font-bold text-white/40">
        © {new Date().getFullYear()} Read With Me · readwithme.co
      </p>
    </footer>
  );
}
