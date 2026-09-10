export type ProviderService = {
  provider: "AWS" | "GCP" | "Azure";
  name: string;
};

export type CloudServiceCategory = {
  slug: string;
  category: string;
  whatItMeans: string;
  services: ProviderService[];
  /** Slug of a full topic lesson related to this category, if one exists. */
  relatedTopicSlug?: string;
};

export const cloudServiceCategories: CloudServiceCategory[] = [
  {
    slug: "compute",
    category: "Virtual machines (general-purpose compute)",
    whatItMeans:
      "A rentable virtual server - you pick the CPU, memory, and OS, and you're responsible for everything running on top of it, same as a physical machine you'd rack yourself.",
    services: [
      { provider: "AWS", name: "EC2 (Elastic Compute Cloud)" },
      { provider: "GCP", name: "Compute Engine" },
      { provider: "Azure", name: "Virtual Machines" },
    ],
  },
  {
    slug: "serverless-functions",
    category: "Serverless functions",
    whatItMeans:
      "You upload a single function; the platform runs it on demand and bills per invocation, not per hour a server sits running. No server to patch, size, or leave idle - but also less control over the exact runtime environment.",
    services: [
      { provider: "AWS", name: "Lambda" },
      { provider: "GCP", name: "Cloud Functions" },
      { provider: "Azure", name: "Functions" },
    ],
    relatedTopicSlug: "sync-vs-async",
  },
  {
    slug: "containers",
    category: "Managed container orchestration",
    whatItMeans:
      "Runs your containers (Docker images) across a cluster of machines the provider manages for you - scheduling, restarting failed containers, and scaling out, without you having to run the underlying Kubernetes control plane yourself.",
    services: [
      { provider: "AWS", name: "EKS (Elastic Kubernetes Service)" },
      { provider: "GCP", name: "GKE (Google Kubernetes Engine)" },
      { provider: "Azure", name: "AKS (Azure Kubernetes Service)" },
    ],
  },
  {
    slug: "object-storage",
    category: "Object storage",
    whatItMeans:
      "Stores files - images, videos, backups, logs - as whole objects you fetch by key, not as a filesystem you mount. Built for durability and near-infinite scale, not for a database's fast structured queries.",
    services: [
      { provider: "AWS", name: "S3 (Simple Storage Service)" },
      { provider: "GCP", name: "Cloud Storage" },
      { provider: "Azure", name: "Blob Storage" },
    ],
    relatedTopicSlug: "backend-components",
  },
  {
    slug: "block-storage",
    category: "Block storage",
    whatItMeans:
      "A virtual hard disk attached to a single virtual machine - the same kind of raw, low-level storage a real server's local disk would give you, used for a database's data files or anything needing normal filesystem behavior.",
    services: [
      { provider: "AWS", name: "EBS (Elastic Block Store)" },
      { provider: "GCP", name: "Persistent Disk" },
      { provider: "Azure", name: "Managed Disks" },
    ],
  },
  {
    slug: "relational-database",
    category: "Managed relational databases",
    whatItMeans:
      "A normal SQL database (Postgres, MySQL, SQL Server) where the provider handles backups, patching, and failover for you, so you interact with it like any relational database without running the server yourself.",
    services: [
      { provider: "AWS", name: "RDS (Relational Database Service)" },
      { provider: "GCP", name: "Cloud SQL" },
      { provider: "Azure", name: "Azure SQL Database" },
    ],
  },
  {
    slug: "nosql-database",
    category: "Managed NoSQL databases",
    whatItMeans:
      "A fully managed key-value or document database built for very high write volume and horizontal scale, trading some of the query flexibility and strict consistency a relational database gives you for that scale.",
    services: [
      { provider: "AWS", name: "DynamoDB" },
      { provider: "GCP", name: "Firestore" },
      { provider: "Azure", name: "Cosmos DB" },
    ],
  },
  {
    slug: "caching",
    category: "In-memory caching",
    whatItMeans:
      "A managed, in-memory data store - almost always Redis or Memcached under the hood - used to avoid hitting a slower database for data that's read far more often than it changes.",
    services: [
      { provider: "AWS", name: "ElastiCache" },
      { provider: "GCP", name: "Memorystore" },
      { provider: "Azure", name: "Azure Cache for Redis" },
    ],
    relatedTopicSlug: "latency-vs-throughput",
  },
  {
    slug: "event-streaming",
    category: "Event streaming & message queues",
    whatItMeans:
      "A managed pipe for moving events or messages between services asynchronously, so a producer and consumer don't need to be online or fast at the same time - the backbone of most event-driven architectures.",
    services: [
      { provider: "AWS", name: "SQS / Kinesis" },
      { provider: "GCP", name: "Pub/Sub" },
      { provider: "Azure", name: "Service Bus / Event Hubs" },
    ],
    relatedTopicSlug: "sync-vs-async",
  },
  {
    slug: "cdn",
    category: "Content delivery network (CDN)",
    whatItMeans:
      "A network of caching servers spread across many physical locations, so a file gets served from a server physically close to the person requesting it, instead of traveling all the way back to your origin server every time.",
    services: [
      { provider: "AWS", name: "CloudFront" },
      { provider: "GCP", name: "Cloud CDN" },
      { provider: "Azure", name: "Azure CDN" },
    ],
    relatedTopicSlug: "latency-vs-throughput",
  },
  {
    slug: "dns-management",
    category: "DNS management",
    whatItMeans:
      "The managed service that translates a domain name into the IP address (or another service) it should route to, and lets you control that mapping without running your own name servers.",
    services: [
      { provider: "AWS", name: "Route 53" },
      { provider: "GCP", name: "Cloud DNS" },
      { provider: "Azure", name: "Azure DNS" },
    ],
    relatedTopicSlug: "url-to-response",
  },
  {
    slug: "api-gateway",
    category: "API gateway",
    whatItMeans:
      "The managed front door every request passes through before reaching your actual backend - handling routing, rate limiting, and auth checks in one place instead of every service repeating that logic.",
    services: [
      { provider: "AWS", name: "API Gateway" },
      { provider: "GCP", name: "Apigee" },
      { provider: "Azure", name: "API Management" },
    ],
    relatedTopicSlug: "what-is-middleware",
  },
  {
    slug: "iam",
    category: "Identity & access management",
    whatItMeans:
      "The system controlling exactly who and what (a person, a service, a script) can do exactly what to your cloud resources - the layer that decides whether a given request is even allowed to happen, before it touches anything else.",
    services: [
      { provider: "AWS", name: "IAM (Identity and Access Management)" },
      { provider: "GCP", name: "Cloud IAM" },
      { provider: "Azure", name: "Microsoft Entra ID" },
    ],
  },
  {
    slug: "secrets-management",
    category: "Secrets management",
    whatItMeans:
      "A locked-down store for API keys, database passwords, and certificates, so they never end up hardcoded in source or plaintext config - services fetch them at runtime instead, and rotation happens in one place.",
    services: [
      { provider: "AWS", name: "Secrets Manager" },
      { provider: "GCP", name: "Secret Manager" },
      { provider: "Azure", name: "Key Vault" },
    ],
    relatedTopicSlug: "environment-variables",
  },
  {
    slug: "observability",
    category: "Monitoring & observability",
    whatItMeans:
      "The managed layer that collects logs, metrics, and traces from everything running in your account, so you can see what a system is actually doing and get paged before a user notices something's wrong.",
    services: [
      { provider: "AWS", name: "CloudWatch" },
      { provider: "GCP", name: "Cloud Monitoring" },
      { provider: "Azure", name: "Azure Monitor" },
    ],
    relatedTopicSlug: "latency-vs-throughput",
  },
  {
    slug: "ci-cd",
    category: "CI/CD pipelines",
    whatItMeans:
      "A managed pipeline that builds, tests, and deploys your code automatically whenever you push a change, instead of anyone running those steps by hand.",
    services: [
      { provider: "AWS", name: "CodePipeline" },
      { provider: "GCP", name: "Cloud Build" },
      { provider: "Azure", name: "Azure Pipelines" },
    ],
  },
  {
    slug: "data-warehouse",
    category: "Data warehousing & analytics",
    whatItMeans:
      "A database built for running slow, heavy analytical queries across huge amounts of historical data, kept separate from the fast operational database your app actually reads and writes during normal traffic.",
    services: [
      { provider: "AWS", name: "Redshift" },
      { provider: "GCP", name: "BigQuery" },
      { provider: "Azure", name: "Synapse Analytics" },
    ],
  },
  {
    slug: "workflow-orchestration",
    category: "Workflow orchestration",
    whatItMeans:
      "A managed service for coordinating a sequence of steps across multiple functions or services - retries, waits, branching - without hand-rolling that state machine yourself.",
    services: [
      { provider: "AWS", name: "Step Functions" },
      { provider: "GCP", name: "Workflows" },
      { provider: "Azure", name: "Logic Apps" },
    ],
    relatedTopicSlug: "sync-vs-async",
  },
];
