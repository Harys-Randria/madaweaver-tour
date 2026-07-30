import { MapPin, Sparkles, Leaf, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

// Bandeau « pourquoi voyager avec nous » — 4 réassurances clés, juste sous le
// héros. Contenu déjà rédigé (bilingue) dans dict.trust.
const ICONS = [MapPin, Sparkles, Leaf, MessageCircle];

export default function TrustBand({ dict }: { dict: Dictionary }) {
  return (
    <section className="container-x py-14 sm:py-16">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="lamba-mark" />
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {dict.trust.title}
          </h2>
        </div>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dict.trust.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={item.title} delay={i * 0.06} as="div">
              <div className="flex h-full flex-col rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-ink/8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-baobab/10 text-baobab">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
