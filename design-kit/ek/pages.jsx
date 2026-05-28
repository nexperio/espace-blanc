// Eklipsis — inside pages: Accompagnement, Méthode, Témoignages, Concept, Contact
const { useState: useStateEP, useEffect: useEffectEP } = React;

// ---------- ACCOMPAGNEMENT ----------
const EK_ACCOMP = {
  succession: {
    label: "Accompagnement 01",
    title: <>Une succession <span className="italic" style={{ color: 'var(--terra)' }}>à traverser</span></>,
    strap: "Trier sans se trahir. Valoriser sans se précipiter. Transmettre sans culpabiliser.",
    img: EK_PHOTOS.succession,
    pour: [
    "L'héritier unique surchargé qui n'a ni le temps, ni les nerfs.",
    "La fratrie éloignée qui doit décider sans se déchirer.",
    "Le notaire qui cherche un opérateur de confiance, traçable, assuré."],

    pourquoi: "Une maison de famille n'est jamais qu'un patrimoine financier. C'est un livre intime, des lettres oubliées, des bibelots qui ne disent leur prix qu'à ceux qui les ont touchés. Un débarras classique ne fait pas la différence. Nous, oui.",
    comment: [
    ["Visite à blanc", "Vous nous laissez les clés ou nous vous accompagnons. Inventaire émotionnel et estimatif, sans jugement."],
    ["Tri photographié", "Chaque objet d'intérêt est photographié, fiché, estimé. Vous validez à distance, à votre rythme."],
    ["Restitution privée", "Avant toute vente, nous vous proposons d'isoler ce qui doit revenir à la famille. Vous décidez."],
    ["Valorisation", "Brocanteurs, dépôts-vente, ventes en ligne, dons certifiés. Vous voyez la destination de chaque ligne."],
    ["Restitution finale", "Logement rendu vide et nettoyé. Sommes valorisées reversées. Bilan d'impact remis au notaire."]],

    chiffres: [["86 m²", "Surface moyenne traitée"], ["4 200 €", "Restitué en moyenne"], ["18 j", "Délai moyen porte à porte"]],
    temoignage: { q: "Mon père a vécu 51 ans dans le même appartement. J'avais peur du moment où il faudrait vider. Eklipsis l'a fait avec une délicatesse qui m'a bouleversée.", who: "Claire R.", role: "Fille unique, succession", city: "Paris 14ᵉ", img: EK_PHOTOS.archive },
    prix: { from: "À partir de 2 400 €", inclus: ["Diagnostic + devis 24h", "Tri photographié, extranet client", "Mise en vente et dons certifiés", "Logement rendu nu et propre", "Bilan d'impact détaillé"] }
  },
  senior: {
    label: "Accompagnement 02",
    title: <>Un proche part <span className="italic" style={{ color: 'var(--terra)' }}>en résidence</span></>,
    strap: "Choisir ce qui suit. Honorer ce qui reste. Donner ce qui peut servir.",
    img: EK_PHOTOS.senior,
    pour: [
    "Le sénior qui prépare sereinement son entrée en résidence.",
    "Les enfants qui veulent aider sans imposer.",
    "L'établissement qui demande une logistique douce et tracée."],

    pourquoi: "Ce qui suit en chambre tient en huit mètres carrés. Ce qui reste à la maison parle d'une vie entière. La benne en bas de l'immeuble est une violence. Notre travail est de l'éviter.",
    comment: [
    ["Conversation", "Ensemble, à la maison, autour d'un thé. Pas de cases à cocher."],
    ["Ce qui part en chambre", "Mesure, mise en boîte, transport, installation. Sur place avant l'arrivée."],
    ["Ce qui reste à la famille", "Photos, vidéo de présentation, partage simple aux proches."],
    ["Ce qui s'en va ailleurs", "Dons aux associations choisies, ventes au profit du foyer."],
    ["Le logement", "Rendu, restitué à la propriété ou aux héritiers. Net et clair."]],

    chiffres: [["68 m²", "Surface moyenne traitée"], ["8 m²", "Chambre en résidence installée"], ["3 mois", "Accompagnement post-installation"]],
    temoignage: { q: "Ils n'ont pas vidé. Ils ont préparé. Ma mère est arrivée en résidence avec sa lampe, son fauteuil, ses photos sur la commode. Elle s'est dit chez elle.", who: "Marc T.", role: "Fils, accompagnement EHPAD", city: "Neuilly", img: EK_PHOTOS.detail },
    prix: { from: "À partir de 1 800 €", inclus: ["Diagnostic + écoute approfondie", "Sélection chambre + installation", "Tri du reste, dons, ventes", "Visite post-installation à 1 mois", "Accompagnement administratif"] }
  },
  demenagement: {
    label: "Accompagnement 03",
    title: <>Un déménagement <span className="italic" style={{ color: 'var(--terra)' }}>à alléger</span></>,
    strap: "Garder l'essentiel. Vendre, donner, recycler le reste. En un tour de main.",
    img: EK_PHOTOS.demenagement,
    pour: [
    "L'expatrié pressé qui ne peut pas stocker quinze ans de meubles.",
    "Le couple qui se sépare et trie en commun, dans le calme.",
    "La famille qui veut alléger avant un saut de surface significatif."],

    pourquoi: "Un déménagement révèle ce qu'on porte sans plus le voir. Tout déplacer coûte cher, trois fois sur quatre c'est trop. Vendre ce qui peut l'être finance le reste. C'est mathématique et c'est humain.",
    comment: [
    ["Audit avant carton", "En 90 minutes, nous repérons ce qui mérite déplacement, vente, ou don."],
    ["Mise en vente express", "Vingt jours pour valoriser. Brocanteurs, dépôts-vente, en ligne."],
    ["Don aux associations", "Ce qui ne se vend pas mais reste utile : associations partenaires."],
    ["Coordination déménageur", "Nous nous parlons avec votre transporteur. Vous n'arbitrez plus."],
    ["Restitution financière", "Le produit net des ventes diminue votre facture de déménagement."]],

    chiffres: [["−42%", "Volume moyen évité au déménageur"], ["3 100 €", "Restitué en moyenne"], ["20 j", "Délai de mise en vente"]],
    temoignage: { q: "Paris-Lisbonne. Le déménageur me chiffrait 9 800 €. J'ai vendu un tiers de ce que je voulais transporter. J'ai payé 5 600 € et j'ai récupéré 3 100 €.", who: "Yann B.", role: "Expat. Lisbonne", city: "Paris 11ᵉ", img: EK_PHOTOS.window },
    prix: { from: "À partir de 1 200 €", inclus: ["Audit avant carton (90 min)", "Mise en vente sur 20 jours", "Dons certifiés", "Coordination déménageur", "Bilan financier transparent"] }
  }
};

