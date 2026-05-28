// App orchestrator — imports all modules, initializes shared functionality
import { sharedDict, mergeDict, detectLanguage, applyLanguage } from './i18n.js';
import { initTheme } from './theme.js';
import { initSiteUI } from './site-ui.js';

export function initApp(pageDict) {
  var dict = mergeDict(sharedDict, pageDict);
  var lang = detectLanguage(dict);

  // Theme first (visual consistency)
  initTheme();

  // Apply saved language
  applyLanguage(lang, dict);

  // Language menu
  var langMenu = document.getElementById('langMenu');
  var currentLang = lang;
  if (langMenu) {
    langMenu.addEventListener('change', function() {
      currentLang = langMenu.value;
      applyLanguage(currentLang, dict);
      // Re-apply theme in case i18n changed theme label
      if (window._applyTheme) {
        window._applyTheme(localStorage.getItem('theme-mode') || 'system');
      }
    });
  }

  // Shared UI (old site dialog, etc.)
  initSiteUI();
}
