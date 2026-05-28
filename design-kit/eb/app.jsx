// Espace Blanc — App root with router state + Tweaks
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

const EB_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "Une maison à vider. Une famille à soulager.",
  "accent": "oxblood",
  "showMastheadDate": true,
  "showDropCaps": true
}/*EDITMODE-END*/;

function App() {
  const [view, setView] = useStateA('home');
  const [megaOpen, setMegaOpen] = useStateA(false);
  const [loginOpen, setLoginOpen] = useStateA(false);
  const [t, setTweak] = useTweaks(EB_TWEAK_DEFAULTS);

  // Apply accent on body
  useEffectA(() => {
    document.body.setAttribute('data-accent', t.accent || 'oxblood');
  }, [t.accent]);

  // Scroll to top on view change
  useEffectA(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  const openContact = () => setView('contact');

  const renderView = () => {
    switch (view) {
      case 'home':         return <HomePage headline={t.headline} setView={setView} openContact={openContact}/>;
      case 'succession':   return <AccompagnementPage which="succession"   setView={setView} openContact={openContact}/>;
      case 'senior':       return <AccompagnementPage which="senior"       setView={setView} openContact={openContact}/>;
      case 'demenagement': return <AccompagnementPage which="demenagement" setView={setView} openContact={openContact}/>;
      case 'methode':      return <MethodePage      setView={setView} openContact={openContact}/>;
      case 'temoignages':  return <TemoignagesPage  openContact={openContact}/>;
      case 'concept':      return <ConceptPage      openContact={openContact}/>;
      case 'contact':      return <ContactPage/>;
      default:             return <HomePage headline={t.headline} setView={setView} openContact={openContact}/>;
    }
  };

  return (
    <>
      <Masthead
        view={view}
        setView={setView}
        openMega={() => setMegaOpen(true)}
        openLogin={() => setLoginOpen(true)}
        openContact={openContact}
      />
      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} setView={setView} openContact={openContact}/>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)}/>
      <main>{renderView()}</main>
      <Footer setView={setView} openContact={openContact}/>

      <TweaksPanel title="Tweaks · Espace Blanc">
        <TweakSection title="Headline (hero)">
          <TweakSelect
            label="Phrase d'accueil"
            value={t.headline}
            onChange={v => setTweak('headline', v)}
            options={[
              { value:'On vide. Vous respirez.',                     label:'On vide. Vous respirez.' },
              { value:'Une maison à vider. Une famille à soulager.', label:'Une maison à vider. Une famille à soulager.' },
              { value:'Le passage, en de bonnes mains.',             label:'Le passage, en de bonnes mains.' },
            ]}/>
        </TweakSection>
        <TweakSection title="Encre d'accent">
          <TweakColor
            label="Couleur de l'encre"
            value={t.accent}
            onChange={v => setTweak('accent', v)}
            options={[
              { value:'oxblood', label:'Encre rouge sang (par défaut)', swatch:'#8a2820' },
              { value:'blue',    label:'Encre bleu de nuit',            swatch:'#1c3559' },
              { value:'green',   label:'Encre vert forêt',              swatch:'#2d5d3f' },
            ]}/>
        </TweakSection>
        <TweakSection title="Détails éditoriaux">
          <TweakToggle
            label="Lettrines (drop-caps)"
            value={t.showDropCaps}
            onChange={v => setTweak('showDropCaps', v)}/>
          <TweakToggle
            label="Date d'édition en bandeau"
            value={t.showMastheadDate}
            onChange={v => setTweak('showMastheadDate', v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// Apply showDropCaps + showMastheadDate at body level so CSS can react
function applyBodyToggles() {
  // no-op — handled via CSS below via attribute selectors set by JSX
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