function EkAccompagnementPage({ which, setView, openContact }) {
  const c = EK_ACCOMP[which];

  return (
    <div className="view">
      {/* Hero — split layout, light side and image side */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--ivory)' }}>
        <div className="page">
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '1px solid var(--line-light)', marginBottom: 60 }}>
            <span className="label">{c.label}</span>
            <span className="label">Île-de-France</span>
            <span className="label">Diagnostic gratuit</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'end' }}>
            <div>
              <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(56px,8vw,128px)', lineHeight: .92, letterSpacing: '-0.025em' }}>
                {c.title}
              </h1>
              <p style={{ fontSize: 21, color: 'var(--ink-soft)', fontWeight:500, marginTop: 32, maxWidth: '44ch' }}>{c.strap}</p>
              <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button onClick={openContact} className="btn btn-terra">Diagnostic gratuit <EkIcon name="arrow-right" size={13} /></button>
                <button onClick={() => setView('methode')} className="btn btn-ghost">Voir la méthode complète</button>
              </div>
            </div>
            <div className="photo" style={{ aspectRatio: '4/5' }}>
              <div className="img" style={{ backgroundImage: `url(${c.img})` }} />
              <div className="cap">{c.label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* pour qui + pourquoi */}
      <section style={{ padding: '100px 0', background: 'var(--ivory-2)', borderTop: '1px solid var(--line-light)', borderBottom: '1px solid var(--line-light)' }}>
        <div className="page">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <span className="label">Pour qui c'est conçu</span>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,4.5vw,68px)', lineHeight: 1, letterSpacing: '-0.015em', marginTop: 14 }}>
                À <span className="italic" style={{ color: 'var(--terra)' }}>vous trois.</span>
              </h2>
              <ul style={{ listStyle: 'none', marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {c.pour.map((p, i) =>
                <li key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 18, paddingTop: 18, borderTop: '1px solid var(--line-light)' }}>
                    <span style={{ fontFamily: "'Instrument Serif',serif", fontWeight:500, color: 'var(--terra)', fontSize: 24 }}>0{i + 1}</span>
                    <span style={{ fontSize: 17, lineHeight: 1.5, fontWeight:500 }}>{p}</span>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <span className="label">Pourquoi c'est difficile seul</span>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,4.5vw,68px)', lineHeight: 1, letterSpacing: '-0.015em', marginTop: 14 }}>
                Ce <span className="italic" style={{ color: 'var(--terra)' }}>qu'on ne dit pas.</span>
              </h2>
              <p style={{ fontSize: 19, lineHeight: 1.6, marginTop: 32, color: 'var(--ink)' }}>{c.pourquoi}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment on vous aide */}
      <section style={{ padding: '120px 0', background: 'var(--ivory)' }}>
        <div className="page">
          <EkSectionHeading
            eyebrow="Comment on vous aide"
            title={<>Cinq étapes <span className="italic" style={{ color: 'var(--terra)' }}>appliquées</span></>}
            aside="Notre méthode, dans votre situation précise." />

          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, borderTop: '1px solid var(--line-light)' }}>
            {c.comment.map((s, i) =>
            <div key={i} style={{ padding: '32px 24px', borderRight: i < 4 ? '1px solid var(--line-light)' : 'none' }}>
                <span style={{ fontFamily: "'Instrument Serif',serif", fontWeight:500, color: 'var(--terra)', fontSize: 54, lineHeight: 1, display: 'block', marginBottom: 16 }}>{String(i + 1).padStart(2, '0')}</span>
                <h4 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 24, letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: 8 }}>{s[0]}</h4>
                <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{s[1]}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* chiffres + témoignage */}
      <section style={{ padding: '120px 0', background: 'var(--ivory-2)', borderTop: '1px solid var(--line-light)', borderBottom: '1px solid var(--line-light)' }}>
        <div className="page">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="label">Cas-type observé</span>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,4.5vw,68px)', lineHeight: 1, marginTop: 14, letterSpacing: '-0.015em' }}>
                Le <span className="italic" style={{ color: 'var(--terra)' }}>cas-type.</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', marginTop: 32, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
                {c.chiffres.map(([v, l], i) =>
                <div key={i} style={{ padding: '28px 18px', borderRight: i < 2 ? '1px solid var(--line-light)' : 'none' }}>
                    <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(36px,3.8vw,56px)', lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
                    <div style={{ marginTop: 10, fontWeight:500, color: 'var(--ink-soft)', fontSize: 14 }}>{l}</div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ paddingLeft: 48, borderLeft: '1px solid var(--line-light)' }}>
              <span className="label" style={{ color: 'var(--terra)' }}>Lettre reçue</span>
              <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(22px,2.2vw,30px)', lineHeight: 1.3, marginTop: 14, letterSpacing: '-0.005em' }}>« {c.temoignage.q} »</div>
              <div style={{ marginTop: 24, display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', backgroundImage: `url(${c.temoignage.img})`, backgroundSize: 'cover' }} />
                <div>
                  <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 18 }}>{c.temoignage.who}</div>
                  <div className="label" style={{ marginTop: 2 }}>{c.temoignage.role} · {c.temoignage.city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* prix */}
      <section style={{ padding: '120px 0', background: 'var(--ivory)' }}>
        <div className="page">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }}>
            <div>
              <span className="label">Tarif indicatif</span>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1, marginTop: 14, letterSpacing: '-0.015em' }}>
                {c.prix.from},<br /><span className="italic" style={{ color: 'var(--terra)' }}>diagnostic compris.</span>
              </h2>
              <p style={{ fontWeight:500, color: 'var(--ink-soft)', marginTop: 20, maxWidth: '34ch', fontSize: 17 }}>
                Tarif net, sans frais cachés. Devis détaillé sous 24h après visite à blanc.
              </p>
              <button onClick={openContact} className="btn btn-terra" style={{ marginTop: 32 }}>Demander mon devis <EkIcon name="arrow-right" size={13} /></button>
            </div>
            <div>
              <span className="label">Ce qui est inclus</span>
              <ul style={{ listStyle: 'none', marginTop: 18 }}>
                {c.prix.inclus.map((it, i) =>
                <li key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 32px', gap: 14, padding: '18px 0', borderTop: i === 0 ? '1px solid var(--ink)' : '1px solid var(--line-light)' }}>
                    <span className="label">0{i + 1}</span>
                    <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 22, letterSpacing: '-0.005em' }}>{it}</span>
                    <span style={{ color: 'var(--terra)' }}><EkIcon name="check" size={20} /></span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '140px 0', color: 'var(--ivory-text)' }} className="twilight-bg">
        <div className="page" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(48px,7vw,120px)', lineHeight: .95, letterSpacing: '-0.025em' }}>
            On en parle <span className="italic" style={{ color: 'var(--terra-light)' }}>quand vous voulez.</span>
          </h2>
          <p style={{ fontSize: 19, color: 'var(--ivory-mute)', marginTop: 24, maxWidth: '52ch', margin: '24px auto 0' }}>
            Aucune obligation, aucune pression. Une conversation, un devis, et la liberté de dire non.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={openContact} className="btn btn-terra">Demander un diagnostic</button>
            <a href="tel:+33145678910" className="btn btn-outline-light"><EkIcon name="phone" size={13} /> +33 1 45 67 89 10</a>
          </div>
        </div>
      </section>
    </div>);

}

