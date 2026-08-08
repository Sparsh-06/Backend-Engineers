export type GlossaryTerm = {
  term: string;
  slug: string;
  definition: string;
  /** Slug of a full topic lesson on this term, if one exists. */
  relatedTopicSlug?: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "API",
    slug: "api",
    definition:
      "A defined way for one piece of code to ask another to do something, without needing to know how it happens internally. Not a specific technology - a function signature, a library's exports, and a REST endpoint are all APIs.",
    relatedTopicSlug: "what-is-an-api",
  },
  {
    term: "Backpressure",
    slug: "backpressure",
    definition:
      "What happens when a fast producer sends data faster than a slow consumer can process it. Without a mechanism to signal 'slow down,' the unconsumed data piles up in memory until something breaks.",
    relatedTopicSlug: "nodejs-streams",
  },
  {
    term: "Blocking",
    slug: "blocking",
    definition:
      "A function call that stops all other work until it finishes - like a phone call where you wait in silence for an answer. The opposite of non-blocking, where you start the work and move on immediately.",
    relatedTopicSlug: "sync-vs-async",
  },
  {
    term: "Cache",
    slug: "cache",
    definition:
      "A copy of data kept somewhere faster to read from than its original source, so repeated requests don't have to pay the full cost every time. Deliberately allowed to be wrong or empty - a cache miss should never be treated as an error.",
    relatedTopicSlug: "backend-components",
  },
  {
    term: "Client-server model",
    slug: "client-server-model",
    definition:
      "The basic shape of almost every network interaction: whoever asks is the client, whoever answers is the server. Roles, not fixed machines - the same program can be both depending on which direction you look.",
    relatedTopicSlug: "client-server-model",
  },
  {
    term: "Concurrency",
    slug: "concurrency",
    definition:
      "Multiple tasks in progress at once, not necessarily happening at the exact same instant - like juggling several conversations by switching between them. Different from parallelism, which means truly simultaneous.",
    relatedTopicSlug: "sync-vs-async",
  },
  {
    term: "DNS",
    slug: "dns",
    definition:
      "The system that turns a human-readable hostname into the numeric IP address computers actually use to route traffic. The internet's phonebook, distributed across a chain of servers rather than kept in one place.",
    relatedTopicSlug: "url-to-response",
  },
  {
    term: "Event loop",
    slug: "event-loop",
    definition:
      "The mechanism that lets a single-threaded runtime like Node.js handle many operations at once by never sitting idle - it starts slow work, moves on, and comes back when a result is ready.",
    relatedTopicSlug: "nodejs-event-loop",
  },
  {
    term: "Garbage collection",
    slug: "garbage-collection",
    definition:
      "The automatic process of reclaiming memory that's no longer reachable by any part of a running program, so developers don't have to manually free it. A memory leak happens when code keeps a reference to something it's actually done with.",
    relatedTopicSlug: "nodejs-gc",
  },
  {
    term: "Idempotency",
    slug: "idempotency",
    definition:
      "The property of an operation where doing it multiple times has the same effect as doing it once - like pressing an elevator button repeatedly. Critical for safely retrying requests over an unreliable network.",
    relatedTopicSlug: "idempotency",
  },
  {
    term: "Latency",
    slug: "latency",
    definition:
      "How long one specific operation takes to complete, from request to response. Different from throughput, which measures total work done over time - a system can be excellent at one and mediocre at the other.",
    relatedTopicSlug: "latency-vs-throughput",
  },
  {
    term: "Load balancer",
    slug: "load-balancer",
    definition:
      "A component that sits in front of multiple servers and distributes incoming requests across them, so no single machine gets overwhelmed and a crashed instance doesn't take the whole system down.",
  },
  {
    term: "Message queue",
    slug: "message-queue",
    definition:
      "A component that lets one part of a system hand off work to another without waiting for it to finish immediately - the sender moves on right away, and a separate worker processes the job whenever it gets to it.",
    relatedTopicSlug: "backend-components",
  },
  {
    term: "Middleware",
    slug: "middleware",
    definition:
      "Code that runs between a request arriving and your actual logic handling it - checking auth, logging, parsing the body. A pipeline of small steps a request passes through before reaching its final handler.",
    relatedTopicSlug: "what-is-middleware",
  },
  {
    term: "P99 latency",
    slug: "p99-latency",
    definition:
      "The response time below which 99% of requests complete. A more honest performance number than an average, because averages hide how badly the slowest fraction of requests are actually doing.",
    relatedTopicSlug: "latency-vs-throughput",
  },
  {
    term: "Rate limiting",
    slug: "rate-limiting",
    definition:
      "Deliberately capping how many requests a client can make in a given time window, to keep a shared system fair and stable instead of letting one client's traffic degrade it for everyone else.",
  },
  {
    term: "Sharding",
    slug: "sharding",
    definition:
      "Splitting a single large database into multiple smaller pieces, each holding a subset of the data, so no one machine has to hold or serve all of it. Usually split by some key, like user ID or region.",
  },
  {
    term: "Socket",
    slug: "socket",
    definition:
      "The live, two-way connection between one specific client and a server. A port routes traffic to a process; a socket is the individual, ongoing conversation happening on top of that port.",
    relatedTopicSlug: "what-is-a-server",
  },
  {
    term: "Statelessness",
    slug: "statelessness",
    definition:
      "A design where no individual server process is the only place that remembers something about a client. State gets pushed to the client (a token) or shared storage (Redis, a database), so any server can handle any request.",
    relatedTopicSlug: "statelessness",
  },
  {
    term: "Throughput",
    slug: "throughput",
    definition:
      "The total amount of work a system completes over a given period - requests per second, jobs processed per hour. Optimizing for throughput can sometimes make individual latency worse, and vice versa.",
    relatedTopicSlug: "latency-vs-throughput",
  },
  {
    term: "TLS handshake",
    slug: "tls-handshake",
    definition:
      "The exchange that happens right after a connection opens, where a client and server agree on encryption keys before any real data is sent - the reason HTTPS costs a bit more time upfront than plain HTTP.",
    relatedTopicSlug: "url-to-response",
  },
  {
    term: "Worker thread",
    slug: "worker-thread",
    definition:
      "A separate JavaScript thread inside the same process, used to run CPU-heavy work without freezing the main event loop. Different from spinning up more processes (Cluster), which duplicates the whole app instead.",
    relatedTopicSlug: "nodejs-worker-threads",
  },
];

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((entry) => entry.slug === slug);
}
