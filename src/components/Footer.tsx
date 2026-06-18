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
      <p className="mt-6 text-xs font-bold text-white/40">
        © {new Date().getFullYear()} Read With Me · readwithme.co
      </p>
    </footer>
  );
}
