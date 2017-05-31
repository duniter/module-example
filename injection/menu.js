(function inject(window) {

  "use strict";


  /***********
   * rml9-web-module code
   */

  var openNewTab = window.openNewTab
  var mainWindow = window.mainWindow

  window.uiModules['rml9-web-module'] = {
    menuIconClass: 'fa-cloud',
    menuLabel: 'Module Web',
    menuOpen: openRML9WebModule
  }

  function openRML9WebModule() {

    var webModuleHeight = parseInt(localStorage.getItem('rml9_web_module_height')) || 1000;
    var webModuleWidth = parseInt(localStorage.getItem('rml9_web_module_width')) || 1400;

    openNewTab (window.location.origin + '/rml9-web-module/index.html', {
      position: 'center',
      height: webModuleHeight,
      width: webModuleWidth,
      show: false
    }, function(win) {
      win.show();
      // Remember the window size
      win.on('closed', function() {
        localStorage.setItem('rml9_web_module_height', win.window.innerHeight - 8); // Seems to always have 8 pixels more
        localStorage.setItem('rml9_web_module_width', win.window.innerWidth - 16); // Seems to always have 16 pixels more
        mainWindow.focus();
      });
    });
  }

})(window);
