// Browser compatibility check — redirects unsupported browsers to unsupported.html
(function(){
  var ua=navigator.userAgent||'';
  if(ua.indexOf('MSIE')>-1||document.documentMode){window.location.href='unsupported.html';return;}
  if(ua.indexOf('Edge/')>-1&&ua.indexOf('Edg/')<0){window.location.href='unsupported.html';return;}
  var ver,browserVer;
  if(ua.indexOf('Firefox/')>-1){
    ver=ua.match(/Firefox\/([\d.]+)/);browserVer=ver?ver[1]:'';
    if(parseFloat(browserVer)<106){window.location.href='unsupported.html';return;}
  }else if(ua.indexOf('Safari/')>-1&&ua.indexOf('Chrome')<0){
    ver=ua.match(/Version\/([\d.]+)/);browserVer=ver?ver[1]:'';
    if(parseFloat(browserVer)<16.4){window.location.href='unsupported.html';return;}
  }else if(ua.indexOf('OPR/')>-1||ua.indexOf('Opera/')>-1){
    ver=ua.match(/(?:OPR|Opera)[/ ]([\d.]+)/);browserVer=ver?ver[1]:'';
    if(parseFloat(browserVer)<88){window.location.href='unsupported.html';return;}
  }else if(ua.indexOf('Chrome/')>-1){
    ver=ua.match(/Chrome\/([\d.]+)/);browserVer=ver?ver[1]:'';
    if(parseFloat(browserVer)<102){window.location.href='unsupported.html';return;}
  }else{window.location.href='unsupported.html';return;}
})();
