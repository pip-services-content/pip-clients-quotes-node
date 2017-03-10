"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var QUOTE1 = {
    id: '1',
    text: 'Text 1',
    author: 'Author 1'
};
var QUOTE2 = {
    id: '2',
    tags: ['TAG 1'],
    text: 'Text 2',
    author: 'Author 2'
};
var QuotesClientFixture = (function () {
    function QuotesClientFixture(client) {
        this._client = client;
    }
    QuotesClientFixture.prototype.testCrudOperations = function (done) {
        var _this = this;
        var quote1, quote2;
        async.series([
            // Create one quote
            function (callback) {
                _this._client.createQuote(null, QUOTE1, function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.text, QUOTE1.text);
                    assert.equal(quote.author, QUOTE1.author);
                    quote1 = quote;
                    callback();
                });
            },
            // Create another quote
            function (callback) {
                _this._client.createQuote(null, QUOTE2, function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.text, QUOTE2.text);
                    assert.equal(quote.author, QUOTE2.author);
                    quote2 = quote;
                    callback();
                });
            },
            // Get all quotes
            function (callback) {
                _this._client.getQuotes(null, {}, new pip_services_runtime_node_1.PagingParams(0, 5, false), function (err, quotes) {
                    assert.isNull(err);
                    assert.isObject(quotes);
                    assert.isTrue(quotes.data.length >= 2);
                    callback();
                });
            },
            // Get random quote
            function (callback) {
                _this._client.getRandomQuote(null, {}, function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    callback();
                });
            },
            // Update the quote
            function (callback) {
                _this._client.updateQuote(null, quote1.id, { text: 'Updated Content 1' }, function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.text, 'Updated Content 1');
                    assert.equal(quote.author, QUOTE1.author);
                    quote1 = quote;
                    callback();
                });
            },
            // Delete quote
            function (callback) {
                _this._client.deleteQuote(null, quote1.id, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete quote
            function (callback) {
                _this._client.getQuoteById(null, quote1.id, function (err, quote) {
                    assert.isNull(err);
                    assert.isNull(quote || null);
                    callback();
                });
            }
        ], done);
    };
    return QuotesClientFixture;
}());
exports.QuotesClientFixture = QuotesClientFixture;
