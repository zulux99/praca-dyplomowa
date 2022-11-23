function OfflinePage() {
  return (
    <>
      <h1>Jesteś offline</h1>
      <p>Aby korzystać z aplikacji, musisz mieć połączenie z internetem.</p>
      <button onClick={() => window.location.reload()}>Odśwież stronę</button>
    </>
  );
}

export default OfflinePage;
