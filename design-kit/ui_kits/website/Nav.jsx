// Nav — masthead with edition strap, centered nameplate, CTAs.
const { useState: useStateN, useEffect: useEffectN } = React;

function Nav({ onContact, onLogin, mode, setMode }) {
  const [scrolled, setScrolled] = useStateN(false);
  useEffectN(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`eb-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="eb-nav-main eb-container">
        <a href="#home" className="eb-nameplate">
          <img src="../../assets/logo-espace-blanc.png" alt="Espace Blanc" className="eb-logo"/>
        </a>
        <nav className="eb-nav-links">
          <a className="eb-nav-link" href="#sommaire">Sommaire</a>
          <a className="eb-nav-link" href="#methode">La méthode</a>
          <a className="eb-nav-link" href="#temoignages">Témoignages</a>
          <a className="eb-nav-link" href="#concept">Le concept</a>
          <button className="eb-nav-link eb-mode-toggle" onClick={() => setMode(mode === "creme" ? "crepuscule" : "creme")}>
            {mode === "creme" ? "Crépuscule" : "Crème"}
          </button>
          <button className="eb-btn eb-btn-primary eb-btn-sm" onClick={onContact}>
            Diagnostic gratuit
          </button>
        </nav>
      </div>
      <div className="eb-nav-rule"/>
    </header>
  );
}

window.Nav = Nav;
