// Primitives — basic building blocks pulled from the design system.
// Each component is a thin wrapper around a CSS class so production code
// can use the class names directly without the React shell.

// -------- Eyebrow / Label / Mono --------
const Eyebrow = ({ children }) => (
  <span className="eb-eyebrow">{children}</span>
);

const Label = ({ children }) => (
  <span className="eb-label">{children}</span>
);

const Mono = ({ children }) => (
  <span className="eb-mono">{children}</span>
);

// -------- Buttons --------
const Button = ({ children, onClick, variant = "primary", as = "button", href, ...rest }) => {
  const cls = `eb-btn eb-btn-${variant}`;
  if (as === "a" || href) return <a className={cls} href={href} {...rest}>{children}</a>;
  return <button className={cls} onClick={onClick} {...rest}>{children}</button>;
};

const BtnLink = ({ children, onClick, href }) => {
  if (href) return <a className="eb-btn-link" href={href}>{children}</a>;
  return <button className="eb-btn-link" onClick={onClick}>{children}</button>;
};

// -------- Section heading --------
const SectionHead = ({ eyebrow, title, aside }) => {
  const hasSides = eyebrow || aside;
  return (
    <header className={`eb-section-head ${hasSides ? "" : "eb-section-head--solo"}`}>
      {eyebrow && <span className="eb-eyebrow">{eyebrow}</span>}
      <h2 className="eb-section-title">{title}</h2>
      {aside && <span className="eb-section-aside">{aside}</span>}
    </header>
  );
};

// Italic-accent helper to keep titles consistent.
const E = ({ children }) => <em className="eb-italic">{children}</em>;

// -------- Container / Section wrappers --------
const Container = ({ children, style }) => (
  <div className="eb-container" style={style}>{children}</div>
);

const Section = ({ children, tone = "default", style }) => (
  <section className={`eb-section eb-section--${tone}`} style={style}>
    <Container>{children}</Container>
  </section>
);

// -------- Figure with caption --------
const Figure = ({ src, caption, sub, ratio = "4 / 5" }) => (
  <figure className="eb-figure">
    <div
      className="eb-figure-img"
      style={{ backgroundImage: src ? `url(${src})` : undefined, aspectRatio: ratio }}
    />
    <figcaption className="eb-figure-cap">
      <span>{caption}</span>
      {sub && <span>{sub}</span>}
    </figcaption>
  </figure>
);

window.Eyebrow = Eyebrow;
window.Label = Label;
window.Mono = Mono;
window.Button = Button;
window.BtnLink = BtnLink;
window.SectionHead = SectionHead;
window.E = E;
window.Container = Container;
window.Section = Section;
window.Figure = Figure;
