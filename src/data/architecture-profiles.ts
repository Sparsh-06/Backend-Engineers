export type TechStackItem = {
  name: string;
  category: string;
  whatItsFor: string;
};

export type ArchitectureProfile = {
  slug: string;
  company: string;
  /** Path under /public to the company's own brand mark, used on cards and the profile header. */
  logo: string;
  tagline: string;
  problem: string;
  scaleContext: string;
  seoKeywords: string[];
  techStack: TechStackItem[];
  approach: {
    heading: string;
    body: string;
  }[];
  microservicesNote: string;
  takeaway: string;
  sources: string[];
};

export const architectureProfiles: ArchitectureProfile[] = [
  {
    slug: "netflix",
    company: "Netflix",
    logo: "/logos/netflix.png",
    tagline: "Designing for failure instead of hoping it won't happen",
    problem:
      "Netflix runs a globally distributed system of hundreds of microservices, streaming to hundreds of millions of devices. At that scale, on public cloud infrastructure, something is failing somewhere at almost every moment - a single \"keep everything up\" strategy isn't realistic.",
    scaleContext:
      "Netflix streams to a subscriber base spread across nearly every country it operates in, on devices ranging from smart TVs to phones to game consoles, and it runs almost entirely on AWS rather than its own data centers - one of the largest public examples of a company running effectively its whole product on someone else's cloud.",
    seoKeywords: [
      "how does netflix scale",
      "netflix tech stack",
      "netflix architecture explained",
      "netflix microservices",
      "what programming language does netflix use",
      "chaos engineering netflix",
      "netflix chaos monkey",
      "netflix open connect cdn",
      "netflix aws architecture",
      "netflix system design",
    ],
    techStack: [
      { name: "AWS (Amazon Web Services)", category: "Cloud provider", whatItsFor: "Netflix's applications, databases, and storage run almost entirely on AWS's public cloud rather than Netflix-owned data centers - they rent the compute and let AWS handle the physical hardware." },
      { name: "Open Connect", category: "Custom CDN", whatItsFor: "Netflix built its own content delivery network - physical caching servers placed directly inside internet service providers' networks around the world - specifically so the actual video files (the heaviest part of the traffic) don't have to travel far to reach a viewer." },
      { name: "Java / JVM", category: "Backend language", whatItsFor: "The majority of Netflix's backend microservices are written in Java, running on the JVM (Java Virtual Machine) - a mature, high-performance runtime well suited to the large number of long-running backend services Netflix operates." },
      { name: "Spring Boot", category: "Application framework", whatItsFor: "Many Netflix Java services are built on Spring Boot, a framework that handles a lot of the repetitive setup (web server, configuration, dependency wiring) so teams can focus on the actual service logic." },
      { name: "Cassandra", category: "Database", whatItsFor: "A NoSQL database Netflix uses for data that needs to be written and read at very high volume across many regions, where strict relational consistency matters less than always being available, even during a regional outage." },
      { name: "EVCache (built on Memcached)", category: "Caching layer", whatItsFor: "Netflix's caching layer, built on top of Memcached, used to avoid hitting slower backend datastores for data that's read far more often than it changes - user session data, frequently accessed metadata." },
      { name: "Kafka", category: "Event streaming", whatItsFor: "Used to move large volumes of event data (like viewing activity and operational metrics) between services asynchronously, so producers and consumers of that data don't have to be directly connected or available at the same time." },
      { name: "Zuul", category: "API gateway", whatItsFor: "Netflix's own edge gateway service - the front door that every request passes through first, responsible for routing it to the right internal microservice and applying cross-cutting rules like authentication." },
    ],
    approach: [
      {
        heading: "Chaos engineering, on purpose",
        body: "Netflix popularized deliberately injecting failure into production systems to find weaknesses before they cause real outages. Their original tool, Chaos Monkey, randomly terminates instances in production - the idea being that if your system can't survive a random instance dying, you'll find out on your own schedule instead of during a real incident. This grew into a broader practice (the 'Simian Army') testing for everything from single-instance failure to entire-region outages. In plain terms: instead of hoping their servers never crash, Netflix built a robot that crashes them on purpose, constantly, so every team is forced to build services that survive it.",
      },
      {
        heading: "Microservices, split around team and failure boundaries",
        body: "Netflix moved from a monolithic architecture - one large application handling everything - to a large number of independently deployable microservices, each owned by a small team, communicating over the network rather than through shared in-process code. Concretely, this means the service that recommends what to watch next, the service that handles billing, and the service that actually streams video are all separate programs, running on separate machines, that talk to each other over the network instead of being one giant program. This let teams ship independently, but the real architectural point was isolating failure - one misbehaving service shouldn't be able to take down the services around it.",
      },
      {
        heading: "Falling back gracefully instead of falling over",
        body: "A recurring theme in Netflix's public engineering writing is designing every service to degrade rather than fail outright when a dependency is slow or unavailable - showing a simpler recommendation list instead of an error page, for instance. Netflix's Hystrix library (since retired in favor of newer resilience patterns) was built specifically to add circuit breakers - a mechanism that stops calling a struggling service temporarily, the same way an electrical circuit breaker cuts power before something overheats - and fallback logic around calls to other services.",
      },
      {
        heading: "Open Connect: solving video delivery as its own problem",
        body: "Streaming video is enormous in volume compared to normal web traffic - a single popular show being watched by millions of people at once is a fundamentally different delivery problem than serving a webpage. Rather than relying entirely on general-purpose CDNs, Netflix built and placed its own caching hardware (Open Connect Appliances) physically inside ISP networks, so the video itself is served from a server close to the viewer instead of traveling across the wider internet for every single stream.",
      },
    ],
    microservicesNote:
      "\"Microservices\" at Netflix isn't a buzzword - it concretely means hundreds of small, independently deployable Java/Spring Boot services (recommendations, billing, playback, search, and many more), each with its own team, its own deployment schedule, and its own database where needed, all coordinated through the Zuul gateway and communicating over the network rather than sharing code directly.",
    takeaway:
      "The throughline across Netflix's public architecture writing isn't a specific technology - it's the assumption that failure is guaranteed, so the job is limiting its blast radius and testing that containment continuously, not just hoping it holds.",
    sources: [
      "Netflix Technology Blog - chaos engineering and the Simian Army",
      "Netflix Technology Blog - microservices and API gateway evolution",
      "Netflix Technology Blog - Open Connect CDN architecture",
    ],
  },
  {
    slug: "uber",
    company: "Uber",
    logo: "/logos/uber.svg",
    tagline: "A dispatch problem that's really a real-time geospatial problem",
    problem:
      "Matching riders to drivers isn't a normal CRUD problem - it needs to answer 'which drivers are near this rider, right now' continuously, across a constantly moving dataset, at low latency, across many cities simultaneously.",
    scaleContext:
      "Uber operates across a large number of cities worldwide, each with its own local supply of drivers and demand pattern, and the core dispatch problem has to run continuously in real time - a driver's location a minute ago is stale data for a matching decision made right now.",
    seoKeywords: [
      "how does uber scale",
      "uber tech stack",
      "uber architecture explained",
      "uber system design",
      "what programming language does uber use",
      "uber h3 geospatial index",
      "uber schemaless database",
      "uber microservices",
      "uber dispatch system design",
      "uber engineering blog",
    ],
    techStack: [
      { name: "Go", category: "Backend language", whatItsFor: "Uber has publicly discussed using Go for many backend services where performance and simple concurrency (handling many requests at once) matter - Go was designed at Google partly to make writing highly concurrent network services more straightforward than in older languages." },
      { name: "Java", category: "Backend language", whatItsFor: "Alongside Go, a substantial portion of Uber's original and ongoing backend services are written in Java, particularly older core services that predate the wider move to Go." },
      { name: "H3", category: "Geospatial indexing library", whatItsFor: "An open-source library Uber built to divide the globe into a grid of hexagonal cells, so questions like 'which drivers are near this point' can be answered by a fast lookup instead of comparing raw latitude/longitude against every driver individually." },
      { name: "Schemaless (on MySQL)", category: "Datastore", whatItsFor: "A datastore Uber built on top of MySQL to get more horizontal scalability while keeping some of MySQL's operational maturity - rather than switching wholesale to a different database engine, they built a scaling layer on top of one they already trusted." },
      { name: "Kafka", category: "Event streaming", whatItsFor: "Used extensively at Uber to move high-volume real-time data - trip events, location updates - between services asynchronously, which is essential when thousands of location updates are arriving every second across a city." },
      { name: "Cassandra", category: "Database", whatItsFor: "Used for some of Uber's data that needs to be available and fast to write across multiple regions, similar to its role at other large-scale companies - trading strict consistency for availability under heavy write load." },
      { name: "Mesos / later Kubernetes", category: "Container orchestration", whatItsFor: "Systems for scheduling and running Uber's large number of backend service instances across a fleet of machines, deciding which physical or virtual machine each service instance actually runs on." },
    ],
    approach: [
      {
        heading: "H3, a hexagonal geospatial index",
        body: "Uber open-sourced H3, a system for dividing the globe into a hierarchical grid of hexagonal cells, used to index driver and rider locations efficiently. Hexagons have more uniform adjacency than a square grid - every neighboring hexagon is the same distance away, which isn't true of squares (diagonal neighbors are farther than side neighbors) - which made proximity queries like 'what's near this point' cheaper and more consistent at the scale Uber operates at. In practice, this means a driver's location gets mapped to a hexagon ID, and finding nearby drivers becomes a fast lookup of nearby hexagon IDs instead of an expensive distance calculation against every driver in the city.",
      },
      {
        heading: "Moving off a single relational datastore",
        body: "Uber's early architecture leaned heavily on a single large MySQL setup as the system grew past what that could comfortably handle. Uber's engineering blog documented building Schemaless, a datastore layered on top of MySQL to get horizontal scalability while keeping some of the operational familiarity of a relational engine underneath - instead of throwing away MySQL entirely, they used it as a lower-level storage engine underneath a new distributed layer they controlled themselves.",
      },
      {
        heading: "A services architecture built around independent scaling",
        body: "Like most companies operating at this scale, Uber split its original monolith into many independently deployable services, specifically so that dispatch, pricing (including surge pricing calculations), mapping, and payments could each scale according to their own very different load patterns instead of being forced to scale together. Dispatch traffic spikes at rush hour in a specific city; payment processing load looks completely different - treating them as separate services means each can be given exactly the resources its own pattern needs.",
      },
    ],
    microservicesNote:
      "Uber runs a large number of backend microservices, historically written in a mix of Java and Go, coordinated through internal service infrastructure and scheduled across their compute fleet with tools like Mesos and later Kubernetes - dispatch, pricing, mapping, and payments are examples of functionally distinct services rather than one shared codebase.",
    takeaway:
      "Uber's public engineering content keeps returning to one idea: generic tools work until your core problem (real-time geospatial matching, at global scale) is unusual enough that you have to build a purpose-built layer instead of forcing a general-purpose database to do it.",
    sources: [
      "Uber Engineering Blog - H3: Uber's Hexagonal Hierarchical Spatial Index",
      "Uber Engineering Blog - Schemaless, a scalable datastore",
      "Uber Engineering Blog - the migration from a monolith to microservices",
    ],
  },
  {
    slug: "discord",
    company: "Discord",
    logo: "/logos/discord.svg",
    tagline: "Millions of concurrent WebSocket connections, and the language choices that followed",
    problem:
      "Discord's core product is real-time - messages, voice, presence - which means holding open a persistent WebSocket connection per active user, at a scale of many millions of simultaneous connections, without the server-side cost spiraling out of control.",
    scaleContext:
      "Discord's defining technical challenge is holding open a live, persistent connection (a WebSocket, not a normal request-response HTTP call) for every single active user across a very large number of communities simultaneously, so that a message or presence change (someone coming online) can be pushed to everyone who needs to see it instantly, rather than waiting for each client to ask again.",
    seoKeywords: [
      "how does discord scale",
      "discord tech stack",
      "discord architecture explained",
      "discord elixir rust",
      "why discord switched from go to rust",
      "discord websocket architecture",
      "discord cassandra database",
      "discord system design",
      "what database does discord use",
      "discord engineering blog",
    ],
    techStack: [
      { name: "Elixir (on the Erlang VM/BEAM)", category: "Backend language/runtime", whatItsFor: "Used for services that need to manage huge numbers of lightweight, isolated, concurrent connections - Discord's gateway servers, which hold the actual open WebSocket connections, lean on this because the underlying Erlang VM was originally built for telecom systems that needed exactly this shape of massive, fault-isolated concurrency." },
      { name: "Rust", category: "Backend language", whatItsFor: "Used for specific, identified hot paths where Discord needed lower-level control over memory and performance than Elixir or Go gave them - notably parts of their read-states service, where garbage-collection pauses under heavy load were a measured, specific problem." },
      { name: "Go", category: "Backend language", whatItsFor: "Used for a number of Discord's backend services generally, prior to and alongside the more targeted moves to Rust for specific bottlenecks." },
      { name: "Cassandra", category: "Database", whatItsFor: "Discord has publicly discussed using Cassandra for message storage at very large scale, since it's built to handle huge, ever-growing write volume (billions of messages) across distributed nodes without a single database server becoming the bottleneck." },
      { name: "Redis", category: "Caching / real-time state", whatItsFor: "Used for fast, temporary state that needs to be shared across many backend processes - presence status, rate limiting, and similar real-time data that benefits from an in-memory store rather than a full database round trip." },
      { name: "WebSockets", category: "Real-time protocol", whatItsFor: "The actual connection protocol Discord clients use to maintain a persistent, two-way link with Discord's servers, which is what allows messages and presence changes to be pushed to a user's device instantly instead of the client having to repeatedly ask 'anything new?'" },
    ],
    approach: [
      {
        heading: "Elixir for the parts that need massive concurrency",
        body: "Discord has written publicly about using Elixir (built on the Erlang VM, often called BEAM) for services that need to hold huge numbers of lightweight, isolated processes concurrently - a natural fit for millions of open connections. In the Erlang VM's model, each connection can be handled by its own extremely cheap, independent process, so one connection crashing or misbehaving doesn't take others down with it - a very different memory and concurrency model from a typical thread-per-connection design, and one built specifically for exactly this kind of massive fan-out.",
      },
      {
        heading: "Rewriting hot paths in Rust when a language hit its ceiling",
        body: "In more than one widely-shared engineering post, Discord described specific services - including parts of their read-states and data-caching layers - being rewritten from Go or Elixir into Rust after hitting performance walls, notably garbage-collection pauses under sustained load. Garbage-collected languages periodically pause execution briefly to clean up unused memory; at Discord's scale, those pauses were becoming visible and costly for specific latency-sensitive services, and Rust - which manages memory without a garbage collector - removed that specific class of problem for those services. The pattern in their writing isn't 'Rust is universally better' - it's identifying a specific hot path with a specific measured problem, then reaching for a language suited to that one problem.",
      },
      {
        heading: "Splitting stateful, connection-heavy services from stateless ones",
        body: "Discord's architecture separates services that must hold long-lived connection state (the gateway servers managing WebSocket sessions, written largely in Elixir) from stateless services that can scale and restart freely - the same statelessness-enables-scaling idea covered in this site's fundamentals, applied at a scale most systems never reach. A gateway server holding millions of live connections can't just be freely restarted the way a stateless API server can, so Discord's infrastructure treats these as genuinely different categories of service with different deployment and scaling rules.",
      },
    ],
    microservicesNote:
      "Discord's backend is split by function rather than being one monolith - gateway services (holding live WebSocket connections, largely Elixir), message storage and read-state services (with specific components rewritten in Rust for performance), and a range of supporting Go services, all communicating over internal networking rather than sharing a single codebase or process.",
    takeaway:
      "Discord's public writing is unusually specific about naming failure points before switching tools - the lesson isn't 'pick the fastest language,' it's 'measure the actual bottleneck before deciding what to rewrite, and only rewrite what's actually the bottleneck.'",
    sources: [
      "Discord Engineering Blog - Why Discord is switching from Go to Rust",
      "Discord Engineering Blog - How Discord scaled Elixir to handle millions of concurrent users",
      "Discord Engineering Blog - How Discord stores billions of messages",
    ],
  },
  {
    slug: "stripe",
    company: "Stripe",
    logo: "/logos/stripe.svg",
    tagline: "Money can't be 'probably correct' - reliability as the actual product",
    problem:
      "Payments infrastructure has a different tolerance for error than most software - a duplicate charge or a lost transaction isn't a minor bug, it's actual money either taken from or owed to a real person. The engineering challenge isn't primarily speed; it's absolute correctness under network conditions that are never fully reliable.",
    scaleContext:
      "Stripe processes payments on behalf of a very large number of businesses across many countries, each with different currencies, banking rules, and card networks - meaning the same API call has to behave predictably and correctly regardless of which country, currency, or payment method is actually involved underneath.",
    seoKeywords: [
      "how does stripe scale",
      "stripe tech stack",
      "stripe architecture explained",
      "stripe idempotency keys",
      "stripe api design",
      "stripe api versioning",
      "stripe sorbet ruby",
      "stripe system design",
      "what programming language does stripe use",
      "stripe engineering blog",
    ],
    techStack: [
      { name: "Ruby", category: "Backend language (early/core)", whatItsFor: "Stripe's core API and much of its early backend were built in Ruby, chosen originally for developer productivity - Stripe has since layered significant internal tooling and typing discipline on top of it to manage correctness at scale." },
      { name: "Sorbet", category: "Type checker for Ruby", whatItsFor: "A gradual type checker Stripe built and open-sourced for Ruby, adding static type safety on top of a language that's normally dynamically typed - directly motivated by wanting more compile-time confidence in a codebase handling financial logic." },
      { name: "MongoDB / MySQL", category: "Databases", whatItsFor: "Stripe has used both relational (MySQL) and document-oriented (MongoDB) storage across different parts of its systems, depending on the shape and consistency needs of the specific data involved." },
      { name: "Kafka", category: "Event streaming", whatItsFor: "Used to reliably move events (like payment status changes) between internal services asynchronously, which matters when a single payment can trigger many downstream effects - fraud checks, notifications, accounting - that don't all need to happen synchronously." },
      { name: "Idempotency keys", category: "API design pattern", whatItsFor: "Not a piece of software, but a core design pattern baked directly into Stripe's public API - a client-generated key that lets the exact same request be safely retried without ever double-charging a customer." },
    ],
    approach: [
      {
        heading: "Idempotency keys, as a first-class API concept",
        body: "Stripe's API popularized the idempotency key pattern for public APIs - a client-generated key attached to a request so that retrying the exact same request (after a timeout, a dropped connection) never accidentally double-charges a customer. Concretely: a client sends a payment request along with a unique key it generated itself; if the network fails and the client retries with that same key, Stripe recognizes it and returns the result of the original attempt instead of charging the card a second time. This is one of the most frequently cited real-world examples of idempotency in backend engineering, precisely because Stripe documented and productized the pattern so clearly.",
      },
      {
        heading: "Careful, deliberate API versioning",
        body: "Stripe maintains long-term backward compatibility for its public API by versioning changes and giving every account a pinned API version, rather than forcing all clients to move in lockstep. In practice, this means a business that integrated with Stripe's API years ago can keep running that exact same integration indefinitely, even as Stripe ships new API versions for new customers - Stripe's servers internally translate between versions rather than breaking old clients. Publicly discussed as a deliberate tradeoff: added internal complexity, in exchange for external clients never getting an unannounced breaking change.",
      },
      {
        heading: "Adding static types to a dynamic language, on purpose",
        body: "Stripe built and open-sourced Sorbet, a type checker for Ruby, specifically because a large, fast-growing codebase handling financial logic benefits enormously from catching a class of bugs at compile time rather than discovering them in production. This is a concrete example of choosing correctness tooling over developer convenience once the stakes of a mistake go up - Ruby without types is faster to write, but riskier at the scale and criticality Stripe operates at.",
      },
      {
        heading: "Treating the API contract itself as the product",
        body: "Much of Stripe's public engineering and design writing focuses on the API surface as a designed product in its own right - consistent naming, predictable error shapes, extensive documentation - not just a thin wrapper around internal services. The recurring argument in their writing is that developer trust is itself a reliability property, not just a nice-to-have.",
      },
    ],
    microservicesNote:
      "Stripe's backend is organized into services responsible for distinct financial concerns (payments processing, fraud detection, billing, connected-account management), historically rooted in a large Ruby codebase with Sorbet-enforced typing, communicating internally through service boundaries and event streams like Kafka rather than one shared, untyped monolith.",
    takeaway:
      "Stripe's engineering culture, as far as it's publicly documented, treats correctness and API stability as the actual hard engineering problem - worth more deliberate investment than raw performance, because in payments, a fast wrong answer is worse than a slightly slower right one.",
    sources: [
      "Stripe Engineering Blog - Idempotency keys",
      "Stripe API documentation - versioning",
      "Stripe Engineering Blog - Sorbet, a type checker for Ruby",
    ],
  },
  {
    slug: "airbnb",
    company: "Airbnb",
    logo: "/logos/airbnb.svg",
    tagline: "Breaking apart a Ruby on Rails monolith without breaking the business",
    problem:
      "Airbnb's original Ruby on Rails monolith let a small team move fast in the early days, but as the company and engineering org grew, that same monolith became the thing slowing everyone down - every team's code lived in one repository, one deploy pipeline, and one runtime, so a change anywhere could break something everywhere.",
    scaleContext:
      "Airbnb runs a global marketplace connecting millions of hosts and guests across a huge number of listings worldwide, with a large engineering organization that outgrew what a single shared codebase and deploy process could support - the technical challenge was less about raw request volume and more about how many engineers could safely ship changes to the same system at once.",
    seoKeywords: [
      "how does airbnb scale",
      "airbnb tech stack",
      "airbnb architecture explained",
      "airbnb service-oriented architecture",
      "airbnb monolith to microservices",
      "airbnb apache airflow",
      "airbnb engineering blog",
      "airbnb system design",
      "what database does airbnb use",
      "airbnb kubernetes migration",
    ],
    techStack: [
      { name: "Ruby on Rails", category: "Backend framework (core)", whatItsFor: "Airbnb's original monolith, and still a significant part of its backend today, is built on Ruby on Rails - chosen in the company's early days for how quickly it let a small team ship a working product." },
      { name: "Thrift", category: "Service communication (RPC)", whatItsFor: "As Airbnb split its monolith into services, it adopted Thrift to define and call APIs between those services - a way for one internal service to call another with a strongly typed contract instead of loosely-defined HTTP calls." },
      { name: "Apache Airflow", category: "Workflow orchestration (built in-house)", whatItsFor: "A tool Airbnb built internally to schedule and monitor complex data pipelines - many small jobs with dependencies between them - and later open-sourced; it's since become one of the most widely used workflow schedulers in the industry." },
      { name: "Druid", category: "Real-time analytics datastore", whatItsFor: "Used for dashboards and analytics that need to query very large volumes of event data with low latency, where a traditional data warehouse would be too slow to query interactively." },
      { name: "Kubernetes", category: "Container orchestration", whatItsFor: "Airbnb migrated its service infrastructure onto Kubernetes, moving away from earlier in-house deployment tooling, to get a more standard, community-supported way of scheduling and scaling its large number of services." },
      { name: "MySQL", category: "Primary relational database", whatItsFor: "Airbnb's core transactional data - listings, bookings, users - has long lived in MySQL, sharded and scaled as the company grew rather than replaced outright." },
      { name: "Java", category: "Backend language (newer services)", whatItsFor: "Used for a number of newer backend services built after the move away from a single Rails codebase, particularly infrastructure-facing services where the JVM's performance and tooling ecosystem were a better fit than Ruby." },
      { name: "Kafka", category: "Event streaming", whatItsFor: "Moves event data - bookings, search activity, pricing changes - between services and into the data pipelines that feed tools like Airflow and Druid, without every producer and consumer needing to be directly connected." },
    ],
    approach: [
      {
        heading: "Extracting services from the monolith, deliberately and incrementally",
        body: "Airbnb has written extensively about the multi-year effort to pull functionality out of its original Rails monolith into independently deployable services, using Thrift to define clear contracts between them. Rather than a rewrite, the publicly documented approach was incremental extraction - identifying a bounded piece of functionality, building it as a standalone service, and migrating callers over to it while the monolith kept running everything else. The stated goal wasn't microservices as an end in itself, but letting more engineers ship changes safely and independently without waiting on a single shared codebase's deploy queue.",
      },
      {
        heading: "Building Apache Airflow because the right tool didn't exist yet",
        body: "As Airbnb's data pipelines grew more complex - many small jobs with dependencies on each other, needing to run on a schedule and be monitored for failure - the company built Apache Airflow internally, then open-sourced it. Airflow represents pipelines as a directed graph of tasks, so a failure in one step can be retried or alerted on without silently corrupting everything downstream. It's since become one of the most widely adopted data orchestration tools outside Airbnb entirely, which is a useful signal that the underlying problem - scheduling and monitoring interdependent data jobs reliably - is a genuinely common one, not unique to Airbnb.",
      },
      {
        heading: "Standardizing infrastructure on Kubernetes",
        body: "Airbnb has documented moving its service infrastructure onto Kubernetes, replacing earlier custom deployment and scheduling tooling built in-house. The stated motivation in their public writing is consistency and reduced maintenance burden - running on a widely adopted, actively developed open-source scheduler instead of continuing to maintain bespoke internal tooling that only Airbnb's own infrastructure team understood.",
      },
      {
        heading: "Treating the migration itself as an engineering problem",
        body: "A recurring theme in Airbnb's public engineering writing about the SOA migration is that the transition process itself needed careful engineering - tooling to run old and new code paths side by side, ways to verify a new service produced the same results as the code it was replacing, and a gradual rollout rather than a single cutover. The lesson emphasized repeatedly is that a large-scale architectural migration is itself a project that needs its own safety mechanisms, not just a destination to reach.",
      },
    ],
    microservicesNote:
      "Airbnb's backend today is a mix of its original Ruby on Rails monolith (still handling a meaningful share of functionality) and a growing number of independently deployable services - many in Java - extracted from it over several years, communicating over Thrift-defined APIs and scheduled on Kubernetes rather than the monolith's original deployment process.",
    takeaway:
      "Airbnb's public engineering writing is less about a single clever technology and more about how to migrate a large, business-critical monolith into services without stopping the business - incrementally, with tooling built specifically to make the migration itself safe.",
    sources: [
      "Airbnb Engineering Blog - migrating to a service-oriented architecture",
      "Airbnb Engineering Blog - building and open-sourcing Apache Airflow",
      "Airbnb Engineering Blog - building Airbnb's Kubernetes infrastructure",
    ],
  },
  {
    slug: "spotify",
    company: "Spotify",
    logo: "/logos/spotify.svg",
    tagline: "Hundreds of autonomous services, and the cloud migration that took years",
    problem:
      "Spotify runs a real-time streaming product for a huge global user base, backed by hundreds of independently owned backend services - the architectural challenge isn't one hard technical problem, it's keeping that many services, owned by that many small autonomous teams, reliable and consistent at once.",
    scaleContext:
      "Spotify serves a large global base of listeners simultaneously streaming audio, backed by a backend built from several hundred microservices - and for years that backend ran primarily on Spotify's own data centers before a deliberate, multi-year migration moved nearly all of it onto Google Cloud Platform.",
    seoKeywords: [
      "how does spotify scale",
      "spotify tech stack",
      "spotify architecture explained",
      "spotify microservices",
      "spotify google cloud migration",
      "spotify backend for frontend",
      "spotify engineering blog",
      "spotify system design",
      "what database does spotify use",
      "spotify squad model",
    ],
    techStack: [
      { name: "Java", category: "Backend language (core)", whatItsFor: "The primary language for the large majority of Spotify's backend services, chosen for its mature tooling and performance characteristics across a very large number of independently run services." },
      { name: "Python", category: "Backend language (data & tooling)", whatItsFor: "Used across a number of Spotify's data engineering and internal tooling services, alongside Java, particularly where rapid iteration mattered more than raw runtime performance." },
      { name: "Google Cloud Platform", category: "Cloud provider", whatItsFor: "The destination of Spotify's multi-year migration off its own data centers - compute, storage, and managed services that Spotify's infrastructure teams no longer have to run and maintain themselves." },
      { name: "Cassandra", category: "Database", whatItsFor: "Used across a number of Spotify's services for data that needs to be written and read at high volume with availability prioritized over strict consistency, similar to its role at other large-scale streaming and social platforms." },
      { name: "Google Cloud Pub/Sub", category: "Event delivery / messaging", whatItsFor: "Part of Spotify's event delivery system after its cloud migration, used to move events - like a play, a skip, a follow - between services asynchronously, replacing earlier in-house messaging infrastructure built for its own data centers." },
      { name: "Apache Beam / Scio", category: "Data processing", whatItsFor: "Scio is a Scala API for Apache Beam that Spotify built and open-sourced, used to write the large-scale data processing pipelines - like the ones behind Spotify's personalized playlists - that need to run the same logic over both real-time streams and historical batch data." },
      { name: "Docker", category: "Containerization", whatItsFor: "Spotify's backend services run as containers, packaged consistently regardless of which underlying language or team built them, which is what made a uniform deployment and scheduling story across hundreds of independently owned services possible in the first place." },
      { name: "Kubernetes (Google Kubernetes Engine)", category: "Container orchestration", whatItsFor: "Following the move to Google Cloud, Spotify runs much of its service fleet on GKE, scheduling and scaling containers across the cloud infrastructure it migrated onto rather than infrastructure it operates itself." },
    ],
    approach: [
      {
        heading: "A multi-year migration off self-managed data centers",
        body: "Spotify has published extensively about moving its backend off infrastructure it ran itself and onto Google Cloud Platform - a migration the company has been open about taking several years, service by service, rather than as a single cutover. The publicly stated motivation was letting engineering teams focus on product logic instead of operating physical infrastructure, and getting access to managed services (storage, messaging, data processing) instead of building and maintaining equivalents in-house indefinitely.",
      },
      {
        heading: "Backend for Frontend: one API layer per client, not one API for everyone",
        body: "Spotify is one of the most frequently cited examples of the Backend for Frontend (BFF) pattern - building a dedicated backend API layer tailored to each client surface (mobile, desktop, web) instead of forcing every client to consume one generic, shared API. The reasoning documented in their engineering writing is that a mobile client and a desktop client often need meaningfully different data shapes and call patterns, and a single generic API ends up compromising for all of them rather than serving any one well.",
      },
      {
        heading: "Rebuilding event delivery around managed cloud messaging",
        body: "As part of the cloud migration, Spotify's engineering blog has documented rebuilding its event delivery system - the pipeline that moves events like plays, skips, and follows between services and into analytics - around Google Cloud Pub/Sub, replacing earlier infrastructure that had been built for Spotify's own data centers. The stated challenge wasn't just swapping one message broker for another; it meant re-examining assumptions the old system had made about ordering, delivery guarantees, and scale that didn't automatically carry over to the new platform.",
      },
      {
        heading: "Squads: small, autonomous teams that own their services end to end",
        body: "Spotify's well-known 'squad' model - small, cross-functional teams with end-to-end ownership of a specific piece of the product - is as much an organizational structure as a technical one, but the two are directly connected: hundreds of independently deployable services only work well if each one has a clear, accountable owner. A squad owning a service means that team decides its architecture, its on-call rotation, and its release schedule, rather than changes needing sign-off from a central team that owns everything.",
      },
    ],
    microservicesNote:
      "Spotify's backend is built from several hundred independently deployable microservices, primarily in Java with some in Python, each owned end to end by a small 'squad,' packaged as Docker containers and scheduled on Kubernetes - a structure that only works because ownership boundaries are as clearly defined organizationally as they are technically.",
    takeaway:
      "Spotify's public engineering writing keeps circling back to the same idea from two directions - technically, hundreds of small services instead of one large one; organizationally, hundreds of small autonomous teams instead of one large one - and treats the two as inseparable, not as a technical decision made independently of how the teams themselves are structured.",
    sources: [
      "Spotify Engineering Blog - Spotify's journey to the cloud",
      "Spotify Engineering Blog - event delivery, from on-prem to Google Cloud Pub/Sub",
      "Spotify Engineering - open-sourcing Scio, a Scala API for Apache Beam",
    ],
  },
];

export function getArchitectureProfile(slug: string) {
  return architectureProfiles.find((profile) => profile.slug === slug);
}
