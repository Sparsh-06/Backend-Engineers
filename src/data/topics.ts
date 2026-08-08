export type TopicItem = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  phase: string;
  visual?: TopicVisual;
};

export type MemoryMapVisual = {
  type: "memory-map";
  title: string;
  description: string;
  items: {
    label: string;
    location: "stack" | "heap";
    detail: string;
  }[];
};

export type RequestFlowNode = {
  id: string;
  label: string;
  /** Position within a 340x192 canvas. */
  x: number;
  y: number;
  emphasis?: boolean;
};

export type RequestFlowVisual = {
  type: "request-flow";
  title: string;
  description: string;
  /** The node id requests originate from. */
  sourceId: string;
  nodes: RequestFlowNode[];
  /** Default path, drawn/animated at rest - a list of node ids. */
  defaultPath: string[];
  /** Path shown when the visual is hovered/activated - a list of node ids. */
  activePath: string[];
  hint: string;
  detail: string;
};

export type ComparisonVisual = {
  type: "comparison";
  title: string;
  description: string;
  left: {
    label: string;
    summary: string;
    points: string[];
  };
  right: {
    label: string;
    summary: string;
    points: string[];
  };
};

export type TimelineVisual = {
  type: "timeline";
  title: string;
  description: string;
  steps: {
    label: string;
    detail: string;
  }[];
};

export type TopicVisual =
  | MemoryMapVisual
  | RequestFlowVisual
  | ComparisonVisual
  | TimelineVisual;

export type TopicGroup = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  keywords: string[];
  topics: TopicItem[];
};

const publishedTopicSlugs = new Set([
  "what-is-a-server",
  "client-server-model",
  "url-to-response",
  "http-basics",
  "statelessness",
  "who-owns-what",
  "what-is-an-api",
  "sync-vs-async",
  "json-and-serialization",
  "idempotency",
  "backend-components",
  "environment-variables",
  "what-is-middleware",
  "latency-vs-throughput",
  "nodejs-event-loop",
  "nodejs-async-io",
  "nodejs-worker-threads",
  "nodejs-streams",
  "nodejs-gc",
]);

