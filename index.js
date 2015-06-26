'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const GlobalShortcut = require('global-shortcut');
const Menu = require('menu');

// report crashes to the Electron project
require('crash-reporter').start();

// prevent window being GC'd
let mainWindow = null;

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
  initMenu();

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800
  });

  mainWindow.loadUrl('https://play.google.com/music');
  mainWindow.on('closed', function () {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
    GlobalShortcut.unregisterAll();
  });

  initPlayerButtons();
});

function initMenu() {
  var template;
  if (process.platform == 'darwin') {
    template = [{
      label: 'GPMP',
      submenu: [{
        label: 'About GPMP',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide Electron',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () {
          app.quit();
        }
      }]
    }, {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: function () {
          var focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow)
            focusedWindow.reload();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: function () {
          var focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: function () {
          var focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click: function () {
          require('shell').openExternal('https://github.com/importre/gpmp')
        }
      }, {
        label: 'Documentation',
        click: function () {
          require('shell').openExternal('https://github.com/importre/gpmp')
        }
      }, {
        label: 'Search Issues',
        click: function () {
          require('shell').openExternal('https://github.com/importre/gpmp/issues')
        }
      }]
    }];
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: function () {
          var focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow)
            focusedWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click: function () {
          var focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow)
            focusedWindow.reload();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: function () {
          var focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click: function () {
          var focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click: function () {
          require('shell').openExternal('https://github.com/importre/gpmp')
        }
      }, {
        label: 'Documentation',
        click: function () {
          require('shell').openExternal('https://github.com/importre/gpmp')
        }
      }, {
        label: 'Search Issues',
        click: function () {
          require('shell').openExternal('https://github.com/importre/gpmp/issues')
        }
      }]
    }];
  }

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function initPlayerButtons() {
  const func = `
    (function(el, keyCode) {
      var event = document.createEvent("Events");
      event.initEvent("keydown", true, true);
      event.keyCode = event.which = keyCode;
      el.dispatchEvent(event);
    })
  `;

  GlobalShortcut.register('MediaPlayPause', function () {
    var code = func + '(document.body, 32);';
    mainWindow.webContents.executeJavaScript(code);
  });

  GlobalShortcut.register('MediaNextTrack', function () {
    var code = func + '(document.body, 39);';
    mainWindow.webContents.executeJavaScript(code);
  });

  GlobalShortcut.register('MediaPreviousTrack', function () {
    var code = func + '(document.body, 37);';
    mainWindow.webContents.executeJavaScript(code);
  });
}