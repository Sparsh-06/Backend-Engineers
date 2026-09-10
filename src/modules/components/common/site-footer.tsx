import type { ReactNode } from "react";

export const REPO_URL = "https://github.com/Sparsh-06/Backend-Engineers";
export const INSTAGRAM_URL = "https://www.instagram.com/backendengineer.in/";

export function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

type Props = {
  note: ReactNode;
};

/**
 * Shared minimal footer used by every page except the homepage, which has
 * its own richer dark footer. Each page still supplies its own `note` -
 * the disclaimer/tagline text genuinely differs per page (architecture's
 * non-affiliation notice, a deep-dive's per-company note, the generic
 * tagline elsewhere) - only the wrapper and the GitHub link are shared.
 */
export default function SiteFooter({ note }: Props) {
  return (
    <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Backend Engineer</span>
        <span>{note}</span>
        <div className="flex items-center gap-4">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-black/55 transition hover:text-black"
          >
            <GitHubIcon />
            Contribute on GitHub
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Backend Engineer on Instagram"
            className="text-black/55 transition hover:text-black"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
