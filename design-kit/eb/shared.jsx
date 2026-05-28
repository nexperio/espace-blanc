// Shared chrome for Espace Blanc: Masthead, MegaMenu, LoginModal, Footer, helpers
const { useState, useEffect, useRef } = React;

// Inline icon utility — minimal line glyphs
const Icon = ({ name, size = 16, stroke = 1.4 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round"
  };
  switch (name) {
    case "arrow-right": return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "arrow-left":  return <svg {...props}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case "arrow-down":  return <svg {...props}><path d="M12 5v14M5 13l7 7 7-7"/></svg>;
    case "close":       return <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case "user":        return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>;
    case "menu":        return <svg {...props}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case "plus":        return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":       return <svg {...props}><path d="M5 12h14"/></svg>;
    case "check":       return <svg {...props}><path d="M5 12l5 5L20 7"/></svg>;
    case "phone":       return <svg {...props}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>;
    case "mail":        return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case "leaf":        return <svg {...props}><path d="M11 20A7 7 0 014 13c0-6 8-9 16-9 0 8-3 16-9 16zM2 22s4-1 9-6"/></svg>;
    case "shield":      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case "star":        return <svg {...props}><path d="M12 2l3 7 7 .5-5.5 4.5L18 21l-6-4-6 4 1.5-7L2 9.5 9 9z"/></svg>;
    case "circle":      return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
    default: return null;
  }
};

// Photos used across the site (Unsplash). Stable IDs.
const PHOTOS = {
  hero:        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&auto=format&fit=crop&q=75",
  succession:  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=75",
  senior:      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1000&auto=format&fit=crop&q=75",
  demenagement:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=75",
  detail:      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1000&auto=format&fit=crop&q=75",
  livingroom:  "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=1400&auto=format&fit=crop&q=75",
  hands:       "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1000&auto=format&fit=crop&q=75",
  window:      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&auto=format&fit=crop&q=75",
  portrait:    "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=900&auto=format&fit=crop&q=75",
  archive:     "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1000&auto=format&fit=crop&q=75",
  empty:       "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1400&auto=format&fit=crop&q=75",
};

// ---------- MASTHEAD (header) ----------
function Masthead({ view, setView, openMega, openLogin, openContact }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const today = new Date().toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' });

  const navLink = (key, label, hideClass="") => (
    <button className={`nav-link ${view===key?'active':''} ${hideClass}`} onClick={() => setView(key)}>{label}</button>
  );

  return (
    <header style={{
      position:'sticky', top:0, zIndex:60,
      background:'var(--paper)',
      borderBottom: scrolled ? '1px solid var(--ink)' : '1px solid transparent',
      transition:'border-color .25s ease',
    }}>
      {/* edition strap */}
      <div className="page" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 48px',gap:24}}>
        <span className="label">Édition №&thinsp;23 · {today}</span>
        <span className="label" style={{textAlign:'center'}}>Île-de-France · Tirage privé</span>
        <span className="label" style={{textAlign:'right'}}>
          <a href="tel:+33145678910" style={{textDecoration:'none',color:'inherit'}}>+33 1 45 67 89 10</a>
        </span>
      </div>
      <div style={{borderTop:'1px solid var(--ink)'}}/>

      {/* nameplate row */}
      <div className="page" style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center',padding:'18px 48px',gap:24}}>
        <div style={{display:'flex',gap:24,alignItems:'center'}}>
          <button className="nav-link" onClick={openMega} style={{display:'inline-flex',alignItems:'center',gap:8}}>
            <Icon name="menu" size={14}/> Sommaire
          </button>
          {navLink('methode','La méthode','nav-hide-md')}
          {navLink('temoignages','Témoignages','nav-hide-md')}
        </div>
        <button onClick={() => setView('home')} style={{
          fontFamily:"'Newsreader',serif", fontWeight:500, fontSize:30,
          letterSpacing:'-0.01em', lineHeight:1, cursor:'pointer',
          padding:'0 24px',
        }}>
          Espace <span className="italic" style={{color:'var(--accent)'}}>Blanc</span>
        </button>
        <div style={{display:'flex',gap:18,justifyContent:'flex-end',alignItems:'center'}}>
          {navLink('concept','Le concept','nav-hide-md')}
          <button className="nav-link nav-hide-sm" onClick={openLogin} style={{display:'inline-flex',alignItems:'center',gap:8}}>
            <Icon name="user" size={13}/> Espace client
          </button>
          <button className="btn" onClick={openContact} style={{padding:'10px 16px',fontSize:10}}>
            Diagnostic gratuit
          </button>
        </div>
      </div>
      <div className="rule"/>
      <div style={{borderTop:'1px solid var(--ink)',marginTop:2}}/>
    </header>
  );
}

