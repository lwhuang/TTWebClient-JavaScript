/**
 * JavaScript TickTrader Web API client for Node.js (ESM)
 * Modified for ESM compatibility on 06.08.2025
 */

import axios from 'axios';
import { createHmac } from 'crypto';

/**
 * Sign request with HMAC-SHA256
 * @param config Axios request config
 */
const _signRequest = function(config, web_api_id, web_api_key, web_api_secret) {
    if (!web_api_id)
        throw new Error("TickTrader Web API Id should be valid!");
    if (!web_api_key)
        throw new Error("TickTrader Web API Key should be valid!");
    if (!web_api_secret)
        throw new Error("TickTrader Web API Secret should be valid!");

    const timestamp = Date.now();
    const signature = timestamp + web_api_id + web_api_key + config.method.toUpperCase() + config.url + (config.data ? JSON.stringify(config.data) : "");
    const hash = createHmac('sha256', web_api_secret)
                      .update(signature)
                      .digest('base64');

    config.headers = {
        ...config.headers,
        'Authorization': `HMAC ${web_api_id}:${web_api_key}:${timestamp}:${hash}`
    };
    return config;
};

const TickTraderWebClient = function(web_api_address, web_api_id, web_api_key, web_api_secret) {
    if (!web_api_address)
        throw new Error("TickTrader Web API address should be valid!");

    this.web_api_address = web_api_address;
    this.web_api_id = web_api_id;
    this.web_api_key = web_api_key;
    this.web_api_secret = web_api_secret;
};

/**
 * Get public trade session information
 * @returns Public trade session information
 */
TickTraderWebClient.prototype.getPublicTradeSession = function() {
    return axios.get(this.web_api_address + "/api/v2/public/tradesession");
};

/**
 * Get list of all available public currencies
 * @returns List of all available public currencies
 */
TickTraderWebClient.prototype.getPublicAllCurrencies = function() {
    return axios.get(this.web_api_address + "/api/v2/public/currency");
};

/**
 * Get public currency by name
 * @param currency Currency name
 * @returns Public currency with the given name
 */
TickTraderWebClient.prototype.getPublicCurrency = function(currency) {
    return axios.get(this.web_api_address + "/api/v2/public/currency/" + encodeURIComponent(currency));
};

/**
 * Get list of all available public symbols
 * @returns List of all available public symbols
 */
TickTraderWebClient.prototype.getPublicAllSymbols = function() {
    return axios.get(this.web_api_address + "/api/v2/public/symbol");
};

/**
 * Get public symbol by name
 * @param symbol Symbol name
 * @returns Public symbol with the given name
 */
TickTraderWebClient.prototype.getPublicSymbol = function(symbol) {
    return axios.get(this.web_api_address + "/api/v2/public/symbol/" + encodeURIComponent(symbol));
};

/**
 * Get list of all available public feed ticks
 * @returns List of all available public feed ticks
 */
TickTraderWebClient.prototype.getPublicAllTicks = function() {
    return axios.get(this.web_api_address + "/api/v2/public/tick");
};

/**
 * Get public feed tick by symbol name
 * @param symbol Symbol name
 * @returns Public feed tick with the given symbol name
 */
TickTraderWebClient.prototype.getPublicTick = function(symbol) {
    return axios.get(this.web_api_address + "/api/v2/public/tick/" + encodeURIComponent(symbol));
};

/**
 * Get list of all available public feed level2 ticks
 * @returns List of all available public feed level2 ticks
 */
TickTraderWebClient.prototype.getPublicAllTicksLevel2 = function() {
    return axios.get(this.web_api_address + "/api/v2/public/level2");
};

/**
 * Get public feed level2 tick by symbol name
 * @param symbol Symbol name
 * @returns Public feed level2 tick with the given symbol name
 */
TickTraderWebClient.prototype.getPublicTickLevel2 = function(symbol) {
    return axios.get(this.web_api_address + "/api/v2/public/level2/" + encodeURIComponent(symbol));
};

/**
 * Get account information
 * @returns Account information
 */
TickTraderWebClient.prototype.getAccount = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/account"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get trade session information
 * @returns Trade session information
 */
TickTraderWebClient.prototype.getTradeSession = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/tradesession"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get list of all available currencies
 * @returns List of all available currencies
 */
TickTraderWebClient.prototype.getAllCurrencies = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/currency"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get currency by name
 * @param currency Currency name
 * @returns Currency with the given name
 */
