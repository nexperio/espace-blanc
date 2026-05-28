// Espace Blanc — inside pages: Accompagnements, Méthode, Témoignages, Concept, Contact (diagnostic form)
const { useState: useStateP, useEffect: useEffectP } = React;

// ---------- ACCOMPAGNEMENT (generic template, declined 3 ways) ----------
const ACCOMP_CONFIG = {
  succession: {
    label: "Cahier I · Succession",
    title: <>Une succession <span className="italic" style={{color:'var(--accent)'}}>à traverser</span></>,
    strap: "Trier sans se trahir. Valoriser sans se précipiter. Transmettre sans culpabiliser.",
    pour: [
      "L'héritier unique surchargé qui n'a ni le temps, ni les nerfs.",
      "La fratrie éloignée qui doit décider sans se déchirer.",
      "Le notaire qui cherche un opérateur de confiance, traçable, assuré.",
    ],
    pourquoi: "Une maison de famille n'est jamais qu'un patrimoine financier. C'est un livre intime, des lettres oubliées, des bibelots qui ne disent leur prix qu'à ceux qui les ont touchés. Un débarras classique ne fait pas la différence. Nous, oui.",
    comment: [
      ["Visite à blanc","Vous nous laissez les clés ou nous vous accompagnons. Inventaire émotionnel et estimatif, sans jugement."],
      ["Tri photographié","Chaque objet d'intérêt est photographié, fiché, estimé. Vous validez à distance, à votre rythme."],
      ["Restitution privée","Avant toute vente, nous vous proposons d'isoler ce qui doit revenir à la famille. Vous décidez."],
      ["Valorisation","Brocanteurs, dépôts-vente, ventes en ligne, dons certifiés. Vous voyez la destination de chaque ligne."],
      ["Restitution finale","Logement rendu vide et nettoyé. Sommes valorisées reversées. Bilan d'impact remis au notaire."],
    ],
    chiffres: [
      ["86 m²","Surface moyenne traitée"],
      ["4 200 €","Restitué en moyenne"],
      ["18 j","Délai moyen porte à porte"],
    ],
    temoignage: {
      q:"Mon père a vécu 51 ans dans le même appartement. J'avais peur du moment où il faudrait vider. Espace Blanc l'a fait avec une délicatesse qui m'a bouleversée.",
      who:"Claire R.", role:"Fille unique, succession", city:"Paris 14ᵉ", img: PHOTOS.archive,
    },
    prix: { from:"À partir de 2 400 €", inclus:[
      "Diagnostic + devis 24h",
      "Tri photographié, extranet client",
      "Mise en vente et dons certifiés",
      "Logement rendu nu et propre",
      "Bilan d'impact détaillé",
    ]},
    image: PHOTOS.hero,
    caption:"Fig. 02 — Bibliothèque, succession Dr. R., Paris 6ᵉ.",
  },
  senior: {
    label: "Cahier II · Sénior",
    title: <>Un proche part <span className="italic" style={{color:'var(--accent)'}}>en résidence</span></>,
    strap: "Choisir ce qui suit. Honorer ce qui reste. Donner ce qui peut servir.",
    pour: [
      "Le sénior qui prépare sereinement son entrée en résidence.",
      "Les enfants qui veulent aider sans imposer.",
      "L'EHPAD ou l'établissement qui demande une logistique douce et tracée.",
    ],
    pourquoi: "Ce qui suit en chambre tient en huit mètres carrés. Ce qui reste à la maison parle d'une vie entière. La benne en bas de l'immeuble est une violence. Notre travail est de l'éviter.",
    comment: [
      ["Conversation","Ensemble, à la maison, autour d'un thé. Pas de cases à cocher. Ce qui compte d'abord."],
      ["Ce qui part en chambre","Mesure, mise en boîte, transport, installation. Sur place avant l'arrivée."],
      ["Ce qui reste à la famille","Photos, vidéo de présentation, partage simple aux proches."],
      ["Ce qui s'en va ailleurs","Dons aux associations choisies, ventes au profit du foyer."],
      ["Le logement","Rendu, restitué à la propriété ou aux héritiers. Net et clair."],
    ],
    chiffres: [
      ["68 m²","Surface moyenne traitée"],
      ["8 m²","Chambre en résidence installée"],
      ["3 mois","Accompagnement après installation"],
    ],
    temoignage: {
      q:"Ils n'ont pas vidé. Ils ont préparé. Ma mère est arrivée en résidence avec sa lampe, son fauteuil, ses photos sur la commode. Elle s'est dit chez elle.",
      who:"Marc T.", role:"Fils, accompagnement EHPAD", city:"Neuilly", img: PHOTOS.detail,
    },
    prix: { from:"À partir de 1 800 €", inclus:[
      "Diagnostic + écoute approfondie",
      "Sélection chambre + installation",
      "Tri du reste, dons, ventes",
      "Visite post-installation à 1 mois",
      "Accompagnement administratif",
    ]},
    image: PHOTOS.senior,
    caption:"Fig. 03 — Chambre installée, résidence Le Petit Bois.",
  },
  demenagement: {
    label: "Cahier III · Déménagement",
    title: <>Un déménagement <span className="italic" style={{color:'var(--accent)'}}>à alléger</span></>,
    strap: "Garder l'essentiel. Vendre, donner, recycler le reste. En un tour de main.",
    pour: [
      "L'expatrié pressé qui ne peut pas stocker quinze ans de meubles.",
      "Le couple qui se sépare et trie en commun, dans le calme.",
      "La famille qui veut alléger avant un saut de surface significatif.",
    ],
    pourquoi: "Un déménagement révèle ce qu'on porte sans plus le voir. Tout déplacer coûte cher, trois fois sur quatre c'est trop. Vendre ce qui peut l'être finance le reste. C'est mathématique et c'est humain.",
    comment: [
      ["Audit avant carton","En 90 minutes, nous repérons ce qui mérite déplacement, vente, ou don."],
      ["Mise en vente express","Vingt jours pour valoriser. Brocanteurs, dépôts-vente, en ligne."],
      ["Don aux associations","Ce qui ne se vend pas mais reste utile : associations partenaires."],
      ["Coordination déménageur","Nous nous parlons avec votre transporteur. Vous n'arbitrez plus."],
      ["Restitution financière","Le produit net des ventes vient diminuer votre facture de déménagement."],
    ],
    chiffres: [
      ["−42%","Volume moyen évité au déménageur"],
      ["3 100 €","Restitué en moyenne"],
      ["20 j","Délai de mise en vente"],
    ],
    temoignage: {
      q:"Paris-Lisbonne. Le déménageur me chiffrait 9 800 €. J'ai vendu un tiers de ce que je voulais transporter. J'ai payé 5 600 € et j'ai récupéré 3 100 €.",
      who:"Yann B.", role:"Expat. Lisbonne", city:"Paris 11ᵉ", img: PHOTOS.window,
    },
    prix: { from:"À partir de 1 200 €", inclus:[
      "Audit avant carton (90 min)",
      "Mise en vente sur 20 jours",
      "Dons certifiés",
      "Coordination déménageur",
      "Bilan financier transparent",
    ]},
    image: PHOTOS.demenagement,
    caption:"Fig. 04 — Déménagement Paris → Lisbonne, 92 m².",
  },
};

