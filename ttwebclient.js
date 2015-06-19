/**
 * JavaScript TickTrader Web API client
 * Created by ivan.shynkarenka on 11.06.2015
 */

/**
 * Sign request with HMAC-SHA256
 * @param request Request
 */
var _signRequest = function(context, request, web_api_id, web_api_key, web_api_secret) {
    if (!web_api_id)
        throw "TickTrader Web API Id should be valid!";
    if (!web_api_key)
        throw "TickTrader Web API Key should be valid!";
    if (!web_api_secret)
        throw "TickTrader Web API Secret should be valid!";

    var timestamp = Date.now();
    var signature = timestamp + web_api_id + web_api_key + context.type + context.url + (context.data ? context.data : "")
    var hash = CryptoJS.HmacSHA256(signature, web_api_secret);

    request.setRequestHeader('Authorization', 'HMAC ' + web_api_id + ':' + web_api_key + ':' + timestamp + ':' + CryptoJS.enc.Base64.stringify(hash));
};

var TickTraderWebClient = function(web_api_address, web_api_id, web_api_key, web_api_secret) {
    if (!web_api_address)
        throw "TickTrader Web API address should be valid!";

    this.web_api_address = web_api_address;
    this.web_api_id = web_api_id;
    this.web_api_key = web_api_key;
    this.web_api_secret = web_api_secret;
}

/**
 * Get public trade session information
 * @returns Public trade session information
 */
TickTraderWebClient.prototype.getPublicTradeSession = function() {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/tradesession",
        type: "GET"
    });
};

/**
 * Get list of all available public currencies
 * @returns List of all available public currencies
 */
TickTraderWebClient.prototype.getPublicAllCurrencies = function() {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/currency",
        type: "GET"
    });
};

/**
 * Get public currency by name
 * @param currency Currency name
 * @returns Public currency with the given name
 */
TickTraderWebClient.prototype.getPublicCurrency = function(currency) {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/currency/" + encodeURIComponent(encodeURIComponent(currency)),
        type: "GET"
    });
};

/**
 * Get list of all available public symbols
 * @returns List of all available public symbols
 */
TickTraderWebClient.prototype.getPublicAllSymbols = function() {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/symbol",
        type: "GET"
    });
};

/**
 * Get public symbol by name
 * @param symbol Symbol name
 * @returns Public symbol with the given name
 */
TickTraderWebClient.prototype.getPublicSymbol = function(symbol) {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/symbol/" + encodeURIComponent(encodeURIComponent(symbol)),
        type: "GET"
    });
};

/**
 * Get list of all available public feed ticks
 * @returns List of all available public feed ticks
 */
TickTraderWebClient.prototype.getPublicAllTicks = function() {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/tick",
        type: "GET"
    });
};

/**
 * Get public feed tick by symbol name
 * @param symbol Symbol name
 * @returns Public feed tick with the given symbol name
 */
TickTraderWebClient.prototype.getPublicTick = function(symbol) {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/tick/" + encodeURIComponent(encodeURIComponent(symbol)),
        type: "GET"
    });
};

/**
 * Get list of all available public feed level2 ticks
 * @returns List of all available public feed level2 ticks
 */
TickTraderWebClient.prototype.getPublicAllTicksLevel2 = function() {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/level2",
        type: "GET"
    });
};

/**
 * Get public feed level2 tick by symbol name
 * @param symbol Symbol name
 * @returns Public feed level2 tick with the given symbol name
 */
TickTraderWebClient.prototype.getPublicTickLevel2 = function(symbol) {
    return $.ajax({
        url: this.web_api_address + "/api/v1/public/level2/" + encodeURIComponent(encodeURIComponent(symbol)),
        type: "GET"
    });
};

/**
 * Get account information
 * @returns Account information
 */
TickTraderWebClient.prototype.getAccount = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/account",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get trade session information
 * @returns Trade session information
 */
TickTraderWebClient.prototype.getTradeSession = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/tradesession",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get list of all available currencies
 * @returns List of all available currencies
 */
TickTraderWebClient.prototype.getAllCurrencies = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/currency",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get currency by name
 * @param currency Currency name
 * @returns Currency with the given name
 */
TickTraderWebClient.prototype.getCurrency = function(currency) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/currency/" + encodeURIComponent(encodeURIComponent(currency)),
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get list of all available symbols
 * @returns List of all available symbols
 */
TickTraderWebClient.prototype.getAllSymbols = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/symbol",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get symbol by name
 * @param symbol Symbol name
 * @returns Symbol with the given name
 */
TickTraderWebClient.prototype.getSymbol = function(symbol) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/symbol/" + encodeURIComponent(encodeURIComponent(symbol)),
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get list of all available feed ticks
 * @returns List of all available feed ticks
 */
TickTraderWebClient.prototype.getAllTicks = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/tick",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get feed tick by symbol name
 * @param symbol Symbol name
 * @returns Feed tick with the given symbol
 */
TickTraderWebClient.prototype.getTick = function(symbol) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/tick/" + encodeURIComponent(encodeURIComponent(symbol)),
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get list of all available feed level2 ticks
 * @returns List of all available feed level2 ticks
 */
TickTraderWebClient.prototype.getAllTicksLevel2 = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/level2",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get feed level2 tick by symbol name
 * @param symbol Symbol name
 * @returns Feed level2 tick with the given symbol
 */
