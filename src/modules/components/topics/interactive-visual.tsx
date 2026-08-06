import type { TopicVisual } from "@/data/topics";
import MemoryMap from "@/modules/components/topics/visuals/memory-map";
import RequestFlow from "@/modules/components/topics/visuals/request-flow";
import Comparison from "@/modules/components/topics/visuals/comparison";
import Timeline from "@/modules/components/topics/visuals/timeline";

export default function InteractiveVisual({ visual }: { visual: TopicVisual }) {
  return (
    <figure className="mt-10 mb-10 border-b border-black/15 pb-7" aria-labelledby="visual-title">
      <figcaption id="visual-title">
        <p className="article-kicker text-[#ff4d00]">Interactive example</p>
        <h2 className="mb-2!">{visual.title}</h2>
        <p className="mb-5! max-w-xl text-sm leading-relaxed text-black/60">{visual.description}</p>
      </figcaption>
      {visual.type === "memory-map" && <MemoryMap visual={visual} />}
      {visual.type === "request-flow" && <RequestFlow visual={visual} />}
      {visual.type === "comparison" && <Comparison visual={visual} />}
      {visual.type === "timeline" && <Timeline visual={visual} />}
    </figure>
  );
}
