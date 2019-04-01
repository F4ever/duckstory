import React, { Component } from 'react';
import cookie from 'js-cookie';


export default class DataProvider {
  constructor(dispatch, options = {}) {
    const { action, suffix } = options;

    this._dispatch = dispatch;

    this._actionSuffix = suffix ? '_' + suffix.toUpperCase() : '';
    this._action = action != undefined ? !! action : true;
  }

  get baseHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': cookie.get('csrftoken'),
      // [config.apiTokenLabel]: config.apiTokenValue(localStorage.getItem(config.storage.token))
    };
  };

  dispatch(action, data) {
    const _action = Object.assign({type: action + this._actionSuffix,}, data);
    this._action && this._dispatch(_action);
  }

  getQueryString(params) {
    let esc = encodeURIComponent;
    return Object.keys(params)
      .filter(k => params[k] !== null && params[k].length !== 0)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }
}
