const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');


function createWindow () {
    win = new BrowserWindow({
        width: 500,
        height: 500,
        maximizable: false
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/content/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open DevTools.
    // win.on('keydown', function(e){
    //     // show chrome devtools on f12 or commmand+option+j
    //     if (e.keyIdentifier === 'F12' || e.keyCode === 74) {
            win.webContents.openDevTools();
    //     }
    // });
    

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})


