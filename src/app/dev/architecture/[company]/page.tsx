import { notFound } from "next/navigation";
import ArchitectureProfileForm from "@/modules/layouts/author/architecture-profile-form";
import { getArchitectureProfile } from "@/data/architecture-profiles";
import { updateArchitectureProfile } from "./actions";

export default async function EditArchitectureProfilePage({ params }: { params: Promise<{ company: string }> }) {
  const { company } = await params;
  const profile = getArchitectureProfile(company);
  if (!profile) notFound();

  return <ArchitectureProfileForm action={updateArchitectureProfile} initialData={profile} />;
}
