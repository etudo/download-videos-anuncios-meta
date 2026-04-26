/* =====================================================
   script.js — Bookmarklet + interações da página
   ===================================================== */

(function () {
  'use strict';

  // ---- Bookmarklet Code (raw) ----
  function buildBookmarkletCode() {
    var p = [];
    p.push('(function(){');
    p.push('var v=document.querySelectorAll("video");');
    p.push('if(!v.length){alert("Nenhum video encontrado. De play no video antes de clicar.");return}');
    p.push('var video=Array.from(v).find(function(e){return !e.paused})||v[0];');
    p.push('var src=video.currentSrc||video.src;');
    p.push('if(!src){var s=video.querySelector("source");if(s)src=s.src}');
    p.push('if(!src){alert("Nao foi possivel identificar a URL do video.");return}');
    p.push('var w=window.open("","_blank","width=520,height=280");');
    p.push('var h="<html><head><title>Link do Video</title><style>body{font-family:sans-serif;padding:24px;background:#f8fafc;color:#1e293b}h2{color:#a94293;margin-top:0}input{width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:13px;margin:12px 0;box-sizing:border-box}button{background:#a94293;color:#fff;border:none;padding:10px 20px;border-radius:50px;cursor:pointer;font-size:14px;width:100%;font-weight:600}button:hover{background:#8e3679}p{font-size:13px;color:#6c757d;margin-top:12px}</style></head><body><h2>\uD83C\uDFAC Link do Video Encontrado</h2><input id=vurl value=\\"\'+src+\'\\" readonly onclick=this.select()><button onclick=\\"navigator.clipboard.writeText(document.getElementById(\\\'vurl\\\').value).then(function(){this.textContent=\\\'\\u2705 Copiado!\\\';var b=this;setTimeout(function(){b.textContent=\\\'\\uD83D\\uDCCB Copiar Link\\\'},2000)})\\">\uD83D\uDCCB Copiar Link</button><p>Cole o link no navegador e pressione Ctrl+S para salvar.</p></body></html>";');
    p.push('w.document.write(h);');
    p.push('})()');
    return p.join('');
  }

  // ---- Minify ----
  function minifyJS(code) {
    return code
      .replace(/\/\/.*(\n|$)/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,:+\-*/=<>!])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();
  }

  // ---- Generate bookmarklet href ----
  function generateBookmarkletHref() {
    var raw = buildBookmarkletCode();
    var min = minifyJS(raw);
    return 'javascript:' + encodeURIComponent(min);
  }

  // ---- Inject href into anchor (synchronous) ----
  var btn = document.getElementById('bookmarkletBtn');
  if (btn) {
    btn.href = generateBookmarkletHref();
  }

  // ---- Fallback toggle ----
  var toggle = document.getElementById('fallbackToggle');
  var content = document.getElementById('fallbackContent');
  if (toggle && content) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      content.classList.toggle('open');
    });
  }

  // ---- Mobile menu toggle ----
  var menuToggle = document.getElementById('mobileMenuToggle');
  var mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  }

})();
