function choose() {
    mdui.dialog({
        title: '请选择源',
        content: '<p>自建源：使用了Google提供的框架，速度更快但可能不稳定</p><p>Gayhub：使用了Google提供的框架，国内访问加载速度极慢</p><p>YouTube：在某些国家或地区不存在</p><p>720yun：站在访问者的角度这个应该是最好的，但因为他是第三方商业所以我们并不推荐</p><p><small>本站立足于美利坚合众国，对全球校友服务，受北美法律保护。不受某些国家或地区对于某些网站的限制。</small></P>',
        stackedButtons: true,
        cssClass: 'mdui-text-color-theme mdui-typo',
        buttons: [
            {
                text: '自建源',
                onClick: function(list) {
                    window.open('http://mc.jnyuyingmc.top:666/yymc/vrview/examples/yuying');
                }
            },
            {
                text: 'Github',
                onClick: function(list) {
                    window.open('http://www.jnyuyingmc.top/vrview/examples/yuying');
                }
            },
            {
                text: 'YouTube',
                onClick: function(list) {
                    window.open('https://youtu.be/l9ow1rA80oY');
                }
            },
            {
                text: '720yun',
                onClick: function(list) {
                    window.open('http://720yun.com/t/85o8ljnaercdxln604');
                }
            },
            {
                text: '打开主站',
                onClick: function(list) {
                    window.open('http://www.jnyuyingmc.top');
                }
            }
        ]
    });
}