// ---------- MÉTHODE (full) ----------
function EkMethodePage({ openContact }) {
  const steps = [
  { t: "Le diagnostic", sub: "Sans engagement, sous 24h.",
    d: "Un appel d'abord, une visite ensuite. Nous écoutons davantage que nous parlons. Au sortir, un devis détaillé, ligne par ligne, qui n'engage que nous.",
    img: EK_PHOTOS.window, gar: "Devis garanti tenu, signé par nos soins." },
  { t: "Le tri", sub: "Pièce par pièce, à votre rythme.",
    d: "Avec ou sans vous. Chaque objet d'intérêt est photographié, fiché, estimé. Vous validez à distance, depuis l'extranet, à n'importe quelle heure.",
    img: EK_PHOTOS.archive, gar: "100% photographié. Rien ne part sans accord." },
  { t: "La valorisation", sub: "Brocanteurs, dépôts-vente, en ligne, dons.",
    d: "Pour chaque ligne, nous proposons la meilleure destination. Vous voyez le prix proposé, vous validez, nous exécutons. Les sommes vous reviennent.",
    img: EK_PHOTOS.detail, gar: "Prix de réserve respecté. Aucune commission cachée." },
  { t: "La restitution", sub: "Logement vide, propre, rendu.",
    d: "Le dernier jour, nous remettons les clés. Un bilan d'impact accompagne la facture : argent restitué, kilos sauvés, dons effectués, recyclage et résiduel.",
    img: EK_PHOTOS.empty, gar: "Logement nu et propre, photographié à la remise." }];


  return (
    <div className="view">
      <section style={{ paddingTop: 140, paddingBottom: 60, background: 'var(--ivory)' }}>
        <div className="page">
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '1px solid var(--line-light)', marginBottom: 48 }}>
            <span className="label">La méthode</span>
            <span className="label">Quatre temps</span>
            <span className="label">Une cadence</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(60px,9vw,156px)', lineHeight: .92, letterSpacing: '-0.025em' }}>
            Quatre temps,<br />une <span className="italic" style={{ color: 'var(--terra)' }}>cadence.</span>
          </h1>
          <p style={{ fontSize: 22, fontWeight:500, color: 'var(--ink-soft)', marginTop: 32, maxWidth: '50ch' }}>
            Le passage, écrit pas à pas. Aucun lot, aucune précipitation. Tout est noté, vérifiable, restituable.
          </p>
        </div>
      </section>

      {steps.map((s, i) =>
      <section key={i} style={{ padding: '80px 0', background: i % 2 ? 'var(--ivory-2)' : 'var(--ivory)', borderTop: '1px solid var(--line-light)' }}>
          <div className="page">
            <div style={{ display: 'grid', gridTemplateColumns: i % 2 ? '1fr 1fr' : '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div style={{ order: i % 2 ? 2 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontWeight:500, color: 'var(--terra)', fontSize: 120, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,5vw,68px)', letterSpacing: '-0.015em', lineHeight: 1 }}>{s.t}</h2>
                    <p style={{ fontWeight:500, color: 'var(--ink-soft)', fontSize: 19, marginTop: 6 }}>{s.sub}</p>
                  </div>
                </div>
                <p style={{ fontSize: 19, lineHeight: 1.6, marginTop: 32, maxWidth: '48ch' }}>{s.d}</p>
                <div style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 20px', border: '1px solid var(--terra)', borderRadius: 99, background: 'rgba(198,106,74,.08)', color: 'var(--terra)' }}>
                  <EkIcon name="shield" size={16} /> <span style={{ fontSize: 14, fontWeight:500 }}>{s.gar}</span>
                </div>
              </div>
              <div className="photo" style={{ order: i % 2 ? 1 : 2, aspectRatio: '4/5' }}>
                <div className="img" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="cap">Étape {String(i + 1).padStart(2, '0')} — {s.t}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '120px 0', background: 'var(--ivory)' }}>
        <div className="page">
          <EkSectionHeading
            eyebrow="Garanties"
            title={<>Ce que nous <span className="italic" style={{ color: 'var(--terra)' }}>vous devons</span></>}
            aside="Quatre engagements écrits, opposables." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, marginTop: 48, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
            {[
            ["Devis 24h", "Sans engagement. Avant toute visite payante."],
            ["RC pro", "Assurance professionnelle et transport, vérifiable."],
            ["RGPD", "Vos données chiffrées. Aucun usage commercial."],
            ["Tarif clair", "Pas de frais cachés. Pas de commission masquée."]].
            map(([t, d], i) =>
            <div key={i} style={{ padding: '36px 24px', borderRight: i < 3 ? '1px solid var(--line-light)' : 'none' }}>
                <span className="label" style={{ color: 'var(--terra)' }}>Garantie 0{i + 1}</span>
                <h4 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 26, marginTop: 10, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{t}</h4>
                <p style={{ color: 'var(--ink-soft)', marginTop: 8, fontSize: 15 }}>{d}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '140px 0', color: 'var(--ivory-text)' }} className="twilight-bg">
        <div className="page" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(48px,7vw,108px)', lineHeight: .95, letterSpacing: '-0.02em' }}>
            Voir si la méthode<br /><span className="italic" style={{ color: 'var(--terra-light)' }}>s'applique à vous.</span>
          </h2>
          <button onClick={openContact} className="btn btn-terra" style={{ marginTop: 40 }}>Diagnostic gratuit <EkIcon name="arrow-right" size={13} /></button>
        </div>
      </section>
    </div>);

}

