const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    signUp: (username, password) => ipcRenderer.invoke('sign-up', { username, password }),

    addAgency: (agencyData) => ipcRenderer.invoke('add-agency', agencyData),
    
    searchAgencies: (criteria) => ipcRenderer.invoke('search', criteria),
});