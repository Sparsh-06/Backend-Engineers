export type InterviewLevel = "SDE1" | "SDE2" | "SDE3+";

export const LEVEL_LABELS: Record<InterviewLevel, string> = {
  SDE1: "SDE1 · New grad",
  SDE2: "SDE2 · Mid-level",
  "SDE3+": "SDE3+ · Senior",
};

export type InterviewQuestion = {
  id: string;
  topicSlug: string;
  level: InterviewLevel;
  question: string;
  answer: string;
};

// Each topic gets one question per level, so the same concept is covered at
// three real depths instead of writing four near-duplicate tiers. "SDE3+"
// covers both SDE3 and Senior/Staff expectations, since in practice those
// two blend together on most engineering ladders - splitting them further
// would mean padding with thin, repetitive content rather than real depth.
export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "what-is-a-server-1",
    topicSlug: "what-is-a-server",
    level: "SDE1",
    question: "What actually is a 'server' - is it a machine, or something else?",
    answer:
      "Think of 'server' as a job title, not a specific computer. It's just a program sitting there, listening on a port, waiting to answer requests. One machine can run a dozen 'servers' at once, and the same program can be a server to your browser and a client to its own database - it just depends which way you're looking at it.",
  },
  {
    id: "what-is-a-server-2",
    topicSlug: "what-is-a-server",
    level: "SDE2",
    question: "If a server process crashes mid-request, what happens to the client, and how would you make that safer?",
    answer:
      "The client just sees the connection die - a timeout or a reset, nothing helpful. It has no idea if the server crashed, the network blipped, or the request actually went through. That's exactly why retries need to be safe (idempotent), and why you'd want something like Kubernetes watching the process so it restarts itself instead of staying dead.",
  },
  {
    id: "what-is-a-server-3",
    topicSlug: "what-is-a-server",
    level: "SDE3+",
    question: "You're running one server handling 10,000 requests per second and it's maxed out on CPU - walk through how you'd actually scale it.",
    answer:
      "First figure out if you're really CPU-bound, or if something sneaky like garbage collection is eating your cycles and just looking like CPU load. Once you know it's real, you've got two moves: make the machine bigger (vertical) or add more machines behind a load balancer (horizontal). Horizontal only works if the server is stateless - otherwise you're just moving the bottleneck, not fixing it.",
  },
  {
    id: "statelessness-1",
    topicSlug: "statelessness",
    level: "SDE1",
    question: "What does it mean for a server to be 'stateless,' in your own words?",
    answer:
      "It means the server has amnesia between requests - on purpose. Every request has to bring its own context, like an auth token, because the server isn't keeping notes about who you are. The moment a server starts remembering things in its own memory, like 'this user is logged in,' that's state, and now you're stuck needing that exact server again.",
  },
  {
    id: "statelessness-2",
    topicSlug: "statelessness",
    level: "SDE2",
    question: "Your app stores login sessions in each server's memory. What breaks when you add a second server behind a load balancer?",
    answer:
      "Your session only lives on whichever server created it. So the moment the load balancer sends your next request to the other server, it has no idea who you are - you just got logged out for no reason. The fix is getting that session data out of any one server's memory, either into a shared store like Redis, or into a signed token the client carries around itself.",
  },
  {
    id: "statelessness-3",
    topicSlug: "statelessness",
    level: "SDE3+",
    question: "Design a way to migrate a stateful legacy service to be stateless without downtime.",
    answer:
      "You basically run old and new side by side for a while - write state to the new shared store from both code paths so nothing's lost mid-migration. Sticky sessions can bridge the gap temporarily, but they're a crutch, not the destination. You only flip traffic over fully once you've proven the shared store holds up under real load, not just in a test.",
  },
  {
    id: "idempotency-1",
    topicSlug: "idempotency",
    level: "SDE1",
    question: "What does idempotent mean, with a real-world example?",
    answer:
      "Doing it once or doing it ten times gives you the same result - like mashing an elevator button doesn't summon ten elevators. DELETE /users/5 is idempotent: the user's gone either way. POST /orders usually isn't - call it twice and you've got two orders.",
  },
  {
    id: "idempotency-2",
    topicSlug: "idempotency",
    level: "SDE2",
    question: "A payment request times out and the client retries automatically. How do you stop a double charge?",
    answer:
      "The client sends a unique idempotency key along with the request. The server remembers which keys it's already handled - so if that same key shows up again, it just hands back the original result instead of charging the card a second time. The catch is that 'remembering' has to survive a restart, so it needs to live in real storage, not just memory.",
  },
  {
    id: "idempotency-3",
    topicSlug: "idempotency",
    level: "SDE3+",
    question: "Design an idempotency-key system that has to work across multiple servers and survive a crash mid-request.",
    answer:
      "The key move is storing the idempotency key - and a 'this is in progress' marker - in a shared datastore before you do any real work, using something like a unique constraint so two servers can't both think they're first. Then you've got to decide what a retry gets back if it arrives while the original is still running, and set an expiry so old keys don't pile up forever.",
  },
  {
    id: "what-is-an-api-1",
    topicSlug: "what-is-an-api",
    level: "SDE1",
    question: "What is an API, in plain terms?",
    answer:
      "It's just an agreed-upon way for one piece of code to ask another to do something, without needing to know how it actually happens underneath. A function signature is an API. A library's public exports are an API. A REST endpoint is an API. Same idea, different scale.",
  },
  {
    id: "what-is-an-api-2",
    topicSlug: "what-is-an-api",
    level: "SDE2",
    question: "You're designing an internal API for another team to call. What makes it good versus painful to use?",
    answer:
      "Predictable naming and consistent error shapes matter way more than people expect - if every endpoint fails differently, every caller has to write custom handling for each one. You'd also think about what you're willing to promise long-term, because once another team depends on your API, changing it becomes everyone's problem, not just yours.",
  },
  {
    id: "what-is-an-api-3",
    topicSlug: "what-is-an-api",
    level: "SDE3+",
    question: "Design an API that has to stay stable for external clients while your internal implementation keeps changing underneath it.",
    answer:
      "The trick is treating the API contract as its own thing, separate from your internal models - you map between them at the boundary instead of exposing your database schema directly. That way your internal implementation can shift freely, as long as you keep honoring the shape you promised externally, which usually means a translation layer that's a little annoying to maintain but saves you from breaking everyone every time you refactor.",
  },
  {
    id: "sync-vs-async-1",
    topicSlug: "sync-vs-async",
    level: "SDE1",
    question: "What's the actual difference between synchronous and asynchronous?",
    answer:
      "Synchronous means you wait - nothing else happens until this finishes, like standing in line. Asynchronous means you kick something off and keep going, coming back to it later when it's done, like ordering food and browsing your phone instead of staring at the kitchen.",
  },
  {
    id: "sync-vs-async-2",
    topicSlug: "sync-vs-async",
    level: "SDE2",
    question: "When would you deliberately choose a synchronous call over an async one, even though async sounds 'better'?",
    answer:
      "When you genuinely need the result before you can do anything else - there's no point pretending to be async if the very next line of code depends on that value. Async adds real complexity: more moving parts, harder error handling, trickier debugging. It's a tool for when you can actually do something useful while waiting, not a default you reach for everywhere.",
  },
  {
    id: "sync-vs-async-3",
    topicSlug: "sync-vs-async",
    level: "SDE3+",
    question: "Design a system where a user submits a request that takes 30 seconds to process, without making them stare at a loading spinner the whole time.",
    answer:
      "You'd take the request, hand back an ID immediately, and process the actual work asynchronously in the background - a queue and a worker, basically. The client then either polls for status with that ID, or you push the result back over a WebSocket once it's done. The real design question is what the user sees in between: a progress indicator, an email when it's ready, or just letting them navigate away and check back.",
  },
  {
    id: "latency-vs-throughput-1",
    topicSlug: "latency-vs-throughput",
    level: "SDE1",
    question: "What's the difference between latency and throughput?",
    answer:
      "Latency is how long one single thing takes - the time from asking to getting an answer. Throughput is how much total work gets done over time. A system can be great at one and mediocre at the other.",
  },
  {
    id: "latency-vs-throughput-2",
    topicSlug: "latency-vs-throughput",
    level: "SDE2",
    question: "You add a queue in front of a slow service to increase throughput. What did you just do to latency?",
    answer:
      "You almost certainly made it worse for any individual request, because now it's sitting in the queue before it even starts being processed. That's the classic tradeoff - batching and queuing usually help you push more total volume through, but at the cost of any one request taking longer to come back.",
  },
  {
    id: "latency-vs-throughput-3",
    topicSlug: "latency-vs-throughput",
    level: "SDE3+",
    question: "Design an API where some clients care about low latency and others care about high throughput, using the same underlying data.",
    answer:
      "You'd probably offer two paths - a fast, low-latency read straight from a cache or a replica for clients who need an answer right now, and a bulk or batch endpoint for clients who are fine waiting but want to move a lot of data efficiently. Trying to serve both needs with one generic endpoint usually ends up compromising both instead of serving either well.",
  },
  {
    id: "nodejs-event-loop-1",
    topicSlug: "nodejs-event-loop",
    level: "SDE1",
    question: "Node.js is single-threaded - so how does it handle thousands of connections at once?",
    answer:
      "It never just sits there waiting. When something slow happens - a database call, a file read - Node kicks it off, moves on to other work immediately, and comes back only once the result is ready. One thread, but it's almost never idle.",
  },
  {
    id: "nodejs-event-loop-2",
    topicSlug: "nodejs-event-loop",
    level: "SDE2",
    question: "One endpoint does a heavy synchronous computation and now everything else is slow. Why, and what do you do?",
    answer:
      "That heavy synchronous work is hogging the one thread the whole app shares - nothing else gets to run, even requests that have nothing to do with it. You'd move that work to a worker thread, break it into smaller async pieces, or just push it out to a separate service entirely.",
  },
  {
    id: "nodejs-event-loop-3",
    topicSlug: "nodejs-event-loop",
    level: "SDE3+",
    question: "How would you actually detect event loop lag in production before it takes down the service?",
    answer:
      "You watch the lag itself as a real metric - the gap between when a timer should fire and when it actually does - not just CPU usage, which can lie to you. Then when it spikes, you correlate it with specific deploys or endpoints, and figure out whether it's blocking code, GC pauses, or just genuinely too much traffic, because each of those gets fixed completely differently.",
  },
  {
    id: "nodejs-gc-1",
    topicSlug: "nodejs-gc",
    level: "SDE1",
    question: "What is garbage collection, in plain terms?",
    answer:
      "It's the runtime quietly cleaning up memory nothing's using anymore, so you don't have to manually free it yourself. A memory leak happens when your code is still holding onto something it's actually done with - so the garbage collector can never touch it.",
  },
  {
    id: "nodejs-gc-2",
    topicSlug: "nodejs-gc",
    level: "SDE2",
    question: "Memory usage on your Node service climbs steadily for hours and never drops, even under steady traffic. First move?",
    answer:
      "That's a leak, not normal behavior - healthy memory usage looks sawtooth-shaped, climbing then dropping after each collection, not a steady ramp. You'd take a couple of heap snapshots over time and diff them to see what's actually growing, then check the usual suspects: event listeners that never get removed, or a cache with no eviction policy at all.",
  },
  {
    id: "nodejs-gc-3",
    topicSlug: "nodejs-gc",
    level: "SDE3+",
    question: "Design a caching layer inside a Node service that speeds things up without becoming the memory leak itself.",
    answer:
      "Cap the size - don't let it grow forever - and pick a real eviction policy like LRU instead of hoping it self-regulates. Add a TTL so stale stuff doesn't just sit there. And be honest with yourself: an in-process cache doesn't share anything across your other server instances, so the real answer might just be an external cache like Redis instead.",
  },
  {
    id: "nodejs-worker-threads-1",
    topicSlug: "nodejs-worker-threads",
    level: "SDE1",
    question: "What's a worker thread, and why would Node.js need one if it's already handling things asynchronously?",
    answer:
      "Async I/O solves waiting - it doesn't solve actual computation. If you've got genuinely CPU-heavy work, like crunching numbers or processing an image, that still blocks the main thread no matter how 'async' your code looks. A worker thread runs that heavy work on a separate thread entirely, so the main thread stays free to keep handling requests.",
  },
  {
    id: "nodejs-worker-threads-2",
    topicSlug: "nodejs-worker-threads",
    level: "SDE2",
    question: "What's the difference between spinning up a worker thread and just forking another process?",
    answer:
      "A worker thread shares memory with the main process more cheaply - you can pass data back and forth without the overhead of a full separate process. Forking, like Node's Cluster module, gives you fully isolated processes, which is more resilient since one crashing doesn't take the others down, but it's heavier and communication between them costs more.",
  },
  {
    id: "nodejs-worker-threads-3",
    topicSlug: "nodejs-worker-threads",
    level: "SDE3+",
    question: "Design a service that needs to process CPU-heavy jobs without ever blocking incoming API requests, at scale.",
    answer:
      "You'd separate the API layer from the processing entirely - the API just accepts the job, drops it on a queue, and immediately responds. A pool of worker threads or separate worker processes pulls from that queue and does the actual heavy lifting. That way a burst of expensive jobs slows down the workers, not the part of the system answering everyone else's requests.",
  },
  {
    id: "tcp-ip-tls-1",
    topicSlug: "tcp-ip-tls",
    level: "SDE1",
    question: "What's the difference between TCP and TLS, since they both come up around 'secure connections'?",
    answer:
      "TCP is what actually gets your bytes reliably from one machine to another - ordered, nothing missing. TLS sits on top of that and adds encryption, so what's traveling over that TCP connection can't be read or tampered with along the way. TCP without TLS still works, it's just not private.",
  },
  {
    id: "tcp-ip-tls-2",
    topicSlug: "tcp-ip-tls",
    level: "SDE2",
    question: "Why does HTTPS take a bit longer to establish a connection than plain HTTP?",
    answer:
      "Before any real data moves, the client and server have to do a TLS handshake - agreeing on encryption keys and verifying the server's certificate. That's extra round trips before the actual request even starts, which is real, measurable latency, though modern TLS versions have gotten much better at shrinking that cost.",
  },
  {
    id: "tcp-ip-tls-3",
    topicSlug: "tcp-ip-tls",
    level: "SDE3+",
    question: "You're designing a service that terminates TLS at a load balancer instead of on each individual server. What are you trading off?",
    answer:
      "You get simpler certificate management - one place to renew and configure TLS instead of every server - and you offload the encryption work from your app servers. What you're trading off is that traffic between the load balancer and your actual servers is now unencrypted unless you deliberately re-encrypt it, which matters a lot if that internal network isn't fully trusted.",
  },
  {
    id: "rate-limiting-1",
    topicSlug: "rate-limiting",
    level: "SDE1",
    question: "Why rate-limit an API at all?",
    answer:
      "So one client - whether it's abusive, buggy, or just unexpectedly popular - can't degrade things for everyone else sharing the system. It's really about fairness and stability, not just blocking attackers.",
  },
  {
    id: "rate-limiting-2",
    topicSlug: "rate-limiting",
    level: "SDE2",
    question: "What's the actual difference between fixed-window and sliding-window rate limiting, and why does it matter?",
    answer:
      "A fixed window resets cleanly at a time boundary, like every minute - which means a client can sneak in double the limit right around that boundary by timing it well. A sliding window looks at a rolling range instead, so that trick doesn't work, at the cost of being a little more expensive to calculate.",
  },
  {
    id: "rate-limiting-3",
    topicSlug: "rate-limiting",
    level: "SDE3+",
    question: "Design a rate limiter that has to work globally across many server instances, not per-instance.",
    answer:
      "An in-memory counter on each instance doesn't cut it - a client could hit the limit on every single instance and get way more than N requests total. You'd move the counter into something shared and fast, like Redis with an atomic increment, and then you've got a new problem to solve: what happens to rate limiting if that shared store itself gets slow or goes down for a second.",
  },
  {
    id: "api-gateway-1",
    topicSlug: "api-gateway",
    level: "SDE1",
    question: "What does an API gateway actually do?",
    answer:
      "It's the front door every request passes through before reaching your real services - handling stuff like routing, rate limiting, and auth checks in one place instead of every single service having to reimplement that logic itself.",
  },
  {
    id: "api-gateway-2",
    topicSlug: "api-gateway",
    level: "SDE2",
    question: "Your team is debating putting auth logic in the API gateway versus in each individual service. What's the tradeoff?",
    answer:
      "Centralizing it in the gateway means one place to get it right and one place to update, but it also becomes something every request depends on, and services can't easily do anything auth-related that's specific to their own needs. Putting it in each service is more flexible but means the same logic - and the same bugs - get repeated everywhere.",
  },
  {
    id: "api-gateway-3",
    topicSlug: "api-gateway",
    level: "SDE3+",
    question: "Design an API gateway setup for a system with dozens of backend services, where the gateway itself can't become the bottleneck.",
    answer:
      "The gateway has to be stateless and horizontally scalable just like everything behind it, so you're running multiple gateway instances behind their own load balancer, not one. You'd also want it doing as little heavy work as possible - routing and lightweight checks, not deep business logic - because everything it does adds latency to literally every request in the whole system.",
  },
  {
    id: "auth-and-security-1",
    topicSlug: "auth-and-security",
    level: "SDE1",
    question: "What's the actual difference between authentication and authorization?",
    answer:
      "Authentication is 'who are you' - proving your identity, usually with a password or a token. Authorization is 'what are you allowed to do' - and that question only makes sense once we already know who you are.",
  },
  {
    id: "auth-and-security-2",
    topicSlug: "auth-and-security",
    level: "SDE2",
    question: "Why use a JWT instead of a server-side session, and what do you actually give up?",
    answer:
      "A JWT carries its own proof - it's signed, so any server can check it's legit without needing a shared session store, which fits nicely with stateless, horizontally scaled services. What you give up is easy revocation: killing a server-side session is instant, but a JWT stays valid until it expires unless you build extra machinery, like a blocklist, just to kill it early.",
  },
  {
    id: "auth-and-security-3",
    topicSlug: "auth-and-security",
    level: "SDE3+",
    question: "Design auth for a platform with both a web app and a third-party API, where third parties should only get limited access.",
    answer:
      "Keep first-party session auth for your own web users separate from OAuth-style tokens for third parties, and actually define scopes so a third-party token can only touch what it was explicitly given. Short-lived access tokens plus longer-lived refresh tokens, and a real way to revoke access - because third-party integrations get compromised or cut off way more often than someone's own login session does.",
  },
  {
    id: "hash-tables-1",
    topicSlug: "hash-tables",
    level: "SDE1",
    question: "Why do people say hash table lookup is O(1) when that can't always be true?",
    answer:
      "It's O(1) on average, assuming a decent hash function spreads keys out evenly. But if a bunch of keys collide into the same bucket, you're stuck scanning through a mini-list, which is where the asterisk comes from - worst case isn't actually constant time.",
  },
  {
    id: "hash-tables-2",
    topicSlug: "hash-tables",
    level: "SDE2",
    question: "How would you design a hash table's collision handling, and what are you trading off?",
    answer:
      "Two common approaches: chaining, where each bucket holds a small list of everything that landed there, or open addressing, where a collision makes you probe for the next free slot. Chaining is simpler and degrades more gracefully; open addressing can be faster in practice but gets messy to implement correctly, especially when you need to delete entries.",
  },
  {
    id: "hash-tables-3",
    topicSlug: "hash-tables",
    level: "SDE3+",
    question: "Design a hash table that has to stay fast even as it grows from a thousand entries to a hundred million.",
    answer:
      "The real answer is resizing - you double the underlying array and rehash everything once your load factor crosses some threshold, so lookups don't quietly degrade as the table fills up. At real scale you'd also think about whether a single hash table even makes sense anymore, versus sharding the keyspace across multiple tables or machines entirely.",
  },
  {
    id: "bloom-filters-1",
    topicSlug: "bloom-filters",
    level: "SDE1",
    question: "What does a Bloom filter actually tell you?",
    answer:
      "It can tell you 'this definitely isn't here' with total certainty, or 'this is probably here' with some chance of being wrong. It never gives a false negative - if it says no, it means no. It just might occasionally say yes when the real answer is no.",
  },
  {
    id: "bloom-filters-2",
    topicSlug: "bloom-filters",
    level: "SDE2",
    question: "Why would you put a Bloom filter in front of an expensive database lookup instead of just querying the database directly?",
    answer:
      "Checking the Bloom filter is way cheaper than hitting the database, and most of the time it saves you the trip entirely by confidently saying 'definitely not here.' You still have to hit the database on a 'probably here,' since it might be a false positive - but you've cut out a huge share of pointless lookups for keys that were never going to be found anyway.",
  },
  {
    id: "bloom-filters-3",
    topicSlug: "bloom-filters",
    level: "SDE3+",
    question: "Design a system using a Bloom filter where false positives are actually a real problem, and figure out how to control that.",
    answer:
      "The false-positive rate comes down to two things you control: how big the filter is relative to how many items you're putting in it, and how many hash functions you use. Walk through that tradeoff explicitly - bigger filter and more hash functions means fewer false positives, but costs more memory and more compute per check - and pick a rate that's actually acceptable for what a false positive costs you in this specific system.",
  },
  {
    id: "lru-cache-1",
    topicSlug: "lru-cache",
    level: "SDE1",
    question: "What does an LRU cache throw out when it's full?",
    answer:
      "Whatever hasn't been touched in the longest time - the assumption being that stuff used recently is more likely to get used again soon than stuff that's just been sitting there.",
  },
  {
    id: "lru-cache-2",
    topicSlug: "lru-cache",
    level: "SDE2",
    question: "Why does a real LRU cache need both a hash map and a doubly linked list - why not just one?",
    answer:
      "The hash map alone gives you fast lookup, but no cheap way to track what's been used recently. The linked list alone gives you ordering, but finding anything means scanning through it. Put them together - the hash map points straight to a node in the list - and both 'find this' and 'move it to the front since it was just used' happen instantly.",
  },
  {
    id: "lru-cache-3",
    topicSlug: "lru-cache",
    level: "SDE3+",
    question: "Design a cache used by multiple servers, where an LRU cache on each individual instance isn't good enough.",
    answer:
      "Each instance's local cache only ever sees its own slice of traffic, so your real hit rate ends up worse than one shared cache would give you - and the same key might be cached differently on different instances. Moving to something shared like Redis fixes that, but now every cache hit costs a network round trip, and you need the shared cache's own eviction policy instead of leaning on each instance's.",
  },
  {
    id: "consistent-hashing-1",
    topicSlug: "consistent-hashing",
    level: "SDE1",
    question: "In plain English, what problem does consistent hashing actually solve?",
    answer:
      "Normally, mapping a key to one of N servers with something like key % N means adding or losing even one server reshuffles almost everything. Consistent hashing puts servers and keys on the same ring, so losing or adding one server only moves the keys right next to it - everything else stays put.",
  },
  {
    id: "consistent-hashing-2",
    topicSlug: "consistent-hashing",
    level: "SDE2",
    question: "You're running 5 cache servers with consistent hashing and one dies. What actually happens to its keys?",
    answer:
      "Only the keys that were sitting on that one server move - they hop to the next server clockwise on the ring. Every other key doesn't budge. That's the whole point, versus plain modulo hashing, where losing one server would've scrambled almost everything.",
  },
  {
    id: "consistent-hashing-3",
    topicSlug: "consistent-hashing",
    level: "SDE3+",
    question: "Plain consistent hashing can still leave load unevenly spread across servers. How do you fix that?",
    answer:
      "Virtual nodes - instead of giving each physical server one spot on the ring, you give it dozens, spread out, so its share of the key space averages out instead of depending on luck about where one point landed. And you still watch real load per server in production, because ring math being 'fair' on paper doesn't guarantee it plays out that way with real traffic patterns.",
  },
  {
    id: "rest-openapi-1",
    topicSlug: "rest-openapi",
    level: "SDE1",
    question: "What's the actual difference between PUT and PATCH?",
    answer:
      "PUT replaces the whole thing - leave a field out, and it's gone. PATCH just changes the fields you actually send and leaves everything else exactly as it was.",
  },
  {
    id: "rest-openapi-2",
    topicSlug: "rest-openapi",
    level: "SDE2",
    question: "How do you version a public REST API without breaking people who integrated with it a year ago?",
    answer:
      "Put the version in the URL or a header, and actually keep the old version running for a while instead of yanking it the moment you ship something new. An OpenAPI spec per version makes the contract explicit, so 'what does this version actually promise' isn't just buried in the code somewhere.",
  },
  {
    id: "rest-openapi-3",
    topicSlug: "rest-openapi",
    level: "SDE3+",
    question: "Design an API contract for a resource multiple clients can update at once, so nobody silently overwrites someone else's change.",
    answer:
      "This is optimistic concurrency control - every GET comes back with a version number or an ETag, and every update has to send that same version back. If it doesn't match what's currently stored, you reject it with a conflict instead of just overwriting, which forces the client to re-fetch and actually deal with the conflict instead of accidentally destroying someone's work.",
  },
];

export function getQuestionsByTopic(topicSlug: string) {
  return interviewQuestions.filter((q) => q.topicSlug === topicSlug);
}

export function getCoveredTopicSlugs() {
  return [...new Set(interviewQuestions.map((q) => q.topicSlug))];
}
