// Eklipsis — Home page (crépuscule / modern editorial)
const { useState: useStateEH, useEffect: useEffectEH } = React;

function EkHomePage({ headline, setView, openContact }) {
  return (
    <div className="view">
      <EkHero headline={headline} openContact={openContact} setView={setView} />
      <EkThreeDoors setView={setView} />
      <EkManifesto />
      <EkMethod setView={setView} />
      <EkMetrics />
      <EkTestimonials />
      <EkPillars />
      <EkEco />
      <EkFaqShort />
      <EkFinalCta openContact={openContact} />
    </div>);

}

// ---------- HERO (full-bleed dark twilight) ----------
function EkHero({ headline, openContact }) {
  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      paddingTop: 80,
      color: 'var(--ivory-text)',
      overflow: 'hidden'
    }} className="twilight-bg">
      {/* twilight ambient grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .35,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        mixBlendMode: 'screen'
      }} />

      <div className="page" style={{ position: 'relative', zIndex: 2, paddingTop: 60, paddingBottom: 80 }}>
        {/* edition strap */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--line-dark)', borderBottom: '1px solid var(--line-dark)', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="eclipse-dot on-dark" />
            <span className="label label-dark">Saison 01 — Le passage</span>
          </div>
          <span className="label label-dark">Île-de-France · Sur rendez-vous</span>
          <span className="label label-dark">Diagnostic gratuit sous 24h</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            <span className="chip chip-dark" style={{ marginBottom: 32, display: 'inline-flex' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--terra-light)' }} />
              Une seule interlocutrice
            </span>
            <h1 style={{
              fontFamily: "'Instrument Serif',serif",
              fontWeight: 400,
              fontSize: 'clamp(56px,8vw,148px)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em'
            }}>
              {renderHeadlineEK(headline)}
            </h1>
            <p style={{ fontSize: 21, lineHeight: 1.5, color: 'var(--ivory-mute)', maxWidth: '52ch', marginTop: 32 }}>
              Succession, départ en résidence, déménagement. Nous orchestrons le tri, la valorisation et la transmission de votre patrimoine. Vous gardez la main, nous portons le reste.
            </p>
            <div style={{ marginTop: 40, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={openContact} className="btn btn-terra" style={{ backgroundColor: "rgb(231, 136, 44)", borderColor: "rgb(231, 136, 44)" }}>
                Demander un diagnostic <EkIcon name="arrow-right" size={14} />
              </button>
              <a href="tel:+33145678910" className="btn btn-outline-light">
                <EkIcon name="phone" size={13} /> +33 1 45 67 89 10
              </a>
            </div>
          </div>

          <div className="photo" style={{ aspectRatio: '3/4', height: 'auto' }}>
            <div className="img" style={{ backgroundImage: `url(${EK_PHOTOS.hero})` }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%, rgba(13,22,38,.6) 100%)' }} />
            <div className="cap">Appartement, Paris 14ᵉ — 02 / 26</div>
          </div>
        </div>

        {/* bottom strap */}
        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, paddingTop: 32, borderTop: '1px solid var(--line-dark)' }}>
          {[
          ["Devis 24h", "Sans engagement"],
          ["RC pro + transport", "Assurance vérifiable"],
          ["Tarification claire", "Pas de frais cachés"],
          ["Données chiffrées", "RGPD respecté"]].
          map(([t, s], i) =>
          <div key={i}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--ivory-text)' }}>
                <EkIcon name="check" size={16} /> <span style={{ fontSize: 15, fontWeight: 500 }}>{t}</span>
              </div>
              <div style={{ marginTop: 4, color: 'var(--ivory-mute)', fontSize: 13.5, fontWeight: 500 }}>{s}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function renderHeadlineEK(h) {
  const map = {
    'On vide. Vous respirez.': <>On vide.<br /><span className="italic" style={{ color: 'var(--terra-light)' }}>Vous respirez</span></>,
    'Une maison à vider. Une famille à soulager.': <>Une maison à vider,<br /><span className="italic" style={{ color: 'var(--terra-light)' }}>une famille à soulager</span></>,
    'Le passage, en de bonnes mains.': <>Le passage,<br /><span className="italic" style={{ color: "rgb(255, 178, 103)", fontWeight: "500" }}>en de bonnes mains</span></>
  };
  return map[h] || h;
}

// ---------- THREE DOORS ----------
function EkThreeDoors({ setView }) {
  const doors = [
  { k: 'succession', no: "01", t: "Succession",
    lede: "Trier sans se trahir. Valoriser sans se précipiter. Transmettre sans culpabiliser.",
    img: EK_PHOTOS.succession },
  { k: 'senior', no: "02", t: "Sénior",
    lede: "Choisir ce qui suit. Honorer ce qui reste. Donner ce qui peut servir.",
    img: EK_PHOTOS.senior },
  { k: 'demenagement', no: "03", t: "Déménagement",
    lede: "Garder l'essentiel. Vendre, donner, recycler le reste. En un tour de main.",
    img: EK_PHOTOS.demenagement }];


  return (
    <section style={{ padding: '120px 0', background: 'var(--ivory)' }}>
      <div className="page">
        <EkSectionHeading
          eyebrow="Trois portes d'entrée"
          title={<>Trois récits, <span className="italic" style={{ color: "rgb(231, 136, 44)", fontWeight: "500" }}>une seule main</span></>}
          aside="Une méthode unique, déclinée selon vos besoins." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 64 }}>
          {doors.map((d) =>
          <button key={d.k} onClick={() => setView(d.k)} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 20, cursor: 'pointer' }}>
              <div className="photo" style={{ aspectRatio: '4/5' }}>
                <div className="img" style={{ backgroundImage: `url(${d.img})` }} />
                <div className="cap">Article {d.no}</div>
              </div>
              <div>
                <span className="label" style={{ display: 'block', marginBottom: 10 }}>Article {d.no}</span>
                <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(34px,3.4vw,42px)', letterSpacing: '-0.015em', lineHeight: 1, marginBottom: 12, color: "rgb(231, 136, 44)" }}>{d.t}</h3>
                <p style={{ fontWeight: 500, color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.45 }}>{d.lede}</p>
                <div style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--terra)', fontWeight: 500, fontSize: 14 }}>
                  Découvrir l'accompagnement <EkIcon name="arrow-right" size={14} />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>);

}

