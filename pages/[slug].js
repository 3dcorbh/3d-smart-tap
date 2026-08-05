import { parseCSV } from "../lib/csv";

// COLE AQUI o link da sua planilha publicada como CSV
// (Arquivo > Compartilhar > Publicar na web > formato CSV)
const SHEET_CSV_URL =
  process.env.SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/COLE_SEU_ID_AQUI/pub?output=csv";

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCSV(text);

    const cliente = rows.find(
      (r) => (r.slug || "").toLowerCase() === params.slug.toLowerCase()
    );

    if (!cliente) {
      return { notFound: true };
    }

    return { props: { cliente } };
  } catch (err) {
    return { notFound: true };
  }
}

export default function ClientePage({ cliente }) {
  const {
    nome,
    tagline,
    cor_primaria = "#173A2E",
    cor_secundaria = "#E7A82E",
    inicial,
    cardapio_url,
    wifi_ssid,
    wifi_senha,
    google_review_url,
    whatsapp_url,
    instagram_url,
    pix_key,
  } = cliente;

  const links = [
    cardapio_url && {
      href: cardapio_url,
      icon: "🍽️",
      label: "Ver cardápio",
      sub: "Pratos, porções e bebidas",
      primary: true,
    },
    wifi_ssid && {
      href: `#`,
      icon: "📶",
      label: "Ver senha do Wi-Fi",
      sub: `Rede: ${wifi_ssid} · toque para copiar a senha`,
      isWifi: true,
      wifiSenha: wifi_senha,
    },
    google_review_url && {
      href: google_review_url,
      icon: "⭐",
      label: "Avaliar no Google",
      sub: "Leva 20 segundos, ajuda muito",
    },
    whatsapp_url && {
      href: whatsapp_url,
      icon: "💬",
      label: "Chamar no WhatsApp",
      sub: "Reservas e encomendas",
    },
    instagram_url && {
      href: instagram_url,
      icon: "📷",
      label: "Seguir no Instagram",
      sub: instagram_url.replace("https://instagram.com/", "@"),
    },
    pix_key && {
      href: `#`,
      icon: "💠",
      label: "Pagar com Pix",
      sub: "Toque para copiar a chave",
      isPix: true,
      pixKey: pix_key,
    },
  ].filter(Boolean);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "28px 16px 40px",
        fontFamily: "'Karla', system-ui, sans-serif",
        background: cor_primaria,
        color: "#F3EBDA",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div
          style={{
            width: 112,
            height: 112,
            margin: "6px auto 14px",
            borderRadius: "50%",
            background: cor_secundaria,
            border: `4px solid rgba(0,0,0,0.25)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            color: cor_primaria,
            fontSize: 34,
          }}
        >
          {inicial || nome?.[0] || "?"}
        </div>

        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <h1 style={{ fontSize: 36, margin: 0, color: cor_secundaria }}>
            {nome}
          </h1>
          {tagline && (
            <p
              style={{
                marginTop: 8,
                fontSize: 13,
                letterSpacing: 2,
                textTransform: "uppercase",
                opacity: 0.6,
                fontWeight: 700,
              }}
            >
              {tagline}
            </p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={
                link.isPix
                  ? (e) => {
                      e.preventDefault();
                      navigator.clipboard?.writeText(link.pixKey);
                      alert("Chave Pix copiada!");
                    }
                  : link.isWifi
                  ? (e) => {
                      e.preventDefault();
                      navigator.clipboard?.writeText(link.wifiSenha || "");
                      alert(`Senha copiada: ${link.wifiSenha}`);
                    }
                  : undefined
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                textDecoration: "none",
                color: link.primary ? cor_primaria : "#F3EBDA",
                background: link.primary
                  ? cor_secundaria
                  : "rgba(255,255,255,0.06)",
                border: link.primary
                  ? "none"
                  : "1px solid rgba(243,235,218,0.14)",
                borderRadius: 12,
                padding: "14px 16px",
                fontWeight: 700,
                fontSize: 15.5,
              }}
            >
              <span style={{ fontSize: 20 }}>{link.icon}</span>
              <span style={{ flex: 1 }}>
                <div>{link.label}</div>
                <small style={{ fontWeight: 500, opacity: 0.65, fontSize: 11.5 }}>
                  {link.sub}
                </small>
              </span>
              <span style={{ opacity: 0.4 }}>›</span>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 30, fontSize: 10.5, opacity: 0.3 }}>
          plaquinha por 3D Cor BH · @3dcorbh
        </div>
      </div>
    </div>
  );
}
