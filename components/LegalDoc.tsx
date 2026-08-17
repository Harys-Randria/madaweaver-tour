import type { ReactNode } from "react";

export type LegalBlock = { heading: string; body: ReactNode };

// Mise en page commune aux pages légales (mentions, confidentialité, cookies).
export default function LegalDoc({
  title,
  intro,
  blocks,
  updated,
}: {
  title: string;
  intro?: string;
  blocks: LegalBlock[];
  updated: string;
}) {
  return (
    <div className="pb-24">
      <section className="container-x pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-ink-soft">{updated}</p>
          {intro && <p className="mt-6 leading-relaxed text-ink-soft">{intro}</p>}

          <div className="mt-10 space-y-8">
            {blocks.map((b, i) => (
              <section key={i}>
                <h2 className="font-display text-xl font-semibold text-ink">{b.heading}</h2>
                <div className="mt-2 space-y-2 leading-relaxed text-ink-soft">{b.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
