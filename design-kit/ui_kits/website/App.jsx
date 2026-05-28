// App — assembles the homepage from the UI kit components.
const { useState: useStateApp } = React;

function App() {
  const [mode, setMode] = useStateApp("creme");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  const onContact = () => alert("Diagnostic — formulaire à brancher (Next.js route /contact)");
  const onLogin = () => alert("Espace client — modal login à brancher");

  return (
    <>
      <Nav onContact={onContact} onLogin={onLogin} mode={mode} setMode={setMode}/>
      <main>
        <Hero onContact={onContact}/>
        <Doors onPick={(k) => alert(`Aller à /accompagnements/${k}`)}/>
        <Stats/>
        <Method/>
        <Quote/>
        <Faq/>
        <FinalCta onContact={onContact}/>
      </main>
      <Footer onContact={onContact}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
