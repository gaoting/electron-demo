const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  globalShortcut,
} = require("electron");

function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600 });

  // 打开调试工具
  win.webContents.openDevTools()
  win.loadFile("index.html");
}

const menu = new Menu();
menu.append(
  new MenuItem({
    label: "Electron",
    submenu: [
      {
        role: "help",
        accelerator:
          process.platform === "darwin" ? "Alt+Cmd+I" : "Alt+Shift+I",
        click: () => {
          console.log("rocksssssss");
        },
      },
    ],
  })
);

Menu.setApplicationMenu(menu);

app
  .whenReady()
  .then(() => {
    // globalShortcut.register("Alt+CommandOrControl+I", () => {
    //   console.log(object);
    // });
    const win = new BrowserWindow({ width: 800, height: 600 });


    win.loadFile("index.html");
    win.webContents.on("before-input-event", (event, input) => {
      if (input.control && input.key.toLowerCase() === "i") {
        console.log("Pressed Control+I");
        event.preventDefault();
      }
    });
  })
  .then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit("Electron loves global shortcuts!");
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
