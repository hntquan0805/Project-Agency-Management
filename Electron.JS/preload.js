const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    login: (name, password) => ipcRenderer.invoke('login', { name, password }),

    signUp: (username, password) => ipcRenderer.invoke('sign-up', { username, password }),

    addAgency: (agencyData) => ipcRenderer.invoke('add-agency', agencyData),

    getAgencyData: () => ipcRenderer.invoke('get-agency-data'),

    getAgencyCode: (agency_name) => ipcRenderer.invoke('get-agency-code', agency_name),

    searchAgencies: (criteria) => ipcRenderer.invoke('search', criteria),

    updateAgency: (criteria) => ipcRenderer.invoke('update-agency-data', criteria),

    searchDeliveryNotesByDate: (criteria) => ipcRenderer.invoke('search-by-month', criteria),

    countNoteByAgency: (criteria) => ipcRenderer.invoke('count-agency', criteria),

    saveGoodsReceivedNote: (criteria) => ipcRenderer.invoke('save-received-note', criteria),

    calculateProportion: (criteria) => ipcRenderer.invoke('cal-propor', criteria),
    
    renderDebtTable: (month, year, table) => ipcRenderer.invoke('debt-report', { month, year, table }),

    saveRevenueReport: (month, year, reportData) => ipcRenderer.invoke('save-revenue-report', { month, year, reportData }),

    saveDebtHistory: (month, year, table_debt) => ipcRenderer.invoke('save-debt-history', { month, year, table_debt }),

    updateSettings: (updateData) => ipcRenderer.invoke('agency-rule-1', updateData),

    getAgencyTypes: () => ipcRenderer.invoke('get-agency-types'),
    
    saveFormData: (formData) => ipcRenderer.invoke('save-distribute-data', formData),

    getProductsByAgency: (type) => ipcRenderer.invoke('get-products', type),

    updateAgencyTypeSettings: (updateData) => ipcRenderer.invoke('agency-type-1', updateData),

    deleteProductByAgnecy: (productCode, unit, type) => ipcRenderer.invoke('delete-product', { productCode, unit, type }),

    updateProductByAgency: (productCode, unit, type, price) => ipcRenderer.invoke('update-product', { productCode, unit, type, price }),
    
    getProductsByCode: (productCode, unit, type) => ipcRenderer.invoke('get-products-code', {productCode, unit, type}),

    findAllProducts: (name, type) => ipcRenderer.invoke('find-all-products', { name, type }),

    createDeliveryNote: (deliveryNoteData) => ipcRenderer.invoke('create-delivery-note', deliveryNoteData),

    deleteAgency: (agencyCode) => ipcRenderer.invoke('delete-agency', agencyCode),
});