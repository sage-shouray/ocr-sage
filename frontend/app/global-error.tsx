"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-1 text-sm font-medium text-rose-200">
            Application Error
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Something went wrong while loading the workspace.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Try reloading this screen. If the problem continues, restart the dev server to refresh the client manifest.
          </p>
          {error.digest ? (
            <p className="mt-4 text-xs text-slate-500">Reference: {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
