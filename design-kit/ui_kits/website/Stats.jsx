// Stats — impact metrics in a four-cell ruled grid.
const STATS = [
  { v: "412",    l: "missions accompagnées",    s: "depuis 2021" },
  { v: "1,8 M€", l: "restitués aux familles",   s: "valeur nette des ventes" },
  { v: "84 t",   l: "détournées de la décharge", s: "dons + recyclage" },
  { v: "23",     l: "associations partenaires", s: "Île-de-France" },
];

function Stats() {
  return (
    <section className="eb-section">
      <div className="eb-container">
        <SectionHead
          title={<>Ce que <E>nous mesurons</E></>}
        />
        <div className="eb-stats">
          {STATS.map((m, i) => (
            <div key={i} className="eb-stat">
              <div className="eb-stat-v">{m.v}</div>
              <div className="eb-stat-l">{m.l}</div>
              <div className="eb-stat-s">{m.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Stats = Stats;
