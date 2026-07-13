import type { ReactNode } from "react";
import { cn } from "@/packages/utils/cn";

interface TypographyPreviewProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const items = [
  { name: "H1", preview: <h1>Heading h1</h1> },
  { name: "H2", preview: <h2>Heading h2</h2> },
  { name: "H3", preview: <h3>Heading h3</h3> },
  { name: "H4", preview: <h4>Heading h4</h4> },
  { name: "H5", preview: <h5>Heading h5</h5> },
  { name: "H6", preview: <h6>Heading h6</h6> },

  { name: "Paragraph", preview: <p>Lorem ipsum dolor sit amet.</p> },

  { name: "Span", preview: <span>Span Text</span> },

  { name: "Div", preview: <div>Div Element</div> },

  {
    name: "Small",
    preview: <small>Small text</small>,
  },

  {
    name: "Strong",
    preview: <strong>Strong text</strong>,
  },

  {
    name: "Emphasis",
    preview: <em>Italic text</em>,
  },

  {
    name: "Blockquote",
    preview: <blockquote>Design is intelligence made visible.</blockquote>,
  },

  {
    name: "Code",
    preview: <code>const hello = &apos;world&apos;</code>,
  },

  {
    name: "Pre",
    preview: (
      <pre>
        {`function hello() {
                  return "Hello World";
            }`}
      </pre>
    ),
  },
];

const TypographyPreview = ({ title, children, className }: TypographyPreviewProps) => {
  const tag = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl border bg-card transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      {/* Header */}

      <header className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
        <div className="space-y-1 w-full flex justify-center">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <span
          className="rounded-md border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground"
          style={{ marginRight: "4px" }}
        >
          {`<${tag}>`}
        </span>
      </header>

      {/* Preview */}

      <div className="flex min-h-48 items-center justify-center p-8">{children}</div>
    </article>
  );
};

export default function TypographyPage() {
  return (
    <section className="mx-auto max-w-7xl space-y-8" style={{ padding: "20px" }}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Typography</h1>

        <p className="text-muted-foreground">
          Preview of every typography component available in the design system.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <TypographyPreview key={item.name} title={item.name}>
            {item.preview}
          </TypographyPreview>
        ))}
      </div>
    </section>
  );
}
