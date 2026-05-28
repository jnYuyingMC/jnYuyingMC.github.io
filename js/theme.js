// Theme toggle — light / dark / follow-system
export function initTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById('themeIcon');
  const themeMenu = document.getElementById('themeMenu');
  if (!themeMenu) return;

  function applyTheme(mode) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    let dark;
    if (mode === 'system') {
      dark = mq.matches;
      themeIcon.setAttribute('name', 'settings_suggest');
    } else if (mode === 'dark') {
      dark = true;
      themeIcon.setAttribute('name', 'dark_mode');
    } else {
      dark = false;
      themeIcon.setAttribute('name', 'light_mode');
    }
    html.classList.toggle('mdui-theme-dark', dark);
  }

  let savedMode = localStorage.getItem('theme-mode') || 'system';
  themeMenu.value = savedMode;
  applyTheme(savedMode);

  themeMenu.addEventListener('change', () => {
    savedMode = themeMenu.value;
    localStorage.setItem('theme-mode', savedMode);
    applyTheme(savedMode);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (savedMode === 'system') applyTheme('system');
  });

  // Expose for i18n to re-apply after language switch
  window._applyTheme = applyTheme;
}
