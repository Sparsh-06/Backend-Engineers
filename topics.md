# Comprehensive Topic Curriculum: BackendEngineers.rs

This document outlines the master topic index for **BackendEngineers.rs**, covering language runtimes, core infrastructure, system design, scalability patterns, and cloud orchestration.

---

## Phase 1: Language Runtimes & Execution Mechanics

Understanding how language runtimes execute code, handle concurrency, and manage memory under load.

### 1. Node.js & JavaScript / TypeScript
* **The Event Loop & Event-Driven Architecture:** Call Stack, Macrotask Queue (timers, I/O), Microtask Queue (`process.nextTick`, Promises).
* **Asynchronous & Non-Blocking I/O:** How `libuv` bridges single-threaded JS execution with OS-level multi-threading.
* **Concurrency Primitives:** Node.js Cluster module vs. Worker Threads (`worker_threads`) for CPU-bound computation.
* **Streams & Buffer Management:** Readable, Writable, Duplex, and Transform streams; handling backpressure.
* **Memory Management & Garbage Collection:** V8 heap allocation, generational GC (Scavenge vs. Mark-Sweep), diagnosing memory leaks.

### 2. Go (Golang)
* **The Go Scheduler:** The M:N scheduler model (Goroutines, Logical Processors, OS Threads / GMP Model).
* **Channels & CSP Concurrency:** Unbuffered vs. Buffered channels, `select` statement mechanics, race condition detection.
* **Memory Allocation & Pointers:** Stack vs. Heap allocation, Escape Analysis compiler optimizations.

### 3. Python Runtimes (FastAPI / Django)
* **Server Gateways:** WSGI (Gunicorn) vs. ASGI (Uvicorn) request execution models.
* **Async IO & GIL Constraints:** Python `asyncio` event loop vs. Global Interpreter Lock (GIL) multi-threading limitations.

### 4. Java / Kotlin (Spring Boot)
* **Threading Models:** Native OS threads vs. Virtual Threads (Java 21 / Project Loom).
* **JVM Performance:** JVM memory layout (Heap, Metaspace, Stack) and Garbage Collection tuning (G1GC, ZGC).

---

## Phase 2: Core Protocols, APIs & Networking

The fundamental mechanics of data transfer, API design, and edge security.

### 1. Web Protocols & Networking Basics
* **OSI Model & TCP/IP Stack:** The 7-layer model, TCP 3-way handshake, TLS 1.3 negotiation, and UDP packet transport.
* **HTTP Evolution:** 
  * HTTP/1.1 (Keep-Alive, Head-of-Line Blocking).
  * HTTP/2 (Multiplexing, Header Compression via HPACK, Server Push).
  * HTTP/3 & QUIC (UDP-based transport, zero-RTT connection establishment).

### 2. API Architectural Styles
* **REST & OpenAPI:** Resource modeling, idempotency, HTTP status codes, and JSON schema validation.
* **GraphQL:** Resolvers, Schema definition, Query complexity analysis, and solving the N+1 problem.
* **gRPC & Protocol Buffers:** Binary serialization, HTTP/2 streaming types (Unary, Client Streaming, Server Streaming, Bi-directional).
* **Real-time Communication:** WebSockets (duplex persistent connections) vs. Server-Sent Events (SSE) vs. Long Polling.

### 3. Traffic Management & Edge Security
* **Proxies:** Reverse Proxies vs. Forward Proxies (Nginx, HAProxy, Envoy).
* **API Gateways:** SSL/TLS Termination, Path Routing, Request/Response Transformation, and Authentication Offloading.
* **Security & Auth Standards:** 
  * Session-based Auth vs. JWT (JSON Web Tokens) stateless verification.
  * OAuth 2.0 & OpenID Connect (OIDC) authorization flows.
  * Security Fundamentals: CORS policies, CSRF mitigation, XSS prevention, and SQL injection defenses.
* **Rate Limiting & Throttling Algorithms:** Token Bucket, Leaky Bucket, Fixed Window Counter, Sliding Window Log, and Sliding Window Counter.

---

## Phase 3: Data Storage, Persistence & Caching

Designing fast, fault-tolerant persistence layers and caching topologies.

### 1. Relational Databases (PostgreSQL / MySQL)
* **ACID Guarantees:** Atomicity, Consistency, Isolation, and Durability mechanics.
* **Transaction Isolation Levels:** Read Uncommitted, Read Committed, Repeatable Read, and Serializable (preventing Dirty Reads, Non-Repeatable Reads, and Phantom Reads).
* **Indexing Mechanics:** B-Trees, Hash Indexes, GIN/GiST indexes, Composite Indexes, and analyzing query execution with `EXPLAIN ANALYZE`.
* **Connection Management:** Connection overhead, Thread-per-connection vs. Event-driven pools (pgBouncer).

### 2. NoSQL Databases
* **Document Stores (MongoDB):** BSON storage, Single-field/Compound Indexing, and Aggregation Frameworks.
* **Key-Value & In-Memory Stores (Redis):** Data structures (Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps, HyperLogLogs).
* **Wide-Column & Time-Series (Cassandra / TimescaleDB):** LSM-Trees, SSTables, Partition Keys, and Clustering Keys.

