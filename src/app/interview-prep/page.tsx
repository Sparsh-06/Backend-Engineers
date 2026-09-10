import type { Metadata } from "next";
import Navbar from "@/modules/components/common/navbar";
import SiteFooter from "@/modules/components/common/site-footer";
import QuestionBank from "@/modules/layouts/interview-prep/question-bank";
import { interviewQuestions, getCoveredTopicSlugs } from "@/data/interview-questions";
import { topicGroupsFlat } from "@/data/topics";

export const metadata: Metadata = {
  title: "Backend Engineering Interview Questions",
  description:
    "Real backend engineering interview questions, leveled by role - SDE1, SDE2, and SDE3+/Senior - each tied to a full lesson, not a generic question list.",
  keywords: [
    "backend engineering interview questions",
    "system design interview questions",
    "sde1 interview questions",
    "sde2 interview questions",
    "senior backend interview questions",
    "backend interview prep",
    "system design interview prep",
    "rate limiting interview question",
    "lru cache interview question",
    "consistent hashing interview question",
  ],
  alternates: { canonical: "/interview-prep" },
  authors: [{ name: "Sparsh Sharma" }],
  creator: "Sparsh Sharma",
  publisher: "Backend Engineer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Backend Engineering Interview Questions",
    description:
      "Real backend engineering interview questions, leveled by role - SDE1, SDE2, and SDE3+/Senior - each tied to a full lesson.",
    url: "/interview-prep",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineering Interview Questions",
    description:
      "Real backend engineering interview questions, leveled by role, each tied to a full lesson.",
  },
};

const topicSlugs = getCoveredTopicSlugs();
const topics = topicGroupsFlat
  .filter((t) => topicSlugs.includes(t.slug))
  .map((t) => ({
    slug: t.slug,
    title: t.title,
    phase: t.phase,
    groupTitle: t.groupTitle,
  }));

const interviewSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: interviewQuestions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })),
};

export default function InterviewPrepPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(interviewSchema) }}
      />
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            Interview prep
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            The questions, leveled by role.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/60">
            {interviewQuestions.length} real questions across {topics.length}{" "}
            topics, each one tagged for SDE1, SDE2, or SDE3+/Senior - because
            &ldquo;explain rate limiting&rdquo; means something different
            depending on who&rsquo;s asking. Every question links back to the
            full lesson behind it.
          </p>
          <QuestionBank questions={interviewQuestions} topics={topics} />
        </div>
      </section>
      <SiteFooter note="More topics get interview questions as the curriculum grows." />
    </main>
  );
}
