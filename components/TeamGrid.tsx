import type { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";
import Monogram from "./Monogram";

// Grille « faites connaissance » — donne un visage humain à l'agence.
// Les avatars sont des monogrammes soignés en attendant de vraies photos :
// ajoutez `photo: "/images/team/xxx.jpg"` à un membre pour l'afficher.
type Member = { name: string; role: string; photo?: string };

export default function TeamGrid({ dict }: { dict: Dictionary }) {
  const members = dict.aboutPage.team as readonly Member[];

  return (
    <section className="container-x py-20 sm:py-24">
      <Reveal>
        <div className="flex flex-col items-center">
          <span className="lamba-mark" />
          <h2 className="mt-4 text-center font-display text-3xl font-semibold uppercase tracking-wide text-ink">
            {dict.aboutPage.teamMembersTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-soft">
            {dict.aboutPage.teamText}
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.06} as="div">
            <figure className="flex h-full flex-col items-center rounded-2xl bg-paper p-7 text-center shadow-sm ring-1 ring-ink/8">
              {m.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <Monogram name={m.name} size={80} />
              )}
              <figcaption className="mt-4">
                <p className="font-display text-lg font-semibold text-ink">{m.name}</p>
                <p className="mt-1 text-sm text-baobab">{m.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
