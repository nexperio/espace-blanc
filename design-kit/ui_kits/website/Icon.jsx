// Icon — sprite SVG inline. Line, stroke 1.4. Hérite de currentColor.
const Icon = ({ name, size = 16, stroke = 1.4 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "arrow-right": return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "arrow-left":  return <svg {...props}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case "arrow-down":  return <svg {...props}><path d="M12 5v14M5 13l7 7 7-7"/></svg>;
    case "close":       return <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case "menu":        return <svg {...props}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case "plus":        return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":       return <svg {...props}><path d="M5 12h14"/></svg>;
    case "check":       return <svg {...props}><path d="M5 12l5 5L20 7"/></svg>;
    case "user":        return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>;
    case "phone":       return <svg {...props}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>;
    case "mail":        return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    default: return null;
  }
};

window.Icon = Icon;
