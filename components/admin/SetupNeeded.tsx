import { Database } from "lucide-react";

// Affiché tant que Supabase n'est pas configuré (variables d'env absentes).
export default function SetupNeeded() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-baobab/10 text-baobab">
        <Database size={30} />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold text-ink">
        Connectez Supabase pour activer l&apos;admin
      </h1>
      <p className="mt-3 text-ink-soft">
        L&apos;interface d&apos;administration est prête, mais elle a besoin d&apos;une base de
        données Supabase (gratuite) pour stocker vos circuits et images.
      </p>

      <ol className="mt-8 space-y-3 text-left text-sm text-ink">
        <Step n={1}>
          Créez un projet gratuit sur{" "}
          <a className="font-semibold text-baobab underline" href="https://supabase.com" target="_blank" rel="noreferrer">
            supabase.com
          </a>
          .
        </Step>
        <Step n={2}>
          Dans <b>SQL Editor</b>, collez et exécutez le contenu du fichier{" "}
          <code className="rounded bg-sand-200 px-1.5 py-0.5">supabase/schema.sql</code>.
        </Step>
        <Step n={3}>
          Copiez le fichier <code className="rounded bg-sand-200 px-1.5 py-0.5">.env.example</code>{" "}
          en <code className="rounded bg-sand-200 px-1.5 py-0.5">.env.local</code> et collez-y votre{" "}
          <b>Project URL</b> et votre <b>clé anon</b> (Supabase → Settings → API).
        </Step>
        <Step n={4}>
          Créez le compte de l&apos;administrateur : Supabase → <b>Authentication</b> → <b>Add user</b>{" "}
          (email + mot de passe).
        </Step>
        <Step n={5}>Redémarrez le site. C&apos;est prêt ✨</Step>
      </ol>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 rounded-xl bg-paper p-4 ring-1 ring-ink/8">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-baobab text-xs font-bold text-white">
        {n}
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}
