const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

let mainWindow;
let tray;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 450,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("minimize", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

}

app.whenReady().then(() => {

  createWindow();

  tray = new Tray(path.join(__dirname, "icon.png"));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Clipboard Sync");
  tray.setContextMenu(contextMenu);

});