// ---------- MANIFESTO ----------
function EkManifesto() {
  return (
    <section style={{ padding: '120px 0', background: 'var(--ivory-2)', borderTop: '1px solid var(--line-light)', borderBottom: '1px solid var(--line-light)' }}>
      <div className="page">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, alignItems: 'start' }}>
          <div>
            <span className="label">Notre conviction</span>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(48px,5vw,80px)', lineHeight: .95, marginTop: 18, letterSpacing: '-0.015em', color: "rgb(77, 85, 108)" }}>
              On peut tout faire<br /><span className="italic" style={{ color: "rgb(231, 136, 44)", fontWeight: "500" }}>avec douceur</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
            ["Mesurer plutôt que jeter.", "Aucun objet ne quitte le logement sans avoir été photographié, fiché, estimé."],
            ["Restituer ce qui a de la valeur.", "Brocanteurs, dépôts-vente, ventes en ligne. L'argent retourne aux familles, ligne par ligne."],
            ["Offrir le reste à qui en a l'usage.", "Associations partenaires identifiées, certificats de don remis. La décharge reste l'exception."],
            ["Préférer la lenteur quand elle protège.", "Aucune pression. Nous travaillons au rythme de chacun."]].
            map(([t, d], i) =>
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 20, paddingBottom: 24, borderBottom: i < 3 ? '1px solid var(--line-light)' : 'none' }}>
                <span style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 500, fontSize: 24, color: "rgb(231, 136, 44)" }}>{i + 1}.</span>
                <div>
                  <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 26, letterSpacing: '-0.005em', lineHeight: 1.15 }}>{t}</h3>
                  <p style={{ color: 'var(--ink-soft)', marginTop: 6, fontSize: 16, maxWidth: '62ch' }}>{d}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ---------- METHOD ----------
