/**
 * CDN Loader - 根据用户地区选择加载不同的 CDN 资源
 */
const CDNLoader = (() => {
  const REGION_KEY = 'site-region';

  const CDN_CONFIG = {
    international: {
      mdui: 'https://unpkg.com/mdui@2/mdui.css',
      mduiJs: 'https://unpkg.com/mdui@2/mdui.global.js',
      materialIcons: 'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
      notoSansSC: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap',
      fontsPreconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
      glightboxCss: 'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css',
      glightboxJs: 'https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js'
    },
    china: {
      mdui: 'https://cdn.bootcdn.net/ajax/libs/mdui/2.1.4/mdui.css',
      mduiJs: 'https://cdn.bootcdn.net/ajax/libs/mdui/2.1.4/mdui.global.js',
      materialIcons: 'https://fonts.font.im/icon?family=Material+Icons&display=swap',
      notoSansSC: 'https://fonts.font.im/css2?family=Noto+Sans+SC:wght@100..900&display=swap',
      fontsPreconnect: ['https://fonts.font.im', 'https://fonts.gstatic.font.im'],
      glightboxCss: 'https://cdn.bootcdn.net/ajax/libs/glightbox/3.3.1/css/glightbox.min.css',
      glightboxJs: 'https://cdn.bootcdn.net/ajax/libs/glightbox/3.3.1/js/glightbox.min.js'
    }
  };

  function getRegion() {
    return localStorage.getItem(REGION_KEY) || null;
  }

  function setRegion(region) {
    localStorage.setItem(REGION_KEY, region);
  }

  function getConfig() {
    const region = getRegion();
    return region ? CDN_CONFIG[region] : null;
  }

  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    return link;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function addPreconnect(href) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    if (href.includes('gstatic')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  }

  async function loadAll(options = {}) {
    const config = getConfig();
    if (!config) return false;

    addPreconnect(config.fontsPreconnect[0]);
    addPreconnect(config.fontsPreconnect[1]);

    loadCSS(config.mdui);
    loadCSS(config.materialIcons);
    loadCSS(config.notoSansSC);

    if (options.glightbox) {
      loadCSS(config.glightboxCss);
      await loadScript(config.glightboxJs);
    }

    await loadScript(config.mduiJs);

    return true;
  }

  function injectRegionToggle() {
    const toggle = document.createElement('div');
    toggle.className = 'region-toggle';
    toggle.innerHTML = `
      <mdui-dropdown class="region-dropdown" placement="bottom-end">
        <mdui-button slot="trigger" variant="text" title="切换地区">
          <mdui-icon name="public" slot="icon"></mdui-icon>
        </mdui-button>
        <mdui-menu selects="single" value="${getRegion() || ''}" id="regionMenu">
          <mdui-menu-item value="international">国际及港澳台</mdui-menu-item>
          <mdui-menu-item value="china">中国内地</mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .region-toggle {
        position: fixed;
        top: 1rem;
        right: 7rem;
        z-index: 1000;
      }
      @media (max-width: 600px) {
        .region-toggle {
          right: 6rem;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toggle);

    const menu = toggle.querySelector('#regionMenu');
    menu.addEventListener('change', (e) => {
      const newRegion = e.target.value;
      if (newRegion && newRegion !== getRegion()) {
        setRegion(newRegion);
        window.location.reload();
      }
    });
  }

  return {
    getRegion,
    setRegion,
    getConfig,
    loadAll,
    injectRegionToggle,
    CDN_CONFIG
  };
})();
