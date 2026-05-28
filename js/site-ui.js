// Shared UI wiring — old site dialog, skip-to-content
export function initSiteUI() {
  // Old site dialog
  var oldSiteLink = document.getElementById('oldSiteLink');
  var oldSiteConfirm = document.getElementById('oldSiteConfirm');
  var oldSiteDialog = document.getElementById('oldSiteDialog');
  if (oldSiteLink && oldSiteDialog) {
    oldSiteLink.addEventListener('click', function(e) {
      e.preventDefault();
      oldSiteDialog.open = true;
    });
  }
  if (oldSiteConfirm && oldSiteDialog) {
    oldSiteConfirm.addEventListener('click', function() {
      window.open('https://www.jnyuyingmc.top/original/', '_blank', 'noopener,noreferrer');
      oldSiteDialog.open = false;
    });
  }
}