function EkMethod({ setView }) {
  const steps = [
  { t: "Le diagnostic", sub: "Sans engagement, sous 24h.",
    d: "Un appel d'abord, une visite ensuite. Nous écoutons davantage que nous parlons. Au sortir : un devis détaillé, ligne par ligne.",
    img: EK_PHOTOS.window },
  { t: "Le tri", sub: "Pièce par pièce, à votre rythme.",
    d: "Avec ou sans vous. Chaque objet d'intérêt est photographié, fiché, estimé. Vous validez à distance, depuis l'extranet.",
    img: EK_PHOTOS.archive },
  { t: "La valorisation", sub: "Brocanteurs, dépôts-vente, en ligne, dons.",
    d: "Pour chaque ligne, nous proposons la meilleure destination. Vous voyez le prix, vous validez, nous exécutons.",
    img: EK_PHOTOS.detail },
  { t: "La restitution", sub: "Logement vide, propre, rendu.",
    d: "Le dernier jour, nous remettons les clés. Un bilan d'impact accompagne la facture : argent restitué, kilos sauvés, dons effectués.",
    img: EK_PHOTOS.empty }];


  return (
    <section style={{ padding: '140px 0 80px', background: 'var(--ivory)' }}>
      <div className="page">
        <EkSectionHeading
          eyebrow="Notre méthode"
          title={<>Quatre temps, <span className="italic" style={{ color: 'var(--terra)' }}>une cadence</span></>}
          aside="Le passage, écrit pas à pas." />

        <div style={{ marginTop: 80 }}>
          {steps.map((s, i) =>
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: i % 2 ? '1fr 1.1fr' : '1.1fr 1fr',
            gap: 64,
            alignItems: 'center',
            padding: '56px 0',
            borderTop: '1px solid var(--line-light)'
          }}>
              <div style={{ order: i % 2 ? 2 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 96, lineHeight: 1, fontWeight: "500", color: "rgb(231, 136, 44)" }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Instrument Serif',serif", letterSpacing: '-0.015em', lineHeight: 1, fontSize: "60px", color: "rgb(231, 136, 44)" }}>{s.t}</h3>
                    <p style={{ fontWeight: 500, color: 'var(--ink-soft)', fontSize: 18, marginTop: 6 }}>{s.sub}</p>
                  </div>
                </div>
                <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink)', maxWidth: '48ch' }}>{s.d}</p>
              </div>
              <div className="photo" style={{ order: i % 2 ? 1 : 2, aspectRatio: '5/4' }}>
                <div className="img" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="cap">Étape {String(i + 1).padStart(2, '0')}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <button onClick={() => setView('methode')} className="btn btn-ghost">
            Lire la méthode en détail <EkIcon name="arrow-right" size={13} />
          </button>
        </div>
      </div>
    </section>);

}

