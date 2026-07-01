# SEO e Indexação no Google — AlugaAqui

O que já foi implementado no código e o passo a passo que só você consegue fazer (login no Google, DNS, hospedagem).

## ✅ Já implementado no site (index.html / privacidade.html)

- Title e meta description otimizados com palavra-chave + cidade (Sumaré-SP)
- `<link rel="canonical">` apontando para `https://alugaaquimaquinas.com.br/`
- Open Graph e Twitter Card (compartilhamento em WhatsApp/Facebook/Instagram com preview correto)
- Dados estruturados JSON-LD:
  - `HomeAndConstructionBusiness` (nome, endereço, telefone, área de atendimento, catálogo de equipamentos)
  - `FAQPage` (as 6 perguntas do FAQ podem aparecer direto no resultado do Google)
- `robots.txt` e `sitemap.xml` na raiz do projeto
- Hierarquia de headings (H1 único, H2 por seção, H3 por item) e `alt` descritivo em todas as imagens já existia no site e foi mantida
- Meta tag `google-site-verification` com placeholder pronta para receber o código do Search Console (ver passo 2)

## ⚠️ Confirme antes de publicar

- **CNPJ** no rodapé: já está preenchido (03.037.369/0001-67) — confirme se é o correto.
- **Avaliações do Google** na seção de depoimentos: verifique se os textos exibidos são avaliações reais copiadas do Perfil da Empresa no Google. Não publique depoimentos fictícios — isso viola as políticas do Google e o Código de Defesa do Consumidor.
- **Imagens dos equipamentos**: já apontam para arquivos reais em `Design System Aluga Aqui/assets/machines/`. Ao publicar, considere mover essa pasta para algo como `/assets/` (sem espaço no nome) — nomes de pasta com espaço funcionam, mas URLs com `%20` são menos amigáveis para compartilhamento.

## 🚀 Passo a passo de indexação (você precisa fazer, requer login Google)

### 1. Publicar o site no domínio final
Suba os arquivos (`index.html`, `privacidade.html`, `robots.txt`, `sitemap.xml`, pasta `Design System Aluga Aqui/`, `cookie-consent.js`) para a hospedagem em **alugaaquimaquinas.com.br**.

### 2. Verificar propriedade no Google Search Console
1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione a propriedade — recomendo o tipo **"Domínio"** (cobre `www` e `não-www`, `http` e `https` de uma vez), verificado via registro TXT no DNS do domínio.
3. Se preferir o tipo **"Prefixo do URL"**, use o método **"Tag HTML"**: copie o código gerado e cole no `content=""` da tag `google-site-verification` no `index.html` (já está pronta no `<head>`, só falta substituir `SUBSTITUIR_PELO_CODIGO_DO_SEARCH_CONSOLE`).

### 3. Enviar o sitemap
No Search Console → **Sitemaps** → cole `sitemap.xml` → Enviar.

### 4. Solicitar indexação da URL principal
No Search Console → **Inspeção de URL** → cole `https://alugaaquimaquinas.com.br/` → **Solicitar indexação**. Repita para `privacidade.html`.

### 5. Criar/otimizar o Perfil da Empresa no Google (essencial para SEO local)
Isso é o que faz a AlugaAqui aparecer no Google Maps e no pacote local ("Perto de mim").
1. Acesse [business.google.com](https://business.google.com)
2. Categoria principal: **"Locadora de equipamentos para construção"** (ou "Equipment rental agency")
3. Preencha endereço, telefone, horário de funcionamento e site idênticos aos do rodapé do site (consistência de NAP — Nome/Endereço/Telefone — é um fator de ranqueamento local)
4. Adicione fotos reais da loja, equipe e equipamentos
5. Peça avaliações aos clientes reais após cada locação — isso alimenta a seção de depoimentos do site com conteúdo genuíno

### 6. Validar dados estruturados e performance
- [Rich Results Test](https://search.google.com/test/rich-results) — cole a URL e confirme que `HomeAndConstructionBusiness` e `FAQPage` aparecem sem erros
- [PageSpeed Insights](https://pagespeed.web.dev/) — cole a URL e cheque Core Web Vitals (o site já usa `loading="lazy"`, `font-display: swap` e imagens `.webp`, o que ajuda bastante)

### 7. (Recomendado) Google Analytics 4
Para acompanhar tráfego orgânico e conversões (cliques no WhatsApp). Posso implementar o script de tracking se você criar a propriedade em [analytics.google.com](https://analytics.google.com) e me passar o Measurement ID (`G-XXXXXXX`).

### 8. Backlinks e citações locais
Cadastre a AlugaAqui em diretórios como Google Meu Negócio (feito no passo 5), Facebook, Apontador, Solutudo e sindicatos/associações da construção civil de Sumaré/Campinas — cada citação com NAP consistente reforça a autoridade local.

---
**Prazo típico:** após enviar o sitemap e solicitar indexação, o Google costuma indexar a home em alguns dias a 2 semanas. O SEO local (Perfil da Empresa) tende a gerar resultado mais rápido que o ranqueamento orgânico da página.
