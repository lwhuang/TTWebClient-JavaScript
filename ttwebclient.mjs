// ttwebclient.mjs
import CryptoJS from 'crypto-js';
import $ from 'jquery';

function signRequest(context, request, web_api_id, web_api_key, web_api_secret) {
  if (!web_api_id || !web_api_key || !web_api_secret) {
    throw new Error("Missing TickTrader Web API credentials.");
  }

  const timestamp = Date.now();
  const signature = timestamp + web_api_id + web_api_key + context.type + context.url + (context.data || "");
  const hash = CryptoJS.HmacSHA256(signature, web_api_secret);
  const authHeader = 'HMAC ' + web_api_id + ':' + web_api_key + ':' + timestamp + ':' + CryptoJS.enc.Base64.stringify(hash);
  request.setRequestHeader('Authorization', authHeader);
}

class TickTraderWebClient {
  constructor(web_api_address, web_api_id, web_api_key, web_api_secret) {
    if (!web_api_address) throw new Error("Web API address required");
    this.web_api_address = web_api_address;
    this.web_api_id = web_api_id;
    this.web_api_key = web_api_key;
    this.web_api_secret = web_api_secret;
  }

  _authAjax(url, type = 'GET', data = null) {
    return $.ajax({
      url,
      type,
      data: data ? JSON.stringify(data) : undefined,
      contentType: data ? "application/json; charset=UTF-8" : undefined,
      beforeSend: (request) => {
        signRequest({ type, url, data }, request, this.web_api_id, this.web_api_key, this.web_api_secret);
      }
    });
  }

  _publicAjax(path) {
    return $.ajax({
      url: `${this.web_api_address}${path}`,
      type: 'GET'
    });
  }

  getPublicTradeSession() { return this._publicAjax("/api/v2/public/tradesession"); }
  getPublicAllCurrencies() { return this._publicAjax("/api/v2/public/currency"); }
  getPublicCurrency(currency) { return this._publicAjax("/api/v2/public/currency/" + encodeURIComponent(currency)); }
  getPublicAllSymbols() { return this._publicAjax("/api/v2/public/symbol"); }
  getPublicSymbol(symbol) { return this._publicAjax("/api/v2/public/symbol/" + encodeURIComponent(symbol)); }
  getPublicAllTicks() { return this._publicAjax("/api/v2/public/tick"); }
  getPublicTick(symbol) { return this._publicAjax("/api/v2/public/tick/" + encodeURIComponent(symbol)); }
  getPublicAllTicksLevel2() { return this._publicAjax("/api/v2/public/level2"); }
  getPublicTickLevel2(symbol) { return this._publicAjax("/api/v2/public/level2/" + encodeURIComponent(symbol)); }

  getAccount() { return this._authAjax(`${this.web_api_address}/api/v2/account`); }
  getTradeSession() { return this._authAjax(`${this.web_api_address}/api/v2/tradesession`); }
  getAllCurrencies() { return this._authAjax(`${this.web_api_address}/api/v2/currency`); }
  getCurrency(currency) { return this._authAjax(`${this.web_api_address}/api/v2/currency/` + encodeURIComponent(currency)); }
  getAllSymbols() { return this._authAjax(`${this.web_api_address}/api/v2/symbol`); }
  getSymbol(symbol) { return this._authAjax(`${this.web_api_address}/api/v2/symbol/` + encodeURIComponent(symbol)); }
  getAllTicks() { return this._authAjax(`${this.web_api_address}/api/v2/tick`); }
  getTick(symbol) { return this._authAjax(`${this.web_api_address}/api/v2/tick/` + encodeURIComponent(symbol)); }
  getAllTicksLevel2() { return this._authAjax(`${this.web_api_address}/api/v2/level2`); }
  getTickLevel2(symbol) { return this._authAjax(`${this.web_api_address}/api/v2/level2/` + encodeURIComponent(symbol)); }
  getAllAssets() { return this._authAjax(`${this.web_api_address}/api/v2/asset`); }
  getAsset(currency) { return this._authAjax(`${this.web_api_address}/api/v2/asset/` + encodeURIComponent(currency)); }
  getAllPositions() { return this._authAjax(`${this.web_api_address}/api/v2/position`); }
  getPosition(symbol) { return this._authAjax(`${this.web_api_address}/api/v2/position/` + encodeURIComponent(symbol)); }
  getAllTrades() { return this._authAjax(`${this.web_api_address}/api/v2/trade`); }
  getTrade(tradeId) { return this._authAjax(`${this.web_api_address}/api/v2/trade/` + tradeId); }
  createTrade(data) { return this._authAjax(`${this.web_api_address}/api/v2/trade`, 'POST', data); }
  modifyTrade(data) { return this._authAjax(`${this.web_api_address}/api/v2/trade`, 'PUT', data); }
  cancelTrade(tradeId) {
    return this._authAjax(`${this.web_api_address}/api/v2/trade?type=Cancel&id=${tradeId}`, 'DELETE');
  }
  closeTrade(tradeId, amount = null) {
    const url = `${this.web_api_address}/api/v2/trade?type=Close&id=${tradeId}` + (amount ? `&amount=${amount}` : '');
    return this._authAjax(url, 'DELETE');
  }
  closeByTrade(tradeId, byTradeId) {
    const url = `${this.web_api_address}/api/v2/trade?type=CloseBy&id=${tradeId}&byid=${byTradeId}`;
    return this._authAjax(url, 'DELETE');
  }
  getTradeHistory(data) {
    return this._authAjax(`${this.web_api_address}/api/v2/tradehistory`, 'POST', data);
  }
  getTradeHistoryByTradeId(tradeId, data) {
    return this._authAjax(`${this.web_api_address}/api/v2/tradehistory/${tradeId}`, 'POST', data);
  }
}

export default TickTraderWebClient;

/**
 * @typedef {object} TickTraderWebClient
 * @property {function(): Promise<any>} getAccount
 * @property {function(): Promise<any>} getTradeSession
 * @property {function(string): Promise<any>} getCurrency
 * @property {function(): Promise<any>} getAllSymbols
 * @property {function(string): Promise<any>} getSymbol
 * @property {function(string): Promise<any>} getTick
 * @property {function(any): Promise<any>} createTrade
 * @property {function(any): Promise<any>} modifyTrade
 * @property {function(string): Promise<any>} cancelTrade
 * @property {function(string, string): Promise<any>} closeByTrade
 * ... 其他方法可補充對應型別
 */
