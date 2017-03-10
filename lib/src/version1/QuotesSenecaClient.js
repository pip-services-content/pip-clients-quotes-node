"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var QuotesSenecaClient = (function (_super) {
    __extends(QuotesSenecaClient, _super);
    function QuotesSenecaClient(config) {
        _super.call(this, QuotesSenecaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    QuotesSenecaClient.prototype.getQuotes = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quotes', callback);
        this.call('quotes', 'get_quotes', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    };
    QuotesSenecaClient.prototype.getRandomQuote = function (correlationId, filter, callback) {
        callback = this.instrument(correlationId, 'quotes.get_random_quote', callback);
        this.call('quotes', 'get_random_quote', correlationId, {
            filter: filter
        }, callback);
    };
    QuotesSenecaClient.prototype.getQuoteById = function (correlationId, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quote_by_id', callback);
        this.call('quotes', 'get_quote_by_id', correlationId, {
            quote_id: quoteId
        }, callback);
    };
    QuotesSenecaClient.prototype.createQuote = function (correlationId, quote, callback) {
        callback = this.instrument(correlationId, 'quotes.create_quote', callback);
        this.call('quotes', 'create_quote', correlationId, {
            quote: quote
        }, callback);
    };
    QuotesSenecaClient.prototype.updateQuote = function (correlationId, quoteId, quote, callback) {
        callback = this.instrument(correlationId, 'quotes.update_quote', callback);
        this.call('quotes', 'update_quote', correlationId, {
            quote_id: quoteId,
            quote: quote
        }, callback);
    };
    QuotesSenecaClient.prototype.deleteQuote = function (correlationId, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.delete_quote', callback);
        this.call('quotes', 'delete_quote', correlationId, {
            quote_id: quoteId
        }, callback);
    };
    /**
     * Unique descriptor for the QuotesSenecaClient component
     */
    QuotesSenecaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-quotes", "seneca", "1.0");
    return QuotesSenecaClient;
}(pip_services_runtime_node_5.SenecaClient));
exports.QuotesSenecaClient = QuotesSenecaClient;
