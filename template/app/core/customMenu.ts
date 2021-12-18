import { MenuItemConstructorOptions, MenuItem, shell, app, BrowserWindow } from 'electron';

import { isDarwin } from './utils';

const customMenu: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    label: '平台',
    role: 'help',
    submenu: [
      {
        label: '源码',
        click: function () {
          shell.openExternal('https://fujia.site/');
        },
      },
    ],
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
      },
      {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
      },
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectAll',
      },
    ],
  },
  {
    label: '视图',
    submenu: [
      {
        label: '刷新',
        accelerator: 'CmdOrCtrl+R',
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        },
      },
      {
        label: '全屏',
        accelerator: (() => {
          if (isDarwin) {
            return 'Ctrl+Command+F';
          }
          return 'F11';
        })(),
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
      },
      {
        label: '开发者工具',
        role: 'toggleDevTools',
        accelerator: (() => {
          if (isDarwin) {
            return 'Alt+Command+I';
          }

          return 'Ctrl+Shift+I';
        })(),
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.webContents.openDevTools();
          }
        },
      },
      {
        label: '窗口',
        role: 'window',
        submenu: [
          {
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize',
          },
          {
            label: '关闭',
            accelerator: 'CmdOrCtrl+W',
            role: 'close',
          },
          {
            type: 'separator',
          },
        ],
      },
      {
        label: '设置',
      },
    ],
  },
];

if (isDarwin) {
  const { name } = app;
  customMenu.unshift({
    label: name,
    submenu: [
      {
        label: '关于 ' + name,
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: '服务',
        role: 'services',
        submenu: [],
      },
      {
        type: 'separator',
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide',
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideOthers',
      },
      {
        label: 'Show All',
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        label: '退出',
        accelerator: 'Command+Q',
        click: function () {
          app.quit();
        },
      },
    ],
  });
}

export default customMenu;