### 3. Caching Strategies & Topologies
* **Cache Placement Patterns:** In-Memory App Cache vs. Distributed Cache (Redis/Memcached) vs. CDN Edge Cache.
* **Caching Design Patterns:** Cache-Aside (Lazy Loading), Write-Through, Write-Back (Write-Behind), and Write-Around.
* **Cache Eviction & Invalidation:** Eviction Policies (LRU, LFU, TTL) and handling failures (Cache Stampede/Thundering Herd, Cache Avalanche, Cache Penetration).

---

## Phase 4: Backend Scaling & System Architecture

Moving from single-instance services to resilient, distributed systems.

### 1. Scalability Foundations
* **Vertical vs. Horizontal Scaling:** Micro-benchmarking constraints vs. stateless multi-node scaling.
* **Stateless vs. Stateful Systems:** Externalizing session state, distributed sticky sessions.

### 2. Load Balancing Techniques
* **Layer 4 vs. Layer 7 Balancing:** Transport Layer (TCP/IP) vs. Application Layer (HTTP/gRPC) routing.
* **Algorithms:** Round Robin, Weighted Least Connections, IP Hash, Consistent Hashing.

### 3. Database Scaling & Partitioning
* **Replication Patterns:** Primary-Secondary (Master-Replica), Multi-Primary replication, Synchronous vs. Asynchronous replication lag.
* **Sharding Strategies:** Range-based, Hash-based, and Directory-based sharding; choosing Partition Keys; handling Cross-Shard Queries.
* **Consistent Hashing:** Virtual Nodes, minimizing data movement during cluster expansion.

### 4. Asynchronous Architecture & Event-Driven Systems
* **Message Queues vs. Event Streams:** Point-to-Point queues (RabbitMQ, AWS SQS) vs. Distributed Event Logs (Apache Kafka, AWS Kinesis).
* **Event Patterns:** Pub/Sub, Event Sourcing, CQRS (Command Query Responsibility Segregation).
* **Delivery Semantics:** At-most-once, At-least-once, Exactly-once processing; enforcing **Idempotent** message consumers.

### 5. Distributed System Resilience
* **Fault Tolerance:** Circuit Breakers (Resilience4j / Hystrix), Bulkheads, and Fallbacks.
* **Retries & Backoff:** Exponential Backoff paired with Random Jitter.
* **Dead Letter Queues (DLQ):** Poison pill message quarantine and manual retry pipelines.
* **Distributed Consensus:** CAP Theorem, PACELC Theorem, Consensus Algorithms (Raft, Paxos).

---

## Phase 5: Cloud Infrastructure, DevOps & Observability

Provisioning, deploying, and managing backend infrastructure on public cloud providers (AWS, GCP).

### 1. Cloud Compute & Containerization
* **Virtualization vs. Containers:** OS Virtualization (Hypervisors/EC2) vs. Container Isolation (Docker, cgroups, namespaces).
* **Container Orchestration (Kubernetes / EKS):** Pods, Deployments, Services, Ingress Controllers, Horizontal Pod Autoscalers (HPA).
* **Serverless Execution:** AWS Lambda / Cloudflare Workers runtime mechanics, Cold Start mitigation strategies.

### 2. Cloud Storage & Content Delivery
* **Object Storage:** AWS S3 architecture, presigned URLs, multipart uploads, lifecycle policies.
* **CDN Acceleration:** CloudFront / Cloudflare edge caching, Cache-Control headers, edge compute functions.

### 3. Cloud Networking & Security Infrastructure
* **VPC Architecture:** Virtual Private Clouds, Public vs. Private Subnets, Route Tables.
* **Network Gateways:** Internet Gateways, NAT Gateways, VPC Peering, Transit Gateways.
* **Firewalls & Access Rules:** Security Groups (stateful) vs. Network Access Control Lists (NACLs - stateless).

### 4. Observability & Telemetry (The Three Pillars)
* **Metrics:** Time-series aggregation, Prometheus scraping, Grafana dashboards, Golden Signals (Latency, Traffic, Errors, Saturation).
* **Structured Logging:** Centralized log aggregation (ELK Stack / Loki), log formatting, context correlation IDs.
* **Distributed Tracing:** OpenTelemetry context propagation, W3C Trace Context, span tracking (Jaeger / Zipkin).

---

## Phase 6: Production Engineering & System Design Real-World Scenarios

Applied architectural blueprints analyzing real-world high-throughput platforms.

* **Design a URL Shortener (TinyURL):** Hashing, Base62 encoding, database choice, duplicate key handling.
* **Design a Real-Time Chat System (WhatsApp/Slack):** WebSockets, Gateway clusters, message storage, offline message delivery.
* **Design a Rate Limiter API:** Redis sliding window algorithms, middleware injection, multi-region synchronization.
* **Design a Distributed Financial Ledger:** Double-entry bookkeeping, transactional isolation, auditability, strong consistency models.
* **Design a Video Streaming Infrastructure (YouTube/Netflix):** Video chunking, adaptive bitrate streaming (HLS/DASH), CDN edge routing.