import { parseCSV } from "../../lib/csv";
import Link from "next/link";

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

    if (!cliente || !cliente.cardapio_url) {
      return { notFound: true };
    }

    return {
      props: {
        cliente,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function CardapioPage({ cliente }) {
  const {
    slug,
    nome,
    cardapio_url,
    cor_primaria = "#173A2E",
    cor_secundaria = "#E7A82E",
  } = cliente;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: cor_primaria,
        color: "#F3EBDA",
        padding: "20px 16px 40px",
        fontFamily: "'Karla', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <Link
          href={`/${slug}`}
          style={{
            display: "inline-block",
            marginBottom: 20,
            padding: "10px 16px",
            borderRadius: 10,
            background: cor_secundaria,
            color: cor_primaria,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Voltar
        </Link>

        <h1
          style={{
            textAlign: "center",
            color: cor_secundaria,
            marginBottom: 20,
          }}
        >
          Cardápio — {nome}
        </h1>

        <div
          style={{
            background: "#ffffff",
            padding: 10,
            borderRadius: 14,
          }}
        >
          <img
            src={cardapio_url}
            alt={`Cardápio ${nome}`}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: 8,
            }}
          />
        </div>

        <Link
          href={`/${slug}`}
          style={{
            display: "block",
            width: "fit-content",
            margin: "24px auto 0",
            padding: "12px 20px",
            borderRadius: 10,
            background: cor_secundaria,
            color: cor_primaria,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
