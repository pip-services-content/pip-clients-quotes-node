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
var QuotesLambdaClient = (function (_super) {
    __extends(QuotesLambdaClient, _super);
    function QuotesLambdaClient(config) {
        _super.call(this, QuotesLambdaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    QuotesLambdaClient.prototype.getQuotes = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quotes', callback);
        this.call('get_quotes', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    };
    QuotesLambdaClient.prototype.getRandomQuote = function (correlationId, filter, callback) {
        callback = this.instrument(correlationId, 'quotes.get_random_quote', callback);
        this.call('get_random_quote', correlationId, {
            filter: filter
        }, callback);
    };
    QuotesLambdaClient.prototype.getQuoteById = function (correlationId, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quote_by_id', callback);
        this.call('get_quote_by_id', correlationId, {
            quote_id: quoteId
        }, callback);
    };
    QuotesLambdaClient.prototype.createQuote = function (correlationId, quote, callback) {
        callback = this.instrument(correlationId, 'quotes.create_quote', callback);
        this.call('create_quote', correlationId, {
            quote: quote
        }, callback);
    };
    QuotesLambdaClient.prototype.updateQuote = function (correlationId, quoteId, quote, callback) {
        callback = this.instrument(correlationId, 'quotes.update_quote', callback);
        this.call('update_quote', correlationId, {
            quote: quote
        }, callback);
    };
    QuotesLambdaClient.prototype.deleteQuote = function (correlationId, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.delete_quote', callback);
        this.call('delete_quote', correlationId, {
            quote_id: quoteId
        }, callback);
    };
    /**
     * Unique descriptor for the QuotesLambdaClient component
     */
    QuotesLambdaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-quotes", "lambda", "1.0");
    return QuotesLambdaClient;
}(pip_services_runtime_node_5.LambdaClient));
exports.QuotesLambdaClient = QuotesLambdaClient;
