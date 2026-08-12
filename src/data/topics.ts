export type TopicItem = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  phase: string;
  /** Hero visual, rendered above the lesson body. */
  visual?: TopicVisual;
  /**
   * Visuals placed inline in the lesson body. Each needs an `id`, referenced
   * from the MDX with `<Visual id="..." />` so it renders next to the prose
   * that explains it rather than all being stacked at the top.
   */
  visuals?: TopicVisual[];
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

export type TopicVisual = (
  | MemoryMapVisual
  | RequestFlowVisual
  | ComparisonVisual
  | TimelineVisual
) & {
  /** Required only for visuals placed inline via `<Visual id="..." />`. */
  id?: string;
};

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
  "nodejs-modules",
  "nodejs-error-handling",
  "nodejs-http-internals",
  "tcp-ip-tls",
  "http-evolution",
  "rest-openapi",
  "graphql",
  "grpc-protobuf",
  "realtime-communication",
  "proxies",
  "api-gateway",
  "auth-and-security",
  "rate-limiting",
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
        visuals: [
          {
            id: "request-response-cycle",
            type: "request-flow",
            title: "One trip out, one trip back",
            description: "The dot follows a single request from client to server and back again. Hover to send a second client through the same server.",
            sourceId: "client-a",
            nodes: [
              { id: "client-a", label: "Client A", x: 30, y: 55 },
              { id: "server", label: "Server", x: 165, y: 96, emphasis: true },
              { id: "database", label: "Database", x: 300, y: 96 },
              { id: "client-b", label: "Client B", x: 30, y: 150 },
            ],
            defaultPath: ["client-a", "server", "database", "server", "client-a"],
            activePath: ["client-b", "server", "database", "server", "client-b"],
            hint: "hover to swap the client",
            detail: "The server answers the client, and to do that it becomes a client of the database itself - same ask-work-answer shape, one hop deeper. Nothing about the exchange is remembered once the response is sent, so the second client's request starts from scratch.",
          },
        ],
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
        visuals: [
          {
            id: "http-exchange-steps",
            type: "timeline",
            title: "One HTTP exchange, line by line",
            description: "Step through a single request and the response that comes back.",
            steps: [
              { label: "Request line", detail: "The client opens with a method and a path - GET /users/42. The method is the client stating what it wants done: read it, create it, replace it, remove it." },
              { label: "Request headers", detail: "Content-Type says how to parse the body, Authorization carries proof of who is asking, Cache-Control says how long the answer may be reused. None of this sits in the body, and all of it changes how the request gets handled." },
              { label: "Server does the work", detail: "The server matches the path to some code, runs it, and decides how it went. Nothing has gone back to the client yet." },
              { label: "Status code", detail: "The response opens with a number in a bucket: 2xx worked, 3xx look elsewhere, 4xx the client sent something wrong, 5xx the server broke. The bucket tells you whose problem it is before you open a single log file." },
              { label: "Response headers and body", detail: "Headers describe what is coming back, then the body carries the actual data. A missing Content-Type here is enough to make perfectly valid JSON get read as plain text on the other end." },
            ],
          },
        ],
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
        visuals: [
          {
            id: "frontend-backend-ownership",
            type: "comparison",
            title: "Who owns which job",
            description: "The same feature, split across two layers. Toggle to see which side is responsible for what.",
            left: {
              label: "Frontend",
              summary: "Shows information and turns clicks into requests.",
              points: [
                "Renders the screen and decides what the user sees.",
                "Validates a form for fast feedback, which anyone can skip with dev tools.",
                "Holds nothing that has to survive a refresh.",
                "Can hide a button, but cannot enforce who is allowed to press it.",
              ],
            },
            right: {
              label: "Backend",
              summary: "Decides what is actually allowed, and keeps the data.",
              points: [
                "Re-checks every input, no matter what the frontend already checked.",
                "Owns the database, so this is where state outlives a restart.",
                "Authenticates the caller and answers 'can this user do this'.",
                "Applies the same rules whether the call came from your app or from curl.",
              ],
            },
          },
        ],
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
        visuals: [
          {
            id: "api-as-contract",
            type: "request-flow",
            title: "The interface, and what sits behind it",
            description: "The web app calls the API and gets an answer back. Hover to send a mobile client through the exact same interface.",
            sourceId: "web-app",
            nodes: [
              { id: "web-app", label: "Web app", x: 30, y: 55 },
              { id: "api", label: "API", x: 160, y: 96, emphasis: true },
              { id: "database", label: "Database", x: 295, y: 96 },
              { id: "mobile", label: "Mobile", x: 30, y: 150 },
            ],
            defaultPath: ["web-app", "api", "database", "api", "web-app"],
            activePath: ["mobile", "api", "database", "api", "mobile"],
            hint: "hover to swap the caller",
            detail: "Neither caller knows there is a database back there, or which one it is. That is the whole point of an interface: the promise about inputs and outputs is public, and everything behind it can change without either client noticing.",
          },
        ],
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
        visuals: [
          {
            id: "sync-vs-async-waiting",
            type: "comparison",
            title: "Waiting in silence vs moving on",
            description: "The phone call and the text message, as they show up in code. Toggle between them.",
            left: {
              label: "Synchronous",
              summary: "The caller waits, doing nothing, until the answer arrives.",
              points: [
                "Lines run in the order you wrote them, so the code reads the way it runs.",
                "Easier to reason about and to debug - one thing is happening at a time.",
                "The thread sits idle for the entire wait, using no CPU and doing no work.",
                "One slow database call holds up everything queued behind it.",
              ],
            },
            right: {
              label: "Asynchronous",
              summary: "The caller starts the work, keeps going, and handles the result later.",
              points: [
                "Control comes back immediately, before the work has finished.",
                "The waiting time gets spent on other requests instead of on nothing.",
                "You need a callback, a promise, or await to pick the result back up.",
                "Things finish in whatever order they finish, not the order you started them.",
              ],
            },
          },
        ],
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
        visuals: [
          {
            id: "idempotency-key-retry",
            type: "timeline",
            title: "A retry that doesn't charge twice",
            description: "Step through a payment whose response gets lost on the way back.",
            steps: [
              { label: "Client sends payment", detail: "The client sends POST /payments with an Idempotency-Key header it generated - a unique value identifying this particular attempt." },
              { label: "Server charges the card", detail: "The server processes the payment for real and stores the result next to that key before responding." },
              { label: "Response is lost", detail: "The connection drops on the way back. The client sees a timeout and has no way to tell whether the charge happened or not." },
              { label: "Client retries", detail: "Retrying is the only safe move, and the retry carries the exact same idempotency key as the first attempt." },
              { label: "Server sees the key again", detail: "The server finds that key already stored, so it skips the payment logic entirely instead of charging the card a second time." },
              { label: "Original result returned", detail: "The client gets back the same response the first attempt would have produced. Two requests arrived; one charge happened." },
            ],
          },
        ],
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
        visuals: [
          {
            id: "backend-pieces-path",
            type: "request-flow",
            title: "One request across the pieces",
            description: "At rest the cache has the answer. Hover to make it a miss and watch the request fall through to the database.",
            sourceId: "client",
            nodes: [
              { id: "client", label: "Client", x: 30, y: 96 },
              { id: "balancer", label: "Balancer", x: 115, y: 96 },
              { id: "app", label: "App", x: 195, y: 96, emphasis: true },
              { id: "cache", label: "Cache", x: 285, y: 50 },
              { id: "database", label: "Database", x: 285, y: 150 },
            ],
            defaultPath: ["client", "balancer", "app", "cache", "app", "client"],
            activePath: ["client", "balancer", "app", "cache", "database", "app", "client"],
            hint: "hover for a cache miss",
            detail: "On a hit the request never reaches the database, which is the entire reason the cache is there. On a miss the app falls through to the database, sends the response, and usually writes the value into the cache so the next request takes the short path.",
          },
        ],
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
        visuals: [
          {
            id: "middleware-chain",
            type: "timeline",
            title: "One request through the chain",
            description: "Step through what runs before your route handler ever sees the request.",
            steps: [
              { label: "Request arrives", detail: "A POST /orders request reaches the server. None of your route code has run yet - the request is at the front of the middleware chain." },
              { label: "logRequest", detail: "Records that the request happened, then calls next() to hand control down the chain. It changes nothing about the request itself." },
              { label: "requireAuth", detail: "Checks for an authorization header. If it's missing, it responds 401 and never calls next() - the chain stops here and your handler is never reached." },
              { label: "parseBody", detail: "Reads the raw request stream and attaches a usable req.body. Your handler can rely on that existing precisely because this ran first." },
              { label: "rateLimit", detail: "Checks whether this client has exceeded its quota. Same power as requireAuth: it can end the request early by responding instead of calling next()." },
              { label: "Your route handler", detail: "Finally runs, with a logged, authenticated, parsed, rate-limited request. Every guarantee it depends on was established by something upstream." },
            ],
          },
        ],
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
        visuals: [
          {
            id: "cluster-vs-worker-threads",
            type: "comparison",
            title: "Cluster vs Worker Threads",
            description: "Two different ways around the single JavaScript thread. Toggle to compare what each one actually gives you.",
            left: {
              label: "Cluster",
              summary: "Forks the whole process, usually once per CPU core.",
              points: [
                "Every fork is a separate process with its own memory and its own event loop.",
                "Incoming connections get spread across the forks, so all cores serve traffic.",
                "One process crashing leaves the others still answering requests.",
                "Nothing is shared, so moving data between forks means copying it over IPC.",
              ],
            },
            right: {
              label: "Worker Threads",
              summary: "Extra JavaScript threads inside one process.",
              points: [
                "Each worker gets its own V8 context and heap, and talks by postMessage.",
                "Built for CPU-bound work: image resizing, crypto, large JSON transforms.",
                "SharedArrayBuffer can hand workers the same memory instead of a copy.",
                "Shared memory brings real data races, so guard it with Atomics.",
              ],
            },
          },
        ],
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
        slug: "nodejs-modules",
        title: "CommonJS vs ESM in Node.js",
        description:
          "How require() actually works under the hood, how ES modules differ, and where the two systems collide.",
        keywords: [
          "commonjs vs esm node js",
          "how does require work in node js",
          "esm vs commonjs explained",
          "require vs import node js",
          "module.exports explained",
          "CommonJS",
          "ES modules",
          "require",
          "import export",
          "require.cache",
          "package.json type module",
          "dual package hazard",
          "__dirname in esm",
          "top-level await",
          "circular require",
        ],
        phase: "Phase 1",
        visual: {
          type: "comparison",
          title: "CommonJS vs ES modules",
          description: "See how each module system loads and what breaks when they mix.",
          left: {
            label: "CommonJS",
            summary: "require() and module.exports - synchronous, cached, resolved at runtime.",
            points: [
              "require() runs synchronously, right where it's called.",
              "Modules are cached by resolved file path after the first load.",
              "Circular requires return a partial, in-progress exports object.",
              "__dirname and __filename are injected by Node's module wrapper.",
            ],
          },
          right: {
            label: "ES modules",
            summary: "import/export - statically analyzed, resolved before any code runs.",
            points: [
              "Import/export statements are parsed into a dependency graph up front.",
              "Loading is asynchronous, which is what makes top-level await legal.",
              "require() of a pure ESM package fails with ERR_REQUIRE_ESM.",
              "A package shipping both builds can load twice as separate instances.",
            ],
          },
        },
      },
      {
        slug: "nodejs-error-handling",
        title: "Error handling in Node.js",
        description:
          "Why uncaught exceptions and unhandled rejections are different mechanisms, and what actually happens after each.",
        keywords: [
          "node js error handling",
          "uncaught exception vs unhandled rejection",
          "process.on uncaughtException",
          "unhandledRejection node js",
          "try catch async node js",
          "error handling node js",
          "uncaughtException",
          "unhandledRejection",
          "async error handling",
          "process exit code",
          "domains node js deprecated",
          "crash and restart pattern",
          "graceful shutdown node js",
          "node js production errors",
          "PM2 restart",
        ],
        phase: "Phase 1",
      },
      {
        slug: "nodejs-http-internals",
        title: "How Node's HTTP server actually handles a request",
        description:
          "What http.createServer really does underneath, how keep-alive connections work, and what a framework like Express adds on top.",
        keywords: [
          "how does http.createServer work",
          "node js http module internals",
          "keep-alive connections node js",
          "express vs raw http node js",
          "node js request lifecycle",
          "http.createServer",
          "libuv http",
          "keep-alive",
          "backpressure http response",
          "TCP socket node js",
          "http.Server class",
          "req res streams",
          "express middleware internals",
          "node js networking",
          "socket connection reuse",
        ],
        phase: "Phase 1",
        visual: {
          type: "timeline",
          title: "From TCP connection to response",
          description: "Step through what happens between a socket connecting and the response going out.",
          steps: [
            { label: "TCP connection accepted", detail: "libuv accepts the incoming connection and hands Node a raw socket, wrapped as a net.Socket." },
            { label: "Request line and headers parsed", detail: "Bytes arriving on the socket are fed into Node's HTTP parser (llhttp) as they arrive, incrementally, off the wire." },
            { label: "req and res constructed", detail: "Once headers are fully parsed, Node builds an IncomingMessage (req) and ServerResponse (res) and calls your handler." },
            { label: "Your handler runs", detail: "req is a readable stream for the body; res is a writable stream for the response - your code reads from one and writes to the other." },
            { label: "Response written", detail: "res.write() and res.end() send bytes back over the same socket, respecting backpressure if the client reads slowly." },
            { label: "Connection kept alive or closed", detail: "With keep-alive, the socket stays open for the next request from the same client instead of closing and reconnecting." },
          ],
        },
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
        keywords: [
          "TCP",
          "TLS 1.3",
          "OSI model",
          "how does tls 1.3 handshake work",
          "TCP three-way handshake explained",
          "TLS termination explained",
          "what is TLS 1.2 vs 1.3",
          "TCP vs UDP",
          "IP routing basics",
          "handshake",
          "SYN SYN-ACK ACK",
          "TLS certificate",
          "encryption in transit",
          "OSI layers explained",
          "mutual TLS",
        ],
        phase: "Phase 2",
        visual: {
          type: "timeline",
          title: "From TCP connection to encrypted traffic",
          description: "Step through the handshakes that happen before any application data moves.",
          steps: [
            { label: "SYN", detail: "The client sends a SYN with an initial sequence number, opening the TCP handshake." },
            { label: "SYN-ACK", detail: "The server acknowledges the client's sequence number and sends its own." },
            { label: "ACK", detail: "The client acknowledges the server's sequence number. TCP connection is now established." },
            { label: "ClientHello + key share", detail: "TLS 1.3 starts immediately: the client sends its supported parameters and guesses a key share in the same flight." },
            { label: "ServerHello + certificate", detail: "The server responds with its own key share, certificate, and encrypted data - all in one round trip." },
            { label: "Application data", detail: "Both sides now share a session key. HTTP requests and responses travel encrypted from here on." },
          ],
        },
      },
      {
        slug: "http-evolution",
        title: "HTTP 1.1, HTTP 2, and HTTP 3",
        description:
          "See how each newer HTTP version helps websites load and respond more smoothly.",
        keywords: [
          "HTTP/2",
          "HTTP/3",
          "QUIC",
          "keep-alive",
          "HTTP head of line blocking explained",
          "HTTP/1.1 vs HTTP/2 vs HTTP/3",
          "why does QUIC use UDP",
          "HTTP/2 multiplexing explained",
          "stream prioritization",
          "connections per origin",
          "HPACK header compression",
          "TCP head of line blocking",
          "binary framing",
          "server push",
        ],
        phase: "Phase 2",
        visual: {
          type: "comparison",
          title: "HTTP/1.1 vs HTTP/2",
          description: "See what multiplexing over one connection actually changes.",
          left: {
            label: "HTTP/1.1",
            summary: "One request at a time per connection, worked around with parallel connections.",
            points: [
              "Requests on one connection are handled strictly in order.",
              "Browsers open up to 6 connections per origin to fake parallelism.",
              "Domain sharding split assets across subdomains just to unlock more connections.",
              "Headers repeat in full on every request - no shared compression.",
            ],
          },
          right: {
            label: "HTTP/2",
            summary: "Many streams multiplexed over a single TCP connection.",
            points: [
              "Requests and responses interleave as independent streams on one connection.",
              "One slow response no longer blocks others behind it.",
              "HPACK compresses repeated headers using a shared table.",
              "A single lost TCP packet still stalls every stream - fixed later by HTTP/3 over QUIC.",
            ],
          },
        },
      },
      {
        slug: "rest-openapi",
        title: "REST and OpenAPI",
        description:
          "Learn to make APIs that are predictable, clear to use, and safe to call more than once.",
        keywords: [
          "REST",
          "OpenAPI",
          "idempotency",
          "what makes an api restful",
          "REST vs RESTful in name only",
          "PUT vs PATCH vs POST",
          "OpenAPI Swagger explained",
          "contract-first API design",
          "resource oriented URLs",
          "HTTP verbs REST",
          "statelessness REST",
          "API codegen from OpenAPI",
          "swagger.yaml",
          "REST API design best practices",
        ],
        phase: "Phase 2",
        visuals: [
          {
            id: "resource-urls-vs-rpc",
            type: "comparison",
            title: "Resource-oriented vs RPC in name only",
            description: "Two APIs doing the same work, one following REST's constraints and one not. Toggle between them.",
            left: {
              label: "Resource-oriented",
              summary: "The URL names a thing; the verb says what to do with it.",
              points: [
                "GET /users/42 reads it, DELETE /users/42 removes it - same URL, different verb.",
                "The meaning lives in the method, so the path stays a noun.",
                "The status code reports the outcome: 200, 201, 404, 409.",
                "Caches and retry logic can rely on GET and PUT behaving as documented.",
              ],
            },
            right: {
              label: "RPC in name only",
              summary: "The action is baked into the path, and everything is a POST.",
              points: [
                "POST /getUserById and POST /deleteUserById do the reading and the deleting.",
                "One verb for every operation, so nothing can tell a read from a write.",
                "Returns 200 OK for failures, with { error: true } buried in the body.",
                "Works, but every client has to learn each endpoint individually.",
              ],
            },
          },
        ],
      },
      {
        slug: "graphql",
        title: "GraphQL",
        description:
          "Ask an API for exactly the data you need, while avoiding slow or overly expensive requests.",
        keywords: [
          "GraphQL",
          "resolvers",
          "N+1",
          "graphql n+1 problem explained",
          "dataloader batching",
          "graphql vs rest when to use",
          "graphql resolver example",
          "graphql over fetching under fetching",
          "graphql schema",
          "graphql query vs mutation",
          "apollo server",
          "graphql round trips",
          "graphql caching problem",
          "batch loading graphql",
        ],
        phase: "Phase 2",
      },
      {
        slug: "grpc-protobuf",
        title: "gRPC and Protocol Buffers",
        description:
          "A faster way for services to talk to each other using a clear shared format.",
        keywords: [
          "gRPC",
          "protobuf",
          "streaming",
          "protocol buffers explained",
          "grpc vs rest performance",
          "grpc call types explained",
          "bidirectional streaming grpc",
          "why cant browsers call grpc directly",
          "protobuf binary serialization",
          "grpc unary call",
          "grpc-web",
          "service to service communication",
          "grpc http/2",
          ".proto file example",
        ],
        phase: "Phase 2",
        visuals: [
          {
            id: "json-vs-protobuf-wire",
            type: "comparison",
            title: "The same user, two formats on the wire",
            description: "What actually travels when you send { id, name, email }. Toggle between the two encodings.",
            left: {
              label: "JSON over REST",
              summary: "Text, with every key name spelled out on every message.",
              points: [
                "The strings \"id\", \"name\" and \"email\" get re-sent with each message.",
                "You can curl the endpoint and read the response as-is.",
                "No schema needed to decode it - the keys describe themselves.",
                "Parsing means scanning text and looking up keys by name.",
              ],
            },
            right: {
              label: "Protobuf over gRPC",
              summary: "Binary, with small numeric tags standing in for the field names.",
              points: [
                "Field 1, field 2, field 3 travel; the names stay in the .proto file.",
                "Typically 3-10x smaller on the wire for the same logical data.",
                "Unreadable without the schema, so curl gives you nothing useful.",
                "Both sides compile the same .proto, so changing a field is a coordinated step.",
              ],
            },
          },
        ],
      },
      {
        slug: "realtime-communication",
        title: "Real-time communication",
        description:
          "Choose the right way to send live updates, such as chat messages or delivery status.",
        keywords: [
          "WebSockets",
          "SSE",
          "long polling",
          "server sent events explained",
          "websockets vs sse vs long polling",
          "when to use websockets",
          "how does long polling work",
          "sse under the hood",
          "text/event-stream",
          "bidirectional vs one directional realtime",
          "websocket handshake",
          "live scores implementation",
          "chat app realtime protocol",
          "sse reconnection",
        ],
        phase: "Phase 2",
        visual: {
          type: "comparison",
          title: "SSE vs WebSockets",
          description: "See why the direction of data flow decides which one fits.",
          left: {
            label: "Server-Sent Events",
            summary: "A long-lived HTTP response the server keeps writing to.",
            points: [
              "Just HTTP with Content-Type: text/event-stream - no special protocol.",
              "Strictly one-directional: server to client only.",
              "Browsers auto-reconnect and resume via Last-Event-ID for free.",
              "Works through existing proxies and load balancers unmodified.",
            ],
          },
          right: {
            label: "WebSockets",
            summary: "A full-duplex connection after an HTTP upgrade handshake.",
            points: [
              "Starts as HTTP, then switches protocols with a 101 response.",
              "Either side can send a message at any time, independently.",
              "Needs infrastructure that supports the Upgrade header and long-lived connections.",
              "Scaling across instances usually needs a shared pub/sub layer like Redis.",
            ],
          },
        },
      },
      {
        slug: "proxies",
        title: "Reverse and forward proxies",
        description:
          "Understand the helpful middle layer that receives traffic before it reaches your app.",
        keywords: [
          "reverse proxy",
          "forward proxy",
          "Envoy",
          "nginx reverse proxy explained",
          "forward proxy vs reverse proxy",
          "what does a reverse proxy do",
          "tls termination reverse proxy",
          "load balancing nginx",
          "corporate proxy explained",
          "reverse proxy caching",
          "proxy server basics",
          "envoy proxy explained",
          "reverse proxy vs load balancer",
          "api gateway vs reverse proxy",
        ],
        phase: "Phase 2",
        visuals: [
          {
            id: "forward-vs-reverse-proxy",
            type: "request-flow",
            title: "Which side the proxy stands on",
            description: "At rest the request goes out through a forward proxy on the client's network. Hover to route it through a reverse proxy sitting in front of the server instead.",
            sourceId: "client",
            nodes: [
              { id: "client", label: "Client", x: 35, y: 96 },
              { id: "forward", label: "Forward", x: 115, y: 48 },
              { id: "reverse", label: "Reverse", x: 235, y: 148 },
              { id: "server", label: "Server", x: 300, y: 96 },
            ],
            defaultPath: ["client", "forward", "server"],
            activePath: ["client", "reverse", "server"],
            hint: "hover to flip sides",
            detail: "A forward proxy sits close to the client and represents it, so the server only ever sees the proxy's IP. A reverse proxy sits close to the servers and represents them, so the client only ever sees one address and never learns which backend answered.",
          },
        ],
      },
      {
        slug: "api-gateway",
        title: "API gateways",
        description:
          "Use one front door to route requests, check access, and keep backend services simpler.",
        keywords: [
          "API gateway",
          "routing",
          "authentication offloading",
          "api gateway vs reverse proxy",
          "what does an api gateway do",
          "kong api gateway",
          "aws api gateway explained",
          "api gateway rate limiting",
          "api gateway authentication",
          "microservices gateway pattern",
          "api gateway request transformation",
          "backend for frontend pattern",
          "single entry point microservices",
          "gateway routing by path",
        ],
        phase: "Phase 2",
        visuals: [
          {
            id: "gateway-route-or-reject",
            type: "request-flow",
            title: "One front door, two outcomes",
            description: "At rest a valid request is routed by path to the order service. Hover to send one that fails the check at the edge.",
            sourceId: "client",
            nodes: [
              { id: "client", label: "Client", x: 35, y: 96 },
              { id: "gateway", label: "Gateway", x: 140, y: 96, emphasis: true },
              { id: "orders", label: "Orders", x: 285, y: 45 },
              { id: "users", label: "Users", x: 285, y: 120 },
              { id: "rejected", label: "401", x: 140, y: 158 },
            ],
            defaultPath: ["client", "gateway", "orders"],
            activePath: ["client", "gateway", "rejected"],
            hint: "hover to fail the check",
            detail: "The gateway verifies the token and checks the rate limit before deciding anything else, then routes by path - /orders to the order service, /users to the user service. A request without a valid token gets a 401 from the gateway itself, and no backend service ever hears about it.",
          },
        ],
      },
      {
        slug: "auth-and-security",
        title: "Authentication and security standards",
        description:
          "Learn the basics of signing people in, giving them the right access, and protecting common weak spots.",
        keywords: [
          "JWT",
          "OAuth",
          "OIDC",
          "CORS",
          "CSRF",
          "authentication vs authorization",
          "how does oauth 2.0 work",
          "jwt structure explained",
          "login with google flow",
          "oidc vs oauth",
          "jwt vs session tokens",
          "how to revoke a jwt",
          "cors explained simply",
          "csrf attack example",
        ],
        phase: "Phase 2",
        visual: {
          type: "timeline",
          title: "Login with Google, step by step",
          description: "Step through an OAuth + OIDC flow used behind most 'sign in with' buttons.",
          steps: [
            { label: "Redirect to Google", detail: "Your app redirects the user to Google's authorization endpoint with a client_id and redirect_uri." },
            { label: "User approves access", detail: "The user logs into Google (if needed) and approves the permissions your app is requesting." },
            { label: "Authorization code returned", detail: "Google redirects back to your redirect_uri with a short-lived authorization code." },
            { label: "Code exchanged server-to-server", detail: "Your backend exchanges the code plus a client_secret for an access token - this never touches the browser." },
            { label: "ID token identifies the user", detail: "OIDC's ID token, a JWT with identity claims like sub and email, tells your app who actually logged in." },
            { label: "Access token calls the API", detail: "Your backend uses the access token to fetch the user's profile from Google's API on their behalf." },
          ],
        },
      },
      {
        slug: "rate-limiting",
        title: "Rate limiting and throttling",
        description:
          "Keep a busy API fair and stable by deciding how many requests each person can make.",
        keywords: [
          "rate limiting",
          "throttling",
          "token bucket",
          "sliding window vs fixed window rate limiting",
          "leaky bucket algorithm explained",
          "where does rate limiting belong in architecture",
          "api gateway rate limiting",
          "cdn rate limiting",
          "rate limiting algorithms compared",
          "429 too many requests",
          "client side throttling",
          "distributed rate limiting",
          "rate limit headers",
          "infrastructure layer rate limiting",
        ],
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