TickTraderWebClient.prototype.getTickLevel2 = function(symbol) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/level2/" + encodeURIComponent(encodeURIComponent(symbol)),
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get list of all cash account assets (currency with amount)
 * **Works only for cash accounts!**
 * @returns List of all cash account assets
 */
TickTraderWebClient.prototype.getAllAssets = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/asset",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get cash account asset (currency with amount) by the given currency name
 * **Works only for cash accounts!**
 * @param currency Currency name
 * @returns Cash account asset for the given currency
 */
TickTraderWebClient.prototype.getAsset = function(currency) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/asset/" + encodeURIComponent(encodeURIComponent(currency)),
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get list of all available positions
 * **Works only for net accounts!**
 * @returns List of all available positions
 */
TickTraderWebClient.prototype.getAllPositions = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/position",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get position by symbol
 * **Works only for net accounts!**
 * @param symbol Symbol name
 * @returns Position
 */
TickTraderWebClient.prototype.getPosition = function(symbol) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/position/" + encodeURIComponent(encodeURIComponent(symbol)),
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get list of all available trades
 * @returns List of all available trades
 */
TickTraderWebClient.prototype.getAllTrades = function() {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/trade",
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get trade by symbol
 * @param symbol Symbol name
 * @returns Trade
 */
TickTraderWebClient.prototype.getTrade = function(tradeId) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/trade/" + tradeId,
        type: "GET",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
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
TickTraderWebClient.prototype.createTrade= function(request) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/trade",
        type: "POST",
        data: request,
        data: JSON.stringify(request),
        contentType: "application/json; charset=UTF-8",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
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
 * @param request Modify trade request
 * @returns Modified trade
 */
TickTraderWebClient.prototype.modifyTrade= function(request) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/trade",
        type: "PUT",
        data: request,
        data: JSON.stringify(request),
        contentType: "application/json; charset=UTF-8",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Cancel existing pending trade
 * @param tradeId Trade Id to cancel
 */
TickTraderWebClient.prototype.cancelTrade= function(tradeId) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/trade?type=Cancel&id=" + tradeId,
        type: "DELETE",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Close existing market trade
 * @param tradeId Trade Id to cancel
 * @param amount Amount to close (optional)
 */
TickTraderWebClient.prototype.closeTrade= function(tradeId, amount) {
    var instance = this;
    return $.ajax({
        url: ((amount) ? this.web_api_address + "/api/v1/trade?type=Close&id=" + tradeId + "&amount=" + amount : this.web_api_address + "/api/v1/trade?type=Close&id=" + tradeId),
        type: "DELETE",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Close existing market trade by another one
 * @param tradeId Trade Id to cancel
 * @param byTradeId By trade Id
 */
TickTraderWebClient.prototype.closeByTrade= function(tradeId, byTradeId) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/trade?type=CloseBy&id=" + tradeId + "&byid=" + byTradeId,
        type: "DELETE",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get account trade history
 * New trade history request is described by the filling following fields:
 * - **TimestampFrom** (optional) - Lower timestamp bound of the trade history request
 * - **TimestampTo** (optional) - Upper timestamp bound of the trade history request
 * - **RequestDirection** (optional) - Request paging direction ("Forward" or "Backward"). Default is "Forward".
 * - **RequestFromId** (optional) - Request paging from Id
 *
 * If timestamps fields are not set trade history will be requests from the begin or from the current timestamp
 * depending on **RequestDirection** value.
 *
 * Trade history is returned by chunks by paging size (default is 100). You can provide timestamp bounds (from, to)
 * and direction of access (forward or backward). After the first request you'll get a list of trade history
 * records with Ids. The next request should contain **RequestFromId** with the Id of the last processed trade
 * history record. As the result you'll get the next chunk of trade history records. If the last page was reached
 * response flag **IsLastReport** will be set.
 * @param request Trade history request
 * @returns Trade history report
 */
TickTraderWebClient.prototype.getTradeHistory = function(request) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/tradehistory",
        type: "POST",
        data: request,
        data: JSON.stringify(request),
        contentType: "application/json; charset=UTF-8",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};

/**
 * Get account trade history for the given trade Id
 * New trade history request is described by the filling following fields:
 * - **TimestampFrom** (optional) - Lower timestamp bound of the trade history request
 * - **TimestampTo** (optional) - Upper timestamp bound of the trade history request
 * - **RequestDirection** (optional) - Request paging direction ("Forward" or "Backward"). Default is "Forward".
 * - **RequestFromId** (optional) - Request paging from Id
 *
 * If timestamps fields are not set trade history will be requests from the begin or from the current timestamp
 * depending on **RequestDirection** value.
 *
 * Trade history is returned by chunks by paging size (default is 100). You can provide timestamp bounds (from, to)
 * and direction of access (forward or backward). After the first request you'll get a list of trade history
 * records with Ids. The next request should contain **RequestFromId** with the Id of the last processed trade
 * history record. As the result you'll get the next chunk of trade history records. If the last page was reached
 * response flag **IsLastReport** will be set.
 * @param tradeId Trade Id
 * @param request Trade history request
 * @returns Trade history report
 */
TickTraderWebClient.prototype.getTradeHistoryByTradeId = function(tradeId, request) {
    var instance = this;
    return $.ajax({
        url: this.web_api_address + "/api/v1/tradehistory/" + tradeId,
        type: "POST",
        data: JSON.stringify(request),
        contentType: "application/json; charset=UTF-8",
        beforeSend: function (request) {
            _signRequest(this, request, instance.web_api_id, instance.web_api_key, instance.web_api_secret);
        }
    });
};