export function DemoNotice() {
  const revision = process.env.NEXT_PUBLIC_EXHIBIT_SOURCE_REF;
  const sourceUrl = revision && /^[a-f0-9]{40}$/.test(revision)
    ? `https://github.com/0xDaruby/privcon-exhibit/tree/${revision}`
    : "https://github.com/0xDaruby/privcon-exhibit";
  return (
    <aside className="demo-notice" aria-label="About this demo">
      <p><strong>Interactive demo</strong><span>Explore PrivCon with sample files. Conversions are simulated; nothing is uploaded.</span></p>
      <div>
        <a href="https://github.com/0xDaruby/Priv-Con" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">Main project ↗</a>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">Demo source ↗</a>
      </div>
    </aside>
  );
}
