import { ShieldCheck, BadgeCheck, Wallet, Headset } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

// Bandeau de réassurance « réservez l'esprit tranquille » — lève l'anxiété du
// voyageur international (agence enregistrée, guides licenciés, paiement après
// confirmation, assistance WhatsApp 24/7).
const ICONS = [ShieldCheck, BadgeCheck, Wallet, Headset];

export default function Reassurance({ dict }: { dict: Dictionary }) {
  return (
    <section className="grain lamba-surface relative overflow-hidden bg-forest text-cream">
      <div className="container-x relative z-10 py-16 sm:py-20">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="lamba-mark" />
            <h2 className="text-center font-display text-3xl font-semibold sm:text-4xl">
              {dict.reassurance.title}
            </h2>
            <span className="lamba-mark" />
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.reassurance.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.06} as="div">
                <div className="flex h-full items-start gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/[0.1]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/25">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream/70">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
