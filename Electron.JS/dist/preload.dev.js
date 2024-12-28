"use strict";

var _require = require('electron'),
    contextBridge = _require.contextBridge,
    ipcRenderer = _require.ipcRenderer;

contextBridge.exposeInMainWorld('api', {
  signUp: function signUp(username, password) {
    return ipcRenderer.invoke('sign-up', {
      username: username,
      password: password
    });
  },
  addAgency: function addAgency(agencyData) {
    return ipcRenderer.invoke('add-agency', agencyData);
  },
  searchAgencies: function searchAgencies(criteria) {
    return ipcRenderer.invoke('search', criteria);
  },
  searchDeliveryNotesByDate: function searchDeliveryNotesByDate(criteria) {
    return ipcRenderer.invoke('search-by-month', criteria);
  },
  countNoteByAgency: function countNoteByAgency(criteria) {
    return ipcRenderer.invoke('count-agency', criteria);
  },
  saveGoodsReceivedNote: function saveGoodsReceivedNote(criteria) {
    return ipcRenderer.invoke('save-received-note', criteria);
  },
  calculateProportion: function calculateProportion(criteria) {
    return ipcRenderer.invoke('cal-propor', criteria);
  },
  renderDebtTable: function renderDebtTable(month, year, table) {
    return ipcRenderer.invoke('debt-report', {
      month: month,
      year: year,
      table: table
    });
  },
  saveRevenueReport: function saveRevenueReport(month, year, reportData) {
    return ipcRenderer.invoke('save-revenue-report', {
      month: month,
      year: year,
      reportData: reportData
    });
  },
  saveDebtHistory: function saveDebtHistory(month, year, table_debt) {
    return ipcRenderer.invoke('save-debt-history', {
      month: month,
      year: year,
      table_debt: table_debt
    });
  },
  updateSettings: function updateSettings(updateData) {
    return ipcRenderer.invoke('agency-rule-1', updateData);
  },
  getAgencyTypes: function getAgencyTypes() {
    return ipcRenderer.invoke('get-agency-types');
  },
  getProductsByAgency: function getProductsByAgency(type) {
    return ipcRenderer.invoke('get-products', type);
  },
  updateAgencyTypeSettings: function updateAgencyTypeSettings(updateData) {
    return ipcRenderer.invoke('agency-type-1', updateData);
  },
  deleteProductByAgnecy: function deleteProductByAgnecy(productCode, unit, type) {
    return ipcRenderer.invoke('delete-product', {
      productCode: productCode,
      unit: unit,
      type: type
    });
  },
  updateProductByAgency: function updateProductByAgency(productCode, unit, type, price) {
    return ipcRenderer.invoke('update-product', {
      productCode: productCode,
      unit: unit,
      type: type,
      price: price
    });
  },
  getProductsByCode: function getProductsByCode(productCode, unit, type) {
    return ipcRenderer.invoke('get-products-code', {
      productCode: productCode,
      unit: unit,
      type: type
    });
  }
});