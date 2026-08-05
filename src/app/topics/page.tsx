import type { Metadata } from "next";
import TopicsHub from "@/modules/layouts/topics";

export const metadata: Metadata = {
  title: "Backend Engineering Topics",
  description:
    "A searchable learning hub for backend engineering topics, system design, cloud infrastructure, databases, and observability.",
};

export default function TopicsPage() {
  return <TopicsHub />;
}
