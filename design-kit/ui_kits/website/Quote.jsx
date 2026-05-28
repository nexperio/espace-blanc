// Quote — testimonials carousel with portrait, verbatim, attribution, stat.
const { useState: useStateQ, useEffect: useEffectQ } = React;

const QUOTES = [
  {
    q: "Ma mère partait en EHPAD. J'étais à 800 km. Espace Blanc a tout géré, m'a rendu 4 200 €, et m'a évité 12 week-ends de pleurs et de cartons.",
    who: "Sophie L.", role: "Héritière", city: "Paris 12ᵉ",
    stat: "4 200 € restitués",
    img: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=900&auto=format&fit=crop&q=78",
  },
  {
    q: "J'avais peur qu'on jette les lettres de mon père. Ils ont tout trié devant moi, sans jamais me presser. Le carnet est revenu chez moi, le piano est parti chez un jeune couple.",
    who: "Jean P.", role: "Fils unique", city: "Versailles",
    stat: "Piano donné — Conservatoire de Versailles",
    img: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=900&auto=format&fit=crop&q=78",
  },
  {
    q: "Devis annoncé, devis tenu. La benne d'à côté nous proposait 1 200 €. Eux nous ont reversé 6 800 €. Et l'appartement a été rendu impeccable.",
    who: "Famille D.", role: "Succession", city: "Boulogne",
    stat: "6 800 € restitués",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&auto=format&fit=crop&q=78",
  },
];

function Quote() {
  const [i, setI] = useStateQ(0);
  useEffectQ(() => {
    const t = setInterval(() => setI(p => (p + 1) % QUOTES.length), 9000);
    return () => clearInterval(t);
  }, []);
  const cur = QUOTES[i];
  return (
    <section id="temoignages" className="eb-section">
      <div className="eb-container">
        <SectionHead
          title={<>Trois lignes, <E>un cas concret</E></>}
        />
        <div className="eb-quote">
          <Figure src={cur.img} caption={`${cur.who} · ${cur.city}`} sub={cur.role} ratio="3 / 4"/>
          <div className="eb-quote-text">
            <blockquote className="eb-quote-q">« {cur.q} »</blockquote>
            <div className="eb-quote-meta">
              <span className="eb-quote-attr">
                — <b>{cur.who}</b>, {cur.role}, {cur.city}
              </span>
              <span className="eb-quote-stat">{cur.stat}</span>
            </div>
            <div className="eb-quote-controls">
              <div className="eb-quote-dots">
                {QUOTES.map((_, k) => (
                  <button key={k}
                    onClick={() => setI(k)}
                    className={`eb-quote-dot ${k === i ? "is-active" : ""}`}
                    aria-label={`Témoignage ${k + 1}`}/>
                ))}
              </div>
              <div className="eb-quote-arrows">
                <button className="eb-icon-btn" onClick={() => setI((i - 1 + QUOTES.length) % QUOTES.length)} aria-label="Précédent">
                  <Icon name="arrow-left" size={14}/>
                </button>
                <button className="eb-icon-btn" onClick={() => setI((i + 1) % QUOTES.length)} aria-label="Suivant">
                  <Icon name="arrow-right" size={14}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Quote = Quote;
