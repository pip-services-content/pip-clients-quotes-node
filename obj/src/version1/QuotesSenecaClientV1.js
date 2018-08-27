"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class QuotesSenecaClientV1 extends pip_services_seneca_node_1.CommandableSenecaClient {
    constructor(config) {
        super('quotes');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getQuotes(correlationId, filter, paging, callback) {
        this.callCommand('get_quotes', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getRandomQuote(correlationId, filter, callback) {
        this.callCommand('get_random_quote', correlationId, {
            fitler: filter
        }, callback);
    }
    getQuoteById(correlationId, quoteId, callback) {
        this.callCommand('get_quote_by_id', correlationId, {
            quote_id: quoteId
        }, callback);
    }
    createQuote(correlationId, quote, callback) {
        this.callCommand('create_quote', correlationId, {
            quote: quote
        }, callback);
    }
    updateQuote(correlationId, quote, callback) {
        this.callCommand('update_quote', correlationId, {
            quote: quote
        }, callback);
    }
    deleteQuoteById(correlationId, quoteId, callback) {
        this.callCommand('delete_quote_by_id', correlationId, {
            quote_id: quoteId
        }, callback);
    }
}
exports.QuotesSenecaClientV1 = QuotesSenecaClientV1;
//# sourceMappingURL=QuotesSenecaClientV1.js.map