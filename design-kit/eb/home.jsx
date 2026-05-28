// Espace Blanc — Home page (editorial / journal feel)
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

function HomePage({ headline, setView, openContact }) {
  return (
    <div className="view">
      <HeroEB headline={headline} openContact={openContact} setView={setView}/>
      <ThreeDoorsEB setView={setView}/>
      <ManifestoEB/>
      <MetricsEB/>
      <MethodPreviewEB setView={setView}/>
      <TestimonialsCarouselEB/>
      <PillarsEB/>
      <EcoBandEB/>
      <FaqShortEB/>
      <FinalCtaEB openContact={openContact}/>
    </div>
  );
}

// ---------- HERO ----------
function HeroEB({ headline, openContact, setView }) {
  return (
    <section style={{padding:'40px 0 0'}}>
      <div className="page">
        {/* edition ruler */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',padding:'14px 0',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
          <span className="label">Page 01 · L'éditorial</span>
          <span className="italic" style={{fontSize:14,color:'var(--ink-soft)'}}>par la rédaction</span>
          <span className="label">Lecture 4 min</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1.25fr 1fr',gap:56,padding:'56px 0 32px',alignItems:'end'}}>
          <div>
            <span className="label" style={{display:'block',marginBottom:18}}>Le journal de passage — Numéro d'inauguration</span>
            <h1 style={{
              fontFamily:"'Newsreader',serif", fontWeight:400,
              fontSize:'clamp(56px,7.6vw,116px)', lineHeight:0.92,
              letterSpacing:'-0.025em',
              marginBottom:24,
            }}>
              {renderHeadline(headline)}
            </h1>
            <p style={{fontSize:21,lineHeight:1.45,color:'var(--ink-soft)',maxWidth:'48ch',marginBottom:32}} className="italic">
              Succession, départ en résidence, déménagement.<br/>
              Nous orchestrons le tri, la valorisation et la transmission de votre patrimoine. Vous gardez la main, nous portons le reste.
            </p>
            <div style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center'}}>
              <button className="btn" onClick={openContact}>
                Demander un diagnostic <Icon name="arrow-right" size={12}/>
              </button>
              <a className="btn-link" href="tel:+33145678910">
                <Icon name="phone" size={12}/> Parler à une conseillère
              </a>
            </div>
          </div>

          <figure className="figure">
            <div className="img" style={{
              backgroundImage:`url(${PHOTOS.hero})`,
              aspectRatio:'3/4',
            }}/>
            <figcaption>
              <span>Fig. 01 — Appartement, 14ᵉ arrondissement.</span>
              <span>Photo · A. M.</span>
            </figcaption>
          </figure>
        </div>

        {/* under-fold strap */}
        <div className="rule-double" style={{padding:'10px 0',display:'flex',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
          <span className="label">Trois portes d'entrée</span>
          <span className="label">Méthode en quatre temps</span>
          <span className="label">Bilan d'impact</span>
          <span className="label">Témoignages</span>
          <span className="label">Diagnostic gratuit</span>
        </div>
      </div>
    </section>
  );
}

function renderHeadline(h) {
  // mark a word italic for editorial rhythm
  const map = {
    'On vide. Vous respirez.':                          ['On vide. ', <em key="1" className="italic" style={{color:'var(--accent)'}}>Vous respirez.</em>],
    'Une maison à vider. Une famille à soulager.':      ['Une maison à vider. ', <em key="1" className="italic" style={{color:'var(--accent)'}}>Une famille à soulager.</em>],
    'Le passage, en de bonnes mains.':                  ['Le passage, ', <em key="1" className="italic" style={{color:'var(--accent)'}}>en de bonnes mains.</em>],
  };
  return map[h] || h;
}

// ---------- LES TROIS PORTES ----------
function ThreeDoorsEB({ setView }) {
  const doors = [
    { key:'succession', tag:'Article I',
      title:"Une succession à traverser.",
      lede:"Trier sans se trahir. Valoriser sans se précipiter. Transmettre sans culpabiliser.",
      img: PHOTOS.succession,
      caption:"Fig. 02 — Bibliothèque, succession Dr. R., Paris 6ᵉ."},
    { key:'senior', tag:'Article II',
      title:"Un proche part en résidence.",
      lede:"Choisir ce qui suit. Honorer ce qui reste. Donner ce qui peut servir.",
      img: PHOTOS.senior,
      caption:"Fig. 03 — Studio préparé pour transfert en EHPAD."},
    { key:'demenagement', tag:'Article III',
      title:"Un déménagement à alléger.",
      lede:"Garder l'essentiel. Vendre, donner, recycler le reste. En un tour de main.",
      img: PHOTOS.demenagement,
      caption:"Fig. 04 — Déménagement Paris → Lyon, 86 m²."},
  ];

  return (
    <section style={{padding:'72px 0'}}>
      <div className="page">
        <SectionHeading
          eyebrow="Cahier I · Les trois portes"
          title={<>Choisissez votre <span className="italic" style={{color:'var(--accent)'}}>porte d'entrée</span></>}
          aside="Une méthode unique. Trois récits qui demandent autant d'attention." />

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:32,marginTop:48}}>
          {doors.map((d,i) => (
            <button key={d.key} onClick={() => setView(d.key)} style={{textAlign:'left',display:'flex',flexDirection:'column',gap:16}}>
              <figure className="figure">
                <div className="img" style={{backgroundImage:`url(${d.img})`,aspectRatio:'4/5'}}/>
                <figcaption>
                  <span>{d.caption}</span>
                  <span>{String(i+2).padStart(2,'0')}</span>
                </figcaption>
              </figure>
              <span className="label">{d.tag}</span>
              <h3 style={{fontSize:34,lineHeight:1.05,fontWeight:500,letterSpacing:'-0.01em'}}>{d.title}</h3>
              <p className="italic" style={{color:'var(--ink-soft)',fontSize:17}}>{d.lede}</p>
              <span className="btn-link" style={{marginTop:4}}>Lire l'article <Icon name="arrow-right" size={12}/></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- MANIFESTO (drop cap article) ----------
function ManifestoEB() {
  return (
    <section style={{padding:'48px 0 72px',background:'var(--paper-2)',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
      <div className="page" style={{padding:'56px 48px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:48}}>
          <div>
            <span className="label">L'éditorial</span>
            <h2 style={{fontSize:54,lineHeight:1,marginTop:14,fontWeight:500,letterSpacing:'-0.015em'}}>
              Ce que <span className="italic" style={{color:'var(--accent)'}}>nous croyons.</span>
            </h2>
            <p style={{marginTop:18,color:'var(--ink-soft)'}} className="italic">
              Un manifeste court, à relire si l'on doute.
            </p>
          </div>
          <div className="cols-2" style={{fontSize:17.5,lineHeight:1.6}}>
            <p className="drop-cap" style={{marginBottom:16}}>
              Un logement n'est jamais qu'un logement. C'est un dépôt d'histoires, une grammaire de gestes, une biographie sans légende. Quand il faut le vider — pour partir, pour soigner, pour transmettre — on touche à plus qu'à des meubles.
            </p>
            <p style={{marginBottom:16}}>
              Nous croyons qu'on peut tout faire avec douceur. Mesurer plutôt que jeter. Photographier plutôt que faire disparaître. Restituer ce qui a de la valeur à ceux qui l'attendent, et offrir le reste à ceux qui en ont l'usage.
            </p>
            <p style={{marginBottom:16}}>
              Nous croyons qu'une seule interlocutrice vaut dix prestataires. Qu'un certificat de don console plus qu'un reçu de décharge. Que la lenteur n'est pas un défaut quand l'émotion est là.
            </p>
            <p>
              Nous croyons enfin qu'un logement vide n'est pas un logement sans rien. C'est l'espace qui revient, et la respiration qui suit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- METRICS ----------
function MetricsEB() {
  const metrics = [
    { v: "412", l: "missions accompagnées", s:"depuis 2021"},
    { v: "1,8 M€", l: "restitués aux familles", s:"valeur nette des ventes" },
    { v: "84 t", l: "détournées de la décharge", s:"dons + recyclage" },
    { v: "23", l: "associations partenaires", s:"Île-de-France" },
  ];
  return (
    <section style={{padding:'72px 0'}}>
      <div className="page">
        <SectionHeading
          eyebrow="Cahier II · Bilan d'impact"
          title={<>Ce que <span className="italic" style={{color:'var(--accent)'}}>nous mesurons</span></>}
          aside="Chiffres au 31 mars 2026. Audités par nos soins, vérifiables sur demande."/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:48,borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
          {metrics.map((m,i) => (
            <div key={i} style={{
              padding:'40px 24px',
              borderRight: i<metrics.length-1 ? '1px solid var(--ruled)' : 'none',
            }}>
              <div style={{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:64,lineHeight:1,letterSpacing:'-0.02em'}}>{m.v}</div>
              <div style={{marginTop:10,fontSize:15,color:'var(--ink-soft)'}} className="italic">{m.l}</div>
              <div className="label" style={{marginTop:6}}>{m.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- METHOD PREVIEW ----------
function MethodPreviewEB({ setView }) {
  const steps = [
    { t:"Le diagnostic", d:"Visite, écoute, devis transparent. Sans engagement, sous 24h." },
    { t:"Le tri",        d:"Pièce par pièce, à votre rythme. Tout est photographié, fiché, estimé." },
    { t:"La valorisation", d:"Vente aux brocanteurs, dépôts-vente, ventes en ligne, dons certifiés." },
    { t:"La restitution", d:"Logement vide, somme valorisée reversée, bilan d'impact remis." },
  ];
  return (
    <section style={{padding:'48px 0 72px',background:'var(--paper-2)',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
      <div className="page" style={{padding:'48px 48px'}}>
        <SectionHeading
          eyebrow="Cahier III · La méthode"
          title={<>Quatre temps, <span className="italic" style={{color:'var(--accent)'}}>une cadence</span></>}
          aside="Le passage, écrit pas à pas. Aucun lot, aucune précipitation."/>
        <ol className="steps" style={{marginTop:40}}>
          {steps.map((s,i) => (
            <li key={i}>
              <div></div>
              <div>
                <h3 style={{fontSize:32,fontWeight:500,marginBottom:6,letterSpacing:'-0.005em'}}>{s.t}</h3>
                <p style={{color:'var(--ink-soft)',maxWidth:'62ch',fontSize:17.5}} className="italic">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div style={{marginTop:32}}>
          <button className="btn-link" onClick={() => setView('methode')}>
            Lire la méthode en détail <Icon name="arrow-right" size={12}/>
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------- TESTIMONIALS CAROUSEL ----------
function TestimonialsCarouselEB() {
  const items = [
    { q:"Ma mère partait en EHPAD. J'étais à 800 km. Espace Blanc a tout géré, m'a rendu 4 200 €, et m'a évité 12 week-ends de pleurs et de cartons.",
      who:"Sophie L.", role:"Héritière", city:"Paris 12ᵉ", img: PHOTOS.portrait},
    { q:"J'avais peur qu'on jette les lettres de mon père. Ils ont tout trié devant moi, sans jamais me presser. Le carnet est revenu chez moi, le piano est parti chez un jeune couple.",
      who:"Jean P.", role:"Fils unique", city:"Versailles", img: PHOTOS.detail},
    { q:"Devis annoncé, devis tenu. La benne d'à côté nous proposait 1 200 €. Eux nous ont reversé 6 800 €. Et l'appartement a été rendu impeccable.",
      who:"Famille D.", role:"Succession", city:"Boulogne", img: PHOTOS.window},
    { q:"On m'avait dit débarras. On a eu une rédactrice. La différence est tout.",
      who:"Béatrice M.", role:"En instance de déménagement", city:"Nogent", img: PHOTOS.archive},
  ];
  const [i,setI] = useStateH(0);
  const next = () => setI((i+1) % items.length);
  const prev = () => setI((i-1+items.length) % items.length);
  useEffectH(() => { const t = setInterval(next, 8000); return () => clearInterval(t); });

  const cur = items[i];
  return (
    <section style={{padding:'80px 0'}}>
      <div className="page">
        <SectionHeading
          eyebrow="Cahier IV · Courrier des lecteurs"
          title={<>Trois lignes, <span className="italic" style={{color:'var(--accent)'}}>un cas concret</span></>}
          aside={`Témoignage ${String(i+1).padStart(2,'0')} de ${String(items.length).padStart(2,'0')}.`}/>

        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:48,marginTop:48,alignItems:'center'}}>
          <figure className="figure">
            <div className="img" style={{backgroundImage:`url(${cur.img})`,aspectRatio:'3/4'}}/>
            <figcaption>
              <span>{cur.who} · {cur.city}</span>
              <span>{cur.role}</span>
            </figcaption>
          </figure>
          <div>
            <div style={{
              fontFamily:"'Newsreader',serif", fontWeight:400, fontWeight:600,
              fontSize:'clamp(28px,3vw,42px)', lineHeight:1.2, letterSpacing:'-0.01em',
              color:'var(--ink)',
              transition:'opacity .4s ease',
            }} key={i}>
              « {cur.q} »
            </div>
            <div style={{marginTop:24,display:'flex',gap:14,alignItems:'center'}}>
              <span className="label">— {cur.who}, {cur.role}, {cur.city}</span>
            </div>
            <div style={{marginTop:36,display:'flex',gap:12,alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',gap:8}}>
                {items.map((_,k) => (
                  <button key={k} onClick={() => setI(k)} aria-label={`Témoignage ${k+1}`}
                    style={{
                      width:k===i?28:10,height:2,background:k===i?'var(--accent)':'var(--ruled)',
                      transition:'all .3s ease'
                    }}/>
                ))}
              </div>
              <div style={{display:'flex',gap:8}}>
                <button onClick={prev} className="btn-ghost btn" style={{padding:'8px 12px'}} aria-label="Précédent"><Icon name="arrow-left" size={14}/></button>
                <button onClick={next} className="btn-ghost btn" style={{padding:'8px 12px'}} aria-label="Suivant"><Icon name="arrow-right" size={14}/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- PILLARS / DIFFERENTIATORS ----------
function PillarsEB() {
  const pillars = [
    { n:"I",   t:"Un pivot unique", d:"Une interlocutrice orchestre tous les prestataires. Vous n'avez qu'un numéro à appeler." },
    { n:"II",  t:"Valorisation tracée", d:"Chaque objet chiffré, photographié, justifié. L'argent retourne à la famille." },
    { n:"III", t:"Éco & solidaire", d:"Certificats de don, kilos évités à la décharge, partenaires associatifs identifiés." },
    { n:"IV",  t:"Extranet tracé", d:"Photos, devis, factures, dons. Tout est consultable. Aucune contestation possible." },
  ];
  return (
    <section style={{padding:'72px 0',borderTop:'1px solid var(--ink)'}}>
      <div className="page">
        <SectionHeading
          eyebrow="Cahier V · Ce qui nous distingue"
          title={<>Quatre <span className="italic" style={{color:'var(--accent)'}}>piliers</span> tenus.</>}
          aside="Face aux débarrasseurs, brocanteurs, sociétés de déménagement."/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:40,borderTop:'1px solid var(--ruled)'}}>
          {pillars.map((p,i) => (
            <div key={i} style={{padding:'28px 24px',borderRight: i<3 ? '1px solid var(--ruled)' : 'none',borderBottom:'1px solid var(--ruled)'}}>
              <div style={{fontFamily:"'Newsreader',serif",fontWeight:600,fontSize:36,color:'var(--accent)',marginBottom:10}}>{p.n}.</div>
              <h4 style={{fontSize:22,fontWeight:500,marginBottom:8}}>{p.t}</h4>
              <p style={{color:'var(--ink-soft)',fontSize:15}} className="italic">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- ECO BAND ----------
function EcoBandEB() {
  return (
    <section style={{padding:'80px 0',background:'var(--ink)',color:'var(--paper)'}}>
      <div className="page">
        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:64,alignItems:'center'}}>
          <div>
            <span className="label" style={{color:'#a89c80'}}>Engagement éco-solidaire</span>
            <h2 style={{fontSize:'clamp(40px,5vw,72px)',lineHeight:1,marginTop:16,fontWeight:400,letterSpacing:'-0.02em'}}>
              Rien ne se jette,<br/><span className="italic" style={{color:'#d6a060'}}>tant qu'on prend le temps.</span>
            </h2>
            <p style={{marginTop:20,maxWidth:'52ch',color:'#d6c9a8',fontSize:18}}>
              Pour chaque mission, nous remettons un bilan d'impact : poids des dons certifiés, poids recyclé, poids résiduel envoyé en déchèterie. Aucune ligne n'est cachée.
            </p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <EcoLine n="92%" l="détourné de la décharge en moyenne"/>
            <EcoLine n="23"  l="associations partenaires identifiées"/>
            <EcoLine n="1×"  l="certificat de don remis pour chaque destination"/>
            <EcoLine n="0"   l="objet jeté sans avoir cherché preneur"/>
          </div>
        </div>
      </div>
    </section>
  );
}

function EcoLine({ n, l }) {
  return (
    <div style={{display:'flex',gap:18,alignItems:'baseline',padding:'14px 0',borderBottom:'1px dotted #a89c80'}}>
      <span style={{fontFamily:"'Newsreader',serif",fontSize:36,color:'#d6a060',minWidth:90}}>{n}</span>
      <span style={{color:'#d6c9a8'}} className="italic">{l}</span>
    </div>
  );
}

// ---------- FAQ ----------
function FaqShortEB() {
  const qs = [
    { q:"Combien coûte une intervention ?", a:"Le diagnostic est gratuit. La mission est devisée en fonction du volume, du contexte et de la part valorisable. Nous reversons systématiquement la valeur nette des ventes." },
    { q:"Intervenez-vous hors Île-de-France ?", a:"Notre cœur d'activité reste l'Île-de-France. Pour le reste, nous étudions au cas par cas avec un déplacement facturé." },
    { q:"Comment fonctionne la valorisation ?", a:"Brocanteurs, dépôts-vente, ventes en ligne, ou associations bénéficiaires. Vous validez chaque destination, nous restituons les sommes." },
    { q:"Que devient ce qui n'a pas de valeur marchande ?", a:"Soit un don à une association partenaire (avec certificat), soit un recyclage filière. La décharge reste l'exception." },
    { q:"Le client peut-il être absent ?", a:"Oui. Vous validez à distance via l'extranet, à votre rythme. Photos, fiches, prix proposés, dons : tout vous est soumis avant exécution." },
  ];
  const [open,setOpen] = useStateH(0);
  return (
    <section style={{padding:'80px 0'}}>
      <div className="page">
        <SectionHeading
          eyebrow="Cahier VI · Lettres aux lecteurs"
          title={<>Cinq <span className="italic" style={{color:'var(--accent)'}}>questions reçues</span></>}
          aside="Plus longues : voir la FAQ détaillée en pied de page."/>
        <div style={{marginTop:32,borderTop:'1px solid var(--ink)'}}>
          {qs.map((it,i) => (
            <div key={i} style={{borderBottom:'1px solid var(--ruled)'}}>
              <button onClick={() => setOpen(open===i?-1:i)} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'baseline',padding:'24px 0',textAlign:'left',gap:24}}>
                <span style={{display:'flex',gap:18,alignItems:'baseline'}}>
                  <span className="label" style={{minWidth:30}}>0{i+1}</span>
                  <span style={{fontFamily:"'Newsreader',serif",fontSize:24,fontWeight:500,letterSpacing:'-0.005em'}}>{it.q}</span>
                </span>
                <Icon name={open===i?"minus":"plus"} size={18}/>
              </button>
              {open===i && (
                <div style={{paddingLeft:48,paddingBottom:24,paddingRight:24,maxWidth:'70ch'}}>
                  <p style={{color:'var(--ink-soft)',fontSize:17.5}} className="italic">{it.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FINAL CTA ----------
function FinalCtaEB({ openContact }) {
  return (
    <section style={{padding:'100px 0 60px',textAlign:'center'}}>
      <div className="page">
        <span className="label">Dernière colonne</span>
        <h2 style={{
          fontFamily:"'Newsreader',serif", fontWeight:400,
          fontSize:'clamp(56px,8vw,124px)', lineHeight:0.95,
          letterSpacing:'-0.025em',
          marginTop:24,
        }}>
          Le passage commence<br/>par <span className="italic" style={{color:'var(--accent)'}}>une conversation.</span>
        </h2>
        <p style={{marginTop:28,fontSize:21,color:'var(--ink-soft)',maxWidth:'52ch',margin:'28px auto 0'}} className="italic">
          Diagnostic gratuit, sous 24h, sans engagement. Nous nous déplaçons, nous écoutons, nous vous écrivons.
        </p>
        <div style={{marginTop:36,display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <button className="btn" onClick={openContact}>Demander un diagnostic <Icon name="arrow-right" size={12}/></button>
          <a className="btn-ghost btn" href="tel:+33145678910"><Icon name="phone" size={12}/> +33 1 45 67 89 10</a>
        </div>
      </div>
    </section>
  );
}

// ---------- SECTION HEADING ----------
function SectionHeading({ eyebrow, title, aside }) {
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1.6fr 1fr',gap:24,alignItems:'baseline',borderTop:'1px solid var(--ink)',paddingTop:24}}>
      <span className="label">{eyebrow}</span>
      <h2 style={{fontFamily:"'Newsreader',serif",fontWeight:500,fontSize:'clamp(34px,4.2vw,58px)',lineHeight:1,letterSpacing:'-0.015em'}}>{title}</h2>
      <span className="italic" style={{color:'var(--ink-soft)',fontSize:15,textAlign:'right'}}>{aside}</span>
    </div>
  );
}

Object.assign(window, { HomePage, SectionHeading });
