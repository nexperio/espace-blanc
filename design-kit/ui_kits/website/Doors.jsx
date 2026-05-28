// Doors — the three entry-points (succession / sénior / déménagement).
const DOORS = [
  {
    key: "succession",
    tag: "Article I",
    title: "Une succession à traverser",
    lede: "Trier sans se trahir, valoriser sans se précipiter.",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=78",
    caption: "Fig. 02 — Bibliothèque, succession Dr. R., Paris 6ᵉ.",
  },
  {
    key: "senior",
    tag: "Article II",
    title: "Un proche part en résidence",
    lede: "Choisir ce qui suit, honorer ce qui reste.",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1000&auto=format&fit=crop&q=78",
    caption: "Fig. 03 — Studio préparé pour transfert en EHPAD.",
  },
  {
    key: "demenagement",
    tag: "Article III",
    title: "Un déménagement à alléger",
    lede: "Garder l'essentiel, donner ou vendre le reste.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=78",
    caption: "Fig. 04 — Déménagement Paris → Lyon.",
  },
];

function Doors({ onPick }) {
  return (
    <section className="eb-section">
      <div className="eb-container">
        <SectionHead
          title={<>Choisissez votre <E>porte d'entrée</E></>}
        />
        <div className="eb-doors">
          {DOORS.map((d, i) => (
            <button key={d.key} className="eb-door" onClick={() => onPick && onPick(d.key)}>
              <Figure src={d.img} caption={d.caption} sub={String(i + 2).padStart(2, "0")}/>
              <span className="eb-label">{d.tag}</span>
              <h3 className="eb-door-title">{d.title}</h3>
              <p className="eb-door-lede">{d.lede}</p>
              <span className="eb-btn-link">
                Lire l'accompagnement <Icon name="arrow-right" size={12}/>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Doors = Doors;
