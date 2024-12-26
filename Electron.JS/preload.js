const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    signUp: (username, password) => ipcRenderer.invoke('sign-up', { username, password }),

    addAgency: (agencyData) => ipcRenderer.invoke('add-agency', agencyData),

    searchAgencies: (criteria) => ipcRenderer.invoke('search', criteria),

    updateSettings: (updateData) => ipcRenderer.invoke('agency-rule-1', updateData),

    getAgencyTypes: () => ipcRenderer.invoke('get-agency-types'),

    getProductsByAgency: (type) => ipcRenderer.invoke('get-products', type),

    updateAgencyTypeSettings: (updateData) => ipcRenderer.invoke('agency-type-1', updateData),

    deleteProductByAgnecy: (productCode, unit, type) => ipcRenderer.invoke('delete-product', { productCode, unit, type }),

    updateProductByAgency: (productCode, unit, type, price) => ipcRenderer.invoke('update-product', { productCode, unit, type, price }),
    
    getProductsByCode: (productCode, unit, type) => ipcRenderer.invoke('get-products-code', {productCode, unit, type}),
});