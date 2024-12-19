const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    signUp: (username, password) => ipcRenderer.invoke('sign-up', { username, password }),
<<<<<<< HEAD

    addAgency: (agencyData) => ipcRenderer.invoke('add-agency', agencyData),
=======
    searchAgencies: (criteria) => ipcRenderer.invoke('search', criteria),
>>>>>>> 0fb44009e82b2aa9ba0a7e4d58e420c57469b3f3
});