import Link from "next/link";
import { topicGroups, topicGroupsFlat } from "@/data/topics";
import { architectureProfiles } from "@/data/architecture-profiles";
import { architectureDeepDives } from "@/data/architecture-deep-dives";
import { buildProjects } from "@/data/build-projects";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50">{title}</h2>
      <div className="mt-2 divide-y divide-black/10 rounded-md border border-black/15">{children}</div>
    </div>
  );
}

function Row({ label, sub, href }: { label: string; sub?: string; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-black/[0.03]">
      <span>
        {label}
        {sub && <span className="ml-2 text-xs text-black/40">{sub}</span>}
      </span>
      <span className="text-black/40">Edit →</span>
    </Link>
  );
}

export default function DevDashboard() {
  const publishedSlugs = new Set(topicGroupsFlat.map((t) => t.slug));

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Dev authoring</h1>
      <p className="mt-1 text-sm text-black/60">
        Edit real site content through forms instead of hand-editing source files. Dev-only - never
        functions outside <code className="rounded bg-black/5 px-1 py-0.5">pnpm dev</code>.
      </p>

      <Link
        href="/dev/new-topic"
        className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff4d00]"
      >
        + New topic
      </Link>

      <Section title={`Topics (${topicGroups.reduce((n, g) => n + g.topics.length, 0)})`}>
        {topicGroups.flatMap((group) =>
          group.topics.map((topic) => (
            <Row
              key={topic.slug}
              label={topic.title}
              sub={publishedSlugs.has(topic.slug) ? undefined : "draft"}
              href={`/dev/topics/${topic.slug}`}
            />
          )),
        )}
      </Section>

      <Section title={`Architecture profiles (${architectureProfiles.length})`}>
        {architectureProfiles.map((profile) => (
          <Row key={profile.slug} label={profile.company} href={`/dev/architecture/${profile.slug}`} />
        ))}
      </Section>

      <Section title={`Architecture deep dives (${architectureDeepDives.length})`}>
        {architectureDeepDives.map((deepDive) => (
          <Row
            key={`${deepDive.companySlug}-${deepDive.slug}`}
            label={deepDive.title}
            sub={deepDive.companySlug}
            href={`/dev/architecture/${deepDive.companySlug}/${deepDive.slug}`}
          />
        ))}
      </Section>

      <Section title={`Build projects (${buildProjects.length})`}>
        {buildProjects.map((project) => (
          <Row key={project.slug} label={project.title} href={`/dev/build/${project.slug}`} />
        ))}
      </Section>
    </div>
  );
}