// ---------- METRICS ----------
function EkMetrics() {
  const metrics = [
  { v: "412", l: "missions accompagnées", s: "depuis 2021" },
  { v: "1,8 M€", l: "restitués aux familles", s: "valeur nette des ventes" },
  { v: "84 t", l: "détournées de la décharge", s: "dons et recyclage" },
  { v: "23", l: "associations partenaires", s: "identifiées et certifiées" }];


  return (
    <section style={{
      padding: '120px 0',
      background: '#3a5a8c',
      color: 'var(--ivory-text)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(60% 80% at 20% 100%, rgba(8,14,28,.45) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />
      <div className="page" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'baseline', marginBottom: 64 }}>
          <span className="label" style={{ color: 'rgba(243,234,219,.7)' }}>Bilan d'impact · au 31 mars 2026</span>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1, letterSpacing: '-0.015em' }}>
            Ce que nous <span className="italic" style={{ fontWeight: "500", color: "rgb(248, 196, 147)" }}>mesurons.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {metrics.map((m, i) =>
          <div key={i} style={{ paddingTop: 32, borderTop: '1px solid rgba(243,234,219,.35)' }}>
              <div style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 'clamp(56px,5.5vw,88px)', lineHeight: 1, letterSpacing: '-0.025em' }}>{m.v}</div>
              <div style={{ marginTop: 14, fontSize: 17, fontWeight: 500 }}>{m.l}</div>
              <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(243,234,219,.65)', fontFamily: "'DM Mono',monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>{m.s}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------- TESTIMONIALS ----------
function EkTestimonials() {
  const items = [
  { q: "Ma mère partait en EHPAD. J'étais à 800 km. Eklipsis a tout géré, m'a rendu 4 200 €, et m'a évité 12 week-ends de pleurs et de cartons.",
    who: "Sophie L.", role: "Héritière, succession", city: "Paris 12ᵉ", img: EK_PHOTOS.portrait, chiffre: "4 200 € restitués" },
  { q: "J'avais peur qu'on jette les lettres de mon père. Ils ont tout trié devant moi, sans jamais me presser. Le carnet est revenu chez moi, le piano est parti chez un jeune couple.",
    who: "Jean P.", role: "Fils unique, succession", city: "Versailles", img: EK_PHOTOS.detail, chiffre: "6 mois d'accompagnement" },
  { q: "Devis annoncé, devis tenu. La benne d'à côté nous proposait 1 200 €. Eux nous ont reversé 6 800 €. Et l'appartement a été rendu impeccable.",
    who: "Famille D.", role: "Succession ouverte", city: "Boulogne", img: EK_PHOTOS.window, chiffre: "+5 600 € vs débarras" },
  { q: "Paris-Lisbonne. Le déménageur me chiffrait 9 800 €. J'ai vendu un tiers de ce que je voulais transporter. J'ai payé 5 600 € et j'ai récupéré 3 100 €.",
    who: "Yann B.", role: "Expat. Lisbonne", city: "Paris 11ᵉ", img: EK_PHOTOS.livingroom, chiffre: "−42% transport" }];

  const [i, setI] = useStateEH(0);
  const next = () => setI((i + 1) % items.length);
  const prev = () => setI((i - 1 + items.length) % items.length);
  useEffectEH(() => {const t = setInterval(next, 8000);return () => clearInterval(t);});

  const cur = items[i];
  return (
    <section style={{ padding: '140px 0', background: 'var(--ivory)' }}>
      <div className="page">
        <EkSectionHeading
          eyebrow={`Témoignage ${String(i + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`}
          title={<>Vos lettres, <span className="italic" style={{ color: "rgb(231, 136, 44)", fontWeight: "500" }}>nos preuves</span></>}
          aside="Tous nos clients nous écrivent après. C'est notre meilleur indicateur." />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, marginTop: 64, alignItems: 'center' }}>
          <div className="photo" style={{ aspectRatio: '4/5' }}>
            <div className="img" key={cur.img} style={{ backgroundImage: `url(${cur.img})` }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%, rgba(13,22,38,.55) 100%)' }} />
            <div className="cap">{cur.who} · {cur.city}</div>
          </div>

          <div>
            <div style={{ position: 'relative' }} key={i}>
              <span style={{
                position: 'absolute', left: -12, top: -30,
                fontFamily: "'Instrument Serif',serif", fontWeight: 500,
                fontSize: 140, lineHeight: 1, opacity: .5, color: "rgb(231, 136, 44)"
              }}>"</span>
              <div style={{
                fontFamily: "'Instrument Serif',serif",
                fontSize: 'clamp(28px,3.2vw,46px)',
                lineHeight: 1.2,
                letterSpacing: '-0.005em',
                color: 'var(--ink)',
                position: 'relative'
              }}>{cur.q}</div>
            </div>
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 22 }}>{cur.who}</div>
                <div className="label" style={{ marginTop: 4 }}>{cur.role} · {cur.city}</div>
                <div className="chip" style={{ marginTop: 14, color: 'var(--terra)', borderColor: 'var(--terra)', background: 'rgba(198,106,74,.08)' }}>{cur.chiffre}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {items.map((_, k) =>
                  <button key={k} onClick={() => setI(k)} aria-label={`Témoignage ${k + 1}`}
                  style={{
                    width: k === i ? 28 : 8, height: 3, borderRadius: 99,
                    background: k === i ? 'var(--terra)' : 'rgba(28,34,48,.15)',
                    transition: 'all .3s ease'
                  }} />
                  )}
                </div>
                <button onClick={prev} className="btn btn-ghost" style={{ padding: '10px 14px' }} aria-label="Précédent"><EkIcon name="arrow-left" size={14} /></button>
                <button onClick={next} className="btn btn-ghost" style={{ padding: '10px 14px' }} aria-label="Suivant"><EkIcon name="arrow-right" size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ---------- PILLARS ----------
