import { getSettings } from "@/lib/data";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <h1 className="font-display text-2xl font-semibold text-ink">Réglages du site</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Coordonnées, réseaux sociaux et informations de marque — utilisés partout sur le site.
      </p>
      <div className="mt-6">
        <SettingsForm initial={settings} />
      </div>
    </div>
  );
}
