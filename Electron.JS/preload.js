const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    signUp: (username, password) => ipcRenderer.invoke('sign-up', { username, password }),

    addAgency: (agencyData) => ipcRenderer.invoke('add-agency', agencyData),
<<<<<<< HEAD
    
=======

>>>>>>> ecae3e964faa5f812fb7be7992f88c54df91a46b
    searchAgencies: (criteria) => ipcRenderer.invoke('search', criteria),
});