export const topicGroups: TopicGroup[] = [
  {
    slug: "backend-fundamentals",
    title: "Backend fundamentals, before the deep dives",
    description:
      "The plain-English basics that most tutorials assume you already know - what a server actually is, how a request becomes a response, and who is responsible for what.",
    intro:
      "Start here if terms like process, port, or stateless feel fuzzy. Everything later in this curriculum leans on these ideas.",
    keywords: ["client-server model", "HTTP basics", "request lifecycle", "statelessness"],
    topics: [
      {
        slug: "what-is-a-server",
        title: "What is a server, really?",
        description:
          "A server is just a program. See what a process, a port, and a socket actually are underneath the word 'server'.",
        keywords: [
          "what is a server",
          "what is a port in networking",
          "process vs thread vs socket",
          "how does a server work",
          "what does listening on a port mean",
          "server",
          "port",
          "socket",
          "process",
          "localhost",
          "TCP socket",
          "EADDRINUSE",
          "web server basics",
          "backend server",
          "how servers handle requests",
        ],
        phase: "Phase 0",
        visual: {
          type: "request-flow",
          title: "One request, one socket",
          description: "Hover to see a second client connect. Both share the same port, but get their own socket.",
          sourceId: "client-a",
          nodes: [
            { id: "client-a", label: "Client A", x: 30, y: 96 },
            { id: "port", label: "Port 3000", x: 150, y: 96, emphasis: true },
            { id: "process", label: "Process", x: 260, y: 60 },
            { id: "client-b", label: "Client B", x: 30, y: 150 },
          ],
          defaultPath: ["client-a", "port", "process"],
          activePath: ["client-b", "port", "process"],
          hint: "hover to add client b",
          detail: "Both clients talk to the same port, but the operating system tracks each connection as its own socket. One process, one port, many simultaneous sockets.",
        },
      },
      {
        slug: "client-server-model",
        title: "The client-server model and the request-response cycle",
        description:
          "How a client asks for something, how a server answers, and why almost everything in backend engineering builds on this one exchange.",
        keywords: [
          "client-server model explained",
          "request-response cycle",
          "how do APIs work",
          "client vs server",
          "what is an API",
          "client-server architecture",
          "API basics",
          "REST",
          "GraphQL",
          "gRPC",
          "idempotency",
          "request lifecycle",
          "backend API",
          "networking basics",
          "how backend works",
        ],
        phase: "Phase 0",
      },
      {
        slug: "url-to-response",
        title: "What happens when you type a URL and hit enter",
        description:
          "Follow one request end to end - DNS lookup, connecting to a server, and getting a response back in your browser.",
        keywords: [
          "what happens when you type a url",
          "how DNS works",
          "how does the internet work",
          "TCP TLS HTTP request flow",
          "DNS lookup explained",
          "DNS",
          "TCP",
          "TLS handshake",
          "HTTPS",
          "URL",
          "DNS resolver",
          "how the web works",
          "networking fundamentals",
          "page load sequence",
          "browser to server",
        ],
        phase: "Phase 0",
        visual: {
          type: "timeline",
          title: "From URL to rendered page",
          description: "Step through what happens between hitting enter and seeing a page.",
          steps: [
            { label: "DNS lookup", detail: "The browser asks a DNS resolver to turn the hostname into an IP address, checking caches first." },
            { label: "TCP connection", detail: "The browser opens a TCP connection to that IP address, usually on port 443." },
            { label: "TLS handshake", detail: "Browser and server agree on encryption keys so the conversation that follows is private." },
            { label: "HTTP request", detail: "The browser sends an HTTP request for the specific path in the URL." },
            { label: "HTTP response", detail: "The server processes the request and sends back a status code, headers, and a body." },
            { label: "Render", detail: "The browser parses the response and renders it, fetching any additional resources it needs along the way." },
          ],
        },
      },
      {
        slug: "http-basics",
        title: "HTTP basics: methods, status codes, and headers",
        description:
          "The vocabulary every API speaks - what GET and POST actually mean, why status codes exist, and what headers carry along for the ride.",
        keywords: [
          "HTTP methods explained",
          "HTTP status codes explained",
          "what are HTTP headers",
          "GET vs POST",
          "HTTP status code list",
          "HTTP",
          "status codes",
          "headers",
          "REST methods",
          "404 error meaning",
          "500 error meaning",
          "Content-Type header",
          "Authorization header",
          "API vocabulary",
          "HTTP request format",
        ],
        phase: "Phase 0",
      },
      {
        slug: "statelessness",
        title: "Statelessness and why it matters",
        description:
          "Why servers are built to forget you between requests, and what that trade-off buys you later when a system needs to scale.",
        keywords: [
          "what is a stateless server",
          "stateful vs stateless",
          "why is HTTP stateless",
          "sessions vs tokens",
          "how does horizontal scaling work",
          "statelessness",
          "stateless",
          "stateful",
          "sessions",
          "JWT",
          "cookies",
          "Redis session store",
          "load balancing basics",
          "scaling a backend",
          "authentication basics",
        ],
        phase: "Phase 0",
        visual: {
          type: "comparison",
          title: "Stateful vs stateless servers",
          description: "See what breaks when a second server enters the picture.",
          left: {
            label: "Stateful",
            summary: "The server remembers you in its own local memory.",
            points: [
              "Fast to build for a single server.",
              "Breaks if that process crashes or restarts.",
              "A second server has no idea who you are.",
              "Hard to scale horizontally without 'sticky' routing.",
            ],
          },
          right: {
            label: "Stateless",
            summary: "The server remembers nothing; the client or shared storage carries identity.",
            points: [
              "Any server can handle any request.",
              "A crashed process loses nothing about you.",
              "Identity travels via a token or a shared store like Redis.",
              "This is what makes horizontal scaling possible.",
            ],
          },
        },
      },
      {
        slug: "who-owns-what",
        title: "Frontend vs backend vs infra: who owns what",
        description:
          "A clear map of where frontend code ends, where backend logic lives, and where infrastructure takes over.",
        keywords: [
          "frontend vs backend",
          "what does a backend engineer do",
          "backend vs infrastructure",
          "who owns what in software engineering",
          "what is DevOps vs backend",
          "frontend",
          "backend",
          "infrastructure",
          "DevOps",
          "software engineering roles",
          "full stack vs backend",
          "backend engineer",
          "backend developer",
          "system design roles",
          "engineering team structure",
        ],
        phase: "Phase 0",
      },
      {
        slug: "what-is-an-api",
        title: "What is an API, really?",
        description:
          "An API isn't a technology. See what actually separates an API from a library, and from a framework.",
        keywords: [
          "what is an api",
          "api vs library vs framework",
          "what does api stand for",
          "api explained for beginners",
          "how do apis actually work",
          "API",
          "library",
          "framework",
          "SDK",
          "interface",
          "contract",
          "public API",
          "internal API",
          "api documentation",
          "rest api basics",
        ],
        phase: "Phase 0",
      },
      {
        slug: "sync-vs-async",
        title: "Synchronous vs asynchronous, before you touch code",
        description:
          "The idea underneath every async keyword in every language, explained without a single line of code first.",
        keywords: [
          "synchronous vs asynchronous explained",
          "what does async mean",
          "blocking vs non-blocking",
          "sync vs async simple explanation",
          "asynchronous programming for beginners",
          "synchronous",
          "asynchronous",
          "concurrency",
          "parallelism",
          "callback",
          "blocking call",
          "non-blocking call",
          "async await",
          "event driven",
          "task queue",
        ],
        phase: "Phase 0",
      },
      {
        slug: "json-and-serialization",
        title: "JSON and data serialization, explained simply",
        description:
          "Why data has to be flattened into text before it can travel anywhere, and what gets lost along the way.",
        keywords: [
          "what is json",
          "what is serialization",
          "json explained for beginners",
          "why do apis use json",
          "serialization vs deserialization",
          "JSON",
          "serialization",
          "deserialization",
          "data format",
          "XML vs JSON",
          "marshalling",
          "schema",
          "data types over the network",
          "content negotiation",
          "binary formats",
        ],
        phase: "Phase 0",
      },
      {
        slug: "idempotency",
        title: "Idempotency: why it matters more than you think",
        description:
          "What it means for an action to be safe to repeat, and why every retry, payment, and webhook depends on it.",
        keywords: [
          "what is idempotency",
          "idempotent api explained",
          "why is idempotency important",
          "idempotency key explained",
          "idempotent vs non-idempotent",
          "idempotency",
          "idempotency key",
          "retries",
          "duplicate requests",
          "at-least-once delivery",
          "safe methods",
          "payment retries",
          "webhook reliability",
          "PUT vs POST idempotency",
          "distributed systems reliability",
        ],
        phase: "Phase 0",
      },
      {
        slug: "backend-components",
        title: "What is \"the backend\" actually made of?",
        description:
          "Unpack the word backend into its real parts: the app server, the database, the cache, and the queue.",
        keywords: [
          "what is the backend made of",
          "backend architecture explained",
          "app server vs database vs cache",
          "what is a backend stack",
          "backend components explained",
          "application server",
          "database",
          "cache",
          "message queue",
          "backend stack",
          "backend architecture",
          "three tier architecture",
          "server-side components",
          "backend infrastructure",
          "what runs on a backend server",
        ],
        phase: "Phase 0",
      },
      {
        slug: "environment-variables",
        title: "Environment variables and configuration, done right",
        description:
          "Where secrets and settings actually belong, and why hardcoding them into your code is a problem waiting to happen.",
        keywords: [
          "what are environment variables",
          "env variables explained",
          "how to store secrets safely",
          ".env file explained",
          "configuration management backend",
          "environment variables",
          ".env file",
          "secrets management",
          "config management",
          "twelve factor app",
          "API keys",
          "hardcoded secrets",
          "dotenv",
          "staging vs production config",
          "environment-specific config",
        ],
        phase: "Phase 0",
      },
      {
        slug: "what-is-middleware",
        title: "What is middleware, really?",
        description:
          "The code that runs between a request arriving and your logic handling it, and why almost everything routes through it.",
        keywords: [
          "what is middleware",
          "middleware explained for beginners",
          "middleware vs handler",
          "express middleware explained",
          "how does middleware work",
          "middleware",
          "request pipeline",
          "handler",
          "next()",
          "auth middleware",
          "logging middleware",
          "middleware chain",
          "interceptor",
          "request lifecycle",
          "api middleware",
        ],
        phase: "Phase 0",
      },
      {
        slug: "latency-vs-throughput",
        title: "Latency vs throughput: the tradeoff nobody names",
        description:
          "Two different numbers that both mean \"fast,\" and why optimizing one can quietly make the other worse.",
        keywords: [
          "latency vs throughput explained",
          "what is latency",
          "what is throughput",
          "latency vs throughput difference",
          "how to improve api performance",
          "latency",
          "throughput",
          "response time",
          "requests per second",
          "p99 latency",
          "performance tradeoffs",
          "queueing theory basics",
          "system performance",
          "api performance",
          "scalability tradeoffs",
        ],
        phase: "Phase 0",
      },
    ],
  },
  {
    slug: "language-runtimes",
    title: "Language runtimes and execution mechanics",
    description:
      "A plain-English look at how popular backend languages run your code, share work, and use memory.",
    intro:
      "Start here to understand why code can behave differently when many people use it at once.",
    keywords: ["Node.js", "Go runtime", "Python async", "JVM performance"],
    topics: [
      {
        slug: "nodejs-event-loop",
        title: "Node.js event loop",
        description:
          "See how Node.js keeps handling work without waiting for every slow task to finish.",
        keywords: [
          "what is the event loop",
          "node js event loop explained",
          "microtasks vs macrotasks",
          "how does node js handle concurrency",
          "event loop phases explained",
          "event loop",
          "microtasks",
          "macrotasks",
          "libuv",
          "call stack",
          "process.nextTick",
          "setTimeout vs promise",
          "node js internals",
          "single threaded javascript",
          "non-blocking node js",
        ],
        phase: "Phase 1",
      },
      {
        slug: "nodejs-async-io",
        title: "Asynchronous and non-blocking I/O",
        description:
          "How Node.js starts slow work, such as reading a file, and keeps doing other things while it waits.",
        keywords: [
          "what is non-blocking io",
          "async io node js explained",
          "how does libuv work",
          "callbacks vs promises vs async await",
          "node js thread pool explained",
          "async I/O",
          "libuv",
          "non-blocking I/O",
          "callbacks",
          "promises",
          "async/await",
          "UV_THREADPOOL_SIZE",
          "node js performance",
          "blocking vs non-blocking",
          "concurrent requests node js",
        ],
        phase: "Phase 1",
      },
      {
        slug: "nodejs-worker-threads",
        title: "Concurrency primitives in Node.js",
        description:
          "When one Node.js process is enough, and when it helps to give heavy work its own worker.",
        keywords: [
          "worker threads vs cluster node js",
          "how to handle cpu-bound tasks in node js",
          "node js multithreading explained",
          "when to use worker threads",
          "node js cluster module explained",
          "Cluster",
          "Worker Threads",
          "CPU-bound",
          "SharedArrayBuffer",
          "multithreading",
          "load balancing node js",
          "node js scaling",
          "process isolation",
          "concurrency primitives",
          "node js performance tuning",
        ],
        phase: "Phase 1",
      },
      {
        slug: "nodejs-streams",
        title: "Streams and buffer management",
        description:
          "How to move large amounts of data in small pieces without using too much memory.",
        keywords: [
          "what are node js streams",
          "how does backpressure work",
          "node js streams explained",
          "readable vs writable streams",
          "how to stream large files node js",
          "streams",
          "backpressure",
          "buffer management",
          "pipe",
          "Buffer",
          "transform stream",
          "duplex stream",
          "memory efficient file handling",
          "node js file streaming",
          "large file upload node js",
        ],
        phase: "Phase 1",
      },
      {
        slug: "nodejs-gc",
        title: "Memory management and garbage collection",
        description:
          "How Node.js cleans up unused memory, and how to spot when something is being kept by mistake.",
        keywords: [
          "how does garbage collection work in node js",
          "what causes a memory leak in node js",
          "v8 garbage collection explained",
          "how to find a memory leak in node js",
          "node js heap memory explained",
          "V8",
          "garbage collection",
          "memory leaks",
          "heap snapshot",
          "mark and sweep",
          "process.memoryUsage",
          "WeakMap",
          "node js memory management",
          "debugging node js memory",
          "node js performance profiling",
        ],
        phase: "Phase 1",
      },
      {
        slug: "go-scheduler",
        title: "The Go scheduler",
        description:
          "How Go shares many small jobs across the computer's available workers.",
        keywords: ["goroutines", "scheduler", "GMP model"],
        phase: "Phase 1",
      },
      {
        slug: "go-channels",
        title: "Channels and CSP concurrency",
        description:
          "How Go jobs can safely pass messages to one another and avoid stepping on each other.",
        keywords: ["channels", "CSP", "select", "race conditions"],
        phase: "Phase 1",
      },
      {
        slug: "go-memory",
        title: "Memory allocation and pointers in Go",
        description:
          "Learn where Go keeps values in memory, and why some values need to live longer than others.",
        keywords: ["escape analysis", "stack", "heap", "pointers"],
        phase: "Phase 1",
        visual: {
          type: "memory-map",
          title: "Try a tiny memory map",
          description: "Pick a value to see where Go is likely to keep it and why.",
          items: [
            { label: "pageCount", location: "stack", detail: "This value belongs only to the current function call, so it can be cleaned up when that call ends." },
            { label: "user profile", location: "heap", detail: "This value is still needed after the current function returns, so Go keeps it somewhere that can outlive the call." },
            { label: "request ID", location: "stack", detail: "A small value used only while this request is being handled can usually stay close to the active work." },
          ],
        },
      },
      {
        slug: "python-gil",
        title: "Python async IO and the GIL",
        description:
          "How Python handles many waiting tasks, and what its main lock means for threaded work.",
        keywords: ["asyncio", "GIL", "WSGI", "ASGI"],
        phase: "Phase 1",
      },
      {
        slug: "jvm-threads",
        title: "Threading models in Java and Kotlin",
        description:
          "A simple comparison of the older and newer ways Java and Kotlin can run many tasks at once.",
        keywords: ["virtual threads", "Java 21", "Project Loom"],
        phase: "Phase 1",
      },
    ],
  },
  {
    slug: "protocols-and-apis",
    title: "Protocols, APIs, and networking",
    description:
      "How a request travels between a user and your backend, from a web address to a response.",
    intro:
      "Learn how apps talk to servers, how APIs are shaped, and how you keep that traffic safe.",
    keywords: ["HTTP", "REST", "GraphQL", "gRPC", "WebSockets"],
    topics: [
      {
        slug: "tcp-ip-tls",
        title: "OSI, TCP/IP, and TLS",
        description:
          "Follow a request from the internet connection to a private, secure conversation with a server.",
        keywords: ["TCP", "TLS 1.3", "OSI model"],
        phase: "Phase 2",
      },
      {
        slug: "http-evolution",
        title: "HTTP 1.1, HTTP 2, and HTTP 3",
        description:
          "See how each newer HTTP version helps websites load and respond more smoothly.",
        keywords: ["HTTP/2", "HTTP/3", "QUIC", "keep-alive"],
        phase: "Phase 2",
      },
      {
        slug: "rest-openapi",
        title: "REST and OpenAPI",
        description:
          "Learn to make APIs that are predictable, clear to use, and safe to call more than once.",
        keywords: ["REST", "OpenAPI", "idempotency"],
        phase: "Phase 2",
      },
      {
        slug: "graphql",
        title: "GraphQL",
        description:
          "Ask an API for exactly the data you need, while avoiding slow or overly expensive requests.",
        keywords: ["GraphQL", "resolvers", "N+1"],
        phase: "Phase 2",
      },
      {
        slug: "grpc-protobuf",
        title: "gRPC and Protocol Buffers",
        description:
          "A faster way for services to talk to each other using a clear shared format.",
        keywords: ["gRPC", "protobuf", "streaming"],
        phase: "Phase 2",
      },
      {
        slug: "realtime-communication",
        title: "Real-time communication",
        description:
          "Choose the right way to send live updates, such as chat messages or delivery status.",
        keywords: ["WebSockets", "SSE", "long polling"],
        phase: "Phase 2",
      },
      {
        slug: "proxies",
        title: "Reverse and forward proxies",
        description:
          "Understand the helpful middle layer that receives traffic before it reaches your app.",
        keywords: ["reverse proxy", "forward proxy", "Envoy"],
        phase: "Phase 2",
      },
      {
        slug: "api-gateway",
        title: "API gateways",
        description:
          "Use one front door to route requests, check access, and keep backend services simpler.",
        keywords: ["API gateway", "routing", "authentication offloading"],
        phase: "Phase 2",
      },
      {
        slug: "auth-and-security",
        title: "Authentication and security standards",
        description:
          "Learn the basics of signing people in, giving them the right access, and protecting common weak spots.",
        keywords: ["JWT", "OAuth", "OIDC", "CORS", "CSRF"],
        phase: "Phase 2",
      },
      {
        slug: "rate-limiting",
        title: "Rate limiting and throttling",
        description:
          "Keep a busy API fair and stable by deciding how many requests each person can make.",
        keywords: ["rate limiting", "throttling", "token bucket"],
        phase: "Phase 2",
      },
    ],
  },
  {
    slug: "data-storage",
    title: "Data storage, persistence, and caching",
    description:
      "How apps save information, find it again, and keep common answers fast to retrieve.",
    intro:
      "Use this section to learn where data lives and how to keep it quick, correct, and available.",
    keywords: ["PostgreSQL", "Redis", "caching", "replication"],
    topics: [
      {
        slug: "acidity",
        title: "ACID guarantees",
        description:
          "The four promises a database makes when you save important information.",
        keywords: ["ACID", "transactions", "durability"],
        phase: "Phase 3",
      },
      {
        slug: "isolation-levels",
        title: "Transaction isolation levels",
        description:
          "What can go wrong when many people read and change the same data at the same time.",
        keywords: ["isolation levels", "phantom reads", "Serializable"],
        phase: "Phase 3",
      },
      {
        slug: "indexing-mechanics",
        title: "Indexing mechanics",
        description:
          "How databases find rows quickly, and how to check whether a query is doing too much work.",
        keywords: ["B-tree", "GIN", "GiST", "EXPLAIN ANALYZE"],
        phase: "Phase 3",
      },
      {
        slug: "connection-management",
        title: "Connection management",
        description:
          "How to share database connections safely instead of opening a new one for every request.",
        keywords: ["connection pool", "pgBouncer", "database connections"],
        phase: "Phase 3",
      },
      {
        slug: "mongodb",
        title: "MongoDB document stores",
        description:
          "How MongoDB stores flexible documents and helps you search or group them.",
        keywords: ["MongoDB", "BSON", "aggregation"],
        phase: "Phase 3",
      },
      {
        slug: "redis",
        title: "Redis in-memory data structures",
        description:
          "The useful ways Redis can hold data when you need answers very quickly.",
        keywords: ["Redis", "sorted sets", "HyperLogLog"],
        phase: "Phase 3",
      },
      {
        slug: "wide-column",
        title: "Wide-column and time-series stores",
        description:
          "How databases built for huge amounts of data organise writes and find the right slice later.",
        keywords: ["Cassandra", "TimescaleDB", "LSM tree"],
        phase: "Phase 3",
      },
      {
        slug: "cache-placement",
        title: "Cache placement patterns",
        description:
          "Where a cache can live, from inside your app to servers close to your users.",
        keywords: ["cache", "CDN", "Redis cache"],
        phase: "Phase 3",
      },
      {
        slug: "cache-patterns",
        title: "Caching design patterns",
        description:
          "The common ways an app can read from and write to a cache.",
        keywords: ["cache-aside", "write-through", "write-back"],
        phase: "Phase 3",
      },
      {
        slug: "cache-invalidation",
        title: "Cache eviction and invalidation",
        description:
          "How caches decide what to forget, and how to avoid a rush of requests when data disappears.",
        keywords: ["LRU", "LFU", "TTL", "cache stampede"],
        phase: "Phase 3",
      },
    ],
  },
  {
    slug: "distributed-architecture",
    title: "Backend scaling and system architecture",
    description:
      "How a backend grows beyond one machine and stays useful when parts of it fail.",
    intro:
      "This is where you learn how separate parts of a system share work and stay in sync.",
    keywords: ["system design", "scalability", "queues", "consensus"],
    topics: [
      {
        slug: "vertical-horizontal-scaling",
        title: "Vertical versus horizontal scaling",
        description:
          "Decide whether to buy a bigger machine or add more machines to handle more people.",
        keywords: ["horizontal scaling", "vertical scaling", "stateless"],
        phase: "Phase 4",
      },
      {
        slug: "stateless-stateful",
        title: "Stateless and stateful systems",
        description:
          "Learn what happens when an app remembers a user, and why that can make scaling harder.",
        keywords: ["stateful", "stateless", "sessions"],
        phase: "Phase 4",
      },
      {
        slug: "load-balancing",
        title: "Load balancing techniques",
        description:
          "How a traffic director spreads incoming requests across several app servers.",
        keywords: ["load balancer", "L4", "L7", "consistent hashing"],
        phase: "Phase 4",
      },
      {
        slug: "database-scaling",
        title: "Database scaling and partitioning",
        description:
          "Ways to split database work across machines when one database is no longer enough.",
        keywords: ["replication", "sharding", "partition key"],
        phase: "Phase 4",
      },
      {
        slug: "consistent-hashing",
        title: "Consistent hashing",
        description:
          "A way to spread data across machines without having to move everything when one machine changes.",
        keywords: ["consistent hashing", "virtual nodes"],
        phase: "Phase 4",
      },
      {
        slug: "queues-vs-streams",
        title: "Message queues versus event streams",
        description:
          "The difference between handing a job to one worker and keeping a record that many workers can read.",
        keywords: ["RabbitMQ", "Kafka", "Kinesis"],
        phase: "Phase 4",
      },
      {
        slug: "event-patterns",
        title: "Event patterns",
        description:
          "Simple patterns for letting parts of a system react when something important happens.",
        keywords: ["event sourcing", "CQRS", "Pub/Sub"],
        phase: "Phase 4",
      },
      {
        slug: "delivery-semantics",
        title: "Delivery semantics",
        description:
          "What it means when a message might arrive once, twice, or not at all-and how to handle it safely.",
        keywords: ["at-least-once", "exactly-once", "idempotency"],
        phase: "Phase 4",
      },
      {
        slug: "fault-tolerance",
        title: "Fault tolerance",
        description:
          "How to stop one broken service from making the whole product feel broken.",
        keywords: ["circuit breaker", "bulkhead", "fallback"],
        phase: "Phase 4",
      },
      {
        slug: "retries-backoff",
        title: "Retries and backoff",
        description:
          "How to try again after a temporary problem without making the problem worse.",
        keywords: ["retries", "backoff", "jitter"],
        phase: "Phase 4",
      },
      {
        slug: "dead-letter-queues",
        title: "Dead letter queues",
        description:
          "Where to put messages that keep failing so they do not block everything else.",
        keywords: ["DLQ", "poison pill", "retry pipeline"],
        phase: "Phase 4",
      },
      {
        slug: "consensus",
        title: "Distributed consensus",
        description:
          "Why separate machines sometimes disagree, and how systems choose a safe answer.",
        keywords: ["CAP theorem", "PACELC", "Raft", "Paxos"],
        phase: "Phase 4",
      },
    ],
  },
  {
    slug: "cloud-platform",
    title: "Cloud infrastructure, DevOps, and observability",
    description:
      "The cloud tools that run your app, connect its pieces, and tell you when something is wrong.",
    intro:
      "Connect the app you write to the cloud services that run it for real people.",
    keywords: ["AWS", "Kubernetes", "observability", "DevOps"],
    topics: [
      {
        slug: "virtualization-containers",
        title: "Virtualization versus containers",
        description:
          "The difference between a full virtual computer and a lightweight container for your app.",
        keywords: ["containers", "virtualization", "Docker"],
        phase: "Phase 5",
      },
      {
        slug: "kubernetes",
        title: "Kubernetes and orchestration",
        description:
          "How Kubernetes helps run, replace, connect, and grow many copies of an app.",
        keywords: ["Kubernetes", "EKS", "HPA"],
        phase: "Phase 5",
      },
      {
        slug: "serverless",
        title: "Serverless execution",
        description:
          "Run small pieces of code without managing servers, and understand the tradeoffs.",
        keywords: ["serverless", "Lambda", "Cloudflare Workers"],
        phase: "Phase 5",
      },
      {
        slug: "object-storage",
        title: "Object storage",
        description:
          "Store files such as images and reports safely, then let people upload or download them directly.",
        keywords: ["S3", "object storage", "presigned URL"],
        phase: "Phase 5",
      },
      {
        slug: "cdn-acceleration",
        title: "CDN acceleration",
        description:
          "Serve content from a location near each user so your site feels faster.",
        keywords: ["CDN", "CloudFront", "edge cache"],
        phase: "Phase 5",
      },
      {
        slug: "vpc-architecture",
        title: "VPC architecture",
        description:
          "Create a private network in the cloud and decide which parts can reach the internet.",
        keywords: ["VPC", "subnets", "route tables"],
        phase: "Phase 5",
      },
      {
        slug: "network-gateways",
        title: "Network gateways",
        description:
          "See the routes cloud services use to reach the internet, private services, or another network.",
        keywords: ["NAT gateway", "internet gateway", "peering"],
        phase: "Phase 5",
      },
      {
        slug: "firewalls",
        title: "Firewalls and access rules",
        description:
          "Set clear rules for who can talk to each part of your cloud setup.",
        keywords: ["security groups", "NACLs", "firewalls"],
        phase: "Phase 5",
      },
      {
        slug: "metrics",
        title: "Metrics and golden signals",
        description:
          "Track a few useful numbers so you can tell whether your system is healthy.",
        keywords: ["metrics", "Prometheus", "Grafana", "golden signals"],
        phase: "Phase 5",
      },
      {
        slug: "logging-tracing",
        title: "Structured logging and distributed tracing",
        description:
          "Follow one request through several services using logs and traces that connect the dots.",
        keywords: ["logging", "tracing", "OpenTelemetry", "Jaeger"],
        phase: "Phase 5",
      },
    ],
  },
  {
    slug: "production-scenarios",
    title: "Production engineering and real-world system design",
    description:
      "Put the earlier lessons together by designing products people use every day.",
    intro:
      "Use these projects to practise turning a product idea into a clear backend plan.",
    keywords: ["system design", "production engineering", "real-world scenarios"],
    topics: [
      {
        slug: "url-shortener",
        title: "Design a URL shortener",
        description:
          "Turn a long link into a short one, save it safely, and send people to the right place.",
        keywords: ["URL shortener", "Base62", "hashing"],
        phase: "Phase 6",
      },
      {
        slug: "chat-system",
        title: "Design a real-time chat system",
        description:
          "Plan how people can send messages instantly, even when someone is temporarily offline.",
        keywords: ["chat system", "WebSockets", "offline delivery"],
        phase: "Phase 6",
      },
      {
        slug: "rate-limiter-api",
        title: "Design a rate limiter API",
        description:
          "Build a fair request limit that still works when your app runs in more than one place.",
        keywords: ["rate limiter", "Redis", "sliding window"],
        phase: "Phase 6",
      },
      {
        slug: "financial-ledger",
        title: "Design a distributed financial ledger",
        description:
          "Keep a trustworthy record of money moving between accounts, even when requests repeat or fail.",
        keywords: ["ledger", "double-entry bookkeeping", "consistency"],
        phase: "Phase 6",
      },
      {
        slug: "video-streaming",
        title: "Design video streaming infrastructure",
        description:
          "Deliver video smoothly by sending the right quality to each viewer at the right time.",
        keywords: ["video streaming", "HLS", "DASH", "CDN"],
        phase: "Phase 6",
      },
    ],
  },
];

export const visibleTopicGroups = topicGroups
  .map((group) => ({
    ...group,
    topics: group.topics.filter((topic) => publishedTopicSlugs.has(topic.slug)),
  }))
  .filter((group) => group.topics.length > 0);

export const topicGroupsFlat = visibleTopicGroups.flatMap((group) =>
  group.topics.map((topic) => ({
    ...topic,
    groupSlug: group.slug,
    groupTitle: group.title,
    groupDescription: group.description,
    groupIntro: group.intro,
    groupKeywords: group.keywords,
  })),
);

export function getTopicBySlug(slug: string) {
  return topicGroupsFlat.find((topic) => topic.slug === slug);
}

export function getTopicGroupBySlug(slug: string) {
  return visibleTopicGroups.find((group) => group.slug === slug);
}
