import { MapPin, Sparkles, Leaf, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

// Bandeau « pourquoi voyager avec nous » — 4 réassurances clés, juste sous le
// héros. Traitement immersif vert forêt + trame lamba pour casser le beige.
const ICONS = [MapPin, Sparkles, Leaf, MessageCircle];

export default function TrustBand({ dict }: { dict: Dictionary }) {
  return (
    <section className="grain lamba-surface relative overflow-hidden bg-forest text-cream">
      <div className="container-x relative z-10 py-16 sm:py-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="lamba-mark" />
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">{dict.trust.title}</h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.trust.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.06} as="div">
                <div className="flex h-full flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/[0.1]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/25">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
