// i18n engine + shared dictionary keys (present on ALL pages)

export const sharedDict = {
  zh: {
    'theme.toggleTitle': '切换主题',
    'theme.light': '亮色模式',
    'theme.dark': '暗色模式',
    'theme.system': '跟随系统',
    'fab.home': '首页',
    'fab.photos': '图片库',
    'fab.vr': 'VR 全景',
    'fab.region': '切换地区',
    'footer.copyright': 'Copyright © 2017 大育英帝国 Minecraft 计划项目组',
    'footer.ipv6': '本站支持 IPv6 访问',
    'footer.contact': '联系我们',
    'dialog.oldSite.title': '即将前往旧版页面',
    'dialog.oldSite.body': '您即将离开当前网站，前往旧版页面。旧版页面已停止维护，体验与当前版本不同。',
    'dialog.oldSite.cancel': '取消',
    'dialog.oldSite.confirm': '确定'
  },
  en: {
    'theme.toggleTitle': 'Switch Theme',
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    'theme.system': 'Follow System',
    'fab.home': 'Home',
    'fab.photos': 'Photos',
    'fab.vr': 'VR Panorama',
    'fab.region': 'Switch Region',
    'footer.copyright': 'Copyright © 2017 Our Great Yuying Minecraft Project Team',
    'footer.ipv6': 'This site supports IPv6 access',
    'footer.contact': 'Contact Us',
    'dialog.oldSite.title': 'Leaving for Legacy Page',
    'dialog.oldSite.body': 'You are about to leave the current website and visit the legacy page. The legacy page is no longer maintained and the experience may differ from the current version.',
    'dialog.oldSite.cancel': 'Cancel',
    'dialog.oldSite.confirm': 'OK'
  }
};

export function mergeDict(base, page) {
  var result = {};
  for (var lang in base) {
    result[lang] = Object.assign({}, base[lang], page[lang] || {});
  }
  return result;
}

export function detectLanguage(dict) {
  var saved = localStorage.getItem('site-lang');
  if (saved && dict[saved]) return saved;
  var nav = navigator.language || navigator.userLanguage || '';
  return nav.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function applyLanguage(lang, dict) {
  var d = dict[lang];
  if (!d) return;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  if (d.title) document.title = d.title;

  var attrs = {
    'data-i18n': 'textContent',
    'data-i18n-html': 'innerHTML',
    'data-i18n-title': 'title',
    'data-i18n-alt': 'alt',
    'data-i18n-headline': 'headline',
    'data-i18n-desc': 'data-desc'
  };

  Object.keys(attrs).forEach(function(attr) {
    var prop = attrs[attr];
    document.querySelectorAll('[' + attr + ']').forEach(function(el) {
      var key = el.getAttribute(attr);
      if (d[key] !== undefined) {
        if (prop === 'innerHTML') el.innerHTML = d[key];
        else if (prop === 'textContent') el.textContent = d[key];
        else el.setAttribute(prop, d[key]);
      }
    });
  });

  var langMenu = document.getElementById('langMenu');
  if (langMenu) langMenu.value = lang;
  localStorage.setItem('site-lang', lang);
}
