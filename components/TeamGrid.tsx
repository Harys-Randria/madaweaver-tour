import Reveal from "./Reveal";
import Monogram from "./Monogram";

export type TeamCard = { name: string; role: string; bio?: string; photo?: string };

// Grille « faites connaissance » — donne un visage humain à l'agence.
// Les membres sans photo affichent un monogramme soigné.
export default function TeamGrid({
  title,
  subtitle,
  members,
}: {
  title: string;
  subtitle: string;
  members: TeamCard[];
}) {
  if (members.length === 0) return null;

  // Une seule personne → carte centrée ; sinon grille responsive.
  const gridCols =
    members.length === 1
      ? "max-w-md mx-auto"
      : members.length === 2
        ? "sm:grid-cols-2 max-w-2xl mx-auto"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="container-x py-20 sm:py-24">
      <Reveal>
        <div className="flex flex-col items-center">
          <span className="lamba-mark" />
          <h2 className="mt-4 text-center font-display text-3xl font-semibold uppercase tracking-wide text-ink">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink-soft">{subtitle}</p>
        </div>
      </Reveal>

      <div className={`mt-12 grid gap-6 ${gridCols}`}>
        {members.map((m, i) => (
          <Reveal key={`${m.name}-${i}`} delay={i * 0.06} as="div">
            <figure className="flex h-full flex-col items-center rounded-2xl bg-paper p-7 text-center shadow-sm ring-1 ring-ink/8">
              {m.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo} alt={m.name} className="h-24 w-24 rounded-full object-cover" />
              ) : (
                <Monogram name={m.name} size={88} />
              )}
              <figcaption className="mt-4">
                <p className="font-display text-lg font-semibold text-ink">{m.name}</p>
                <p className="mt-1 text-sm text-baobab">{m.role}</p>
                {m.bio && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.bio}</p>}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