// ---------- TÉMOIGNAGES ----------
function EkTemoignagesPage({ openContact }) {
  const cases = [
  { who: "Sophie L.", role: "Héritière, succession", city: "Paris 12ᵉ", img: EK_PHOTOS.portrait,
    q: "Ma mère partait en EHPAD. J'étais à 800 km. Eklipsis a tout géré, m'a rendu 4 200 €, et m'a évité 12 week-ends de pleurs et de cartons.", chiffre: "4 200 € restitués" },
  { who: "Jean P.", role: "Fils unique, succession", city: "Versailles", img: EK_PHOTOS.detail,
    q: "J'avais peur qu'on jette les lettres de mon père. Ils ont tout trié devant moi, sans jamais me presser. Le carnet est revenu chez moi.", chiffre: "6 mois d'accompagnement" },
  { who: "Famille D.", role: "Succession ouverte", city: "Boulogne", img: EK_PHOTOS.window,
    q: "Devis annoncé, devis tenu. La benne d'à côté nous proposait 1 200 €. Eux nous ont reversé 6 800 €.", chiffre: "+5 600 € vs débarras" },
  { who: "Béatrice M.", role: "Déménagement", city: "Nogent", img: EK_PHOTOS.archive,
    q: "On m'avait dit débarras. On a eu une rédactrice. La différence est tout.", chiffre: "92 m² traités" },
  { who: "Marc T.", role: "Maman en EHPAD", city: "Neuilly", img: EK_PHOTOS.hands,
    q: "Ils n'ont pas vidé. Ils ont préparé. Ma mère est arrivée avec sa lampe, son fauteuil, ses photos. Elle s'est dit chez elle.", chiffre: "Installation J-1" },
  { who: "Yann B.", role: "Expat. Lisbonne", city: "Paris 11ᵉ", img: EK_PHOTOS.livingroom,
    q: "Paris-Lisbonne. Le déménageur me chiffrait 9 800 €. J'ai vendu un tiers de ce que je voulais transporter. J'ai payé 5 600 € et j'ai récupéré 3 100 €.", chiffre: "−42% transport" }];


  return (
    <div className="view">
      <section style={{ paddingTop: 140, paddingBottom: 60, background: 'var(--ivory)' }}>
        <div className="page">
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '1px solid var(--line-light)', marginBottom: 48 }}>
            <span className="label">Témoignages & presse</span>
            <span className="label">Vingt-trois lettres</span>
            <span className="label">Quatre retombées presse</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(60px,9vw,156px)', lineHeight: .92, letterSpacing: '-0.025em' }}>
            Vos lettres,<br /><span className="italic" style={{ color: 'var(--terra)' }}>nos preuves.</span>
          </h1>
        </div>
      </section>

      <section style={{ padding: '80px 0 120px', background: 'var(--ivory)' }}>
        <div className="page">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
            {cases.map((c, i) =>
            <article key={i} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="photo" style={{ aspectRatio: '4/5' }}>
                  <div className="img" style={{ backgroundImage: `url(${c.img})` }} />
                  <div className="cap">{c.who} · {c.city}</div>
                </div>
                <div>
                  <span className="label">{c.role}</span>
                  <p style={{ fontFamily: "'Instrument Serif',serif", fontSize: 22, lineHeight: 1.3, marginTop: 8, letterSpacing: '-0.005em' }}>« {c.q} »</p>
                  <div className="chip" style={{ marginTop: 14, color: 'var(--terra)', borderColor: 'var(--terra)', background: 'rgba(198,106,74,.08)' }}>{c.chiffre}</div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'var(--ivory-2)', borderTop: '1px solid var(--line-light)', borderBottom: '1px solid var(--line-light)' }}>
        <div className="page">
          <EkSectionHeading
            eyebrow="Ils en parlent"
            title={<>Dans <span className="italic" style={{ color: 'var(--terra)' }}>la presse</span></>}
            aside="Quatre retombées identifiées depuis 2023." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, marginTop: 48, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
            {["Le Monde", "Télérama", "France Inter", "Stratégies"].map((m, i) =>
            <div key={i} style={{ padding: '48px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--line-light)' : 'none' }}>
                <div style={{ fontFamily: "'Instrument Serif',serif", fontWeight:500, fontSize: 34, letterSpacing: '-0.005em' }}>{m}</div>
                <div className="label" style={{ marginTop: 10 }}>Article 2024</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'var(--ivory)', textAlign: 'center' }}>
        <div className="page">
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1, letterSpacing: '-0.015em' }}>
            Devenir notre 24<sup>e</sup> <span className="italic" style={{ color: 'var(--terra)' }}>témoignage.</span>
          </h2>
          <button onClick={openContact} className="btn btn-terra" style={{ marginTop: 32 }}>Demander un diagnostic <EkIcon name="arrow-right" size={13} /></button>
        </div>
      </section>
    </div>);

}

