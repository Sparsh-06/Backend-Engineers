"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { CloudServiceCategory } from "@/data/cloud-services";

const PROVIDERS = ["AWS", "GCP", "Azure"] as const;
type Provider = (typeof PROVIDERS)[number];

const PROVIDER_STYLES: Record<Provider, string> = {
  AWS: "border-[#ff9900]/40 text-[#b36b00] bg-[#ff9900]/10",
  GCP: "border-[#4285f4]/40 text-[#2a5db0] bg-[#4285f4]/10",
  Azure: "border-[#0078d4]/40 text-[#0163ab] bg-[#0078d4]/10",
};

function serviceFor(category: CloudServiceCategory, provider: Provider) {
  return category.services.find((s) => s.provider === provider)?.name ?? "-";
}

function ServiceExplorerInner({ categories }: { categories: CloudServiceCategory[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    const next = params.toString();
    router.replace(next ? `/cloud?${next}` : "/cloud", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? categories.filter(
        (c) =>
          c.category.toLowerCase().includes(normalized) ||
          c.whatItMeans.toLowerCase().includes(normalized) ||
          c.services.some((s) => s.name.toLowerCase().includes(normalized)),
      )
    : categories;

  return (
    <>
      <div className="mt-10 max-w-xl">
        <label htmlFor="cloud-search" className="sr-only">
          Search cloud services
        </label>
        <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/50 px-5 py-3 transition focus-within:border-[#ff4d00]/40 focus-within:bg-white">
          <span className="text-black/35" aria-hidden="true">
            ⌕
          </span>
          <input
            id="cloud-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search categories or services - S3, Lambda, Cosmos DB…"
            className="w-full bg-transparent text-sm text-black placeholder:text-black/40 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-sm text-black/45">
          No categories match &ldquo;{query}&rdquo; yet.
        </p>
      ) : (
        <div className="mt-14 grid gap-5">
          {filtered.map((cat) => (
            <div
              key={cat.slug}
              id={cat.slug}
              className="scroll-mt-28 rounded-2xl border border-black/15 bg-white/40 p-6 sm:p-7"
            >
              <h3 className="text-lg font-semibold tracking-tight text-black">
                {cat.category}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/60">
                {cat.whatItMeans}
              </p>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                {PROVIDERS.map((provider) => (
                  <div
                    key={provider}
                    className={`rounded-xl border px-4 py-3 ${PROVIDER_STYLES[provider]}`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70">
                      {provider}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-tight text-black">
                      {serviceFor(cat, provider)}
                    </p>
                  </div>
                ))}
              </div>

              {cat.relatedTopicSlug && (
                <Link
                  href={`/topics/${cat.relatedTopicSlug}`}
                  className="mt-4 inline-block text-xs font-semibold text-[#ff4d00] underline decoration-[#ff4d00]/30 underline-offset-4 hover:decoration-[#ff4d00]"
                >
                  Read the full lesson →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function ServiceExplorer({ categories }: { categories: CloudServiceCategory[] }) {
  return (
    <Suspense fallback={<div className="mt-10 h-11.5 max-w-xl animate-pulse rounded-full bg-white/40" />}>
      <ServiceExplorerInner categories={categories} />
    </Suspense>
  );
}
