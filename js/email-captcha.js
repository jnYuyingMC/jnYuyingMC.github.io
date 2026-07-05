// Email reveal with PlayCaptcha verification
// Lazy-loads React 19 + Motion + playcaptcha only on first click
const PLAYCAPTCHA_BASE = 'https://cdn.jsdelivr.net/npm/playcaptcha@0.1.0';
const ASSET_BASE = PLAYCAPTCHA_BASE + '/assets/toys/';

let _captchaDeps = null;

async function loadCaptchaDeps() {
  if (_captchaDeps) return _captchaDeps;
  _captchaDeps = (async () => {
    // Lazy-load playcaptcha CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = PLAYCAPTCHA_BASE + '/dist/clawcaptcha.css';
    document.head.appendChild(link);

    // Dynamic imports — bare imports resolved via importmap in <head>
    const React = await import('react');
    const ReactDOMClient = await import('react-dom/client');
    const mod = await import(PLAYCAPTCHA_BASE + '/dist/index.min.js');
    return { React, createRoot: ReactDOMClient.createRoot, ClawCaptcha: mod.ClawCaptcha };
  })();
  return _captchaDeps;
}

function decodeEmail(encoded) {
  try { return atob(encoded); }
  catch (e) { return ''; }
}

function revealEmail(button) {
  const email = decodeEmail(button.dataset.email || '');
  if (!email) return;
  const isFooter = button.classList.contains('email-reveal--footer');
  const a = document.createElement('a');
  a.href = 'mailto:' + email;
  a.textContent = email;
  a.style.color = isFooter ? '#a7f3d0' : '#00897b';
  a.style.textDecoration = 'none';
  button.parentNode.replaceChild(a, button);
}

async function showCaptchaDialog(button) {
  const lang = (localStorage.getItem('site-lang') === 'en') ? 'en' : 'zh';
  const i18n = {
    title: lang === 'en' ? 'Verification' : '人机验证',
    loading: lang === 'en' ? 'Loading...' : '加载中...',
    cancel: lang === 'en' ? 'Cancel' : '取消',
    error: lang === 'en' ? 'Failed to load. Please refresh.' : '加载失败，请刷新重试。'
  };

  // Build MDUI dialog
  const dialog = document.createElement('mdui-dialog');
  dialog.className = 'captcha-dialog';
  dialog.setAttribute('headline', i18n.title);
  dialog.style.setProperty('--mdui-color-primary', '#00897b');

  const container = document.createElement('div');
  container.className = 'captcha-container';

  // Calculate zoom dynamically: claw-machine is ~708px tall + dialog chrome ~160px
  // Use 75% of viewport height (mobile address bars eat space)
  var vh = window.innerHeight, vw = window.innerWidth;
  var zoomByHeight = (vh * 0.75 - 160) / 708;
  var zoomByWidth = (vw * 0.92 - 40) / 460;
  var zoom = Math.min(zoomByHeight, zoomByWidth);
  if (zoom > 1) zoom = 1;
  if (zoom < 0.35) zoom = 0.35;
  container.style.zoom = zoom;

  const loading = document.createElement('div');
  loading.textContent = i18n.loading;
  loading.style.color = '#888';
  container.appendChild(loading);
  dialog.appendChild(container);

  const cancelBtn = document.createElement('mdui-button');
  cancelBtn.setAttribute('slot', 'action');
  cancelBtn.setAttribute('variant', 'text');
  cancelBtn.textContent = i18n.cancel;
  cancelBtn.addEventListener('click', () => { dialog.open = false; });
  dialog.appendChild(cancelBtn);

  document.body.appendChild(dialog);

  // Ensure MDUI dialog is upgraded
  if (window.customElements && customElements.whenDefined) {
    await customElements.whenDefined('mdui-dialog');
  }
  dialog.open = true;

  let root = null;
  dialog.addEventListener('close', () => {
    if (root) { try { root.unmount(); } catch (e) { /* noop */ } }
    dialog.remove();
  });

  try {
    const { React, createRoot, ClawCaptcha } = await loadCaptchaDeps();
    loading.remove();
    root = createRoot(container);
    const handleVerify = () => {
      try { root.unmount(); } catch (e) { /* noop */ }
      dialog.open = false;
      revealEmail(button);
    };
    root.render(React.createElement(ClawCaptcha, {
      assetBase: ASSET_BASE,
      onVerify: handleVerify
    }));
  } catch (err) {
    loading.textContent = i18n.error;
    console.error('PlayCaptcha load error:', err);
  }
}

export function initEmailCaptcha() {
  document.querySelectorAll('.email-reveal').forEach(function(btn) {
    if (btn.dataset.captchaBound) return;
    btn.dataset.captchaBound = '1';
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      showCaptchaDialog(btn);
    });
  });
}
