(function () {
  'use strict';

  /*---------------------
  ------- IMPORT --------
  ----------------------*/
  var mapLog = window.flatworld.log;

  /*---------------------
  --------- API ---------
  ----------------------*/
  window.flatworld.mapAPI = setupMapAPI();

  /*---------------------
  -------- PUBLIC -------
  ----------------------*/
  /**
   * Uses JSON only data flow
   *
   * @class mapApi
   */
  function setupMapAPI() {
    const APIs = {};

    /*---------------------
    --------- API ---------
    ----------------------*/
    return {
      get,
      post,
      add,
      remove,
      update
    };

    /*---------------------
    -------- PUBLIC -------
    ----------------------*/
    /**
     * Get data from server
     *
     * @method get
     * @param  {String} name    The indentifier for this API call / endpoint
     * @param  {Array} params   Params that are sent to the callbacks that have been attached to handle this API data
     * @return {Promise}        ES6 native Promise as the API advances
     */
    function get(type, params) {
      if (APIs[type]) {
        mapLog.error("API endpoint for fetch not found: " + name + ", " + params ? params[0] : "no params");
      }

      let completeData = APIs[type];

      APIs[type].cbs.forEach((cb) => {
        completeData = cb("get", completeData, params);
      });

      return fetch(completeData.url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          mapLog.debug('parsed json', json);
        }).catch(function(ex) {
          mapLog.debug('parsing failed', ex);
        });
    }
    /**
     * Send data to server
     *
     * @method post
     * @param  {String} name    The indentifier for this API call / endpoint
     * @param  {Array} params   Params that are sent to the callbacks that have been attached to handle this API data. E.g. at least the
     * POST data that will be sent to server needs to be set in the callback to the object.body property.
     * @return {Promise}        ES6 native Promise as the API advances
     */
    function post(type, params) {
      if (!APIs[type]) {
        mapLog.error("API endpoint for fetch not found: " + type + ", " + ( params ? params[0] : "no params"));
        return;
      }

      let completeData = APIs[type];

      APIs[type].cbs.forEach((cb) => {
        completeData = cb("post", completeData, params);
      });

      fetch(completeData.url, {
          body: completeData.body
        })
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          mapLog.debug('parsed json', json);
        }).catch(function(ex) {
          mapLog.debug('parsing failed', ex);
        });
    }
    function add(type, cb, baseUrl) {
      if (APIs[type]) {
        mapLog.error("API endpoint already exists and has been defined " + type + ", " + baseUrl + ", " + JSON.stringify(cb));
      }

      APIs[type] = {
        baseUrl: baseUrl,
        cbs: cb ? [cb] : []
      };
    }
    function remove(type, cb) {
      if (!APIs[type]) {
        mapLog.error("API endpoint not found for removing!");
      }

      delete APIs[type];
    }
    function update(type, cb, what) {
      if (!APIs[type] || !APIs[type].cbs) {
        mapLog.error("API endpoint not found for updating!");
      }

      APIs[type].cbs.push(cb);
    }
  }
})();