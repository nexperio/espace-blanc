// FinalCta — closing call to action.
function FinalCta({ onContact }) {
  return (
    <section className="eb-section eb-section--final">
      <div className="eb-container eb-final">
        <span className="eb-label">Dernière colonne</span>
        <h2 className="eb-final-h2">
          Le passage commence<br/>par <E>une conversation</E>
        </h2>
        <p className="eb-final-lede">
          Diagnostic gratuit, sous 24 h, sans engagement. Nous nous déplaçons,
          nous écoutons, nous vous écrivons.
        </p>
        <div className="eb-final-ctas">
          <Button onClick={onContact}>
            Demander un diagnostic <Icon name="arrow-right" size={12}/>
          </Button>
          <Button variant="ghost" as="a" href="tel:+33147841203">
            <Icon name="phone" size={12}/> +33 1 47 84 12 03
          </Button>
        </div>
      </div>
    </section>
  );
}

// Footer — full legal footer with SIRET, RC pro, address.
function Footer({ onContact }) {
  return (
    <footer className="eb-footer">
      <div className="eb-container eb-footer-main">
        <div className="eb-footer-brand">
          <img src="../../assets/logo-espace-blanc.png" alt="Espace Blanc" className="eb-footer-logo"/>
          <p className="eb-footer-tag">
            Le passage et l'allègement, rédigé chez vous, au rythme de chacun.
          </p>
          <Button onClick={onContact}>
            Demander un diagnostic gratuit <Icon name="arrow-right" size={12}/>
          </Button>
        </div>
        <FooterCol title="Lire" items={["Le concept", "La méthode", "Témoignages", "Presse"]}/>
        <FooterCol title="Accompagner" items={["Succession", "Sénior en résidence", "Déménagement", "Autre situation"]}/>
        <div>
          <span className="eb-label">Joindre la rédaction</span>
          <div className="eb-footer-contact">
            <a href="tel:+33147841203"><Icon name="phone" size={14}/> +33 1 47 84 12 03</a>
            <a href="mailto:bonjour@espace-blanc.fr"><Icon name="mail" size={14}/> bonjour@espace-blanc.fr</a>
            <span className="eb-small">14 rue Lhomond, 75005 Paris</span>
            <span className="eb-small eb-italic">Du lundi au samedi, 9h–19h.</span>
          </div>
        </div>
      </div>
      <div className="eb-footer-bottom">
        <div className="eb-container eb-footer-legal">
          <span className="eb-label">© Espace Blanc · {new Date().getFullYear()} · SIRET 893 274 510 00012 · RC Pro AXA n° 4 158 209</span>
          <div className="eb-footer-links">
            <a href="#">Mentions légales</a>
            <a href="#">CGV</a>
            <a href="#">Confidentialité</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <span className="eb-label">{title}</span>
      <ul className="eb-footer-col">
        {items.map(l => <li key={l}><a href="#">{l}</a></li>)}
      </ul>
    </div>
  );
}

window.FinalCta = FinalCta;
window.Footer = Footer;
