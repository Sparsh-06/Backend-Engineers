import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";

export type CollectionItem = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  accent?: boolean;
};
type Props = {
  label: string;
  title: string;
  intro: string;
  items: CollectionItem[];
};

const collectionSections = [
  {
    title: "Built for ongoing publishing",
    description:
      "Each starter route is designed to expand into articles, explainers, and visual deep-dives without changing the site structure.",
  },
  {
    title: "SEO-friendly from day one",
    description:
      "Every route ships with metadata, crawlable content, and stable internal links so the site can grow with the library.",
  },
  {
    title: "Made for backend thinking",
    description:
      "The layout keeps the editorial feel while leaving room for diagrams, flows, and interactive models later.",
  },
];

export default function Collection({ label, title, intro, items }: Props) {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            {label}
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/60">
            {intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              Backend systems
            </span>
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              Cloud and platform
            </span>
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              Visual explainers
            </span>
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              Field notes
            </span>
          </div>
        </div>
      </section>
      <section className="border-t border-black/15 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex min-h-64 flex-col rounded-[1.75rem] border p-7 transition hover:-translate-y-1 sm:p-9 ${item.accent ? "border-[#d9ff63] bg-[#d9ff63]" : "border-black/15 bg-white/30 hover:bg-white/60"}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-black/55">
                {item.eyebrow}
              </p>
              <h2 className="mt-8 max-w-md text-3xl font-semibold leading-[1.05] tracking-[-.045em]">
                {item.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-black/60">
                {item.description}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-wider">
                <span>{item.meta}</span>
                <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 rounded-[2rem] border border-black/10 bg-white/35 p-6 backdrop-blur sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
              Built to grow
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              A structure that can hold the whole backend stack.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {collectionSections.map((section) => (
              <div
                key={section.title}
                className="rounded-[1.5rem] border border-black/10 bg-[#eee9e3]/70 p-5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-black/65">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row">
          <span>© {new Date().getFullYear()} B.Engineers</span>
          <span>Backend engineering, cloud, and systems thinking in one place.</span>
        </div>
      </footer>
    </main>
  );
}
