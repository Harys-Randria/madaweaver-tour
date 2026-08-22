import { getCarRental } from "@/lib/data";
import CarRentalForm from "@/components/admin/CarRentalForm";

export const dynamic = "force-dynamic";

export default async function AdminCarRentalPage() {
  const content = await getCarRental();
  return (
    <div>
      <h1 className="mb-1 font-display text-3xl font-semibold text-ink">Location de voiture</h1>
      <p className="mb-6 text-sm text-ink-soft">
        Présentation du service, formules (avec / sans chauffeur) et véhicules.
      </p>
      <CarRentalForm initial={content} />
    </div>
  );
}
