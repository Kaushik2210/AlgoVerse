export function TheorySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold font-mono-data">{title}</h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/85">
        {children}
      </div>
    </section>
  );
}

export function PitfallList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-foreground/85">
          <span className="text-amber shrink-0">!</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function WhenToUse({
  use,
  avoid,
}: {
  use: string[];
  avoid: string[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <p className="text-xs font-mono-data uppercase tracking-wide text-violet mb-2">
          Use when
        </p>
        <ul className="flex flex-col gap-1.5">
          {use.map((item, i) => (
            <li key={i} className="text-sm flex gap-2">
              <span className="text-violet">+</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-mono-data uppercase tracking-wide text-amber mb-2">
          Avoid when
        </p>
        <ul className="flex flex-col gap-1.5">
          {avoid.map((item, i) => (
            <li key={i} className="text-sm flex gap-2">
              <span className="text-amber">-</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