// ---------- CONCEPT ----------
function EkConceptPage({ openContact }) {
  return (
    <div className="view">
      <section style={{ paddingTop: 140, paddingBottom: 60, background: 'var(--ivory)' }}>
        <div className="page">
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '1px solid var(--line-light)', marginBottom: 48 }}>
            <span className="label">Le concept</span>
            <span className="label">Eklipsis = éclipse</span>
            <span className="label">La lumière qui revient</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(60px,9vw,156px)', lineHeight: .92, letterSpacing: '-0.025em' }}>
            Eklipsis,<br /><span className="italic" style={{ color: 'var(--terra)' }}>le passage.</span>
          </h1>
          <p style={{ fontWeight:500, fontSize: 22, color: 'var(--ink-soft)', marginTop: 32, maxWidth: '54ch' }}>
            L'éclipse n'est pas l'absence de lumière. C'est le moment où elle se dérobe, puis revient. Notre nom dit l'instant où l'on traverse, et la clarté retrouvée juste après.
          </p>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'var(--ivory)' }}>
        <div className="page">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }}>
            <div className="photo" style={{ aspectRatio: '3/4' }}>
              <div className="img" style={{ backgroundImage: `url(${EK_PHOTOS.portrait})` }} />
              <div className="cap">Adèle M. · Fondatrice</div>
            </div>
            <div>
              <span className="label">Portrait</span>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1.05, letterSpacing: '-0.015em', marginTop: 14 }}>
                Une seule <span className="italic" style={{ color: 'var(--terra)' }}>interlocutrice.</span>
              </h2>
              <div style={{ marginTop: 32, fontSize: 18, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: '58ch' }}>
                <p><span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 64, float: 'left', lineHeight: .85, color: 'var(--terra)', paddingRight: 14, paddingTop: 6 }}>J</span>'ai vidé l'appartement de ma grand-mère en 2019. Je n'y connaissais rien. Personne ne m'avait dit que vider, ce n'est pas démonter. Que les objets racontent, qu'il faut les écouter avant de leur trouver une suite. Que la lenteur protège.</p>
                <p>Trois ans plus tard, Eklipsis est né. Une équipe restreinte. Des prestataires de confiance. Un seul numéro à appeler. Et la conviction que ce métier est tout sauf une logistique.</p>
                <p>Nous accompagnons aujourd'hui une dizaine de familles par mois. Aucune ne se ressemble. Toutes nous écrivent après. C'est notre meilleur indicateur.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'var(--ivory-2)', borderTop: '1px solid var(--line-light)', borderBottom: '1px solid var(--line-light)' }}>
        <div className="page">
          <EkSectionHeading
            eyebrow="Vocabulaire"
            title={<>Les mots <span className="italic" style={{ color: 'var(--terra)' }}>que nous tenons</span></>}
            aside="Et ceux que nous n'employons pas." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 48 }}>
            <div>
              <span className="label" style={{ color: 'var(--terra)' }}>Mots oui</span>
              <div style={{ marginTop: 18, fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight:500, lineHeight: 1.35, letterSpacing: '-0.005em' }}>
                passage · allègement · valoriser · transmettre · soigner · mesurer · respecter · soulager · restituer.
              </div>
            </div>
            <div>
              <span className="label">Mots non</span>
              <div style={{ marginTop: 18, fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight:500, lineHeight: 1.35, color: 'var(--ink-mute)', textDecoration: 'line-through', textDecorationColor: 'var(--terra)', textDecorationThickness: '1px' }}>
                débarras · vide-grenier · ramassage · lot · encombrant · enlèvement.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '140px 0', color: 'var(--ivory-text)' }} className="twilight-bg">
        <div className="page" style={{ textAlign: 'center' }}>
          <button onClick={openContact} className="btn btn-terra">Échanger avec Adèle <EkIcon name="arrow-right" size={13} /></button>
        </div>
      </section>
    </div>);

}

