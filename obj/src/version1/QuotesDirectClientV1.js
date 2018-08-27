"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class QuotesDirectClientV1 extends pip_services_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor("pip-services-quotes", "controller", "*", "*", "*"));
    }
    getQuotes(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'quotes.get_quotes');
        this._controller.getQuotes(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getRandomQuote(correlationId, filter, callback) {
        let timing = this.instrument(correlationId, 'quotes.get_random_quote');
        this._controller.getRandomQuote(correlationId, filter, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }
    getQuoteById(correlationId, quoteId, callback) {
        let timing = this.instrument(correlationId, 'quotes.get_quote_by_id');
        this._controller.getQuoteById(correlationId, quoteId, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }
    createQuote(correlationId, quote, callback) {
        let timing = this.instrument(correlationId, 'quotes.create_quote');
        this._controller.createQuote(correlationId, quote, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }
    updateQuote(correlationId, quote, callback) {
        let timing = this.instrument(correlationId, 'quotes.update_quote');
        this._controller.updateQuote(correlationId, quote, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }
    deleteQuoteById(correlationId, quoteId, callback) {
        let timing = this.instrument(correlationId, 'quotes.delete_quote_by_id');
        this._controller.deleteQuoteById(correlationId, quoteId, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }
}
exports.QuotesDirectClientV1 = QuotesDirectClientV1;
//# sourceMappingURL=QuotesDirectClientV1.js.map