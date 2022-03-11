'use strict'

import {app, protocol, BrowserWindow, ipcMain, dialog} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'

const path = require('path')

const Store = require('electron-store');

Store.initRenderer();

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    const store = new Store();

    let pos_x = store.get("windowPos") ? store.get("windowPos")[0] : 500;
    let pos_y = store.get("windowPos") ? store.get("windowPos")[1] : 500;
    let width_x = store.get("windowSize") ? store.get("windowSize")[0] : 1200;
    let width_y = store.get("windowSize") ? store.get("windowSize")[1] : 800;

    // Create the browser window.
    const win = new BrowserWindow({
        x: pos_x,
        y: pos_y,
        width: width_x,
        height: width_y,
        minWidth: 1200,
        minHeight: 720,
        frame: false,
        hasShadow: false,
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        //if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    let changed = false;

    win.on("move", () => {
        changed = true;
    })

    win.on("resize", () => {
        changed = true;
    })

    setInterval(() => {
        if (changed) {
            store.set("windowPos", win.getPosition());
            store.set("windowSize", win.getSize());
            changed = false;
        }
    }, 1000)

    ipcMain.on('folder-dialog', () => {

        dialog.showOpenDialog(win, {properties: ["openDirectory"]})
            .then(data => win.webContents.send('folder-dialog-response', data))
    })

    ipcMain.on('controlButton', (event, arg) => {
        // console.log(event, arg);
        switch (arg.action) {
            case 'close':
                if (process.platform !== 'darwin') {
                    app.exit();
                }
                break;
            case 'minimize':
                win.minimize();
                break;
            case 'maximize':
                if (!win.isMaximized()) {
                    win.maximize();
                } else {
                    win.unmaximize();
                }
                break;
            default:
            // console.log(arg.action);
            // code block
        }
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}