function AccompagnementPage({ which, setView, openContact }) {
  const c = ACCOMP_CONFIG[which];

  return (
    <div className="view">
      {/* hero specific */}
      <section style={{padding:'40px 0 60px',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)',padding:'12px 0',marginBottom:48}}>
            <span className="label">{c.label}</span>
            <span className="label">Pages 04–07</span>
            <span className="label">Lecture 6 min</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'end'}}>
            <div>
              <h1 style={{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:'clamp(48px,6vw,96px)',lineHeight:0.95,letterSpacing:'-0.02em'}}>
                {c.title}
              </h1>
              <p className="italic" style={{fontSize:21,color:'var(--ink-soft)',marginTop:24,maxWidth:'40ch'}}>{c.strap}</p>
              <div style={{marginTop:32,display:'flex',gap:14,flexWrap:'wrap'}}>
                <button className="btn" onClick={openContact}>Diagnostic gratuit <Icon name="arrow-right" size={12}/></button>
                <button className="btn-link" onClick={() => setView('methode')}>Voir la méthode complète</button>
              </div>
            </div>
            <figure className="figure">
              <div className="img" style={{backgroundImage:`url(${c.image})`,aspectRatio:'4/5'}}/>
              <figcaption><span>{c.caption}</span><span>Photo · A. M.</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Pour qui — Pourquoi c'est difficile seul */}
      <section style={{padding:'72px 0'}}>
        <div className="page">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48}}>
            <div>
              <SectionHeading
                eyebrow="Pour qui c'est conçu"
                title={<>À <span className="italic" style={{color:'var(--accent)'}}>vous trois</span></>}
                aside="Le bon profil, identifié sans détour."/>
              <ul style={{listStyle:'none',marginTop:32,display:'flex',flexDirection:'column',gap:18}}>
                {c.pour.map((p,i) => (
                  <li key={i} style={{display:'grid',gridTemplateColumns:'40px 1fr',gap:14,paddingTop:18,borderTop:'1px solid var(--ruled)'}}>
                    <span className="label">0{i+1}</span>
                    <span className="italic" style={{fontSize:18,color:'var(--ink)'}}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading
                eyebrow="Pourquoi c'est difficile seul"
                title={<>Ce <span className="italic" style={{color:'var(--accent)'}}>qu'on ne dit pas</span></>}
                aside="Plus qu'une logistique. Une question d'attention."/>
              <p className="drop-cap" style={{marginTop:32,fontSize:19,lineHeight:1.55}}>{c.pourquoi}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment — appliqué */}
      <section style={{padding:'72px 0',background:'var(--paper-2)',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <SectionHeading
            eyebrow="Comment on vous aide"
            title={<>Cinq étapes <span className="italic" style={{color:'var(--accent)'}}>appliquées</span></>}
            aside="Notre méthode, dans votre situation précise."/>
          <ol className="steps" style={{marginTop:40}}>
            {c.comment.map((s,i) => (
              <li key={i}>
                <div></div>
                <div>
                  <h3 style={{fontSize:28,fontWeight:500,marginBottom:6,letterSpacing:'-0.005em'}}>{s[0]}</h3>
                  <p className="italic" style={{color:'var(--ink-soft)',fontSize:17,maxWidth:'62ch'}}>{s[1]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* exemple chiffré + témoignage */}
      <section style={{padding:'72px 0'}}>
        <div className="page">
          <div style={{display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:48}}>
            <div>
              <SectionHeading
                eyebrow="Un cas anonymisé"
                title={<>Le <span className="italic" style={{color:'var(--accent)'}}>cas-type</span></>}
                aside="Chiffres moyens, observés sur l'année écoulée."/>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:0,marginTop:32,borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
                {c.chiffres.map(([v,l],i) => (
                  <div key={i} style={{padding:'24px 18px',borderRight: i<2 ? '1px solid var(--ruled)' : 'none'}}>
                    <div style={{fontFamily:"'Newsreader',serif",fontSize:48,fontWeight:400,letterSpacing:'-0.02em',lineHeight:1}}>{v}</div>
                    <div className="italic" style={{color:'var(--ink-soft)',marginTop:8,fontSize:14}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{borderLeft:'1px solid var(--ruled)',paddingLeft:32}}>
              <span className="label">Lettre reçue</span>
              <div className="italic" style={{fontSize:22,lineHeight:1.4,marginTop:14}}>« {c.temoignage.q} »</div>
              <div style={{marginTop:20,display:'flex',gap:14,alignItems:'center'}}>
                <div style={{width:50,height:50,borderRadius:'50%',backgroundImage:`url(${c.temoignage.img})`,backgroundSize:'cover'}}/>
                <div>
                  <div style={{fontFamily:"'Newsreader',serif",fontSize:17,fontWeight:500}}>{c.temoignage.who}</div>
                  <div className="label">{c.temoignage.role} · {c.temoignage.city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* prix */}
      <section style={{padding:'72px 0',background:'var(--paper-2)',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:48,alignItems:'start'}}>
            <div>
              <span className="label">Indicatif</span>
              <h2 style={{fontFamily:"'Newsreader',serif",fontSize:'clamp(36px,4.5vw,64px)',lineHeight:1,marginTop:12,fontWeight:400,letterSpacing:'-0.015em'}}>
                {c.prix.from}<br/><span className="italic" style={{color:'var(--accent)'}}>diagnostic compris.</span>
              </h2>
              <p className="italic" style={{color:'var(--ink-soft)',marginTop:18,maxWidth:'34ch'}}>
                Tarif net, sans frais cachés. Devis sous 24h après visite à blanc.
              </p>
            </div>
            <div>
              <span className="label">Ce qui est inclus</span>
              <ul style={{listStyle:'none',marginTop:18,display:'flex',flexDirection:'column'}}>
                {c.prix.inclus.map((it,i) => (
                  <li key={i} style={{display:'grid',gridTemplateColumns:'30px 1fr 30px',gap:14,padding:'16px 0',borderTop: i===0?'1px solid var(--ink)':'1px solid var(--ruled)'}}>
                    <span className="label">0{i+1}</span>
                    <span style={{fontFamily:"'Newsreader',serif",fontSize:19}}>{it}</span>
                    <span style={{color:'var(--accent)'}}><Icon name="check" size={18}/></span>
                  </li>
                ))}
              </ul>
              <button className="btn" onClick={openContact} style={{marginTop:24}}>Demander mon devis <Icon name="arrow-right" size={12}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{padding:'100px 0',textAlign:'center'}}>
        <div className="page">
          <h2 style={{fontFamily:"'Newsreader',serif",fontSize:'clamp(40px,6vw,84px)',fontWeight:400,letterSpacing:'-0.02em',lineHeight:1}}>
            On en parle <span className="italic" style={{color:'var(--accent)'}}>quand vous voulez.</span>
          </h2>
          <p className="italic" style={{fontSize:19,color:'var(--ink-soft)',marginTop:18,maxWidth:'50ch',margin:'18px auto 0'}}>
            Aucune obligation, aucune pression. Une conversation, un devis, et la liberté de dire non.
          </p>
          <div style={{marginTop:30,display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn" onClick={openContact}>Demander un diagnostic gratuit</button>
            <a className="btn-ghost btn" href="tel:+33145678910"><Icon name="phone" size={12}/> +33 1 45 67 89 10</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- MÉTHODE (full) ----------
function MethodePage({ setView, openContact }) {
  const steps = [
    { t:"Le diagnostic", sub:"Sans engagement, sous 24h.",
      d:"Un appel d'abord, une visite ensuite. Nous écoutons davantage que nous parlons. Au sortir : un devis détaillé, ligne par ligne, qui n'engage que nous.",
      img: PHOTOS.window,
      garantie:"Devis garanti tenu, signé par nos soins." },
    { t:"Le tri", sub:"Pièce par pièce, à votre rythme.",
      d:"Avec ou sans vous. Chaque objet d'intérêt est photographié, fiché, estimé. Vous validez à distance, depuis l'extranet, à n'importe quelle heure.",
      img: PHOTOS.archive,
      garantie:"100% photographié. Rien ne part sans accord." },
    { t:"La valorisation", sub:"Brocanteurs, dépôts-vente, ventes en ligne, dons.",
      d:"Pour chaque ligne, nous proposons la meilleure destination. Vous voyez le prix proposé, vous validez, nous exécutons. Les sommes vous reviennent.",
      img: PHOTOS.detail,
      garantie:"Prix de réserve respecté. Aucune commission cachée." },
    { t:"La restitution", sub:"Logement vide, propre, rendu.",
      d:"Le dernier jour, nous remettons les clés. Un bilan d'impact accompagne la facture : argent restitué, kilos sauvés, dons effectués, recyclage et résiduel.",
      img: PHOTOS.empty,
      garantie:"Logement nu et propre, photographié à la remise." },
  ];

  return (
    <div className="view">
      <section style={{padding:'40px 0 40px',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)',padding:'12px 0',marginBottom:48}}>
            <span className="label">Cahier III · La méthode</span>
            <span className="label">Pages 08–11</span>
            <span className="label">Lecture 7 min</span>
          </div>
          <h1 style={{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:'clamp(56px,8vw,124px)',lineHeight:0.92,letterSpacing:'-0.025em',maxWidth:'14ch'}}>
            Quatre temps,<br/>une <span className="italic" style={{color:'var(--accent)'}}>cadence.</span>
          </h1>
          <p className="italic" style={{fontSize:21,color:'var(--ink-soft)',marginTop:24,maxWidth:'52ch'}}>
            Le passage, écrit pas à pas. Aucun lot, aucune précipitation. Tout est noté, vérifiable, restituable.
          </p>
        </div>
      </section>

      {steps.map((s,i) => (
        <section key={i} style={{padding:'80px 0',background: i%2 ? 'var(--paper-2)':'transparent',borderBottom:'1px solid var(--ink)'}}>
          <div className="page">
            <div style={{display:'grid',gridTemplateColumns: i%2 ? '1fr 1.1fr' : '1.1fr 1fr',gap:56,alignItems:'center'}}>
              <div style={{order: i%2 ? 2 : 1}}>
                <div style={{fontFamily:"'Newsreader',serif",fontWeight:600,fontSize:88,color:'var(--accent)',lineHeight:1}}>0{i+1}.</div>
                <h2 style={{fontFamily:"'Newsreader',serif",fontSize:'clamp(40px,5vw,72px)',fontWeight:500,letterSpacing:'-0.02em',lineHeight:1,marginTop:12}}>
                  {s.t}
                </h2>
                <p className="italic" style={{fontSize:19,color:'var(--ink-soft)',marginTop:8}}>{s.sub}</p>
                <p style={{fontSize:18,lineHeight:1.6,marginTop:24,maxWidth:'48ch'}}>{s.d}</p>
                <div style={{marginTop:24,padding:'14px 18px',border:'1px solid var(--ink)',background:'var(--paper)',display:'inline-flex',alignItems:'center',gap:12}}>
                  <Icon name="shield" size={18}/>
                  <span className="italic" style={{fontSize:15}}>{s.garantie}</span>
                </div>
              </div>
              <figure className="figure" style={{order: i%2 ? 1 : 2}}>
                <div className="img" style={{backgroundImage:`url(${s.img})`,aspectRatio:'4/5'}}/>
                <figcaption><span>Étape {String(i+1).padStart(2,'0')} — {s.t}</span><span>A. M.</span></figcaption>
              </figure>
            </div>
          </div>
        </section>
      ))}

      <section style={{padding:'80px 0'}}>
        <div className="page">
          <SectionHeading
            eyebrow="Garanties"
            title={<>Ce que nous <span className="italic" style={{color:'var(--accent)'}}>vous devons</span></>}
            aside="Quatre engagements écrits, opposables."/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:40,borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
            {[
              ["Devis 24h","Sans engagement. Avant toute visite payante."],
              ["RC pro","Assurance professionnelle et transport, vérifiable."],
              ["RGPD","Vos données chiffrées. Aucun usage commercial."],
              ["Tarif clair","Pas de frais cachés. Pas de commission masquée."],
            ].map(([t,d],i) => (
              <div key={i} style={{padding:'28px 24px',borderRight: i<3 ? '1px solid var(--ruled)' : 'none'}}>
                <span className="label">Garantie 0{i+1}</span>
                <h4 style={{fontSize:22,fontWeight:500,marginTop:8}}>{t}</h4>
                <p className="italic" style={{color:'var(--ink-soft)',marginTop:6,fontSize:15}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'80px 0',textAlign:'center'}}>
        <div className="page">
          <h2 style={{fontFamily:"'Newsreader',serif",fontSize:'clamp(40px,6vw,84px)',fontWeight:400,letterSpacing:'-0.02em',lineHeight:1}}>
            Voir si la méthode<br/><span className="italic" style={{color:'var(--accent)'}}>s'applique à vous.</span>
          </h2>
          <button className="btn" onClick={openContact} style={{marginTop:36}}>Diagnostic gratuit <Icon name="arrow-right" size={12}/></button>
        </div>
      </section>
    </div>
  );
}

// ---------- TÉMOIGNAGES (grid) ----------
function TemoignagesPage({ openContact }) {
  const cases = [
    { who:"Sophie L.", role:"Héritière, succession", city:"Paris 12ᵉ", img:PHOTOS.portrait,
      q:"Ma mère partait en EHPAD. J'étais à 800 km. Espace Blanc a tout géré, m'a rendu 4 200 €, et m'a évité 12 week-ends de pleurs et de cartons.", chiffre:"4 200 € restitués" },
    { who:"Jean P.", role:"Fils unique, succession", city:"Versailles", img:PHOTOS.detail,
      q:"J'avais peur qu'on jette les lettres de mon père. Ils ont tout trié devant moi, sans jamais me presser. Le carnet est revenu chez moi.", chiffre:"6 mois d'accompagnement" },
    { who:"Famille D.", role:"Succession ouverte", city:"Boulogne", img:PHOTOS.window,
      q:"Devis annoncé, devis tenu. La benne d'à côté nous proposait 1 200 €. Eux nous ont reversé 6 800 €.", chiffre:"+5 600 € vs débarras" },
    { who:"Béatrice M.", role:"Déménagement", city:"Nogent", img:PHOTOS.archive,
      q:"On m'avait dit débarras. On a eu une rédactrice. La différence est tout.", chiffre:"92 m² traités" },
    { who:"Marc T.", role:"Maman en EHPAD", city:"Neuilly", img:PHOTOS.hands,
      q:"Ils n'ont pas vidé. Ils ont préparé. Ma mère est arrivée avec sa lampe, son fauteuil, ses photos. Elle s'est dit chez elle.", chiffre:"Installation J-1 EHPAD" },
    { who:"Yann B.", role:"Expat. Lisbonne", city:"Paris 11ᵉ", img:PHOTOS.livingroom,
      q:"Paris-Lisbonne. Le déménageur me chiffrait 9 800 €. J'ai vendu un tiers de ce que je voulais transporter. J'ai payé 5 600 € et j'ai récupéré 3 100 €.", chiffre:"−42% transport" },
  ];

  return (
    <div className="view">
      <section style={{padding:'40px 0 40px',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)',padding:'12px 0',marginBottom:48}}>
            <span className="label">Cahier IV · Courrier des lecteurs</span>
            <span className="label">Pages 12–14</span>
            <span className="label">Vingt-trois lettres</span>
          </div>
          <h1 style={{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:'clamp(56px,8vw,124px)',lineHeight:0.92,letterSpacing:'-0.025em'}}>
            Vos lettres,<br/><span className="italic" style={{color:'var(--accent)'}}>nos preuves.</span>
          </h1>
        </div>
      </section>

      <section style={{padding:'72px 0'}}>
        <div className="page">
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:32}}>
            {cases.map((c,i) => (
              <article key={i} style={{display:'flex',flexDirection:'column',gap:14}}>
                <figure className="figure">
                  <div className="img" style={{backgroundImage:`url(${c.img})`,aspectRatio:'4/5'}}/>
                  <figcaption><span>{c.who} · {c.city}</span><span>{String(i+1).padStart(2,'0')}</span></figcaption>
                </figure>
                <span className="label">{c.role}</span>
                <p className="italic" style={{fontSize:18,lineHeight:1.45}}>« {c.q} »</p>
                <span className="label" style={{color:'var(--accent)'}}>{c.chiffre}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'72px 0',background:'var(--paper-2)',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <SectionHeading
            eyebrow="Ils en parlent"
            title={<>Dans <span className="italic" style={{color:'var(--accent)'}}>la presse</span></>}
            aside="Sept retombées, depuis 2023."/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:32,borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
            {["Le Monde","Télérama","France Inter","Stratégies"].map((m,i) => (
              <div key={i} style={{padding:'40px 24px',borderRight: i<3 ? '1px solid var(--ruled)' : 'none',textAlign:'center'}}>
                <span style={{fontFamily:"'Newsreader',serif",fontWeight:600,fontSize:34,fontWeight:400}}>{m}</span>
                <div className="label" style={{marginTop:10}}>Article 2024</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'80px 0',textAlign:'center'}}>
        <div className="page">
          <button className="btn" onClick={openContact}>Devenir notre 24ᵉ témoignage</button>
        </div>
      </section>
    </div>
  );
}

// ---------- CONCEPT ----------
function ConceptPage({ openContact }) {
  return (
    <div className="view">
      <section style={{padding:'40px 0 40px',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)',padding:'12px 0',marginBottom:48}}>
            <span className="label">Le concept</span>
            <span className="label">Page 03</span>
            <span className="label">Lecture 5 min</span>
          </div>
          <h1 style={{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:'clamp(56px,8vw,124px)',lineHeight:0.92,letterSpacing:'-0.025em',maxWidth:'12ch'}}>
            Espace <span className="italic" style={{color:'var(--accent)'}}>Blanc.</span>
          </h1>
          <p className="italic" style={{fontSize:21,color:'var(--ink-soft)',marginTop:24,maxWidth:'54ch'}}>
            Le blanc, ici, n'est pas vide. C'est l'espace qui revient, la marge qui s'ouvre, le silence qu'on s'autorise après le passage.
          </p>
        </div>
      </section>

      <section style={{padding:'72px 0'}}>
        <div className="page">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.3fr',gap:64}}>
            <figure className="figure">
              <div className="img" style={{backgroundImage:`url(${PHOTOS.portrait})`,aspectRatio:'3/4'}}/>
              <figcaption><span>Adèle M., fondatrice — atelier rue Lhomond.</span><span>2026</span></figcaption>
            </figure>
            <div>
              <span className="label">Portrait</span>
              <h2 style={{fontFamily:"'Newsreader',serif",fontSize:48,fontWeight:500,lineHeight:1.05,letterSpacing:'-0.015em',marginTop:14}}>
                Une seule <span className="italic" style={{color:'var(--accent)'}}>interlocutrice.</span>
              </h2>
              <div className="cols-2" style={{marginTop:24,fontSize:17.5,lineHeight:1.6}}>
                <p className="drop-cap" style={{marginBottom:14}}>J'ai vidé l'appartement de ma grand-mère en 2019. Je n'y connaissais rien. Personne ne m'avait dit que vider, ce n'est pas démonter. Que les objets racontent, qu'il faut les écouter avant de leur trouver une suite. Que la lenteur protège.</p>
                <p style={{marginBottom:14}}>Trois ans plus tard, Espace Blanc est né. Une équipe restreinte. Des prestataires de confiance. Un seul numéro à appeler. Et la conviction que ce métier est tout sauf une logistique.</p>
                <p>Nous accompagnons aujourd'hui une dizaine de familles par mois. Aucune ne se ressemble. Toutes nous écrivent après. C'est notre meilleur indicateur.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding:'72px 0',background:'var(--paper-2)',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <SectionHeading
            eyebrow="Vocabulaire"
            title={<>Les mots <span className="italic" style={{color:'var(--accent)'}}>que nous tenons</span></>}
            aside="Et ceux que nous n'employons pas."/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,marginTop:32}}>
            <div>
              <span className="label">Mots oui</span>
              <div style={{marginTop:14,fontFamily:"'Newsreader',serif",fontSize:'clamp(24px,2.4vw,34px)',fontWeight:600,lineHeight:1.4,color:'var(--ink)'}}>
                passage · allègement · valoriser · transmettre · soigner · mesurer · respecter · soulager · restituer.
              </div>
            </div>
            <div>
              <span className="label">Mots non</span>
              <div style={{marginTop:14,fontFamily:"'Newsreader',serif",fontSize:'clamp(24px,2.4vw,34px)',fontWeight:600,lineHeight:1.4,color:'var(--ink-mute)',textDecoration:'line-through',textDecorationStyle:'wavy',textDecorationColor:'var(--accent)',textDecorationThickness:'1px'}}>
                débarras · vide-grenier · ramassage · lot · encombrant · enlèvement.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding:'80px 0',textAlign:'center'}}>
        <div className="page">
          <button className="btn" onClick={openContact}>Échanger avec Adèle <Icon name="arrow-right" size={12}/></button>
        </div>
      </section>
    </div>
  );
}

// ---------- CONTACT — Multi-step diagnostic ----------
function ContactPage({ initial=0 }) {
  const STEPS = ["Situation","Logement","Délai","Vous","Récapitulatif"];
  const [step,setStep] = useStateP(initial);
  const [data,setData] = useStateP({
    situation:"", surface:"", proche:"", delai:"", localisation:"",
    nom:"", email:"", tel:"", message:"",
  });
  const set = (k) => (v) => setData(d => ({...d, [k]: typeof v==='string'?v:v.target.value}));

  const next = () => setStep(s => Math.min(s+1, STEPS.length-1));
  const prev = () => setStep(s => Math.max(s-1, 0));
  const [sent,setSent] = useStateP(false);

  return (
    <div className="view">
      <section style={{padding:'40px 0 40px',borderBottom:'1px solid var(--ink)'}}>
        <div className="page">
          <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)',padding:'12px 0',marginBottom:48}}>
            <span className="label">Contact · Diagnostic</span>
            <span className="label">Page 16</span>
            <span className="label">Sans engagement</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'end'}}>
            <h1 style={{fontFamily:"'Newsreader',serif",fontWeight:400,fontSize:'clamp(48px,7vw,108px)',lineHeight:0.95,letterSpacing:'-0.025em'}}>
              On commence par <span className="italic" style={{color:'var(--accent)'}}>vous écouter.</span>
            </h1>
            <p className="italic" style={{fontSize:19,color:'var(--ink-soft)',maxWidth:'40ch'}}>
              Cinq minutes pour cadrer votre situation. Une conseillère vous rappelle sous 24h, avec un premier devis indicatif. Aucune obligation.
            </p>
          </div>
        </div>
      </section>

      <section style={{padding:'64px 0 100px'}}>
        <div className="page" style={{maxWidth:880,margin:'0 auto'}}>
          {sent ? (
            <div style={{padding:'80px 0',textAlign:'center',border:'1px solid var(--ink)',background:'var(--paper-2)'}}>
              <div style={{width:60,height:60,borderRadius:'50%',background:'var(--accent)',color:'var(--paper)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:20}}>
                <Icon name="check" size={28}/>
              </div>
              <h3 style={{fontSize:42,fontWeight:500,letterSpacing:'-0.01em'}}>Reçu, {data.nom || 'merci'}</h3>
              <p className="italic" style={{marginTop:14,color:'var(--ink-soft)',fontSize:18}}>
                Une conseillère vous rappelle sous 24h ouvrées au {data.tel || '…'} ou par courriel.
              </p>
              <p className="label" style={{marginTop:24}}>Référence dossier · EB-2026-{String(Math.floor(Math.random()*899)+100)}</p>
            </div>
          ) : (
            <div>
              <div className="progress">
                {STEPS.map((_,i) => (
                  <span key={i} className={i<step?'done':i===step?'current':''}/>
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:32}}>
                <span className="label">Étape {step+1}/{STEPS.length} · {STEPS[step]}</span>
                <span className="label">Aucune donnée enregistrée tant que vous n'envoyez pas</span>
              </div>

              {step===0 && (
                <DiagStep title={<>Quelle est votre <span className="italic" style={{color:'var(--accent)'}}>situation ?</span></>}>
                  <Radios value={data.situation} onChange={set('situation')} name="sit" options={[
                    {v:'succession',l:'Une succession à organiser'},
                    {v:'senior',l:"Un proche part en résidence senior"},
                    {v:'demenagement',l:"Je déménage et je veux alléger"},
                    {v:'autre',l:"Une autre situation, je vous explique"},
                  ]}/>
                </DiagStep>
              )}
              {step===1 && (
                <DiagStep title={<>Le logement <span className="italic" style={{color:'var(--accent)'}}>à traiter</span></>}>
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
                    <input value={data.localisation} onChange={set('localisation')} placeholder="Ex. Paris 14ᵉ, Versailles…"/>
                  </div>
                  <div className="field">
                    <label>Quelque chose à savoir ?</label>
                    <textarea rows={3} value={data.message} onChange={set('message')} placeholder="Étage sans ascenseur, accès, contraintes émotionnelles…"/>
                  </div>
                </DiagStep>
              )}
              {step===2 && (
                <DiagStep title={<>Votre <span className="italic" style={{color:'var(--accent)'}}>échéance</span></>}>
                  <Radios value={data.delai} onChange={set('delai')} name="del" options={[
                    {v:'urgent',l:"Dans les deux prochaines semaines"},
                    {v:'mois',l:"Dans le mois qui vient"},
                    {v:'trimestre',l:"Sur le prochain trimestre"},
                    {v:'flou',l:"Je n'ai pas encore de date précise"},
                  ]}/>
                </DiagStep>
              )}
              {step===3 && (
                <DiagStep title={<>Comment <span className="italic" style={{color:'var(--accent)'}}>vous joindre ?</span></>}>
                  <div className="field"><label>Nom et prénom</label><input value={data.nom} onChange={set('nom')} placeholder="Sophie Lefèvre"/></div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
                    <div className="field"><label>Adresse e-mail</label><input type="email" value={data.email} onChange={set('email')} placeholder="vous@exemple.fr"/></div>
                    <div className="field"><label>Téléphone</label><input type="tel" value={data.tel} onChange={set('tel')} placeholder="06 12 34 56 78"/></div>
                  </div>
                </DiagStep>
              )}
              {step===4 && (
                <DiagStep title={<>Tout est <span className="italic" style={{color:'var(--accent)'}}>noté</span></>}>
                  <div style={{borderTop:'1px solid var(--ink)',borderBottom:'1px solid var(--ink)'}}>
                    {[
                      ["Situation", data.situation || '—'],
                      ["Surface", data.surface || '—'],
                      ["Localisation", data.localisation || '—'],
                      ["Délai", data.delai || '—'],
                      ["Joindre", `${data.nom || '—'} · ${data.email || '—'} · ${data.tel || '—'}`],
                      ["Note", data.message || '—'],
                    ].map(([k,v],i) => (
                      <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr',gap:16,padding:'14px 0',borderBottom: i<5 ? '1px solid var(--ruled)':'none'}}>
                        <span className="label">{k}</span>
                        <span className="italic" style={{fontSize:17}}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="small italic" style={{marginTop:20}}>En envoyant, vous acceptez que nous vous rappelions sous 24h. Aucune autre donnée ne sera collectée.</p>
                </DiagStep>
              )}

              <div style={{display:'flex',justifyContent:'space-between',marginTop:36,gap:16}}>
                <button onClick={prev} className="btn-ghost btn" style={{opacity:step===0?0.3:1,pointerEvents:step===0?'none':'auto'}}>
                  <Icon name="arrow-left" size={12}/> Retour
                </button>
                {step<STEPS.length-1 ? (
                  <button onClick={next} className="btn">Continuer <Icon name="arrow-right" size={12}/></button>
                ) : (
                  <button onClick={() => setSent(true)} className="btn">Envoyer le diagnostic <Icon name="arrow-right" size={12}/></button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function DiagStep({ title, children }) {
  return (
    <div>
      <h2 style={{fontFamily:"'Newsreader',serif",fontSize:'clamp(34px,4vw,52px)',fontWeight:500,letterSpacing:'-0.015em',lineHeight:1,marginBottom:32}}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

function Radios({ name, value, onChange, options }) {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      {options.map((o,i) => (
        <label key={o.v} style={{
          display:'grid',gridTemplateColumns:'30px 1fr 30px',gap:16,
          padding:'18px 0',
          borderTop: i===0?'1px solid var(--ink)':'1px solid var(--ruled)',
          borderBottom: i===options.length-1?'1px solid var(--ink)':'none',
          cursor:'pointer',
        }}>
          <span className="label">0{i+1}</span>
          <span style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight: value===o.v?'600':'400',color:value===o.v?'var(--accent)':'var(--ink)'}}>{o.l}</span>
          <span style={{
            display:'inline-flex',alignItems:'center',justifyContent:'center',
            width:22,height:22,borderRadius:'50%',
            border:'1px solid var(--ink)',
            background: value===o.v ? 'var(--accent)' : 'transparent',
          }}>
            {value===o.v && <span style={{width:8,height:8,borderRadius:'50%',background:'var(--paper)'}}/>}
          </span>
          <input type="radio" name={name} checked={value===o.v} onChange={() => onChange(o.v)} style={{display:'none'}}/>
        </label>
      ))}
    </div>
  );
}

Object.assign(window, { AccompagnementPage, MethodePage, TemoignagesPage, ConceptPage, ContactPage });
