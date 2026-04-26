# Baixar Vídeos da Biblioteca de Anúncios da Meta

Ferramenta web gratuita para baixar vídeos da [Meta Ad Library](https://facebook.com/ads/library) (Biblioteca de Anúncios do Facebook/Instagram).

## Como funciona

1. Arraste o bookmarklet (botão azul "🎬 Baixar Vídeo Meta") para sua barra de favoritos
2. Acesse https://facebook.com/ads/library e encontre um anúncio com vídeo
3. Dê play no vídeo
4. Clique no bookmarklet salvo nos favoritos
5. Um popup aparece com o link direto para download do vídeo

Sem precisar abrir DevTools, sem F12, sem conhecimentos técnicos.

## Stack

- HTML5 semântico
- CSS3 puro (sem frameworks)
- JavaScript puro (vanilla JS)
- Bookmarklet gerado dinamicamente via `encodeURIComponent()`

## Estrutura

```
download-videos-anuncios-meta/
├── index.html     # Página principal
├── style.css      # Estilos (responsivo, mobile-first)
├── script.js      # Geração do bookmarklet + interações
└── README.md      # Este arquivo
```

## Deploy

O site está publicado via GitHub Pages em:

**https://etudo.github.io/download-videos-anuncios-meta/**

## Licença

MIT
