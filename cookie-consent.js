/* ════════════════════════════════════════════════════════
   AlugaAqui — Cookie Consent (LGPD)
   Injeta banner + modal de preferências, persiste a escolha
   em localStorage e dispara o evento "aa:consent" para que
   scripts de terceiros (Analytics, Pixel etc.) só carreguem
   depois do consentimento do visitante.
   ════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var STORAGE_KEY = 'aa_cookie_consent';
  var VERSION = 1;

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && parsed.v === VERSION ? parsed : null;
    } catch (e) { return null; }
  }

  function writeConsent(partial) {
    var payload = {
      v: VERSION,
      necessary: true,
      analytics: !!partial.analytics,
      marketing: !!partial.marketing,
      ts: new Date().toISOString()
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (e) {}
    document.dispatchEvent(new CustomEvent('aa:consent', { detail: payload }));
    return payload;
  }

  var css =
    '.aa-cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:250;background:#2A2725;' +
      'border-top:1px solid rgba(236,103,15,.35);box-shadow:0 -12px 40px rgba(0,0,0,.35);' +
      'padding:22px clamp(18px,5vw,80px);transform:translateY(120%);' +
      'transition:transform .5s cubic-bezier(.22,.61,.36,1);font-family:"Montserrat",system-ui,sans-serif;}' +
    '.aa-cc-banner.aa-cc-show{transform:translateY(0);}' +
    '.aa-cc-banner-inner{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;flex-wrap:wrap;}' +
    '.aa-cc-text{flex:1 1 380px;font-size:13.5px;line-height:1.65;color:#C9C2BC;}' +
    '.aa-cc-text strong{color:#FAF6F2;font-family:"Metropolis","Montserrat",sans-serif;font-weight:800;}' +
    '.aa-cc-text a{color:#EC670F;text-decoration:underline;text-underline-offset:2px;}' +
    '.aa-cc-actions{display:flex;gap:10px;flex-wrap:wrap;flex-shrink:0;}' +
    '.aa-cc-overlay{position:fixed;inset:0;z-index:400;background:rgba(42,39,37,.6);' +
      'backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .3s ease;}' +
    '.aa-cc-overlay.aa-cc-show{opacity:1;pointer-events:all;}' +
    '.aa-cc-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-46%);z-index:401;' +
      'width:min(520px,92vw);max-height:86vh;overflow-y:auto;background:#FAF6F2;border-radius:20px;' +
      'padding:32px 30px 28px;box-shadow:0 30px 80px rgba(0,0,0,.4);opacity:0;pointer-events:none;' +
      'transition:opacity .3s ease, transform .3s cubic-bezier(.22,.61,.36,1);font-family:"Montserrat",system-ui,sans-serif;}' +
    '.aa-cc-modal.aa-cc-show{opacity:1;pointer-events:all;transform:translate(-50%,-50%);}' +
    '.aa-cc-modal h2{font-family:"Metropolis","Montserrat",sans-serif;font-weight:900;font-size:22px;' +
      'color:#2A2725;margin-bottom:6px;letter-spacing:-.01em;padding-right:28px;}' +
    '.aa-cc-lead{font-size:13.5px;color:#6E6864;line-height:1.6;margin-bottom:20px;}' +
    '.aa-cc-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 0;border-bottom:1px solid #DAD3CC;}' +
    '.aa-cc-row:last-of-type{border-bottom:none;}' +
    '.aa-cc-row-title{font-family:"Metropolis","Montserrat",sans-serif;font-weight:800;font-size:14.5px;color:#2A2725;margin-bottom:4px;}' +
    '.aa-cc-row-desc{font-size:12.5px;color:#6E6864;line-height:1.55;max-width:34ch;}' +
    '.aa-cc-switch{position:relative;flex-shrink:0;width:44px;height:26px;margin-top:2px;}' +
    '.aa-cc-switch input{opacity:0;width:0;height:0;position:absolute;}' +
    '.aa-cc-slider{position:absolute;inset:0;background:#DAD3CC;border-radius:99px;cursor:pointer;transition:background .2s;}' +
    '.aa-cc-slider::before{content:"";position:absolute;left:3px;top:3px;width:20px;height:20px;background:#fff;' +
      'border-radius:50%;transition:transform .2s cubic-bezier(.22,.61,.36,1);box-shadow:0 2px 6px rgba(0,0,0,.25);}' +
    '.aa-cc-switch input:checked + .aa-cc-slider{background:#EC670F;}' +
    '.aa-cc-switch input:checked + .aa-cc-slider::before{transform:translateX(18px);}' +
    '.aa-cc-switch input:disabled + .aa-cc-slider{background:#F0B48A;cursor:not-allowed;opacity:.75;}' +
    '.aa-cc-modal-actions{display:flex;gap:10px;margin-top:24px;flex-wrap:wrap;}' +
    '.aa-cc-modal-actions .btn{flex:1;}' +
    '.aa-cc-close{position:absolute;top:16px;right:16px;width:34px;height:34px;border-radius:9px;' +
      'display:flex;align-items:center;justify-content:center;color:#A8A09B;transition:background .18s,color .18s;}' +
    '.aa-cc-close:hover{background:#FEF4EE;color:#EC670F;}' +
    '@media(max-width:640px){.aa-cc-banner-inner{flex-direction:column;align-items:stretch;}' +
      '.aa-cc-actions{width:100%;}.aa-cc-actions .btn{flex:1;}}';

  var style = document.createElement('style');
  style.id = 'aa-cc-styles';
  style.textContent = css;
  document.head.appendChild(style);

  var markup =
    '<div class="aa-cc-banner" id="aaCcBanner" role="region" aria-live="polite" aria-label="Aviso de cookies">' +
      '<div class="aa-cc-banner-inner">' +
        '<div class="aa-cc-text">' +
          '<strong>Este site utiliza cookies.</strong> Usamos cookies necessários para o funcionamento do site e, ' +
          'mediante o seu consentimento, cookies analíticos e de marketing para melhorar sua experiência. ' +
          'Saiba mais na nossa <a href="privacidade.html#cookies">Política de Privacidade</a>.' +
        '</div>' +
        '<div class="aa-cc-actions">' +
          '<button type="button" class="btn btn-outline btn-sm" id="aaCcReject">Rejeitar não essenciais</button>' +
          '<button type="button" class="btn btn-ghost btn-sm" id="aaCcCustomize">Personalizar</button>' +
          '<button type="button" class="btn btn-primary btn-sm" id="aaCcAcceptAll">Aceitar todos</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="aa-cc-overlay" id="aaCcOverlay"></div>' +
    '<div class="aa-cc-modal" id="aaCcModal" role="dialog" aria-modal="true" aria-label="Preferências de cookies">' +
      '<button type="button" class="aa-cc-close" id="aaCcModalClose" aria-label="Fechar">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
      '<h2>Preferências de cookies</h2>' +
      '<p class="aa-cc-lead">Escolha quais categorias de cookies você permite. Cookies necessários não podem ser ' +
        'desativados, pois garantem o funcionamento básico do site.</p>' +
      '<div class="aa-cc-row">' +
        '<div><div class="aa-cc-row-title">Necessários</div>' +
          '<div class="aa-cc-row-desc">Essenciais para a navegação e as funcionalidades básicas do site. Sempre ativos.</div></div>' +
        '<label class="aa-cc-switch"><input type="checkbox" checked disabled><span class="aa-cc-slider"></span></label>' +
      '</div>' +
      '<div class="aa-cc-row">' +
        '<div><div class="aa-cc-row-title">Analíticos</div>' +
          '<div class="aa-cc-row-desc">Ajudam a entender como os visitantes usam o site, de forma agregada, para melhorarmos a experiência.</div></div>' +
        '<label class="aa-cc-switch"><input type="checkbox" id="aaCcAnalytics"><span class="aa-cc-slider"></span></label>' +
      '</div>' +
      '<div class="aa-cc-row">' +
        '<div><div class="aa-cc-row-title">Marketing</div>' +
          '<div class="aa-cc-row-desc">Usados para exibir comunicações e anúncios mais relevantes com base na sua navegação.</div></div>' +
        '<label class="aa-cc-switch"><input type="checkbox" id="aaCcMarketing"><span class="aa-cc-slider"></span></label>' +
      '</div>' +
      '<div class="aa-cc-modal-actions">' +
        '<button type="button" class="btn btn-outline btn-sm" id="aaCcRejectModal">Rejeitar não essenciais</button>' +
        '<button type="button" class="btn btn-primary btn-sm" id="aaCcSave">Salvar preferências</button>' +
      '</div>' +
    '</div>';

  var wrap = document.createElement('div');
  wrap.innerHTML = markup;
  document.body.appendChild(wrap);

  var banner    = document.getElementById('aaCcBanner');
  var overlay   = document.getElementById('aaCcOverlay');
  var modal     = document.getElementById('aaCcModal');
  var analytics = document.getElementById('aaCcAnalytics');
  var marketing = document.getElementById('aaCcMarketing');

  function showBanner() { banner.classList.add('aa-cc-show'); }
  function hideBanner() { banner.classList.remove('aa-cc-show'); }

  function openModal() {
    var consent = readConsent();
    analytics.checked = !!(consent && consent.analytics);
    marketing.checked = !!(consent && consent.marketing);
    hideBanner();
    overlay.classList.add('aa-cc-show');
    modal.classList.add('aa-cc-show');
  }

  function closeModal() {
    overlay.classList.remove('aa-cc-show');
    modal.classList.remove('aa-cc-show');
    if (!readConsent()) showBanner();
  }

  document.getElementById('aaCcAcceptAll').addEventListener('click', function () {
    writeConsent({ analytics: true, marketing: true });
    hideBanner();
  });
  document.getElementById('aaCcReject').addEventListener('click', function () {
    writeConsent({ analytics: false, marketing: false });
    hideBanner();
  });
  document.getElementById('aaCcRejectModal').addEventListener('click', function () {
    writeConsent({ analytics: false, marketing: false });
    closeModal();
  });
  document.getElementById('aaCcCustomize').addEventListener('click', openModal);
  document.getElementById('aaCcSave').addEventListener('click', function () {
    writeConsent({ analytics: analytics.checked, marketing: marketing.checked });
    closeModal();
  });
  document.getElementById('aaCcModalClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('aa-cc-show')) closeModal();
  });

  /* Qualquer elemento com [data-cc-open] reabre as preferências (ex: link no rodapé) */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('[data-cc-open]');
    if (trigger) { e.preventDefault(); openModal(); }
  });

  var existing = readConsent();
  if (existing) {
    document.dispatchEvent(new CustomEvent('aa:consent', { detail: existing }));
  } else {
    setTimeout(showBanner, 650);
  }

  window.AACookieConsent = { open: openModal, get: readConsent };
})();
