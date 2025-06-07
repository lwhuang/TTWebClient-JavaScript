declare module "ticktrader-client" {
  export default class TickTraderWebClient {
    constructor(
      web_api_address: string,
      web_api_id: string,
      web_api_key: string,
      web_api_secret: string
    );

    getPublicTradeSession(): Promise<any>;
    getPublicAllCurrencies(): Promise<any>;
    getPublicCurrency(currency: string): Promise<any>;
    getPublicAllSymbols(): Promise<any>;
    getPublicSymbol(symbol: string): Promise<any>;
    getPublicAllTicks(): Promise<any>;
    getPublicTick(symbol: string): Promise<any>;
    getPublicAllTicksLevel2(): Promise<any>;
    getPublicTickLevel2(symbol: string): Promise<any>;

    getAccount(): Promise<any>;
    getTradeSession(): Promise<any>;
    getAllCurrencies(): Promise<any>;
    getCurrency(currency: string): Promise<any>;
    getAllSymbols(): Promise<any>;
    getSymbol(symbol: string): Promise<any>;
    getAllTicks(): Promise<any>;
    getTick(symbol: string): Promise<any>;
    getAllTicksLevel2(): Promise<any>;
    getTickLevel2(symbol: string): Promise<any>;
    getAllAssets(): Promise<any>;
    getAsset(currency: string): Promise<any>;
    getAllPositions(): Promise<any>;
    getPosition(symbol: string): Promise<any>;
    getAllTrades(): Promise<any>;
    getTrade(tradeId: string): Promise<any>;
    createTrade(data: any): Promise<any>;
    modifyTrade(data: any): Promise<any>;
    cancelTrade(tradeId: string): Promise<any>;
    closeTrade(tradeId: string, amount?: number): Promise<any>;
    closeByTrade(tradeId: string, byTradeId: string): Promise<any>;
    getTradeHistory(data: any): Promise<any>;
    getTradeHistoryByTradeId(tradeId: string, data: any): Promise<any>;
  }
}
