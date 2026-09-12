import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

/**
 * Renders a LeetCode problem README as themed markdown — headings, code
 * spans, lists and the constraints block all pick up the same font-mono
 * data-panel look used across the rest of the site instead of react-markdown's
 * unstyled defaults.
 */
export default function LeetCodeMarkdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 text-sm leading-relaxed text-foreground/85", className)}>
      <ReactMarkdown
        components={{
          h1: () => null, // the slug/title is already rendered as the page header
          h2: ({ children }) => (
            <h2 className="mt-2 text-base font-semibold font-mono-data text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-1 text-sm font-semibold font-mono-data text-cyan">{children}</h3>
          ),
          p: ({ children }) => <p className="text-sm leading-relaxed">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-violet">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="flex flex-col gap-1.5 pl-5 list-decimal marker:text-violet marker:font-mono-data">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
          code: ({ children }) => (
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-[12.5px] font-mono-data text-cyan">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="glass overflow-x-auto rounded-lg p-3 text-[12.5px] font-mono-data">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan underline underline-offset-2 hover:text-cyan/80"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-glass-border-token my-1" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
