// Faq — accordion of 5 questions.
const { useState: useStateF } = React;

const FAQS = [
  {
    q: "Combien coûte une intervention ?",
    a: "Le diagnostic est gratuit. La mission est devisée en fonction du volume, du contexte et de la part valorisable. Nous reversons systématiquement la valeur nette des ventes, ligne par ligne.",
  },
  {
    q: "Intervenez-vous hors Île-de-France ?",
    a: "Notre cœur d'activité reste l'Île-de-France. Pour le reste, nous étudions au cas par cas avec un déplacement facturé.",
  },
  {
    q: "Comment fonctionne la valorisation ?",
    a: "Brocanteurs, dépôts-vente, ventes en ligne, ou associations bénéficiaires. Vous validez chaque destination, nous restituons les sommes.",
  },
  {
    q: "Que devient ce qui n'a pas de valeur marchande ?",
    a: "Soit un don à une association partenaire (avec certificat), soit un recyclage filière. La décharge reste l'exception.",
  },
  {
    q: "Le client peut-il être absent ?",
    a: "Oui. Vous validez à distance via l'extranet, à votre rythme. Photos, fiches, prix proposés, dons : tout vous est soumis avant exécution.",
  },
];

function Faq() {
  const [open, setOpen] = useStateF(0);
  return (
    <section className="eb-section eb-section--paper2">
      <div className="eb-container">
        <SectionHead
          title={<>Cinq <E>questions reçues</E></>}
        />
        <div className="eb-faq">
          {FAQS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="eb-faq-item">
                <button
                  className="eb-faq-head"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}>
                  <span className="eb-faq-left">
                    <span className="eb-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="eb-faq-q">{it.q}</span>
                  </span>
                  <Icon name={isOpen ? "minus" : "plus"} size={16}/>
                </button>
                {isOpen && (
                  <div className="eb-faq-body">
                    <p>{it.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.Faq = Faq;
