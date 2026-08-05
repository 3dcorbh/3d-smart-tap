# Hub NFC — Guia de Configuração

Cada cliente (restaurante) ganha uma página em `seusite.vercel.app/nome-do-cliente`,
com os dados vindos de uma planilha do Google Sheets. Você edita a planilha,
a página atualiza sozinha — não precisa mexer em código depois de configurado.

## Passo 1 — Criar a planilha

1. Crie uma planilha nova no Google Sheets.
2. Na primeira linha, coloque exatamente estas colunas (nesta ordem):

```
slug | nome | tagline | cor_primaria | cor_secundaria | inicial | cardapio_imagem_url | wifi_ssid | wifi_senha | google_review_url | whatsapp_url | instagram_url | pix_key
```

- `cardapio_imagem_url`: link direto de uma imagem do cardápio (foto ou print do PDF).
  Se o cardápio tiver mais de uma página, cole os links separados por `;`
  (ex: `link-pagina1.jpg;link-pagina2.jpg`). Se essa coluna ficar vazia, o site
  mostra automaticamente a lista de pratos cadastrados na aba de cardápio
  (com categorias e preços) — as duas formas convivem, você escolhe qual usar
  por cliente.

**Como pegar o link direto de uma imagem:**
1. Suba a foto/print do cardápio no Google Drive.
2. Clique com o botão direito → Compartilhar → "Qualquer pessoa com o link".
3. Copie o link e troque a parte `/view?usp=sharing` por `/preview` — ou,
   mais simples, use um serviço como [postimages.org](https://postimages.org)
   (gratuito, sem conta) que já entrega um link direto de imagem pronto
   pra colar na planilha.


3. Cada linha abaixo é um cliente. Exemplo:

```
bardoze | Bar do Zé | Botequim · Desde 1998 | #173A2E | #E7A82E | Z | https://link-do-cardapio.com | BarDoZe_Clientes | senha123 | https://g.page/r/xxxx/review | https://wa.me/5531999999999 | https://instagram.com/bardoze.oficial | 31999999999
```

- `slug` é o que vai aparecer na URL (`/bardoze`) — sem espaços, sem acento.
- Deixe uma célula em branco se aquele link não se aplica a esse cliente
  (ex: restaurante sem Pix na mesa) — o botão simplesmente não aparece.

## Passo 2 — Publicar a planilha como CSV

1. No Google Sheets: **Arquivo → Compartilhar → Publicar na Web**.
2. Selecione a aba certa e o formato **CSV**.
3. Clique em **Publicar** e copie o link gerado (algo como
   `https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv`).

## Passo 3 — Colocar o link da planilha no projeto

Abra o arquivo `pages/[slug].js` e cole o link no lugar de
`COLE_SEU_ID_AQUI`, ou (melhor, mais seguro) configure como variável de
ambiente `SHEET_CSV_URL` na Vercel — veja Passo 5.

## Passo 4 — Subir o projeto para o GitHub

1. Crie uma conta gratuita em [github.com](https://github.com) se ainda não tiver.
2. Crie um repositório novo (ex: `nfc-hub`).
3. Suba esta pasta inteira para o repositório (pelo site do GitHub dá pra
   arrastar os arquivos direto, sem usar linha de comando).

## Passo 5 — Deploy na Vercel (gratuito)

1. Crie uma conta em [vercel.com](https://vercel.com) usando sua conta do GitHub.
2. Clique em **Add New → Project** e selecione o repositório `nfc-hub`.
3. Em **Environment Variables**, adicione:
   - Nome: `SHEET_CSV_URL`
   - Valor: o link CSV copiado no Passo 2
4. Clique em **Deploy**. Em cerca de 1 minuto o projeto estará no ar em
   algo como `nfc-hub-seunome.vercel.app`.

## Passo 6 — Testar

Acesse `nfc-hub-seunome.vercel.app/bardoze` (troque pelo slug real do
cliente). Se a planilha estiver publicada e o slug bater, a página aparece
com os dados daquela linha.

## Passo 7 — Gravar a tag NFC

Grave a URL completa do cliente (ex: `nfc-hub-seunome.vercel.app/bardoze`)
na tag NFC usando um app como **NFC Tools** (Android/iOS). Isso só precisa
ser feito uma vez — qualquer alteração futura é só editar a planilha.

## Adicionando um cliente novo depois

Basta adicionar uma nova linha na planilha com um `slug` novo, e gravar
uma tag nova apontando para `seusite.vercel.app/novo-slug`. Não precisa
mexer no código nem fazer novo deploy.
