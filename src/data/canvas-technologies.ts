import type { CanvasComponentType } from "./canvas-component-types";

export interface CanvasTechnologyDef {
  id: string;
  type: CanvasComponentType;
  label: string;
  /** Multiplies the role's baseCapacityRps. 1 = same as the generic role default. */
  capacityMultiplier: number;
  /** Added processing/access latency in ms for one hop through this node, at "medium" tier. */
  latencyMs: number;
  /** Illustrative $/mo for one "medium" tier instance, before tier/instance scaling. */
  costPerInstanceMonthly: number;
  /** 1-2 short, factually-defensible teaching notes. No fabricated numbers. */
  tips: string[];
}

export const canvasTechnologies: CanvasTechnologyDef[] = [
  {
    id: "cloudflare",
    type: "cdn",
    label: "Cloudflare",
    capacityMultiplier: 1.2,
    latencyMs: 5,
    costPerInstanceMonthly: 20,
    tips: [
      "Cache behavior is controlled by cache-control headers and page rules - a misconfigured header is the most common reason a CDN 'isn't caching.'",
    ],
  },
  {
    id: "cloudfront",
    type: "cdn",
    label: "CloudFront",
    capacityMultiplier: 1.0,
    latencyMs: 8,
    costPerInstanceMonthly: 30,
    tips: [
      "Pricing is pay-per-request and per-GB transferred, so real cost scales with traffic more directly than a flat monthly number.",
    ],
  },
  {
    id: "nginx",
    type: "load-balancer",
    label: "Nginx",
    capacityMultiplier: 1.0,
    latencyMs: 2,
    costPerInstanceMonthly: 15,
    tips: [
      "Self-managed - you're responsible for the box's own availability, which is why a single instance is flagged as a SPOF here.",
      "Layer 7 (HTTP-aware) routing lets it route by path or header, not just forward raw TCP connections.",
    ],
  },
  {
    id: "haproxy",
    type: "load-balancer",
    label: "HAProxy",
    capacityMultiplier: 1.3,
    latencyMs: 1.5,
    costPerInstanceMonthly: 15,
    tips: [
      "Known for low overhead and a detailed runtime stats page, at the cost of a steeper configuration syntax than Nginx.",
    ],
  },
  {
    id: "alb",
    type: "load-balancer",
    label: "AWS ALB",
    capacityMultiplier: 1.5,
    latencyMs: 3,
    costPerInstanceMonthly: 25,
    tips: [
      "Managed by AWS - its own scaling and failover are handled for you, so a single 'instance' of it is less of a real SPOF than the generic model here assumes.",
      "Billed per hour plus per load-balancer capacity unit, so cost grows with traffic rather than staying flat.",
    ],
  },
  {
    id: "nodejs",
    type: "app-server",
    label: "Node.js",
    capacityMultiplier: 1.0,
    latencyMs: 4,
    costPerInstanceMonthly: 25,
    tips: [
      "Single-threaded event loop - a CPU-bound request (heavy computation, parsing a huge payload) blocks every other request on that process until it finishes.",
      "I/O-bound workloads, the common case for a typical API, get good throughput per process because the event loop isn't blocked waiting on network or disk.",
    ],
  },
  {
    id: "python",
    type: "app-server",
    label: "Python",
    capacityMultiplier: 0.6,
    latencyMs: 6,
    costPerInstanceMonthly: 25,
    tips: [
      "The GIL means one process uses effectively one core for CPU-bound work, so horizontal scaling (more processes) matters more here than for runtimes without it.",
      "Async frameworks (FastAPI, aiohttp) narrow this gap specifically for I/O-bound endpoints, not CPU-bound ones.",
    ],
  },
  {
    id: "go",
    type: "app-server",
    label: "Go",
    capacityMultiplier: 1.8,
    latencyMs: 2,
    costPerInstanceMonthly: 25,
    tips: [
      "Goroutines are cheap enough that a single process can hold many concurrent connections without hitting the per-process ceiling other runtimes run into.",
      "Compiled and statically typed, so a class of errors that surface at runtime in dynamic languages gets caught before deploy.",
    ],
  },
  {
    id: "java",
    type: "app-server",
    label: "Java",
    capacityMultiplier: 1.4,
    latencyMs: 5,
    costPerInstanceMonthly: 30,
    tips: [
      "JIT warm-up means throughput ramps up after startup - the steady-state number modeled here doesn't capture cold-start behavior.",
      "GC tuning is a real lever on this platform - a misconfigured heap is a common source of latency spikes under load.",
    ],
  },
  {
    id: "redis",
    type: "cache",
    label: "Redis",
    capacityMultiplier: 1.0,
    latencyMs: 0.5,
    costPerInstanceMonthly: 15,
    tips: [
      "In-memory by default - data is lost on restart unless RDB snapshots or AOF persistence are explicitly configured.",
      "Single-threaded for command execution, so one slow command (a large KEYS scan, for example) blocks everything else on that instance.",
    ],
  },
  {
    id: "memcached",
    type: "cache",
    label: "Memcached",
    capacityMultiplier: 1.1,
    latencyMs: 0.4,
    costPerInstanceMonthly: 12,
    tips: [
      "Pure cache with no persistence option at all - a restart always means starting from an empty cache.",
      "Multi-threaded, which can give it an edge over Redis for simple key-value workloads on multi-core machines.",
    ],
  },
  {
    id: "kafka",
    type: "queue",
    label: "Kafka",
    capacityMultiplier: 1.5,
    latencyMs: 3,
    costPerInstanceMonthly: 40,
    tips: [
      "Ordering is only guaranteed within a partition - messages across partitions can be processed out of order, which is why partition-key choice matters.",
      "Designed to retain messages for a configured window rather than deleting them on consume, so consumers can replay history.",
    ],
  },
  {
    id: "rabbitmq",
    type: "queue",
    label: "RabbitMQ",
    capacityMultiplier: 1.0,
    latencyMs: 2,
    costPerInstanceMonthly: 25,
    tips: [
      "A message is typically removed once acknowledged - it's a traditional queue model, not a replayable log like Kafka.",
      "Exchanges and bindings let you do routing (fan-out, topic-based) that's harder to express with a plain FIFO queue.",
    ],
  },
  {
    id: "sqs",
    type: "queue",
    label: "AWS SQS",
    capacityMultiplier: 1.2,
    latencyMs: 10,
    costPerInstanceMonthly: 10,
    tips: [
      "Standard queues (the default) give at-least-once delivery and best-effort ordering - use a FIFO queue if strict ordering is required.",
      "Fully managed, so the instance-count framing here is more about logical throughput than a physical box you'd need to keep alive yourself.",
    ],
  },
  {
    id: "postgresql",
    type: "database",
    label: "PostgreSQL",
    capacityMultiplier: 1.0,
    latencyMs: 5,
    costPerInstanceMonthly: 30,
    tips: [
      "Schema enforcement catches a lot of data-integrity bugs at write time that a schemaless store would let through silently.",
      "Vertical scaling (a bigger instance) is far easier than horizontal - sharding a relational database is a real engineering project, not a config flag.",
    ],
  },
  {
    id: "mysql",
    type: "database",
    label: "MySQL",
    capacityMultiplier: 1.0,
    latencyMs: 5,
    costPerInstanceMonthly: 28,
    tips: [
      "Shares Postgres's relational guarantees broadly, but replication topology and storage engine choice change behavior under load in ways that are easy to overlook.",
    ],
  },
  {
    id: "mongodb",
    type: "database",
    label: "MongoDB",
    capacityMultiplier: 1.2,
    latencyMs: 4,
    costPerInstanceMonthly: 35,
    tips: [
      "Schema flexibility means a field's type or presence can drift across documents over time - bugs a relational schema would catch at write time show up later instead.",
      "Horizontal scaling (sharding) is a first-class, built-in feature, unlike bolting sharding onto a relational database after the fact.",
    ],
  },
  {
    id: "dynamodb",
    type: "database",
    label: "DynamoDB",
    capacityMultiplier: 1.6,
    latencyMs: 6,
    costPerInstanceMonthly: 20,
    tips: [
      "Fully managed and scales horizontally by design, but access patterns are constrained by the partition/sort key chosen at table-design time - adding a new query pattern later isn't free.",
      "Pay-per-request or provisioned-capacity pricing means real cost is traffic-shaped, unlike the flat number modeled here.",
    ],
  },
];

const techIndex = new Map(canvasTechnologies.map((tech) => [tech.id, tech]));

export function getTechnologyDef(id: string | undefined): CanvasTechnologyDef | undefined {
  return id ? techIndex.get(id) : undefined;
}

export function getTechnologiesForType(type: CanvasComponentType): CanvasTechnologyDef[] {
  return canvasTechnologies.filter((tech) => tech.type === type);
}