// ---------- MEGA MENU ----------
function MegaMenu({ open, onClose, setView, openContact }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const choose = (v) => { setView(v); onClose(); };

  return (
    <>
      <div className={`mega-backdrop ${open?'open':''}`} onClick={onClose}/>
      <div className={`mega ${open?'open':''}`}>
        <div className="page" style={{padding:'40px 48px 60px'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:32}}>
            <span className="label">Sommaire de l'édition</span>
            <button onClick={onClose} className="nav-link" style={{display:'inline-flex',gap:8,alignItems:'center'}}>
              Fermer <Icon name="close" size={14}/>
            </button>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1.2fr 2fr',gap:48}}>
            <div>
              <h2 style={{fontSize:48,lineHeight:1.05,marginBottom:18,fontWeight:400}}>
                Nos <span className="italic" style={{color:'var(--accent)'}}>accompagnements.</span>
              </h2>
              <p style={{color:'var(--ink-soft)',maxWidth:'34ch',marginBottom:20}}>
                Trois situations bien distinctes. Une même méthode, douce et tracée. Choisissez votre porte d'entrée.
              </p>
              <button className="btn-link" onClick={openContact}>
                Ou demander un diagnostic <Icon name="arrow-right" size={12}/>
              </button>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
              <MegaItem
                tag="Article 1"
                title="Succession"
                hook="Trier sans se trahir."
                onClick={() => choose('succession')}/>
              <MegaItem
                tag="Article 2"
                title="Sénior"
                hook="Honorer ce qui reste."
                onClick={() => choose('senior')}/>
              <MegaItem
                tag="Article 3"
                title="Déménagement"
                hook="En un tour de main."
                onClick={() => choose('demenagement')}/>
            </div>
          </div>

          <div style={{borderTop:'1px solid var(--ruled)',marginTop:48,paddingTop:24,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <span className="label">Aussi dans cette édition</span>
            <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
              <button className="nav-link" onClick={() => choose('methode')}>La méthode</button>
              <button className="nav-link" onClick={() => choose('temoignages')}>Témoignages & presse</button>
              <button className="nav-link" onClick={() => choose('concept')}>Le concept</button>
              <button className="nav-link" onClick={() => choose('contact')}>Contact</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MegaItem({ tag, title, hook, onClick }) {
  return (
    <button onClick={onClick} style={{
      textAlign:'left',display:'flex',flexDirection:'column',gap:10,
      padding:24,border:'1px solid var(--ink)',background:'var(--paper-2)',
      transition:'background .2s ease',
    }} onMouseEnter={e=>e.currentTarget.style.background='var(--paper-3)'} onMouseLeave={e=>e.currentTarget.style.background='var(--paper-2)'}>
      <span className="label">{tag}</span>
      <span style={{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:30,lineHeight:1}}>{title}</span>
      <span className="italic" style={{color:'var(--ink-soft)',fontSize:16}}>{hook}</span>
      <span className="btn-link" style={{marginTop:8}}>Lire l'article <Icon name="arrow-right" size={12}/></span>
    </button>
  );
}

// ---------- LOGIN MODAL ----------
function LoginModal({ open, onClose }) {
  const [email,setEmail] = useState('');
  const [pw,setPw] = useState('');
  const [step,setStep] = useState('idle'); // idle | loading | error | success
  const submit = (e) => {
    e.preventDefault();
    if (!email || !pw) return;
    setStep('loading');
    setTimeout(() => {
      if (email === 'demo@espace-blanc.fr' && pw === 'demo') setStep('success');
      else setStep('error');
    }, 700);
  };
  useEffect(() => { if (!open) { setStep('idle'); setEmail(''); setPw(''); } }, [open]);

  return (
    <div className={`modal-overlay ${open?'open':''}`} onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24}}>
          <div>
            <span className="label">Extranet privé</span>
            <h3 style={{fontSize:32,marginTop:6,fontWeight:500}}>
              Espace <span className="italic" style={{color:'var(--accent)'}}>client.</span>
            </h3>
          </div>
          <button onClick={onClose}><Icon name="close" size={18}/></button>
        </div>

        {step === 'success' ? (
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{
              width:48,height:48,borderRadius:'50%',background:'var(--accent)',color:'var(--paper)',
              display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:14
            }}><Icon name="check" size={22}/></div>
            <h4 style={{fontSize:22,fontWeight:500,marginBottom:6}}>Bienvenue, Sophie</h4>
            <p className="small">Votre dossier est à jour. 14 objets fichés cette semaine.</p>
            <button onClick={onClose} className="btn-ghost btn" style={{marginTop:18}}>Continuer</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="small" style={{marginBottom:20}}>
              Accédez à votre dossier : photographies des objets, estimations en cours, factures de vente et certificats de don.
            </p>
            <div className="field">
              <label>Adresse e-mail</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="vous@exemple.fr"/>
            </div>
            <div className="field">
              <label>Mot de passe</label>
              <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••"/>
            </div>
            {step === 'error' && (
              <p style={{color:'var(--accent)',fontSize:13,marginBottom:14}}>
                Identifiants incorrects. Essayez <em>demo@espace-blanc.fr</em> / <em>demo</em>.
              </p>
            )}
            <button className="btn" type="submit" style={{width:'100%',justifyContent:'center'}}>
              {step==='loading' ? 'Connexion…' : 'Entrer dans le dossier'}
            </button>
            <p className="small center" style={{marginTop:14}}>
              <a href="#" onClick={e=>e.preventDefault()}>Mot de passe oublié</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ---------- FOOTER ----------
function Footer({ setView, openContact }) {
  return (
    <footer style={{marginTop:80}}>
      {/* end-of-edition bar */}
      <div className="page" style={{padding:'80px 48px 60px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr 1fr 1fr',gap:48}}>
          <div>
            <div style={{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:36,lineHeight:1,marginBottom:14}}>
              Espace <span className="italic" style={{color:'var(--accent)'}}>Blanc</span>
            </div>
            <p className="italic" style={{color:'var(--ink-soft)',maxWidth:'34ch',marginBottom:18}}>
              Le journal du passage et de l'allègement. Rédigé chez vous, au rythme de chacun.
            </p>
            <button className="btn" onClick={openContact}>Demander un diagnostic gratuit</button>
          </div>
          <FooterCol title="Lire" items={[
            ['Le concept', 'concept'],
            ['La méthode', 'methode'],
            ['Témoignages', 'temoignages'],
            ['Presse', 'temoignages'],
          ]} setView={setView}/>
          <FooterCol title="Accompagner" items={[
            ['Succession', 'succession'],
            ['Sénior en résidence', 'senior'],
            ['Déménagement', 'demenagement'],
            ['Autre situation', 'contact'],
          ]} setView={setView}/>
          <div>
            <span className="label">Joindre la rédaction</span>
            <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:8}}>
              <a href="tel:+33145678910" style={{textDecoration:'none',display:'inline-flex',gap:8,alignItems:'center'}}>
                <Icon name="phone" size={14}/> +33 1 45 67 89 10
              </a>
              <a href="mailto:bonjour@espace-blanc.fr" style={{textDecoration:'none',display:'inline-flex',gap:8,alignItems:'center'}}>
                <Icon name="mail" size={14}/> bonjour@espace-blanc.fr
              </a>
              <span className="small">14 rue Lhomond, 75005 Paris</span>
              <span className="small italic">Du lundi au samedi, 9h–19h.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="page" style={{display:'flex',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
          <span className="label">© Espace Blanc · {new Date().getFullYear()} · Tous droits réservés.</span>
          <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
            <a href="#" onClick={e=>e.preventDefault()}>Mentions légales</a>
            <a href="#" onClick={e=>e.preventDefault()}>CGV</a>
            <a href="#" onClick={e=>e.preventDefault()}>Confidentialité</a>
            <a href="#" onClick={e=>e.preventDefault()}>FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, setView }) {
  return (
    <div>
      <span className="label">{title}</span>
      <ul style={{listStyle:'none',marginTop:14,display:'flex',flexDirection:'column',gap:8}}>
        {items.map(([label,key]) => (
          <li key={label}><button onClick={() => setView(key)} style={{textAlign:'left'}}>{label}</button></li>
        ))}
      </ul>
    </div>
  );
}

// Export to window for sibling babel scripts
Object.assign(window, { Icon, PHOTOS, Masthead, MegaMenu, LoginModal, Footer });
