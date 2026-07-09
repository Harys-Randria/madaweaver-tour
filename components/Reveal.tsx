"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

// Révélation douce au défilement — MAIS robuste : le contenu est visible par
// défaut (SSR / sans JS / si l'IntersectionObserver ne se déclenche pas).
// L'animation n'est qu'une amélioration progressive.

const useIsoEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [enhance, setEnhance] = useState(false);
  const [shown, setShown] = useState(false);

  // Avant le premier paint côté client : décide si on anime.
  useIsoEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setEnhance(true);
  }, []);

  useEffect(() => {
    if (!enhance) return;
    const el = ref.current;
    if (!el) return setShown(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);

    // Sécurité : quoi qu'il arrive, on révèle après 1,5 s.
    const safety = setTimeout(() => setShown(true), 1500);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [enhance]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={
        enhance
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(24px)",
              transition:
                "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${delay}s`,
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
