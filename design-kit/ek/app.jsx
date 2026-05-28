// Eklipsis — App root with router state + Tweaks
const { useState: useStateEKA, useEffect: useEffectEKA } = React;

const EK_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "Le passage, en de bonnes mains.",
  "palette": "twilight",
  "boldAccents": true
}/*EDITMODE-END*/;

function EkApp() {
  const [view,setView] = useStateEKA('home');
  const [megaOpen,setMegaOpen] = useStateEKA(false);
  const [loginOpen,setLoginOpen] = useStateEKA(false);
  const [t,setTweak] = useTweaks(EK_TWEAK_DEFAULTS);

  useEffectEKA(() => {
    document.body.setAttribute('data-palette', t.palette || 'twilight');
  }, [t.palette]);

  useEffectEKA(() => {
    window.scrollTo({ top:0, behavior:'instant' });
  }, [view]);

  const openContact = () => setView('contact');

  const renderView = () => {
    switch(view){
      case 'home':         return <EkHomePage headline={t.headline} setView={setView} openContact={openContact}/>;
      case 'succession':   return <EkAccompagnementPage which="succession"   setView={setView} openContact={openContact}/>;
      case 'senior':       return <EkAccompagnementPage which="senior"       setView={setView} openContact={openContact}/>;
      case 'demenagement': return <EkAccompagnementPage which="demenagement" setView={setView} openContact={openContact}/>;
      case 'methode':      return <EkMethodePage     openContact={openContact}/>;
      case 'temoignages':  return <EkTemoignagesPage openContact={openContact}/>;
      case 'concept':      return <EkConceptPage     openContact={openContact}/>;
      case 'contact':      return <EkContactPage/>;
      default:             return <EkHomePage headline={t.headline} setView={setView} openContact={openContact}/>;
    }
  };

  const transparent = view === 'home';

  return (
    <>
      <EkHeader
        view={view}
        setView={setView}
        openMega={() => setMegaOpen(true)}
        openLogin={() => setLoginOpen(true)}
        openContact={openContact}
        transparent={transparent}
      />
      <EkMegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} setView={setView} openContact={openContact}/>
      <EkLoginModal open={loginOpen} onClose={() => setLoginOpen(false)}/>
      <main style={{paddingTop: transparent ? 0 : 80}}>{renderView()}</main>
      <EkFooter setView={setView} openContact={openContact}/>

      <TweaksPanel title="Tweaks · Eklipsis">
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
        <TweakSection title="Palette d'accent">
          <TweakColor
            label="Couleur"
            value={t.palette}
            onChange={v => setTweak('palette', v)}
            options={[
              { value:'twilight', label:'Crépuscule (terracotta)', swatch:['#0f1626','#c0a07a','#f3eadb'] },
              { value:'dawn',     label:'Aube (or doux)',          swatch:['#0f1626','#d4a373','#f3eadb'] },
              { value:'indigo',   label:'Indigo (bleu lointain)',  swatch:['#0f1626','#7c8ec4','#f3eadb'] },
            ]}/>
        </TweakSection>
        <TweakSection title="Détails">
          <TweakToggle
            label="Accents en gras"
            value={t.boldAccents}
            onChange={v => setTweak('boldAccents', v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EkApp/>);
