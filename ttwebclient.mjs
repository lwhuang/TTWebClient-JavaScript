// ttwebclient.mjs
const TTWebClient = (function () {
    const _callbacks = {};
    let _nextCallbackId = 1;

    function _generateCallbackId() {
        return 'cb' + (_nextCallbackId++);
    }

    function _sendMessage(message) {
        if (typeof WebSocket !== 'undefined' && TTWebClient._ws && TTWebClient._ws.readyState === WebSocket.OPEN) {
            TTWebClient._ws.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket not connected or unsupported');
        }
    }

    const TTWebClient = {
        _ws: null,

        connect(url, onOpen, onMessage, onClose, onError) {
            this._ws = new WebSocket(url);

            this._ws.onopen = onOpen;
            this._ws.onmessage = function (event) {
                const data = JSON.parse(event.data);
                if (data.callbackId && _callbacks[data.callbackId]) {
                    _callbacks[data.callbackId](data);
                    delete _callbacks[data.callbackId];
                } else if (onMessage) {
                    onMessage(data);
                }
            };
            this._ws.onclose = onClose;
            this._ws.onerror = onError;
        },

        disconnect() {
            if (this._ws) {
                this._ws.close();
                this._ws = null;
            }
        },

        sendRequest(method, params, callback) {
            const callbackId = _generateCallbackId();
            if (callback) {
                _callbacks[callbackId] = callback;
            }
            const message = {
                method,
                params,
                callbackId
            };
            _sendMessage(message);
        },

        getVersion() {
            return '1.0.0';
        }
    };

    return TTWebClient;
})();

export default TTWebClient;