// ---------- CONTACT — Multi-step ----------
function EkContactPage() {
  const STEPS = ["Situation", "Logement", "Délai", "Vous", "Récapitulatif"];
  const [step, setStep] = useStateEP(0);
  const [data, setData] = useStateEP({
    situation: "", surface: "", localisation: "", delai: "", message: "",
    nom: "", email: "", tel: ""
  });
  const set = (k) => (v) => setData((d) => ({ ...d, [k]: typeof v === 'string' ? v : v.target.value }));
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const [sent, setSent] = useStateEP(false);

  return (
    <div className="view">
      <section style={{ paddingTop: 140, paddingBottom: 60, background: 'var(--ivory)' }}>
        <div className="page">
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '1px solid var(--line-light)', marginBottom: 60 }}>
            <span className="label">Diagnostic gratuit</span>
            <span className="label">5 minutes</span>
            <span className="label">Rappel sous 24h</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(56px,8vw,132px)', lineHeight: .95, letterSpacing: '-0.025em' }}>
              On commence par <span className="italic" style={{ color: "rgb(231, 136, 44)", fontWeight: "500" }}>vous écouter.</span>
            </h1>
            <p style={{ fontWeight:500, fontSize: 19, color: 'var(--ink-soft)', maxWidth: '42ch' }}>
              Cinq minutes pour cadrer votre situation. Une conseillère vous rappelle sous 24h, avec un premier devis indicatif. Aucune obligation.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0 140px', background: 'var(--ivory)' }}>
        <div className="page" style={{ maxWidth: 880, margin: '0 auto' }}>
          {sent ?
          <div style={{ padding: '100px 32px', textAlign: 'center', background: 'var(--ivory-2)', borderRadius: 16, border: '1px solid var(--line-light)' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--terra)', color: 'var(--ivory)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <EkIcon name="check" size={32} />
              </div>
              <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(40px,5vw,64px)', letterSpacing: '-0.015em' }}>Reçu, {data.nom || 'merci'}</h3>
              <p style={{ fontWeight:500, color: 'var(--ink-soft)', fontSize: 18, marginTop: 14, maxWidth: '48ch', margin: '14px auto 0' }}>
                Une conseillère vous rappelle sous 24h ouvrées au {data.tel || '…'} ou par courriel.
              </p>
              <p className="label" style={{ marginTop: 32 }}>Référence dossier · EK-2026-{String(Math.floor(Math.random() * 899) + 100)}</p>
            </div> :

          <div>
              <div className="progress">
                {STEPS.map((_, i) => <span key={i} className={i < step ? 'done' : i === step ? 'current' : ''} />)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48 }}>
                <span className="label" style={{ color: 'var(--terra)' }}>Étape {step + 1}/{STEPS.length} · {STEPS[step]}</span>
                <span className="label">Aucune donnée enregistrée tant que vous n'envoyez pas</span>
              </div>

              {step === 0 &&
            <EkStep title={<>Quelle est votre <span className="italic" style={{ color: 'var(--terra)' }}>situation ?</span></>}>
                  <EkRadios value={data.situation} onChange={set('situation')} name="sit" options={[
              { v: 'succession', l: "Une succession à organiser" },
              { v: 'senior', l: "Un proche part en résidence senior" },
              { v: 'demenagement', l: "Je déménage et je veux alléger" },
              { v: 'autre', l: "Une autre situation, je vous explique" }]
              } />
                </EkStep>
            }
              {step === 1 &&
            <EkStep title={<>Le logement <span className="italic" style={{ color: 'var(--terra)' }}>à traiter</span></>}>
                  <div className="field">
                    <label>Surface approximative</label>
                    <select value={data.surface} onChange={set('surface')}>
                      <option value="">— Choisir —</option>
                      <option>Moins de 40 m²</option>
                      <option>40 à 70 m²</option>
                      <option>70 à 100 m²</option>
                      <option>100 à 150 m²</option>
                      <option>Plus de 150 m²</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Localisation (ville ou arrondissement)</label>
                    <input value={data.localisation} onChange={set('localisation')} placeholder="Ex. Paris 14ᵉ, Versailles…" />
                  </div>
                  <div className="field">
                    <label>Quelque chose à savoir ?</label>
                    <textarea rows={3} value={data.message} onChange={set('message')} placeholder="Étage sans ascenseur, accès, contraintes émotionnelles…" />
                  </div>
                </EkStep>
            }
              {step === 2 &&
            <EkStep title={<>Votre <span className="italic" style={{ color: 'var(--terra)' }}>échéance</span></>}>
                  <EkRadios value={data.delai} onChange={set('delai')} name="del" options={[
              { v: 'urgent', l: "Dans les deux prochaines semaines" },
              { v: 'mois', l: "Dans le mois qui vient" },
              { v: 'trimestre', l: "Sur le prochain trimestre" },
              { v: 'flou', l: "Je n'ai pas encore de date précise" }]
              } />
                </EkStep>
            }
              {step === 3 &&
            <EkStep title={<>Comment <span className="italic" style={{ color: 'var(--terra)' }}>vous joindre ?</span></>}>
                  <div className="field"><label>Nom et prénom</label><input value={data.nom} onChange={set('nom')} placeholder="Sophie Lefèvre" /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div className="field"><label>Adresse e-mail</label><input type="email" value={data.email} onChange={set('email')} placeholder="vous@exemple.fr" /></div>
                    <div className="field"><label>Téléphone</label><input type="tel" value={data.tel} onChange={set('tel')} placeholder="06 12 34 56 78" /></div>
                  </div>
                </EkStep>
            }
              {step === 4 &&
            <EkStep title={<>Tout est <span className="italic" style={{ color: 'var(--terra)' }}>noté</span></>}>
                  <div style={{ borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
                    {[
                ["Situation", data.situation || '—'],
                ["Surface", data.surface || '—'],
                ["Localisation", data.localisation || '—'],
                ["Délai", data.delai || '—'],
                ["Joindre", `${data.nom || '—'} · ${data.email || '—'} · ${data.tel || '—'}`],
                ["Note", data.message || '—']].
                map(([k, v], i) =>
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, padding: '18px 0', borderBottom: i < 5 ? '1px solid var(--line-light)' : 'none' }}>
                        <span className="label">{k}</span>
                        <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 19, fontWeight:500, letterSpacing: '-0.005em' }}>{v}</span>
                      </div>
                )}
                  </div>
                  <p style={{ fontWeight:500, color: 'var(--ink-soft)', fontSize: 14, marginTop: 24 }}>
                    En envoyant, vous acceptez que nous vous rappelions sous 24h. Aucune autre donnée ne sera collectée.
                  </p>
                </EkStep>
            }

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, gap: 16 }}>
                <button onClick={prev} className="btn btn-ghost" style={{ opacity: step === 0 ? .3 : 1, pointerEvents: step === 0 ? 'none' : 'auto' }}>
                  <EkIcon name="arrow-left" size={13} /> Retour
                </button>
                {step < STEPS.length - 1 ?
              <button onClick={next} className="btn btn-terra">Continuer <EkIcon name="arrow-right" size={13} /></button> :

              <button onClick={() => setSent(true)} className="btn btn-terra">Envoyer le diagnostic <EkIcon name="arrow-right" size={13} /></button>
              }
              </div>
            </div>
          }
        </div>
      </section>
    </div>);

}