function EkPillars() {
  const pillars = [
  { n: "01", t: "Un pivot unique", d: "Une interlocutrice orchestre tous les prestataires. Vous n'avez qu'un numéro à appeler." },
  { n: "02", t: "Valorisation tracée", d: "Chaque objet chiffré, photographié, justifié. L'argent retourne à la famille." },
  { n: "03", t: "Éco et solidaire", d: "Certificats de don, kilos évités à la décharge, partenaires associatifs identifiés." },
  { n: "04", t: "Extranet client", d: "Photos, devis, factures, dons. Tout est consultable. Aucune contestation possible." }];

  return (
    <section style={{ padding: '120px 0', background: 'var(--ivory-2)', borderTop: '1px solid var(--line-light)', borderBottom: '1px solid var(--line-light)' }}>
      <div className="page">
        <EkSectionHeading
          eyebrow="Pourquoi nous, plutôt qu'un débarrasseur"
          title={<>Quatre <span className="italic" style={{ color: "rgb(231, 136, 44)", fontWeight: "500" }}>piliers</span> tenus.</>}
          aside="Face aux débarrasseurs, brocanteurs, sociétés de déménagement." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, marginTop: 56, borderTop: '1px solid var(--line-light)' }}>
          {pillars.map((p, i) =>
          <div key={i} style={{ padding: '40px 24px', borderRight: i < 3 ? '1px solid var(--line-light)' : 'none', borderBottom: '1px solid var(--line-light)' }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--terra)' }}>{p.n}</span>
              <h4 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 30, letterSpacing: '-0.01em', lineHeight: 1.05, marginTop: 12 }}>{p.t}</h4>
              <p style={{ color: 'var(--ink-soft)', marginTop: 10, fontSize: 15.5, lineHeight: 1.5 }}>{p.d}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------- ECO (full bleed night) ----------
function EkEco() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '140px 0', color: 'var(--ivory-text)' }} className="twilight-bg">
      <div className="page" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <span className="chip chip-dark" style={{ color: 'var(--terra-light)' }}><EkIcon name="leaf" size={12} /> Engagement éco-solidaire</span>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(48px,7vw,108px)', lineHeight: .95, letterSpacing: '-0.02em', marginTop: 24 }}>
              Rien ne se jette,<br /><span className="italic" style={{ color: 'var(--terra-light)' }}>tant qu'on prend le temps.</span>
            </h2>
            <p style={{ fontSize: 19, color: 'var(--ivory-mute)', maxWidth: '58ch', marginTop: 32 }}>
              Pour chaque mission, nous remettons un bilan d'impact. Poids des dons certifiés. Poids recyclé. Poids résiduel envoyé en déchèterie. Aucune ligne n'est cachée. Aucun objet n'est jeté sans avoir cherché preneur.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
            ["92%", "détourné de la décharge en moyenne"],
            ["23", "associations partenaires certifiées"],
            ["1×", "certificat remis par destination"],
            ["0", "objet jeté sans avoir cherché preneur"]].
            map(([n, l], i) =>
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, padding: '24px 0', alignItems: 'baseline', borderTop: '1px solid var(--line-dark)' }}>
                <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 54, color: 'var(--terra-light)', lineHeight: 1 }}>{n}</span>
                <span style={{ fontWeight: 500, color: 'var(--ivory-mute)', fontSize: 17, lineHeight: 1.4 }}>{l}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ---------- FAQ ----------
