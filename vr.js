function choose() {
    mdui.dialog({
        title: '请选择源',
        content: '<p>自建源：速度更快但可能不稳定</p><p>Gayhub：国内访问加载速度极慢</p>',
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
                    window.location='http://www.jnyuyingmc.top/vrview/examples/yuying/';
                }
            }
        ]
    })
}