function EkStep({ title, children }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(38px,4.5vw,60px)', letterSpacing: '-0.015em', lineHeight: 1, marginBottom: 40 }}>{title}</h2>
      <div>{children}</div>
    </div>);

}

function EkRadios({ name, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {options.map((o, i) => {
        const active = value === o.v;
        return (
          <label key={o.v} style={{
            display: 'grid', gridTemplateColumns: '40px 1fr 28px', gap: 18,
            padding: '22px 8px',
            borderTop: i === 0 ? '1px solid var(--ink)' : '1px solid var(--line-light)',
            borderBottom: i === options.length - 1 ? '1px solid var(--ink)' : 'none',
            cursor: 'pointer', background: active ? 'rgba(198,106,74,.06)' : 'transparent',
            transition: 'background .2s ease'
          }}>
            <span className="label" style={{ color: active ? 'var(--terra)' : 'var(--ink-soft)' }}>0{i + 1}</span>
            <span style={{
              fontFamily: "'Instrument Serif',serif", fontSize: 22, letterSpacing: '-0.005em',
              fontWeight: active ? '600' : '400',
              color: active ? 'var(--terra)' : 'var(--ink)'
            }}>{o.l}</span>
            <span style={{
              width: 22, height: 22, borderRadius: '50%',
              border: `1px solid ${active ? 'var(--terra)' : 'var(--ink)'}`,
              background: active ? 'var(--terra)' : 'transparent',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {active && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ivory)' }} />}
            </span>
            <input type="radio" name={name} checked={active} onChange={() => onChange(o.v)} style={{ display: 'none' }} />
          </label>);

      })}
    </div>);

}

Object.assign(window, { EkAccompagnementPage, EkMethodePage, EkTemoignagesPage, EkConceptPage, EkContactPage });