function EkFaqShort() {
  const qs = [
  { q: "Combien coûte une intervention ?", a: "Le diagnostic est gratuit. La mission est devisée en fonction du volume, du contexte et de la part valorisable. Nous reversons systématiquement la valeur nette des ventes." },
  { q: "Intervenez-vous hors Île-de-France ?", a: "Notre cœur d'activité reste l'Île-de-France. Pour le reste, nous étudions au cas par cas avec un déplacement facturé." },
  { q: "Comment fonctionne la valorisation ?", a: "Brocanteurs, dépôts-vente, ventes en ligne, ou associations bénéficiaires. Vous validez chaque destination, nous restituons les sommes." },
  { q: "Que devient ce qui n'a pas de valeur marchande ?", a: "Soit un don à une association partenaire (avec certificat), soit un recyclage filière. La décharge reste l'exception." },
  { q: "Le client peut-il être absent ?", a: "Oui. Vous validez à distance via l'extranet, à votre rythme. Photos, fiches, prix proposés, dons : tout vous est soumis avant exécution." }];

  const [open, setOpen] = useStateEH(0);
  return (
    <section style={{ padding: '140px 0', background: 'var(--ivory)' }}>
      <div className="page" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <EkSectionHeading
          eyebrow="Questions reçues"
          title={<>Cinq <span className="italic" style={{ color: 'var(--terra)' }}>réponses</span></>}
          aside="Pour la FAQ complète, voir le pied de page." />
        <div style={{ marginTop: 48, borderTop: '1px solid var(--line-light)' }}>
          {qs.map((it, i) =>
          <div key={i} style={{ borderBottom: '1px solid var(--line-light)' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '28px 0', textAlign: 'left', gap: 24 }}>
                <span style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
                  <span className="label" style={{ minWidth: 30 }}>0{i + 1}</span>
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(22px,2.2vw,30px)', letterSpacing: '-0.005em', lineHeight: 1.2, color: "rgb(231, 136, 44)" }}>{it.q}</span>
                </span>
                <span style={{
                width: 36, height: 36, borderRadius: '50%',
                background: open === i ? 'var(--terra)' : 'transparent',
                color: open === i ? 'var(--ivory)' : 'var(--ink)',
                border: `1px solid ${open === i ? 'var(--terra)' : 'var(--line-light)'}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .25s ease', flexShrink: 0
              }}>
                  <EkIcon name={open === i ? "minus" : "plus"} size={16} />
                </span>
              </button>
              {open === i &&
            <div style={{ paddingLeft: 54, paddingBottom: 28, paddingRight: 60, maxWidth: '70ch' }}>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.55 }}>{it.a}</p>
                </div>
            }
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------- FINAL CTA ----------
function EkFinalCta({ openContact }) {
  return (
    <section style={{ position: 'relative', padding: '160px 0', color: 'var(--ivory-text)', overflow: 'hidden' }} className="twilight-bg">
      <div className="page" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <span className="chip chip-dark" style={{ color: 'var(--terra-light)' }}>Diagnostic gratuit, 24h, sans engagement</span>
        <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(56px,9vw,168px)', lineHeight: .92, letterSpacing: '-0.03em', marginTop: 32 }}>
          Le passage commence<br />par <span className="italic" style={{ color: 'var(--terra-light)' }}>une conversation.</span>
        </h2>
        <p style={{ fontSize: 21, color: 'var(--ivory-mute)', maxWidth: '58ch', margin: '32px auto 0' }}>
          Nous nous déplaçons, nous écoutons, nous vous écrivons. Vous décidez à tête reposée.
        </p>
        <div style={{ marginTop: 48, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={openContact} className="btn btn-terra">
            Demander un diagnostic <EkIcon name="arrow-right" size={14} />
          </button>
          <a href="tel:+33145678910" className="btn btn-outline-light">
            <EkIcon name="phone" size={13} /> +33 1 45 67 89 10
          </a>
        </div>
      </div>
    </section>);

}

Object.assign(window, { EkHomePage });