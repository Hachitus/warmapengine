'use strict';

/* DESCRIPTION: Apps main logger library */

/* ====== 3rd pary libraries ====== */
// WE BUNYAN NORMALLY, but disabled in development phase
//var bunyan = require('bunyan');

/* ====== Exporting ====== */
// This for development phase
export let loggerMod = (function loggerMod (){
  var ret = {
    createLogs: {
      node: () => console
    }
  };

  return ret;
})();
// Normally we use exportedLogger and public functions

/* ======= Public functions ======= */
function backups() {
  return bunyan.createLogger(
        {
          name: "backup",
          streams: [{
            type: 'rotating-file',
            path: '/var/log/workbird/backup.log',
            period: '1d',   // daily rotation
            count: 30        // keep 3 back copies
          }]
        } );
}
function restore() {
  return bunyan.createLogger(
        {
          name: "restore",
          streams: [{
            type: 'rotating-file',
            path: '/var/log/workbird/restore.log',
            period: '1d',   // daily rotation
            count: 30        // keep 3 back copies
          }]
        } );
}

function node() {
  return bunyan.createLogger(
        {
          name: "restore",
          streams: [{
            type: 'rotating-file',
            path: '/var/log/workbird/nodejs.log',
            period: '1d',   // daily rotation
            count: 30        // keep 3 back copies
          }]
        } );
}