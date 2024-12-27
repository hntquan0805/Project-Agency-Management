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
  }
});