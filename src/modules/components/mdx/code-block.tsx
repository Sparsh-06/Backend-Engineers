"use client";

import { useRef, useState, type HTMLAttributes } from "react";

/**
 * Overrides every plain ```fenced``` code block in lesson/build prose.
 * rehype-pretty-code has already tokenized `children` into syntax-highlighted
 * spans by the time this renders - this only adds the header bar (language
 * chip + copy button) around it, matching the dark card treatment already
 * used by <CodeWalkthrough>.
 */
export default function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
  const { children, className, ...rest } = props;
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const language = (props as Record<string, unknown>)["data-language"];
  const label = typeof language === "string" && language ? language : "text";

  async function handleCopy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) - fail quietly,
      // the code is still fully selectable and copyable by hand.
    }
  }

  return (
    <div className="code-block-shell">
      <div className="code-block-header">
        <span>{label}</span>
        <button type="button" onClick={handleCopy} className="code-block-copy">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} className={className} {...rest}>
        {children}
      </pre>
    </div>
  );
}