TickTraderWebClient.prototype.getCurrency = function(currency) {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/currency/" + encodeURIComponent(currency)
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get list of all available symbols
 * @returns List of all available symbols
 */
TickTraderWebClient.prototype.getAllSymbols = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/symbol"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get symbol by name
 * @param symbol Symbol name
 * @returns Symbol with the given name
 */
TickTraderWebClient.prototype.getSymbol = function(symbol) {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/symbol/" + encodeURIComponent(symbol)
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get list of all available feed ticks
 * @returns List of all available feed ticks
 */
TickTraderWebClient.prototype.getAllTicks = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/tick"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get feed tick by symbol name
 * @param symbol Symbol name
 * @returns Feed tick with the given symbol
 */
TickTraderWebClient.prototype.getTick = function(symbol) {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/tick/" + encodeURIComponent(symbol)
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get list of all available feed level2 ticks
 * @returns List of all available feed level2 ticks
 */
TickTraderWebClient.prototype.getAllTicksLevel2 = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/level2"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get feed level2 tick by symbol name
 * @param symbol Symbol name
 * @returns Feed level2 tick with the given symbol
 */
TickTraderWebClient.prototype.getTickLevel2 = function(symbol) {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/level2/" + encodeURIComponent(symbol)
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get list of all cash account assets (currency with amount)
 * **Works only for cash accounts!**
 * @returns List of all cash account assets
 */
TickTraderWebClient.prototype.getAllAssets = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/asset"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get cash account asset (currency with amount) by the given currency name
 * **Works only for cash accounts!**
 * @param currency Currency name
 * @returns Cash account asset for the given currency
 */
TickTraderWebClient.prototype.getAsset = function(currency) {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/asset/" + encodeURIComponent(currency)
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get list of all available positions
 * **Works only for net accounts!**
 * @returns List of all available positions
 */
TickTraderWebClient.prototype.getAllPositions = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/position"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get position by symbol
 * **Works only for net accounts!**
 * @param symbol Symbol name
 * @returns Position
 */
TickTraderWebClient.prototype.getPosition = function(symbol) {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/position/" + encodeURIComponent(symbol)
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get list of all available trades
 * @returns List of all available trades
 */
TickTraderWebClient.prototype.getAllTrades = function() {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/trade"
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get trade by tradeId
 * @param tradeId Trade Id
 * @returns Trade
 */
TickTraderWebClient.prototype.getTrade = function(tradeId) {
    const config = {
        method: 'GET',
        url: this.web_api_address + "/api/v2/trade/" + tradeId
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Create new trade
 * New trade request is described by the filling following fields:
 * - **ClientId** (optional) - Client trade Id
 * - **Type** (required) - Type of trade. Possible values: `"Market"`, `"Limit"`, `"Stop"`
 * - **Side** (required) - Side of trade. Possible values: `"Buy"`, `"Sell"`
 * - **Symbol** (required) - Trade symbol (e.g. `"EURUSD"`)
 * - **Price** (optional) - Price of the `"Limit"` / `"Stop"` trades (for `Market` trades price field is ignored)
 * - **Amount** (required) - Trade amount
 * - **StopLoss** (optional) - Stop loss price
 * - **TakeProfit** (optional) - Take profit price
 * - **ExpiredTimestamp** (optional) - Expiration date and time for pending trades (`"Limit"`, `"Stop"`)
 * - **ImmediateOrCancel** (optional) - "Immediate or cancel" flag (works only for `"Limit"` trades)
 * - **Comment** (optional) - Client comment
 * @param request Create trade request
 * @returns Created trade
 */
TickTraderWebClient.prototype.createTrade = function(request) {
    const config = {
        method: 'POST',
        url: this.web_api_address + "/api/v2/trade",
        data: request,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Modify existing trade
 * Modify trade request is described by the filling following fields:
 * - **Id** (required) - Trade Id
 * - **Price** (optional) - New price of the `Limit` / `Stop` trades (price of `Market` trades cannot be changed)
 * - **StopLoss** (optional) - Stop loss price
 * - **TakeProfit** (optional) - Take profit price
 * - **ExpiredTimestamp** (optional) - Expiration date and time for pending trades (`Limit`, `Stop`)
 * - **Comment** (optional) - Client comment
 * @returns Modified trade
 */
TickTraderWebClient.prototype.modifyTrade = function(request) {
    const config = {
        method: 'PUT',
        url: this.web_api_address + "/api/v2/trade",
        data: request,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Cancel existing pending trade
 * @param tradeId Trade Id to cancel
 * @returns Cancelled trade
 */
TickTraderWebClient.prototype.cancelTrade = function(tradeId) {
    const config = {
        method: 'DELETE',
        url: this.web_api_address + "/api/v2/trade?type=Cancel&id=" + tradeId
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Close existing market trade
 * @param tradeId Trade Id to close
 * @param amount Amount to close (optional)
 * @returns Closed trade
 */
TickTraderWebClient.prototype.closeTrade = function(tradeId, amount) {
    const url = amount ? 
        `${this.web_api_address}/api/v2/trade?type=Close&id=${tradeId}&amount=${amount}` :
        `${this.web_api_address}/api/v2/trade?type=Close&id=${tradeId}`;
    const config = {
        method: 'DELETE',
        url: url
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Close existing market trade by another one
 * @param tradeId Trade Id to close
 * @param byTradeId By trade Id
 * @returns Closed trade
 */
TickTraderWebClient.prototype.closeByTrade = function(tradeId, byTradeId) {
    const config = {
        method: 'DELETE',
        url: this.web_api_address + "/api/v2/trade?type=CloseBy&id=" + tradeId + "&byid=" + byTradeId
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get account trade history
 * New trade history request is described by filling following fields:
 * - **TimestampFrom** (optional) - Lower timestamp bound of the trade history request
 * - **TimestampTo** (optional) - Upper timestamp bound of the trade history request
 * - **RequestDirection** (optional) - Request paging direction ("Forward" or "Backward"). Default is "Forward".
 * - **RequestFromId** (optional) - Request paging from Id
 * @param request Trade history request
 * @returns Trade history report
 */
TickTraderWebClient.prototype.getTradeHistory = function(request) {
    const config = {
        method: 'POST',
        url: this.web_api_address + "/api/v2/tradehistory",
        data: request,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

/**
 * Get account trade history for the given trade Id
 * @param tradeId Trade Id
 * @param request Trade history request
 * @returns Trade history report
 */
TickTraderWebClient.prototype.getTradeHistoryByTradeId = function(tradeId, request) {
    const config = {
        method: 'POST',
        url: this.web_api_address + "/api/v2/tradehistory/" + tradeId,
        data: request,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios(_signRequest(config, this.web_api_id, this.web_api_key, this.web_api_secret));
};

export { TickTraderWebClient };