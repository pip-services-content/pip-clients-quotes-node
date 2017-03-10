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
var QuotesRestClient = (function (_super) {
    __extends(QuotesRestClient, _super);
    function QuotesRestClient(config) {
        _super.call(this, QuotesRestClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    QuotesRestClient.prototype.getQuotes = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quotes', callback);
        var params = {};
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);
        this.call('get', '/quotes', correlationId, params, callback);
    };
    QuotesRestClient.prototype.getRandomQuote = function (correlationId, filter, callback) {
        callback = this.instrument(correlationId, 'quotes.get_random_quote', callback);
        var params = {};
        this.addFilterParams(params, filter);
        this.call('get', '/quotes/random', correlationId, params, callback);
    };
    QuotesRestClient.prototype.getQuoteById = function (correlationId, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quote_by_id', callback);
        this.call('get', '/quotes/' + quoteId, correlationId, {}, callback);
    };
    QuotesRestClient.prototype.createQuote = function (correlationId, quote, callback) {
        callback = this.instrument(correlationId, 'quotes.create_quote', callback);
        this.call('post', '/quotes', correlationId, {}, quote, callback);
    };
    QuotesRestClient.prototype.updateQuote = function (correlationId, quoteId, quote, callback) {
        callback = this.instrument(correlationId, 'quotes.update_quote', callback);
        this.call('put', '/quotes/' + quoteId, correlationId, {}, quote, callback);
    };
    QuotesRestClient.prototype.deleteQuote = function (correlationId, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.delete_quote', callback);
        var params = {};
        this.addCorrelationId(params, correlationId);
        this.call('delete', '/quotes/' + quoteId, correlationId, {}, callback);
    };
    /**
     * Unique descriptor for the QuotesRestClient component
     */
    QuotesRestClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-quotes", "rest", "1.0");
    return QuotesRestClient;
}(pip_services_runtime_node_5.RestClient));
exports.QuotesRestClient = QuotesRestClient;
