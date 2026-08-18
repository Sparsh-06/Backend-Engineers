export type DeepDiveSection = {
  heading: string;
  body: string[];
};

export type PipelineStage = {
  label: string;
  detail: string;
  /** Short stat or number worth surfacing on the node itself, e.g. "~1M msg/sec". */
  stat?: string;
};

export type ArchitectureDeepDive = {
  slug: string;
  companySlug: string;
  title: string;
  tagline: string;
  seoKeywords: string[];
  intro: string;
  keyTermsUsed: { term: string; definition: string }[];
  pipeline: PipelineStage[];
  sections: DeepDiveSection[];
  takeaway: string;
  sourceTitle: string;
  sourceAuthors: string[];
  sourceUrl: string;
  sourceNote: string;
};

export const architectureDeepDives: ArchitectureDeepDive[] = [
  {
    slug: "real-time-graph",
    companySlug: "netflix",
    title: "How Netflix built a real-time graph of what its members are doing",
    tagline: "Turning millions of scattered events per second into one connected picture, as it happens",
    seoKeywords: [
      "netflix real-time graph architecture",
      "netflix kafka flink architecture",
      "netflix data pipeline explained",
      "netflix stream processing",
      "netflix graph database",
      "netflix event streaming architecture",
      "how netflix processes real-time data",
      "netflix apache flink",
      "netflix apache kafka",
    ],
    intro:
      "Netflix isn't just a video player anymore - it also has ads, live events, and mobile games all under one account. That creates a real problem: how do you know that someone watching Stranger Things on their phone, finishing the episode on their TV, and then playing the Stranger Things mobile game are all the same continuous story, not three unrelated events? Netflix's data engineering team solved this by building what they call a Real-Time Distributed Graph - a live, connected map of what every member is doing, updated within moments of it actually happening, not hours later in an overnight batch job.",
    keyTermsUsed: [
      { term: "Event streaming", definition: "Sending each individual action (a login, a play button press) as its own small message the moment it happens, instead of collecting a batch of actions and processing them all later." },
      { term: "Graph (data structure)", definition: "A way of storing data as nodes (things - a member, a show) and edges (relationships between them - 'watched,' 'played') so you can quickly ask 'what's connected to this?' without slow, expensive joins across tables." },
      { term: "Stream processing", definition: "Continuously transforming data as it flows past, instead of waiting for all of it to arrive first - the difference between reading a book as pages get delivered one at a time versus waiting for the whole book to show up." },
    ],
    pipeline: [
      { label: "Member action", detail: "A login, a play press, an episode finishing - every action in the app becomes a raw event the instant it happens." },
      { label: "Kafka", detail: "Ingests the raw event stream reliably and in order, encoded compactly with Avro against a shared schema registry.", stat: "~1M msg/sec per topic" },
      { label: "Flink", detail: "One job per Kafka topic filters, enriches, deduplicates, and transforms raw events into graph nodes and edges." },
      { label: "Data Mesh", detail: "Receives the finished graph primitives from Flink and persists them into the storage layer other services query.", stat: "5M+ records/sec at peak" },
      { label: "Real-Time Graph", detail: "A live, connected picture of member activity - queryable moments after the action actually happened." },
    ],
    sections: [
      {
        heading: "The problem: microservices scattered the data across the company",
        body: [
          "Netflix runs on a microservices architecture - hundreds of small, independent services, each owned by its own team, each with its own database. That's genuinely useful for building and scaling software: teams can ship independently, and each service can pick the database that actually fits its job.",
          "But it creates a side effect nobody wanted: a member's activity ends up scattered across dozens of separate, siloed databases that were never designed to talk to each other. Figuring out that a phone login, a TV viewing session, and a tablet game session all belonged to the same continuous story meant manually stitching data together from a data warehouse and a pile of unrelated databases - slow, error-prone, and not remotely close to real time.",
        ],
      },
      {
        heading: "Why a graph, specifically, instead of just more tables",
        body: [
          "Netflix's data team could have tried to solve this by building bigger, more connected tables. They chose a graph model instead, for three concrete reasons worth understanding on their own.",
          "First, relationship queries are what a graph is actually built for - hopping from 'this member' to 'shows they watched' to 'games related to those shows' is a fast traversal in a graph, where the same question in a table-based system usually means several expensive joins.",
          "Second, graphs tolerate change well. As Netflix added new kinds of member activity (ad interactions, live events, games), a graph can absorb new node and edge types without the kind of schema rework a rigid table structure would need.",
          "Third, a lot of what Netflix's data scientists actually want to find - hidden relationships, repeating patterns, unusual clusters of behavior - is a much more natural fit for graph traversal than for point lookups scattered across separate databases.",
        ],
      },
      {
        heading: "Kafka: the backbone that carries every event",
        body: [
          "Every action a member takes in the app - logging in, pressing play, finishing an episode - gets published as an event to Apache Kafka, a system built specifically for durable, high-throughput event streaming. Kafka's job here is simple to state and hard to do well at this scale: take an enormous number of small messages arriving continuously, and make them reliably available for other systems to read, in order, without losing any.",
          "To put the scale in perspective: Netflix's team describes individual Kafka topics generating up to roughly a million messages a second. Each event is encoded in a compact binary format called Avro, with the exact shape of each event type tracked centrally in a schema registry, so every service reading the data knows exactly what fields to expect.",
        ],
      },
      {
        heading: "Flink: turning a flood of raw events into graph pieces",
        body: [
          "Kafka's job is delivering the raw events reliably. Turning those raw events into actual graph nodes and edges is a separate job, handled by Apache Flink - a stream processing framework built for exactly this kind of continuous, low-latency transformation.",
          "The pipeline, in plain terms: a Flink job reads a stream of raw events (say, 'member started watching an episode'), filters out noise, enriches the event with extra context it needs, and transforms it into graph primitives - a node representing the member, a node representing the show, and an edge connecting them representing the 'watched' relationship. Along the way, it also deduplicates near-identical updates that arrive in a short window, so the system isn't wastefully re-writing the same relationship five times because of five closely-spaced events.",
          "Once that transformation is done, the resulting nodes and edges get published downstream to a system Netflix calls Data Mesh, which handles actually persisting them into the storage layer other services can query. Netflix's own numbers describe this pipeline writing more than 5 million node-and-edge records per second at peak.",
        ],
      },
      {
        heading: "The lesson hiding in a scaling mistake",
        body: [
          "This is the most instructive part of the whole story for anyone learning system design, because Netflix's team openly describes trying the simpler approach first, and it not working.",
          "Their first attempt used one single Flink job to consume every Kafka source topic. It sounded reasonable - one job, one thing to manage - but different topics have wildly different volumes and traffic patterns throughout the day. Tuning one shared job to handle all of them at once turned into a losing battle over CPU, memory, and parallelism settings that never quite fit every topic simultaneously.",
          "Their fix was to flip the design: one Flink job per Kafka topic, a strict 1:1 mapping, instead of one job trying to do everything. That meant more individual jobs to build, deploy, and monitor - genuinely more operational overhead. But each individual job became dramatically simpler to reason about and tune, because it only had to handle the traffic shape of exactly one topic. This is a specific, real example of a very general lesson: sometimes fewer moving parts is not actually simpler if the one big part now has to handle wildly different situations at once - splitting it apart can trade a little extra operational surface area for a lot less complexity per piece.",
        ],
      },
    ],
    takeaway:
      "The real-time graph isn't one clever trick - it's Kafka reliably carrying an enormous stream of raw events, Flink jobs continuously turning those events into graph pieces, and a hard-won decision to keep each processing job scoped to one data source instead of one job trying to handle everything. The most transferable lesson is the scaling mistake itself: a single shared component handling very different workloads is often a sign to split, not unify.",
    sourceTitle:
      "How and Why Netflix Built a Real-Time Distributed Graph: Part 1 - Ingesting and Processing Data Streams at Internet Scale",
    sourceAuthors: ["Adrian Taruc", "James Dalton"],
    sourceUrl:
      "https://netflixtechblog.com/how-and-why-netflix-built-a-real-time-distributed-graph-part-1-ingesting-and-processing-data-80113e124acc",
    sourceNote:
      "This page explains, in plain language, the architecture described in Netflix's own engineering blog post credited to Adrian Taruc and James Dalton. All credit for the original work, research, and writing belongs to them and Netflix - this is our own explanation of the same publicly documented architecture, not a copy of their text.",
  },
  {
    slug: "querying-the-graph",
    companySlug: "netflix",
    title: "How Netflix queries a billion-edge graph in under 100 milliseconds",
    tagline: "Turning a constantly growing graph into answers that feel instant, no matter how the question is shaped",
    seoKeywords: [
      "netflix graph query engine",
      "netflix grpc architecture",
      "netflix serving layer design",
      "netflix breadth-first traversal",
      "netflix low latency architecture",
      "netflix distributed cache evcache",
      "netflix async architecture",
      "how netflix serves real-time queries",
      "netflix concurrency limiting",
    ],
    intro:
      "Building the graph is only half the problem. Netflix's Real-Time Distributed Graph (RDG) ingests and stores billions of nodes and edges - but none of that matters if nobody can actually ask it a question and get an answer back fast. This is where Netflix's data engineering team faced a different kind of challenge: some questions touch a handful of records, others fan out across hundreds of relationships, and some need to chain several hops deep. All of them needed to come back in well under a second, most in well under 100 milliseconds, on a graph with roughly 8 billion nodes and 150 billion edges.",
    keyTermsUsed: [
      { term: "Fan-out", definition: "How many results a single step of a query can spread into - asking for one account's devices might fan out into hundreds of device records at once." },
      { term: "Breadth-first traversal", definition: "Exploring a graph one full layer at a time (all profiles, then all their content) instead of following one path all the way to the end before trying the next." },
      { term: "P50 / P99 latency", definition: "P50 is the typical response time (half of requests are faster). P99 is the response time for the slowest 1% of requests - the number that tells you how bad the worst case gets." },
    ],
    pipeline: [
      { label: "gRPC request", detail: "Client sends a traversal request; the engine parses it into a concrete execution plan of hops, limits, and filters." },
      { label: "Storage lookup", detail: "Adjacency lists are read directly per node - small hops return in milliseconds, large ones stream in batches." },
      { label: "Breadth-first levels", detail: "Each level of the traversal runs as one round of parallel calls across dedicated thread pools, not sequential chains.", stat: "16-24 threads total" },
      { label: "Filter + enrich", detail: "Results are filtered as they stream in (time windows, edge limits) and optionally enriched from external services." },
      { label: "Response", detail: "Assembled and returned - most queries land well under 100ms even several hops deep.", stat: "P99 15-150ms" },
    ],
    sections: [
      {
        heading: "The problem: 'querying the graph' means very different things depending on who's asking",
        body: [
          "Netflix's team found that graph queries pull the system in two very different directions. A 'shallow and wide' query - something like 'which devices has this account streamed from in the last 30 days' - is only one hop away from the starting point, but that one hop can fan out into hundreds of edges to fetch, filter, and aggregate.",
          "A 'deep and narrow' query is the opposite problem: something like 'across every profile on this account, show me the full Stranger Things viewing history' has to walk multiple hops in sequence - first find the profiles, then find what each profile watched. If each hop takes even 10 milliseconds of network time, four sequential hops alone burn 40ms before any real work happens.",
          "Supporting both kinds of queries, at tens of thousands of queries per second, on a graph that never stops growing, is what shaped every design decision that follows.",
        ],
      },
      {
        heading: "Why breadth-first beats depth-first when every hop is a network call",
        body: [
          "The intuitive way to walk a graph is depth-first: pick a path, follow it all the way, backtrack, try the next one. Netflix's team explicitly avoided this, because in a distributed system, each hop means a network round trip, and depth-first would trace one profile's entire history before even starting on the next profile - wasting the chance to batch those lookups together.",
          "Instead, the engine works breadth-first: fetch all profiles for an account in one round trip, then fetch the relevant edges for all of those profiles together in a second round trip, and so on. A query that chains two hops becomes two rounds of parallel work instead of one long sequential chain - which is a big part of how a multi-hop query stays under 100ms.",
        ],
      },
      {
        heading: "Why the whole engine is built async-first, not thread-per-request",
        body: [
          "Most of the delay in answering a graph query isn't computation - it's waiting: waiting on the storage layer, waiting on a cache, waiting on an enrichment service. A traditional design would assign one thread per in-flight query, and with thousands of concurrent queries, most of those threads would just sit idle waiting for a network response to come back.",
          "Netflix built the entire query engine around asynchronous composition instead. A small pool of 16 to 24 threads handles thousands of concurrent requests, because no single thread ever blocks waiting on I/O - while one storage call is in flight, that thread picks up other work and comes back for the result later. The team describes this as the foundational decision everything else in the system rests on.",
        ],
      },
      {
        heading: "Parallel work, kept from turning into chaos",
        body: [
          "Breadth-first traversal only helps if the work within each level actually runs in parallel. Netflix's team compares their design to a professional kitchen: separate stations for separate kinds of work - one pool of workers for fetching nodes, another for reading adjacency lists, another for enrichment calls - so a slowdown in one station doesn't stall the others.",
          "On top of that, the system uses adaptive concurrency limiting: when things are healthy, it slowly raises how much work it allows in flight at once; when errors or timeouts start climbing, it backs off by a much larger step. That combination is what lets the engine run many lookups in parallel without accidentally overwhelming the storage layer underneath it.",
        ],
      },
      {
        heading: "Filtering as close to the data as possible",
        body: [
          "A profile might have hundreds of viewing events on record, but a query usually only cares about a slice of that - the last 30 days, say. Rather than pulling everything back and trimming it afterward, Netflix streams adjacency data in small batches and applies filters as each batch arrives, stopping as soon as it has enough to satisfy the query.",
          "The team also built a layered system of defaults and overrides - global defaults, per-query overrides, and per-edge-type limits - so different teams can ask for different lookback windows or edge limits without needing a code change every time. They describe this as having eliminated an entire category of one-off feature requests.",
        ],
      },
      {
        heading: "Caching what's actually worth remembering",
        body: [
          "Not everything in the graph changes at the same speed. An account's plan type or a show's metadata barely changes; who-watched-what-and-when changes constantly. Netflix caches the slow-changing, frequently-accessed data - accounts, profiles, content - in a distributed cache (EVCache), which brought hit rates up to 70-80% on those lookups.",
          "The subtler decision was knowing what not to cache: a node that's about to fall outside the graph's retention window isn't worth caching even briefly, so the system weighs a node's last-activity time against the retention period before deciding whether caching it is worthwhile at all.",
        ],
      },
    ],
    takeaway:
      "The serving layer's speed doesn't come from one trick - it's breadth-first traversal turning sequential hops into parallel rounds, an async-first design that lets a handful of threads carry thousands of concurrent queries, deliberately bounded parallelism instead of unbounded concurrency, and caching that's selective rather than aggressive. The transferable lesson: filter as early as possible, parallelize on purpose with real limits, and only cache what's actually worth remembering.",
    sourceTitle:
      "How and Why Netflix Built a Real-Time Distributed Graph: Part 3 - Querying the graph with gRPC execution API",
    sourceAuthors: ["Nilesh Mishra", "Ajit Koti"],
    sourceUrl:
      "https://netflixtechblog.com/how-and-why-netflix-built-a-real-time-distributed-graph-part-3-querying-the-graph-with-grpc-0f3468349607",
    sourceNote:
      "This page explains, in plain language, the architecture described in Netflix's own engineering blog post credited to Nilesh Mishra and Ajit Koti. All credit for the original work, research, and writing belongs to them and Netflix - this is our own explanation of the same publicly documented architecture, not a copy of their text.",
  },
  {
    slug: "responsible-ai-governance",
    companySlug: "uber",
    title: "How Uber governs AI models it doesn't want turning into a black box",
    tagline: "A model catalog, built-in explainability, and governance checks that start before a model ever ships",
    seoKeywords: [
      "uber responsible ai",
      "uber ai governance",
      "uber michelangelo platform",
      "uber model catalog",
      "uber machine learning platform",
      "how uber governs machine learning models",
      "uber feature attribution shap",
      "ai governance system design",
      "uber ml governance framework",
    ],
    intro:
      "Uber doesn't just use one or two machine learning models - it runs AI across dozens of teams and platforms, from ETA predictions to fraud detection to newer generative AI features. That spread creates a governance problem most companies eventually run into: if every team builds and ships models independently, nobody at the company can answer a simple question like 'what models do we actually have running, and how do they make decisions?' Uber's engineering org built a company-wide Responsible AI program to answer exactly that, without slowing every team down with a pile of new rules.",
    keyTermsUsed: [
      { term: "Model catalog", definition: "A searchable, centralized record of every model a company has running - what it does, who owns it, how it was trained - so nobody has to ask around to find out what a model does or who's responsible for it." },
      { term: "Feature attribution", definition: "A technique for figuring out which inputs (features) most influenced a specific model's output - answering 'why did the model predict this' instead of treating the model as an unexplainable black box." },
      { term: "Shift-left", definition: "Moving a check (governance, testing, security) earlier in a process - to the planning stage rather than right before release - so problems get caught before real engineering effort has already been spent." },
    ],
    pipeline: [
      { label: "PRD / ERD review", detail: "Governance requirements enter at the planning stage, folded into the document review process engineers already use." },
      { label: "Model Card", detail: "Engineers register the model in the Model Catalog - a standardized card with description, metrics, and deployment details." },
      { label: "Feature attribution", detail: "PFI, SHAP, or integrated gradients run automatically after training and link back to the Model Card." },
      { label: "Deployment gate", detail: "An in-product prompt requires a completed Model Card before the model can actually ship." },
      { label: "Model Catalog", detail: "The model lives on as one searchable, auditable entry alongside every other model at the company." },
    ],
    sections: [
      {
        heading: "The problem: AI governance that doesn't scale with rules alone",
        body: [
          "Uber's own framing of this problem is a useful lesson on its own: as AI use grows, the instinct is to add more rules for every new system that shows up. Uber's team explicitly rejected that path. More rules per system means more friction for engineers and a governance process that gets slower exactly as the company needs it to get faster.",
          "Instead, they aimed for durable systems and processes flexible enough to absorb new use cases - including the wave of generative AI work that showed up alongside their existing ML platform, Michelangelo - without needing a new governance policy written for every new kind of model.",
        ],
      },
      {
        heading: "A single source of truth: the Model Catalog",
        body: [
          "The technical foundation of the whole program is deceptively simple: a centralized, searchable inventory of every AI system at Uber, called the Model Catalog. Each entry is built around a Model Card - a standardized document giving a shared view of what a model does, its performance and accuracy metrics, and its deployment details, readable by engineers, business owners, and governance staff alike without each group needing separate documentation.",
          "The catalog is wired directly into the ML development workflow itself, with several fields auto-populated from system-generated signals rather than manually filled in by engineers. That detail matters: a governance system that depends on engineers remembering to document things by hand tends to decay over time as teams get busy. Automating the parts that can be automated is what keeps the catalog accurate instead of becoming stale paperwork.",
        ],
      },
      {
        heading: "Making models explain themselves",
        body: [
          "A model catalog tells you a model exists. It doesn't tell you why the model made a specific decision - which is its own governance problem, especially for anything higher-impact, like a prediction that affects pricing or fraud flags. Uber's team built feature attribution directly into Michelangelo, their internal ML platform, so that explainability isn't a separate manual step teams have to remember to do.",
          "They use three different techniques depending on what kind of explanation is needed. Permutation Feature Importance (PFI) gives a global view of a model by measuring how much its accuracy drops when one feature's values are randomly shuffled - the more performance degrades, the more the model actually relies on that feature. For explaining one specific prediction, they use SHAP-based methods (TreeSHAP for tree-based models specifically), which quantify how much each individual feature contributed to that one output - the difference between 'what does this model generally care about' and 'why did it make this particular call.' For deep learning models, where there's no clean tree structure to walk, they use integrated gradients, which trace a prediction back to its inputs by accumulating gradient signal along a path from a neutral baseline input to the actual input.",
          "All of this attribution work runs automatically after training and links straight back into the Model Card, so the explanation isn't a separate artifact someone has to go dig up - it's attached to the same record everyone already looks at.",
        ],
      },
      {
        heading: "Governance that starts before a model is built, not after",
        body: [
          "The part of this program most worth remembering is where the governance check actually happens. Uber's team describes a 'shift-left' approach: governance requirements get folded into the same internal document review process engineers already use to write PRDs and ERDs (product and engineering review documents) at the planning stage, rather than being bolted on right before a model ships.",
          "That timing choice is deliberate. Catching a governance issue during planning costs a conversation; catching the same issue right before release costs a delayed launch and rework. On top of the planning-stage check, they added an in-product enforcement reminder - engineers are prompted to complete a Model Card before deployment - creating an auditable gate that ties governance directly into the actual delivery pipeline instead of living in a separate policy document nobody reads.",
        ],
      },
      {
        heading: "Bringing existing models into the system, not just new ones",
        body: [
          "New governance rules are the easy part - the harder part is retrofitting them onto every model that already exists in production. Uber's team started this with manual onboarding and beta-testing alongside a few partner teams, then used that feedback to revise their Model Card requirements into a second version before rolling out a company-wide push to bring existing models up to standard.",
          "To make that scale, they moved away from static, one-size-fits-all rules toward a more adaptive classification system, paired with human review for cases that need real judgment rather than a checkbox - distinguishing a model that meaningfully affects a decision from one with incidental, low-impact usage. Their own framing captures the idea well: adoption isn't a one-time rollout, it's an ongoing process of keeping people, platforms, and practices aligned as the company's AI footprint keeps growing.",
        ],
      },
    ],
    takeaway:
      "Uber's Responsible AI program isn't one clever tool - it's a model catalog that stays accurate because it's automated rather than manually maintained, explainability that's built into the training pipeline instead of bolted on afterward, and governance checks moved as early as the planning stage instead of the release stage. The transferable lesson: a governance system that adds friction only at the end gets bypassed under deadline pressure; one that's embedded in the workflow from the start doesn't.",
    sourceTitle: "Under the Hood: Scaling Responsible AI at Uber",
    sourceAuthors: ["Melissa Barr", "Melda Salhab"],
    sourceUrl: "https://www.uber.com/blog/scaling-responsible-ai-at-uber/",
    sourceNote:
      "This page explains, in plain language, the architecture and program described in Uber's own engineering blog post credited to Melissa Barr and Melda Salhab. All credit for the original work, research, and writing belongs to them and Uber - this is our own explanation of the same publicly documented program, not a copy of their text.",
  },
  {
    slug: "grpc-search-opensearch",
    companySlug: "uber",
    title: "How Uber cut search latency in half by adding gRPC to OpenSearch",
    tagline: "Why translating between REST/JSON and Protobuf was quietly costing Uber's search platform real performance",
    seoKeywords: [
      "uber grpc opensearch",
      "uber search architecture",
      "uber grpc vs rest performance",
      "opensearch grpc transport",
      "uber protobuf search",
      "how uber built search gateway",
      "grpc vs rest json latency",
      "uber m3 metrics indexing",
      "uber vector search performance",
    ],
    intro:
      "Search sits underneath a surprising amount of what Uber does - matching riders with drivers, catching fraud, powering Uber Eats recommendations. Uber standardized on OpenSearch for this, but ran into a quiet mismatch: nearly all of Uber's internal services already talk to each other using gRPC and Protobuf, while OpenSearch only spoke REST and JSON. That gap meant every search or ingest request had to pass through a translation layer - and at Uber's scale, that translation layer wasn't free.",
    keyTermsUsed: [
      { term: "gRPC", definition: "A framework for services to call each other directly using compact binary messages instead of JSON text, built on strongly-typed contracts (Protobuf) rather than loosely-structured REST payloads." },
      { term: "Protobuf", definition: "Protocol Buffers - a binary format for structuring data, more compact and faster to parse than JSON, but requiring both sides to agree on a strict schema ahead of time." },
      { term: "p50 / p95 / p99 latency", definition: "Percentile latency: p50 is the typical (median) response time, p95 and p99 describe how slow the worst 5% and worst 1% of requests get - the numbers that reveal how bad a system's tail behavior really is." },
    ],
    pipeline: [
      { label: "Client (Protobuf)", detail: "Uber's internal services send requests already shaped as compact, strongly-typed Protobuf messages." },
      { label: "Search Gateway", detail: "Adds security, observability, and rate-limiting, then passes the request straight through - no translation step left." },
      { label: "OpenSearch gRPC", detail: "A native gRPC transport added directly to OpenSearch core, running alongside the original REST transport." },
      { label: "Search / Bulk", detail: "The request is served as a search query or ingest write, using the same underlying node logic REST used to share." },
      { label: "Response", detail: "Returned in Protobuf directly - no JSON round-trip in either direction.", stat: "Up to 60% faster p99" },
    ],
    sections: [
      {
        heading: "The problem: two parts of the same company speaking different languages",
        body: [
          "Most of Uber's internal infrastructure already ran on gRPC and Protobuf - strongly typed contracts, efficient binary serialization, and transports built for streaming. OpenSearch, which Uber had standardized on for search and retrieval, only exposed REST and JSON APIs.",
          "That mismatch meant every request between Uber's gRPC-native services and OpenSearch needed a translation layer converting Protobuf to JSON on the way in, and JSON back to Protobuf on the way out. Translation layers are the kind of thing that look like a minor implementation detail until you measure what they actually cost - added latency, added complexity, and an additional piece of infrastructure that can break.",
        ],
      },
      {
        heading: "The fix: teach OpenSearch to speak gRPC natively, without breaking REST",
        body: [
          "Uber's search team could have kept patching the translation layer, or maintained a long-term fork of OpenSearch. Instead, they built native gRPC support directly into OpenSearch itself, designed to run alongside the existing REST transport rather than replace it - both protocols run on different ports, sharing the same underlying node-to-node logic, so only the outermost client-server layer actually differs.",
          "That design choice mattered for adoption: teams already using REST didn't have to migrate all at once. Search and Bulk (ingestion) were prioritized first, since those were the most latency-sensitive APIs both for Uber and for OpenSearch users generally.",
        ],
      },
      {
        heading: "The hard part: keeping REST and Protobuf in sync automatically",
        body: [
          "Adding a second protocol only works long-term if both protocols stay in sync as the API evolves - otherwise gRPC quietly drifts out of date every time someone changes the REST API. Uber's team built an automated conversion pipeline with three stages: preprocessing, core conversion, and postprocessing.",
          "Preprocessing resolves the fact that REST and Protobuf don't think about APIs the same way - REST leans on paths, query parameters, and status codes, while Protobuf needs everything spelled out as explicit, strongly typed messages. Core conversion turns the cleaned-up API spec into actual Protobuf artifacts (extending an existing open-source tool, OpenAPI Generator, since it didn't already support this). Postprocessing is the safety net: Protobuf can't tolerate something as small as a field being renumbered without breaking every existing client, so this stage runs compatibility checks against previous versions before anything ships.",
        ],
      },
      {
        heading: "Where it paid off: the Search Gateway",
        body: [
          "One concrete place this showed up was Uber's Search Gateway, the service that proxies every customer search and ingest request before it reaches an OpenSearch cluster, adding security, observability, and rate-limiting along the way. Before native gRPC support existed, the gateway ran an in-house adaptor that transpiled every Protobuf request into JSON, sent it to OpenSearch over REST, then transpiled the JSON response back into Protobuf - extra work on every single request.",
          "Once OpenSearch could speak gRPC natively, that adaptor became unnecessary. The gateway could pass a client's Protobuf request straight through to OpenSearch's own gRPC endpoint, removing an entire translation hop instead of just optimizing it.",
        ],
      },
      {
        heading: "The payoff, in Uber's own numbers",
        body: [
          "The performance difference wasn't marginal. On M3, Uber's in-house metrics system, switching to gRPC cut p99 write latency by roughly 60% (from 34.1ms down to 13.6ms) and p50 latency by about 34%. The M3 Indexer's maximum indexing delay - a metric that matters most during failovers, when the system is already under stress - dropped by 20-35% at higher request rates.",
          "The biggest gains showed up in vector search, which makes sense once you know why: a large vector is expensive to represent as JSON text, but Protobuf can pack a repeated float array far more compactly. Uber Eats' delivery shopping-list recommendations saw p50 search latency drop about 53% (83ms to 38ms) and p95 drop about 43% (114ms to 64ms) after the switch. Batch ingestion jobs that indexed data using Apache Spark saw job runtimes drop 20-35% simply by switching their Bulk calls from REST to gRPC.",
        ],
      },
      {
        heading: "The lesson: API representation isn't a surface-level choice",
        body: [
          "Uber's team states their own takeaway plainly: how a system represents its API - REST versus gRPC, JSON versus Protobuf - isn't just a stylistic preference between two ways of writing the same thing. At scale, it directly shapes performance ceilings, how a system can evolve, and how fast teams can move on top of it.",
          "It's also worth noting what they didn't do: rip out REST and force every team onto gRPC overnight. Keeping both transports first-class let teams migrate incrementally, on their own schedule, rather than treating a protocol change as a company-wide flag day.",
        ],
      },
    ],
    takeaway:
      "The real gain here didn't come from gRPC being faster in the abstract - it came from Uber noticing that a translation layer between two protocols was an actual measured cost, then removing it at the source instead of continuing to optimize around it. The transferable lesson: when two parts of a system speak different formats, the adaptor connecting them isn't free, and it's worth periodically asking whether it should exist at all.",
    sourceTitle: "Accelerating Search and Ingestion with High-Performance gRPC in OpenSearch",
    sourceAuthors: ["Karen Xu", "Xi Lu", "Shuyi Zhang"],
    sourceUrl: "https://www.uber.com/blog/accelerating-search-and-ingestion-with-grpc-in-opensearch/",
    sourceNote:
      "This page explains, in plain language, the architecture described in Uber's own engineering blog post credited to Karen Xu, Xi Lu, and Shuyi Zhang. All credit for the original work, research, and writing belongs to them and Uber - this is our own explanation of the same publicly documented architecture, not a copy of their text.",
  },
  {
    slug: "cassandra-to-scylladb",
    companySlug: "discord",
    title: "How Discord migrated trillions of messages to a new database with zero downtime",
    tagline: "Nine days, 3.2 million messages a second, and a migration most teams would block off a maintenance window for",
    seoKeywords: [
      "discord scylladb migration",
      "discord cassandra database",
      "how discord stores messages",
      "discord message storage architecture",
      "cassandra vs scylladb",
      "discord database architecture",
      "zero downtime database migration",
      "discord trillions of messages",
      "hot partition cassandra",
    ],
    intro:
      "Discord's message store grew from 12 Cassandra nodes holding billions of messages in 2017 to 177 nodes holding trillions of messages by early 2022. That growth on its own wasn't the problem - Cassandra is built to scale by adding nodes. The real problem was the shape of Discord's traffic: a small number of massive communities were hammering individual partitions hard enough to degrade the whole cluster, and the maintenance burden of keeping it healthy had become a genuine weekend-ruining, on-call nightmare. Discord's engineering team's fix wasn't to tune Cassandra harder - it was to migrate the entire message store to a different database, without downtime, in nine days.",
    keyTermsUsed: [
      { term: "Hot partition", definition: "A single partition - one chat channel and time bucket, in Cassandra's case - receiving far more traffic than the rest of the cluster, becoming a bottleneck the other nodes can't help absorb." },
      { term: "Quorum consistency", definition: "A read or write only counts as successful once a majority of replica nodes confirm it - trading a little latency for confidence the data is correct, but also meaning one struggling replica slows down every request that touches it." },
      { term: "Compaction", definition: "Background work a database does to merge and clean up the files it's written to disk over time. When it falls behind under heavy write load, both reads and writes get slower until it catches up." },
      { term: "Shard-per-core architecture", definition: "Instead of many threads competing over shared memory and locks, one execution shard is pinned to each CPU core, each handling its own slice of the data independently - removing a whole category of coordination overhead." },
    ],
    pipeline: [
      { label: "Cassandra (source)", detail: "177 nodes holding trillions of messages, read token range by token range instead of table by table.", stat: "~4TB/node" },
      { label: "Checkpoint", detail: "Progress through each token range is saved locally in SQLite, so a crash or restart resumes from where it left off instead of starting over." },
      { label: "Stream to ScyllaDB", detail: "Rows stream directly into ScyllaDB as they're read, with dual writes keeping both databases in sync for anything written mid-migration.", stat: "3.2M msgs/sec" },
      { label: "Validate", detail: "A slice of production reads is sent to both databases and compared automatically, catching mismatches before anyone trusts the new system." },
      { label: "ScyllaDB (live)", detail: "72 nodes serving all message traffic after cutover - fewer nodes, more headroom per node.", stat: "p99 15ms reads" },
    ],
    sections: [
      {
        heading: "The problem: growth wasn't the issue, hot partitions were",
        body: [
          "Discord's message store grew from 12 Cassandra nodes holding billions of messages in 2017 to 177 nodes holding trillions by early 2022. Raw growth is the normal case Cassandra is designed for, handled by adding more nodes. What actually hurt was the shape of Discord's traffic, not its size.",
          "Small friend servers generate almost no traffic. Massive communities with hundreds of thousands of members generate an enormous amount of it, concentrated into the same channel and time bucket. That unevenness created hot partitions - individual partitions serving disproportionate load while most of the cluster sat comfortably underused. Discord's engineers described watching a single channel-and-bucket pair pull in enough traffic that the one node responsible for it degraded under the strain, tried harder to keep up, and degraded further.",
        ],
      },
      {
        heading: "Why a hot partition doesn't stay contained to one node",
        body: [
          "In a system with looser consistency guarantees, a struggling node might just serve slightly stale data while it catches up. Discord's message reads and writes use quorum consistency instead, which means a majority of replica nodes have to confirm before an operation counts as done. That's a deliberate trade: it buys confidence the data is correct, but it also means every query touching a hot partition's replicas slows down together, not just the one overloaded node - a local problem turning into a cluster-wide one.",
          "On top of that, Cassandra's Java-based garbage collector added its own periodic latency spikes, and when write-heavy periods pushed compaction behind schedule, engineers had to manually intervene - Discord's team described this as a 'gossip dance' of coaxing overloaded nodes back to health. The system worked, but it demanded constant, high-toil attention, and weekends were when it usually asked for it.",
        ],
      },
      {
        heading: "Why ScyllaDB, specifically, and not just 'a faster database'",
        body: [
          "Discord didn't pick ScyllaDB because it benchmarked faster in the abstract - they picked it because it removed the two specific mechanisms causing their pain. ScyllaDB is written in C++, not Java, which means no garbage collector and no GC pauses to tune around. And it uses a shard-per-core architecture: rather than many threads competing over shared memory and locks, each CPU core gets its own dedicated shard handling its own slice of the data, cutting out a whole category of coordination overhead that Cassandra's design carries.",
          "It also wasn't a leap into the unknown - ScyllaDB was already running in production across the rest of Discord's databases by 2020, and it speaks the same query language and wire protocol as Cassandra, so the migration didn't require rewriting how every service talked to its data store.",
        ],
      },
      {
        heading: "Rust in front of the database, not just an API behind it",
        body: [
          "Discord built an intermediary layer - their data services - written in Rust, sitting between the API and the database cluster. Two design choices there are worth understanding on their own, separate from the migration itself.",
          "Request coalescing: when many simultaneous requests ask for the exact same data, only one actually queries the database - every other request just subscribes to that same in-flight result. Consistent hash routing sends requests carrying the same key (a channel ID, for messages) to the same service instance every time, which is what makes coalescing effective in the first place - without it, identical requests could land on different instances and never get the chance to share a result. Picture an @everyone announcement in a huge server: without this, that single message could trigger tens of thousands of near-identical reads hitting the database at once. With it, most of them share one answer.",
          "Rust was a deliberate choice for this layer too - Discord's engineers wanted C-level speed without giving up memory safety, building on the Tokio async runtime for the I/O-heavy, highly concurrent workload this layer handles all day.",
        ],
      },
      {
        heading: "Rejecting the obvious plan for a harder, faster one",
        body: [
          "The first migration plan was the intuitive one: new messages go to ScyllaDB from a cutoff date forward, older messages stay in Cassandra, and application code checks both depending on a message's age. Estimated timeline: about three months. Discord's team rejected it - not because it wouldn't work, but because it would leave two databases to maintain indefinitely and push real complexity into every service that reads messages, permanently, instead of paying a one-time migration cost.",
          "Instead, they extended their existing Rust data services library to do the migration itself: read a token range from Cassandra, checkpoint progress locally in SQLite so a restart resumes instead of starting over, stream the rows into ScyllaDB, and validate automatically as it goes. That approach moved at roughly 3.2 million messages a second - trillions of messages, migrated in nine days instead of three months.",
        ],
      },
      {
        heading: "The last 0.0001%, and trusting the result before cutting over",
        body: [
          "Nearly the entire migration finished cleanly, but a small fraction - about 0.0001% of the data - got stuck on token ranges sitting behind enormous tombstones (Cassandra's markers for deleted data, which the engine still has to scan past). One targeted compaction operation cleared it.",
          "Before ever routing real traffic to ScyllaDB, Discord ran dual writes - every new message went to both databases simultaneously - and sent a slice of production reads to both, comparing the results automatically. Only after that validation passed quietly for a stretch did the actual cutover happen, in May 2022.",
        ],
      },
      {
        heading: "The numbers, and the proof that held up under real load",
        body: [
          "The infrastructure got smaller and faster at the same time: 177 Cassandra nodes became 72 ScyllaDB nodes, each now holding roughly 9TB instead of 4TB. Historical message fetches dropped from a 40-125ms p99 on Cassandra to a steady 15ms on ScyllaDB. Message inserts went from a 5-70ms p99 down to a steady 5ms - notice the word 'steady' in both cases: the bigger win wasn't just the average getting faster, it was the worst case becoming predictable.",
          "The real test came months later, during the 2022 FIFA World Cup final - Discord's engineers watched message traffic spike at each of the match's nine key moments (goals, halftime, extra time, the penalty shootout), and the database handled every spike without the degradation the old system would have shown. That's the kind of validation a synthetic load test can't fully substitute for.",
        ],
      },
    ],
    takeaway:
      "The real lesson here isn't 'ScyllaDB is faster than Cassandra' - it's that Discord diagnosed the exact mechanism causing their pain (hot partitions colliding with quorum consistency and GC pauses) before picking a fix, then built purpose-made tooling instead of accepting a slower, permanently messier migration plan just because it was the default one. The transferable lesson: when a system is genuinely hurting, understand precisely which mechanism is responsible before reaching for a bigger version of the same tool.",
    sourceTitle: "How Discord Stores Trillions of Messages",
    sourceAuthors: ["Bo Ingram"],
    sourceUrl: "https://discord.com/blog/how-discord-stores-trillions-of-messages",
    sourceNote:
      "This page explains, in plain language, the architecture and migration described in Discord's own engineering blog post, written by Bo Ingram, Senior Staff Software Engineer at Discord. All credit for the original work, research, and writing belongs to him and Discord - this is our own explanation of the same publicly documented migration, not a copy of their text.",
  },
  {
    slug: "rate-limiters",
    companySlug: "stripe",
    title: "How Stripe runs four different rate limiters, not just one",
    tagline: "A single token bucket stops the easy attacks - real production traffic needed three more layers behind it",
    seoKeywords: [
      "stripe rate limiter architecture",
      "stripe api rate limiting",
      "how stripe rate limits requests",
      "token bucket rate limiter",
      "stripe load shedding",
      "concurrent request limiter",
      "api rate limiting strategies",
      "rate limiter system design",
      "how to design an api rate limiter",
    ],
    intro:
      "Most rate limiters answer one question: how many requests per second is a user allowed? Stripe's engineering team found that question alone doesn't protect payments infrastructure. A user could stay under any per-second limit while still keeping dozens of expensive requests running at once. A low-priority analytics query and a live charge-creation call look identical to a limiter that only counts requests. And when something inside Stripe's own infrastructure degrades, rejecting traffic evenly across every endpoint is exactly the wrong response. Their answer was to run four separate rate limiters in production, each one built to catch a specific failure mode the others miss.",
    keyTermsUsed: [
      { term: "Token bucket", definition: "A rate-limiting algorithm where each user has a bucket of tokens that drains with each request and refills at a steady rate. An empty bucket means the next request gets rejected until it refills - simple to reason about, and it naturally tolerates short bursts as long as tokens are banked up." },
      { term: "Load shedding", definition: "Deliberately rejecting some requests during an overload, on purpose, so the system stays available for everyone else. The alternative - accepting everything until the whole fleet falls over - is worse for every user, not just the ones turned away." },
      { term: "Fail open", definition: "Designing a safety mechanism so that if it breaks, it lets traffic through instead of blocking everything. A rate limiter that depends on a cache being reachable needs a plan for what happens when that cache is down - and 'let requests through' is usually the safer failure mode than 'reject everything.'" },
      { term: "Flapping", definition: "Rapidly oscillating between two states - shedding load, then restoring it, then shedding it again - because a system reacted too fast to a brief spike instead of a real sustained trend." },
    ],
    pipeline: [
      { label: "Request Rate Limiter", detail: "First line of defense - each user gets N requests per second via a token bucket, with burst room for legitimate spikes.", stat: "millions rejected/mo" },
      { label: "Concurrent Requests Limiter", detail: "Caps how many of one user's requests can be in flight at once, protecting CPU-heavy endpoints from parallel hammering.", stat: "~12,000 rejections/mo" },
      { label: "Fleet Usage Load Shedder", detail: "Reserves a fixed slice of total infrastructure capacity for critical requests, shedding excess non-critical traffic before it can crowd them out." },
      { label: "Worker Utilization Load Shedder", detail: "Last line of defense during real incidents - sheds test-mode traffic first, then GETs, then POSTs, before ever touching critical methods.", stat: "~100 rejections/mo" },
      { label: "Fail open", detail: "Every limiter is wrapped so a cache failure lets requests through instead of blocking the entire API." },
    ],
    sections: [
      {
        heading: "The problem: one rate limiter isn't enough once you're payments infrastructure",
        body: [
          "Stripe's engineers point to four distinct scenarios a single rate limiter doesn't cover: an individual user's traffic spike threatening service for everyone else, a misbehaving script sending far more requests than intended, lower-priority requests like analytics queries crowding out critical transaction traffic, and internal failures where the system needs to selectively drop some traffic just to keep functioning at all.",
          "The common thread is that a limiter which only asks 'how many requests per second' treats every one of those situations identically - and for a company processing real financial transactions, a query listing someone's past charges and a request creating a new charge genuinely aren't the same kind of traffic, even though a naive rate limiter can't tell them apart.",
        ],
      },
      {
        heading: "Layer one: a token bucket, tuned for bursts, not just averages",
        body: [
          "The Request Rate Limiter is Stripe's most heavily used layer, restricting each user to a set number of requests per second. It's built on the token bucket algorithm specifically rather than a stricter fixed-window count, because a token bucket naturally tolerates short bursts - a legitimate spike, like traffic during a real-time sale event - as long as a user has tokens banked up, instead of punishing them the instant they cross a strict per-second line.",
          "It's applied identically in test mode and live mode, so a developer sees the same rate-limiting behavior during development that they'll hit in production - catching a badly-behaved integration before it ships, not after. This is the limiter doing the most work day to day: Stripe describes it rejecting millions of requests a month, the large majority of them in test mode.",
        ],
      },
      {
        heading: "Layer two: limiting concurrency, not just rate",
        body: [
          "Rate alone doesn't catch everything. A user could stay comfortably under a per-second limit while still keeping dozens of expensive requests in flight simultaneously, each one chewing through CPU on a heavy endpoint. The Concurrent Requests Limiter caps how many of one user's requests can be active at the same time instead of how many arrive per second.",
          "That change in what's being measured changes how clients end up behaving, too: hammering the API and retrying immediately stops working once concurrency itself is capped, which nudges well-built clients toward queuing work and backing off instead. This limiter triggers far less often than the request-rate layer - Stripe cites roughly 12,000 rejections a month - but credits it with fixing persistent performance problems on their most CPU-intensive endpoints that per-second limiting alone never caught.",
        ],
      },
      {
        heading: "Layer three: reserving capacity before anyone even hits a wall",
        body: [
          "The Fleet Usage Load Shedder works proactively rather than reacting to any single user's behavior. Traffic gets split into critical methods (creating a charge) and non-critical methods (listing past charges), and a fixed share of total fleet capacity is reserved specifically for critical traffic - Stripe's own example reserves 20% of capacity for critical requests, leaving non-critical traffic an 80% share to work within.",
          "Once non-critical traffic exceeds its allotted share, it starts getting shed with a 503 - even if critical traffic is nowhere near overloading the system on its own. The point isn't to wait for an actual overload before protecting what matters most; it's to make sure charge creation can never be crowded out by a flood of listing requests, structurally, before that crowding ever becomes a real incident.",
        ],
      },
      {
        heading: "Layer four: the last line of defense, tuned to avoid making things worse",
        body: [
          "The Worker Utilization Load Shedder is the layer that only fires during genuine incidents. It monitors real-time capacity across the fleet, and when things degrade, it sheds traffic progressively in priority order: test-mode traffic first, then GET requests, then POSTs, and only critical methods if the system is still struggling after shedding everything less important.",
          "The subtler engineering problem here is flapping - reacting too fast to a brief spike can cause a system to oscillate between shedding and restoring load in a way that's worse than doing nothing at all. Stripe tuned this layer to shed and recover gradually, over a period of minutes, specifically to avoid that oscillation. It's the least-triggered limiter of the four - around 100 rejections a month - because it exists purely for the worst days, not the routine ones.",
        ],
      },
      {
        heading: "The quiet detail that makes any of this safe to run: failing open",
        body: [
          "Every one of these four limiters depends on infrastructure - a shared cache - that can itself fail. Stripe wrapped each limiter's logic in explicit exception handling so that if the rate limiter's own dependency breaks, requests are let through rather than blocked, backed by feature flags that can disable a misbehaving limiter immediately.",
          "The lesson underneath that detail generalizes well beyond rate limiting: a safety system that can itself become the outage is worse than having no safety system at all. The correct default failure mode for something optional is 'get out of the way,' not 'block everything.'",
        ],
      },
    ],
    takeaway:
      "Stripe's rate limiting isn't one clever algorithm - it's four separate, purpose-built layers, each catching a failure mode a single token bucket alone would miss: raw request rate, concurrency per user, proactive capacity reservation for what matters most, and a last-resort shedder specifically tuned to avoid making incidents worse through flapping. All of it is deliberately built to fail open, because a protection mechanism that can itself take down the whole API isn't actually protecting anything. The transferable lesson: 'add a rate limiter' is really four different questions, and most systems only ever answer the first one.",
    sourceTitle: "Scaling your API with rate limiters",
    sourceAuthors: ["Paul Tarjan"],
    sourceUrl: "https://stripe.com/blog/rate-limiters",
    sourceNote:
      "This page explains, in plain language, the rate limiting architecture described in Stripe's own engineering blog post, written by Paul Tarjan. All credit for the original work, research, and writing belongs to him and Stripe - this is our own explanation of the same publicly documented system, not a copy of their text.",
  },
];

export function getDeepDivesForCompany(companySlug: string) {
  return architectureDeepDives.filter((d) => d.companySlug === companySlug);
}

export function getDeepDive(companySlug: string, deepDiveSlug: string) {
  return architectureDeepDives.find(
    (d) => d.companySlug === companySlug && d.slug === deepDiveSlug,
  );
}
