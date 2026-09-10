export type HowItWorksArticle = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  keywords: string[];
  /** Slugs of real curriculum lessons worth reading alongside this, if any. */
  relatedTopicSlugs: string[];
};

export const howItWorksArticles: HowItWorksArticle[] = [
  {
    slug: "how-vpns-work",
    title: "How VPNs actually work",
    tagline: "Tunneling, not teleporting",
    description:
      "A VPN doesn't hide you from the internet - it moves where your traffic appears to come from, and encrypts what's inside the tunnel along the way.",
    category: "Networking",
    keywords: [
      "how does a vpn work",
      "vpn explained",
      "vpn tunneling",
      "what does a vpn actually do",
      "vpn encryption explained",
      "does a vpn hide your ip",
    ],
    relatedTopicSlugs: ["tcp-ip-tls"],
  },
  {
    slug: "how-password-managers-keep-secrets",
    title: "How password managers hide data from their own servers",
    tagline: "Zero-knowledge encryption, explained",
    description:
      "A good password manager is built so even the company running it can't read your vault.",
    category: "Security",
    keywords: [
      "how do password managers work",
      "zero knowledge encryption explained",
      "are password managers safe",
      "client side encryption explained",
      "how password managers store data",
      "master password key derivation",
    ],
    relatedTopicSlugs: ["auth-and-security"],
  },
  {
    slug: "how-ad-blockers-work",
    title: "How ad blockers actually work",
    tagline: "It's mostly just a really good blocklist",
    description:
      "An ad blocker isn't detecting ads - it's blocking requests to known ad and tracker domains before they load.",
    category: "Networking",
    keywords: [
      "how do ad blockers work",
      "ad blocker explained",
      "how does ublock origin work",
      "dns filtering explained",
      "how do ad blockers detect ads",
      "ad blocker filter lists",
    ],
    relatedTopicSlugs: ["proxies"],
  },
  {
    slug: "how-cloud-gaming-works",
    title: "How cloud gaming streams a whole computer to your phone",
    tagline: "The game never runs on your device at all",
    description:
      "Cloud gaming runs the game on a server and streams it to you - your device is just a fast video player with a controller.",
    category: "Media & streaming",
    keywords: [
      "how does cloud gaming work",
      "geforce now explained",
      "cloud gaming latency",
      "how does game streaming work",
      "cloud gaming architecture",
      "xbox cloud gaming explained",
    ],
    relatedTopicSlugs: ["realtime-communication", "latency-vs-throughput"],
  },
  {
    slug: "what-incognito-mode-actually-turns-off",
    title: "What incognito mode actually turns off (and what it doesn't)",
    tagline: "It's about local storage, not the network",
    description:
      "Incognito mode clears local storage and cookies - it does nothing to what your network or the sites themselves can see.",
    category: "Browsers",
    keywords: [
      "does incognito mode hide your ip",
      "how does incognito mode work",
      "is incognito mode really private",
      "private browsing explained",
      "what does incognito mode actually do",
      "incognito mode myths",
    ],
    relatedTopicSlugs: ["what-is-middleware"],
  },
  {
    slug: "how-multiplayer-games-stay-in-sync",
    title: "How a multiplayer game keeps everyone's screen in sync",
    tagline: "Every player is lying to you, slightly, on purpose",
    description:
      "A multiplayer game server decides what's actually true when players see different things at the same instant.",
    category: "Real-time systems",
    keywords: [
      "how do multiplayer games work",
      "game server architecture explained",
      "websocket game rooms",
      "client side prediction explained",
      "game state synchronization",
      "how does multiplayer netcode work",
    ],
    relatedTopicSlugs: ["realtime-communication", "sync-vs-async"],
  },
  {
    slug: "how-video-transcoding-works",
    title: "How Netflix turns one video file into 30 different versions",
    tagline: "The file you upload is never the file you watch",
    description:
      "Every video gets re-encoded into a ladder of resolutions before anyone watches it, so quality can switch mid-playback.",
    category: "Media & streaming",
    keywords: [
      "how does video transcoding work",
      "video transcoding explained",
      "adaptive bitrate streaming explained",
      "how does netflix streaming work",
      "video encoding pipeline",
      "hls vs dash explained",
    ],
    relatedTopicSlugs: ["latency-vs-throughput"],
  },
  {
    slug: "how-search-engines-rank-results",
    title: "How search engines actually rank results",
    tagline: "Matching words is the easy part",
    description:
      "Finding matching documents is cheap. Ranking them - deciding what actually answers your question - is the real work.",
    category: "Search & data",
    keywords: [
      "how do search engines work",
      "bm25 explained",
      "vector search explained",
      "how does google search rank pages",
      "hybrid search explained",
      "semantic search vs keyword search",
    ],
    relatedTopicSlugs: ["hash-tables"],
  },
  {
    slug: "how-bittorrent-finds-strangers",
    title: "How BitTorrent finds strangers with the file you want",
    tagline: "There's no server - that's the whole point",
    description:
      "BitTorrent finds strangers who already have pieces of your file and downloads from many of them at once.",
    category: "Distributed systems",
    keywords: [
      "how does bittorrent work",
      "bittorrent protocol explained",
      "how do torrents find peers",
      "bittorrent tracker explained",
      "peer to peer file sharing explained",
      "distributed hash table explained",
    ],
    relatedTopicSlugs: ["consistent-hashing"],
  },
  {
    slug: "scaling-an-api-to-1-million-requests-per-second",
    title: "How to scale an API to 1 million requests per second",
    tagline: "No single piece of this is exotic - the combination is the hard part",
    description:
      "A million requests per second isn't one big idea - it's a dozen ordinary ideas, correctly layered together.",
    category: "Distributed systems",
    keywords: [
      "how to scale an api",
      "scale api to millions of requests",
      "high throughput api design",
      "horizontal scaling explained",
      "how to design a scalable backend",
      "system design for scale",
    ],
    relatedTopicSlugs: ["rate-limiting", "consistent-hashing", "latency-vs-throughput"],
  },
  {
    slug: "why-your-browser-runs-dozens-of-processes",
    title: "Why your browser runs dozens of separate processes",
    tagline: "Every tab is basically its own tiny program",
    description:
      "Modern browsers run each tab as its own isolated process, the same way backend systems isolate services.",
    category: "Browsers",
    keywords: [
      "why does chrome have so many processes",
      "browser task manager explained",
      "browser multi process architecture",
      "chrome process per tab explained",
      "site isolation explained",
      "how do browsers sandbox tabs",
    ],
    relatedTopicSlugs: ["nodejs-worker-threads"],
  },
  {
    slug: "how-wifi-works",
    title: "How WiFi actually gets data through the air",
    tagline: "It's radio, sharing one room with everyone else's radio",
    description:
      "WiFi is a shared radio channel - devices take turns politely, and slowness is usually that breaking down.",
    category: "Networking",
    keywords: [
      "how does wifi work",
      "wifi explained",
      "wifi vs bluetooth explained",
      "how does wireless internet work",
      "wifi channels explained",
      "why is my wifi slow",
    ],
    relatedTopicSlugs: ["tcp-ip-tls"],
  },
];

export function getHowItWorksArticle(slug: string) {
  return howItWorksArticles.find((article) => article.slug === slug);
}
