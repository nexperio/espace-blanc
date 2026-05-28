// Method — the four-step process, in a vertical ordered list.
const METHOD = [
  { t: "Le diagnostic",   d: "Visite, écoute, devis transparent. Sans engagement, sous 24 h." },
  { t: "Le tri",          d: "Pièce par pièce, à votre rythme. Tout est photographié, fiché, estimé." },
  { t: "La valorisation", d: "Vente aux brocanteurs, dépôts-vente, ventes en ligne, dons certifiés." },
  { t: "La restitution",  d: "Logement vide, somme valorisée reversée, bilan d'impact remis." },
];

function Method() {
  return (
    <section id="methode" className="eb-section eb-section--paper2">
      <div className="eb-container">
        <SectionHead
          title={<>Quatre temps, <E>une cadence</E></>}
        />
        <ol className="eb-steps">
          {METHOD.map((s, i) => (
            <li key={i}>
              <div className="eb-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="eb-step-title">{s.t}</h3>
                <p className="eb-step-desc">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

window.Method = Method;
