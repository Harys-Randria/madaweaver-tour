import { getAbout } from "@/lib/data";
import AboutForm from "@/components/admin/AboutForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const about = await getAbout();
  return (
    <div>
      <h1 className="mb-1 font-display text-3xl font-semibold text-ink">À propos</h1>
      <p className="mb-6 text-sm text-ink-soft">
        Textes, images, valeurs, chiffres et équipe de la page « À propos ».
      </p>
      <AboutForm initial={about} />
    </div>
  );
}
