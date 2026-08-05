export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
        fontFamily: "system-ui, sans-serif",
        background: "#173A2E",
        color: "#F3EBDA",
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 28, margin: 0 }}>Hub NFC</h1>
      <p style={{ opacity: 0.7, maxWidth: 320 }}>
        Cada cliente tem sua própria página em{" "}
        <code>/nome-do-cliente</code>. Essa é só a página inicial do
        projeto.
      </p>
    </div>
  );
}
