// Hero — editorial layout with a single italic accent in the headline.
function Hero({ onContact }) {
  return (
    <section className="eb-section eb-section--hero">
      <div className="eb-container">
        <div className="eb-hero-grid">
          <div>
            <span className="eb-eyebrow eb-eyebrow--hero">
              Le passage et l'allègement, depuis 2021.
            </span>
            <h1 className="eb-display">
              On vide<br/><em className="eb-italic">Vous respirez</em>
            </h1>
            <p className="eb-lede eb-hero-lede">
              Succession, départ en résidence, déménagement. Nous orchestrons
              le tri, la valorisation et la transmission de votre patrimoine.{" "}
              <strong>Vous gardez la main, nous portons le reste.</strong>
            </p>
            <div className="eb-hero-ctas">
              <Button onClick={onContact}>
                Demander un diagnostic <Icon name="arrow-right" size={12}/>
              </Button>
              <BtnLink href="tel:+33147841203">
                <Icon name="phone" size={12}/> Parler à une conseillère
              </BtnLink>
            </div>
          </div>

          <Figure
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop&q=78"
            caption="Fig. 01 — Appartement, 14ᵉ arrondissement."
            sub="Photo · A. M."
            ratio="3 / 4"
          />
        </div>

        <div className="eb-rule-double eb-hero-strap">
          <span className="eb-label">3 portes d'entrée</span>
          <span className="eb-label">Méthode 4 temps</span>
          <span className="eb-label">Bilan d'impact</span>
          <span className="eb-label">Témoignages</span>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
