// Eklipsis — shared chrome: Header, MegaMenu, LoginModal, Footer, Icon
const { useState: useStateEK, useEffect: useEffectEK, useRef: useRefEK } = React;

// Icon
const EkIcon = ({ name, size = 16, stroke = 1.6 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow-right":return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "arrow-left":return <svg {...p}><path d="M19 12H5M11 5l-7 7 7 7" /></svg>;
    case "arrow-down":return <svg {...p}><path d="M12 5v14M5 13l7 7 7-7" /></svg>;
    case "close":return <svg {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case "user":return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>;
    case "menu":return <svg {...p}><path d="M3 8h18M3 16h18" /></svg>;
    case "plus":return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>;
    case "minus":return <svg {...p}><path d="M5 12h14" /></svg>;
    case "check":return <svg {...p}><path d="M5 12l5 5L20 7" /></svg>;
    case "phone":return <svg {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>;
    case "mail":return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
    case "leaf":return <svg {...p}><path d="M11 20A7 7 0 014 13c0-6 8-9 16-9 0 8-3 16-9 16zM2 22s4-1 9-6" /></svg>;
    case "shield":return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "star":return <svg {...p}><path d="M12 2l3 7 7 .5-5.5 4.5L18 21l-6-4-6 4 1.5-7L2 9.5 9 9z" /></svg>;
    case "eclipse":return (
        <svg {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 000 18" fill="currentColor" />
      </svg>);
    case "globe":return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></svg>;
    case "play":return <svg {...p}><path d="M6 4l14 8-14 8z" /></svg>;
    default:return null;
  }
};

const EK_PHOTOS = {
  hero: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&auto=format&fit=crop&q=78",
  succession: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=78",
  senior: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=78",
  demenagement: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=78",
  detail: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&auto=format&fit=crop&q=78",
  livingroom: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=1600&auto=format&fit=crop&q=78",
  hands: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&auto=format&fit=crop&q=78",
  window: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=78",
  portrait: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1000&auto=format&fit=crop&q=78",
  archive: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&auto=format&fit=crop&q=78",
  empty: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1600&auto=format&fit=crop&q=78",
  twilight: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1600&auto=format&fit=crop&q=78",
  interior: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&auto=format&fit=crop&q=78"
};

// ---------- HEADER ----------
function EkHeader({ view, setView, openMega, openLogin, openContact, transparent }) {
  const [scrolled, setScrolled] = useStateEK(false);
  useEffectEK(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dark = transparent && !scrolled;
  const link = (k, l, hide = "") =>
  <button onClick={() => setView(k)} className={`nav-link ${dark ? 'nav-link-dark' : ''} ${view === k ? 'active' : ''} ${hide}`}>{l}</button>;


  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 80,
      background: dark ? 'transparent' : 'rgba(243,234,219,.86)',
      backdropFilter: dark ? 'none' : 'blur(12px)',
      WebkitBackdropFilter: dark ? 'none' : 'blur(12px)',
      borderBottom: dark ? '1px solid transparent' : '1px solid var(--line-light)',
      transition: 'background .3s ease, border-color .3s ease',
      color: dark ? 'var(--ivory-text)' : 'var(--ink)'
    }}>
      <div className="page" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '18px 56px', gap: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <button onClick={openMega} className={`nav-link ${dark ? 'nav-link-dark' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <EkIcon name="menu" size={16} /> Accompagnements
          </button>
          {link('methode', 'La méthode', 'nav-hide-md')}
          {link('temoignages', 'Témoignages', 'nav-hide-md')}
        </div>
        <button onClick={() => setView('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0 16px' }}>
          <span className={`eclipse-dot ${dark ? 'on-dark' : ''}`} style={{ backgroundColor: "rgb(231, 136, 44)" }} />
          <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 26, letterSpacing: '-0.005em' }}>Eklipsis</span>
        </button>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'flex-end', alignItems: 'center' }}>
          {link('concept', 'Le concept', 'nav-hide-md')}
          <button onClick={openLogin} className={`nav-link nav-hide-sm ${dark ? 'nav-link-dark' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <EkIcon name="user" size={13} /> Espace client
          </button>
          <button onClick={openContact} className={`btn ${dark ? 'btn-ivory' : 'btn-terra'}`} style={{ padding: '10px 18px', backgroundColor: "rgb(231, 136, 44)", borderColor: "rgb(231, 136, 44)" }}>
            Diagnostic gratuit <EkIcon name="arrow-right" size={13} />
          </button>
        </div>
      </div>
    </header>);

}

// ---------- MEGA MENU ----------
function EkMegaMenu({ open, onClose, setView, openContact }) {
  useEffectEK(() => {
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    window.addEventListener('keydown', onKey);return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const choose = (v) => {setView(v);onClose();};

  const doors = [
  { k: 'succession', no: "01", t: "Succession",
    hook: "Trier sans se trahir.",
    img: EK_PHOTOS.succession, color: '#c0a07a' },
  { k: 'senior', no: "02", t: "Sénior",
    hook: "Honorer ce qui reste.",
    img: EK_PHOTOS.senior, color: '#d9c9a9' },
  { k: 'demenagement', no: "03", t: "Déménagement",
    hook: "En un tour de main.",
    img: EK_PHOTOS.demenagement, color: '#c89866' }];


  return (
    <div className={`mega ${open ? 'open' : ''}`}>
      <div style={{ position: 'relative', padding: '40px 0', zIndex: 2 }}>
        <div className="page" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="label label-dark" style={{ color: "rgb(231, 136, 44)" }}>Choisir une porte d'entrée</span>
          <button onClick={onClose} className="nav-link nav-link-dark" style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
            Fermer <EkIcon name="close" size={16} />
          </button>
        </div>
      </div>

      <div className="page" style={{ position: 'relative', zIndex: 2, padding: '40px 56px 80px' }}>
        <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(48px,6vw,92px)', lineHeight: 1, color: 'var(--ivory-text)', maxWidth: '14ch', marginBottom: 48 }}>
          Trois portes,<br />
          <span className="italic" style={{ color: 'var(--terra-light)' }}>une seule main.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {doors.map((d) =>
          <button key={d.k} onClick={() => choose(d.k)} style={{ textAlign: 'left', position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/5', background: '#1a2336', transition: 'transform .4s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${d.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .8s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 30%,rgba(13,22,38,.85) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'var(--ivory-text)' }}>
                <div className="chip chip-dark" style={{ alignSelf: 'flex-start', color: d.color, borderColor: 'rgba(240,229,207,.3)' }}>Article {d.no}</div>
                <div>
                  <h3 style={{ fontSize: 54, fontFamily: "'Instrument Serif',serif", lineHeight: 1, letterSpacing: '-0.01em' }}>{d.t}</h3>
                  <p style={{ marginTop: 8, fontWeight:500, color: 'var(--ivory-mute)', fontSize: 17 }}>{d.hook}</p>
                  <span className="btn-link" style={{ marginTop: 18, color: 'var(--ivory-text)', borderColor: 'rgba(240,229,207,.4)' }}>Lire l'article <EkIcon name="arrow-right" size={13} /></span>
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="div-dotted-dark" style={{ marginTop: 64, paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, color: 'var(--ivory-mute)' }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <button onClick={() => choose('methode')} className="nav-link nav-link-dark">La méthode complète</button>
            <button onClick={() => choose('temoignages')} className="nav-link nav-link-dark">Témoignages</button>
            <button onClick={() => choose('concept')} className="nav-link nav-link-dark">Le concept</button>
            <button onClick={() => choose('contact')} className="nav-link nav-link-dark">Contact</button>
          </div>
          <button onClick={() => {openContact();onClose();}} className="btn btn-terra">
            Diagnostic gratuit <EkIcon name="arrow-right" size={13} />
          </button>
        </div>
      </div>
    </div>);

}

// ---------- LOGIN ----------
function EkLoginModal({ open, onClose }) {
  const [email, setEmail] = useStateEK('');
  const [pw, setPw] = useStateEK('');
  const [step, setStep] = useStateEK('idle');
  const submit = (e) => {
    e.preventDefault();
    if (!email || !pw) return;
    setStep('loading');
    setTimeout(() => {
      if (email === 'demo@eklipsis.fr' && pw === 'demo') setStep('success');else
      setStep('error');
    }, 700);
  };
  useEffectEK(() => {if (!open) {setStep('idle');setEmail('');setPw('');}}, [open]);

  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span className="eclipse-dot" />
              <span className="label">Extranet privé</span>
            </div>
            <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 38, letterSpacing: '-0.01em' }}>
              Votre <span className="italic" style={{ color: 'var(--terra)' }}>dossier.</span>
            </h3>
          </div>
          <button onClick={onClose}><EkIcon name="close" size={20} /></button>
        </div>

        {step === 'success' ?
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--terra)', color: 'var(--ivory)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <EkIcon name="check" size={28} />
            </div>
            <h4 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 28 }}>Bienvenue, Sophie</h4>
            <p style={{ color: 'var(--ink-soft)', marginTop: 8 }}>14 objets fichés cette semaine. 2 dons certifiés. 1 vente clôturée.</p>
            <button onClick={onClose} className="btn" style={{ marginTop: 20 }}>Ouvrir le dossier</button>
          </div> :

        <form onSubmit={submit}>
            <p style={{ color: 'var(--ink-soft)', marginBottom: 24, fontSize: 15 }}>
              Photos des objets, estimations, factures de vente, certificats de don. Tout est ici.
            </p>
            <div className="field">
              <label>Adresse e-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.fr" />
            </div>
            <div className="field">
              <label>Mot de passe</label>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
            </div>
            {step === 'error' &&
          <p style={{ color: 'var(--terra)', fontSize: 13, marginBottom: 14 }}>
                Identifiants incorrects. Essayez <b>demo@eklipsis.fr</b> / <b>demo</b>.
              </p>
          }
            <button type="submit" className="btn btn-terra" style={{ width: '100%', justifyContent: 'center' }}>
              {step === 'loading' ? 'Connexion…' : 'Entrer dans le dossier'}
            </button>
            <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'var(--ink-soft)' }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ borderBottom: '1px solid currentColor' }}>Mot de passe oublié</a>
            </p>
          </form>
        }
      </div>
    </div>);

}

// ---------- FOOTER ----------
function EkFooter({ setView, openContact }) {
  return (
    <footer className="footer-twilight">
      <div className="page" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 64, marginBottom: 80 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span className="eclipse-dot on-dark" style={{ width: 18, height: 18 }} />
              <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 32 }}>Eklipsis</span>
            </div>
            <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(34px,3.6vw,52px)', lineHeight: 1.05, maxWidth: '16ch' }}>
              Le passage,<br />
              <span className="italic" style={{ color: 'var(--terra-light)' }}>en de bonnes mains.</span>
            </h3>
            <button onClick={openContact} className="btn btn-terra" style={{ marginTop: 32 }}>
              Diagnostic gratuit <EkIcon name="arrow-right" size={13} />
            </button>
          </div>

          <FooterColEK title="Naviguer" items={[
          ["Le concept", "concept"],
          ["La méthode", "methode"],
          ["Témoignages", "temoignages"],
          ["Contact", "contact"]]
          } setView={setView} />

          <FooterColEK title="Accompagnements" items={[
          ["Succession", "succession"],
          ["Sénior en résidence", "senior"],
          ["Déménagement", "demenagement"],
          ["Autre situation", "contact"]]
          } setView={setView} />

          <div>
            <span className="label label-dark">Joindre Eklipsis</span>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--ivory-mute)' }}>
              <a href="tel:+33145678910" style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
                <EkIcon name="phone" size={14} /> +33 1 45 67 89 10
              </a>
              <a href="mailto:bonjour@eklipsis.fr" style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
                <EkIcon name="mail" size={14} /> bonjour@eklipsis.fr
              </a>
              <span style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
                <EkIcon name="globe" size={14} /> Île-de-France
              </span>
              <span style={{ fontSize: 13, opacity: .8, fontWeight:500 }}>Lundi → samedi, 9h–19h</span>
            </div>
          </div>
        </div>

        <div className="div-dotted-dark" style={{ paddingTop: 24, display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', color: 'var(--ivory-mute)' }}>
          <span className="label label-dark">© Eklipsis · {new Date().getFullYear()} · Tous droits réservés</span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href="#" onClick={(e) => e.preventDefault()}>Mentions légales</a>
            <a href="#" onClick={(e) => e.preventDefault()}>CGV</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Confidentialité</a>
            <a href="#" onClick={(e) => e.preventDefault()}>FAQ</a>
          </div>
        </div>
      </div>
    </footer>);

}

function FooterColEK({ title, items, setView }) {
  return (
    <div>
      <span className="label label-dark">{title}</span>
      <ul style={{ listStyle: 'none', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--ivory-mute)' }}>
        {items.map(([l, k]) =>
        <li key={l}><button onClick={() => setView(k)} style={{ textAlign: 'left' }}>{l}</button></li>
        )}
      </ul>
    </div>);

}

// Section heading shared
function EkSectionHeading({ eyebrow, title, aside, dark }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 32, alignItems: 'baseline' }}>
      <span className={`label ${dark ? 'label-dark' : ''}`}>{eyebrow}</span>
      <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(36px,4.5vw,64px)', lineHeight: 1, letterSpacing: '-0.01em', color: dark ? 'var(--ivory-text)' : 'var(--ink)' }}>{title}</h2>
      <span style={{ fontWeight:500, fontSize: 14, color: dark ? 'var(--ivory-mute)' : 'var(--ink-soft)', textAlign: 'right' }}>{aside}</span>
    </div>);

}

Object.assign(window, { EkIcon, EK_PHOTOS, EkHeader, EkMegaMenu, EkLoginModal, EkFooter, EkSectionHeading });