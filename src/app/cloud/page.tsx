import type { Metadata } from "next";
import Collection from "@/modules/layouts/collection";
export const metadata: Metadata = {
  title: "Cloud & Platform Engineering",
  description:
    "Practical cloud, infrastructure, deployment, and platform engineering guides for production backend systems.",
};
export default function CloudPage() {
  return (
    <Collection
      label="Cloud & platform"
      title="From local code to dependable infrastructure."
      intro="The infrastructure layer should make your application safer to ship, simpler to observe, and easier to evolve."
      items={[
        {
          eyebrow: "Cloud essentials · 11 lessons",
          title: "A practical map of cloud primitives",
          description:
            "Compute, storage, networking, IAM, and managed services—without the console-tour fog.",
          meta: "Start mapping",
          accent: true,
          href: "/architecture",
        },
        {
          eyebrow: "Deployments · 9 lessons",
          title: "Ship without holding your breath",
          description:
            "CI/CD, environments, rollbacks, feature flags, and the mechanics of safer releases.",
          meta: "Ship safely",
          href: "/blog",
        },
        {
          eyebrow: "Observability · 8 lessons",
          title: "Make systems explain themselves",
          description:
            "Logs, metrics, traces, and how to build signal instead of a very expensive noise machine.",
          meta: "See clearly",
          href: "/architecture",
        },
        {
          eyebrow: "Containers · 10 lessons",
          title: "Kubernetes, with context",
          description:
            "The deployment model, not the buzzwords: pods, services, scheduling, and operations.",
          meta: "Run workloads",
          href: "/concepts",
        },
      ]}
    />
  );
}
