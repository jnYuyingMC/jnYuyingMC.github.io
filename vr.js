function choose() {
    mdui.dialog({
        title: '请选择源',
        content: '<p>自建源：速度更快但可能不稳定</p><p>Gayhub：国内访问加载速度极慢</p><p>YOUTUBE：在某些国家或地区不存在</p><p><small>本站立足于美利坚合众国，对全球校友服务，受北美法律保护。不受某些国家或地区对于某些网站的限制。</small></P>',
        stackedButtons: true,
        cssClass: 'mdui-text-color-theme mdui-typo',
        buttons: [
            {
                text: '自建源',
                onClick: function(list) {
                    window.location='http://mc.jnyuyingmc.top:666/yymc/vrview/examples/yuying';
                }
            },
            {
                text: 'Github',
                onClick: function(list) {
                    window.location='http://www.jnyuyingmc.top/vrview/examples/yuying';
                }
            },
            {
                text: 'YOUTUBE',
                onClick: function(list) {
                    window.location='https://www.youtube.com/watch?v=yJPJqXbNLg4';
                }
            }
        ]
    })
}