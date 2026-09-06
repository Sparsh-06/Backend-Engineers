import { notFound } from "next/navigation";
import DeepDiveForm from "@/modules/layouts/author/deep-dive-form";
import { getDeepDive } from "@/data/architecture-deep-dives";
import { architectureProfiles } from "@/data/architecture-profiles";
import { updateDeepDive } from "./actions";

export default async function EditDeepDivePage({
  params,
}: {
  params: Promise<{ company: string; deepdive: string }>;
}) {
  const { company, deepdive } = await params;
  const deepDive = getDeepDive(company, deepdive);
  if (!deepDive) notFound();

  const companyOptions = architectureProfiles.map((p) => ({ slug: p.slug, company: p.company }));

  return <DeepDiveForm action={updateDeepDive} initialData={deepDive} companyOptions={companyOptions} />;
}
