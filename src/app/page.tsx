import type { Metadata } from "next";
import Home from "@/modules/layouts/home";

export const metadata: Metadata = {
  title: "Backend Engineering, Visualized",
  description:
    "A visual-first backend engineering platform covering concepts, cloud, architecture, and field notes with SEO-friendly guides and interactive explainers.",
};

export default function Page() {
  return <Home />;
}
