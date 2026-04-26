/* =====================================================
   script.js — Geração dinâmica do bookmarklet
   ===================================================== */

(function () {
  'use strict';

  // ---- Bookmarklet Code (raw, before minification) ----
  function buildBookmarkletCode() {
    return [
      '(function(){',
      'var v=document.querySelectorAll("video");',
      'if(!v.length){alert("Nenhum vídeo encontrado. Certifique-se de dar play no vídeo antes de clicar.");return;}',
      'var video=Array.from(v).find(function(e){return !e.paused})||v[0];',
      'var src=video.currentSrc||video.src;',
      'if(!src){var s=video.querySelector("source");if(s)src=s.src;}',
      'if(!src){alert("Não foi possível identificar a URL do vídeo. Tente dar play novamente.");return;}',
      'var popup=window.open("","_blank","width=520,height=280");',
      'popup.document.write(',
        '"<html><head><title>Link do Vídeo</title>"',
        '+"<style>",
        '+"body{font-family:sans-serif;padding:24px;background:#f8fafc;color:#1e293b}",
        '+"h2{color:#2563eb;margin-top:0}",
        '+"input{width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;margin:12px 0;box-sizing:border-box}",
        '+"button{background:#2563eb;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-size:14px;width:100%}",
        '+"button:hover{background:#1d4ed8}",
        '+"p{font-size:13px;color:#64748b;margin-top:12px}",
        '+"</style></head><body>",
        '+"<h2>\uD83C\uDFAC Link do Vídeo Encontrado</h2>",
        '+"<input id=\"vurl\" value=\\"'+src+'\\" readonly onclick=\"this.select()\">',
        '+"<button onclick=\"navigator.clipboard.writeText(document.getElementById(\\'vurl\\').value).then(function(){this.textContent=\'\\u2705 Copiado!\';var btn=this;setTimeout(function(){btn.textContent=\'\\uD83D\\uDCCB Copiar Link\'},2000)})\">',
          '\uD83D\uDCCB Copiar Link</button>',
        '+"<p>Cole o link no navegador e pressione Ctrl+S para salvar, ou clique com o botão direito \u2192 Salvar vídeo como.</p>",
        '+"</body></html>"',
      ');',
      '})();'
    ].join('');
  }

  // ---- Minify the code ----
  function minifyJS(code) {
    return code
      .replace(/\/\/.*?(\n|$)/g, '')       // single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')     // multi-line comments
      .replace(/\s+/g, ' ')                 // collapse whitespace
      .replace(/\s*([{}();,:+\-*/=<>!])\s*/g, '$1')  // tighten around operators
      .replace(/;}/g, '}')                  // remove last semicolons
      .trim();
  }

  // ---- Generate bookmarklet href ----
  function generateBookmarkletHref() {
    var rawCode = buildBookmarkletCode();
    var minified = minifyJS(rawCode);
    return 'javascript:' + encodeURIComponent(minified);
  }

  // ---- Inject bookmarklet into the DOM ----
  function injectBookmarklet() {
    var btn = document.getElementById('bookmarkletBtn');
    if (!btn) return;
    btn.href = generateBookmarkletHref();
  }

  // ---- Fallback toggle ----
  function setupFallbackToggle() {
    var toggle = document.getElementById('fallbackToggle');
    var content = document.getElementById('fallbackContent');
    if (!toggle || !content) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      content.classList.toggle('open');
    });
  }

  // ---- Mobile hamburger menu ----
  function setupHamburger() {
    var hamburger = document.getElementById('hamburgerBtn');
    var nav = document.getElementById('navMenu');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Close menu when clicking a nav link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    injectBookmarklet();
    setupFallbackToggle();
    setupHamburger();
  });

})();
