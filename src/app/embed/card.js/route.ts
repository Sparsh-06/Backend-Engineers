import { NextResponse } from "next/server";
import { getTopicBySlug } from "@/data/topics";

// Self-contained ad widget for partner sites. Ships as plain JS (not a
// framework bundle) since it has to run inside a stranger's page with no
// build step - Shadow DOM keeps our styles from leaking into (or being
// clobbered by) the host page's CSS.
const SITE_URL = "https://www.backendengineer.in";

// Which lesson this widget promotes. The embed snippet a partner installs
// never changes - swap this slug and redeploy to run a different lesson as
// the ad, no coordination with the partner needed.
const PROMOTED_TOPIC_SLUG = "lru-cache";

const promotedTopic = getTopicBySlug(PROMOTED_TOPIC_SLUG);
if (!promotedTopic) {
  throw new Error(
    `/embed/ad.js: PROMOTED_TOPIC_SLUG "${PROMOTED_TOPIC_SLUG}" is not a published topic slug.`,
  );
}

function escapeHtml(input: string) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const eyebrow = "Backend Engineering";
const headline = escapeHtml(promotedTopic.title);
const body = escapeHtml(promotedTopic.description);
const landingPath = `/topics/${promotedTopic.slug}`;

const script = `
(function () {
  var currentScript = document.currentScript;
  if (!currentScript) return;

  var ds = currentScript.dataset || {};
  var theme = ds.theme === "light" ? "light" : "dark";
  var utmSource = ds.utmSource || "partner-embed";
  var utmCampaign = ds.utmCampaign || "partner-ad";
  var utmContent = ds.utmContent || ds.slot || "sidebar";

  var url = new URL("${SITE_URL}${landingPath}");
  url.searchParams.set("utm_source", utmSource);
  url.searchParams.set("utm_medium", "embed");
  url.searchParams.set("utm_campaign", utmCampaign);
  url.searchParams.set("utm_content", utmContent);

  var isLight = theme === "light";
  var bg = isLight ? "#EEE9E3" : "#15110F";
  var text = isLight ? "#111111" : "#F5F1EC";
  var subtext = isLight ? "rgba(17,17,17,0.62)" : "rgba(245,241,236,0.62)";
  var border = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)";
  var accent = "#ff4d00";

  var host = document.createElement("div");
  host.style.display = "block";
  var shadow = host.attachShadow({ mode: "open" });

  shadow.innerHTML =
    '<style>' +
    ':host{all:initial;}' +
    '.be-card{all:unset;box-sizing:border-box;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;display:block;width:100%;max-width:280px;border:1px solid ' + border + ';border-radius:20px;background:' + bg + ';padding:18px;text-decoration:none;transition:transform .15s ease,border-color .15s ease;}' +
    '.be-card:hover{transform:translateY(-2px);border-color:' + accent + ';}' +
    '.be-eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:' + accent + ';margin:0 0 10px;}' +
    '.be-title{font-size:17px;font-weight:700;line-height:1.25;letter-spacing:-.02em;color:' + text + ';margin:0 0 8px;}' +
    '.be-body{font-size:12.5px;line-height:1.5;color:' + subtext + ';margin:0 0 14px;}' +
    '.be-cta{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:' + accent + ';}' +
    '.be-brand{display:flex;align-items:center;gap:5px;margin-top:14px;padding-top:12px;border-top:1px solid ' + border + ';font-size:10.5px;font-weight:600;color:' + subtext + ';}' +
    '.be-dot{width:5px;height:5px;border-radius:50%;background:' + accent + ';flex:none;}' +
    '</style>' +
    '<a class="be-card" href="' + url.toString() + '" target="_blank" rel="noopener noreferrer sponsored">' +
      '<p class="be-eyebrow">${eyebrow}</p>' +
      '<h3 class="be-title">${headline}</h3>' +
      '<p class="be-body">${body}</p>' +
      '<span class="be-cta">Read the lesson &rarr;</span>' +
      '<div class="be-brand"><span class="be-dot"></span>backendengineer.in</div>' +
    '</a>';

  var mountEl = ds.target ? document.getElementById(ds.target) : null;
  if (mountEl) {
    mountEl.appendChild(host);
  } else if (currentScript.parentNode) {
    currentScript.parentNode.insertBefore(host, currentScript.nextSibling);
  }
})();
`;

export async function GET() {
  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=1800",
    },
  });
}
