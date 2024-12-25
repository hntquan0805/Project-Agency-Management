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
  updateSettings: function updateSettings(updateData) {
    return ipcRenderer.invoke('agency-rule-1', updateData);
  },
  getAgencyTypes: function getAgencyTypes() {
    return ipcRenderer.invoke('get-agency-types');
  },
  updateAgencyTypeSettings: function updateAgencyTypeSettings(updateData) {
    return ipcRenderer.invoke('agency-type-1', updateData);
  }
});