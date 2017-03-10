let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { PagingParams } from 'pip-services-runtime-node';
import { IQuotesClient } from '../../src/version1/IQuotesClient';

let QUOTE1 = {
    id: '1',
    text: 'Text 1',
    author: 'Author 1'
};
let QUOTE2 = {
    id: '2',
    tags: ['TAG 1'],
    text: 'Text 2',
    author: 'Author 2'
};

export class QuotesClientFixture {
    private _client: IQuotesClient;
    
    constructor(client: IQuotesClient) {
        this._client = client;
    }
        
    testCrudOperations(done) {
        var quote1, quote2;

        async.series([
        // Create one quote
            (callback) => {
                this._client.createQuote(
                    null,
                    QUOTE1,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.text, QUOTE1.text);
                        assert.equal(quote.author, QUOTE1.author);

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Create another quote
            (callback) => {
                this._client.createQuote(
                    null,
                    QUOTE2,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.text, QUOTE2.text);
                        assert.equal(quote.author, QUOTE2.author);

                        quote2 = quote;

                        callback();
                    }
                );
            },
        // Get all quotes
            (callback) => {
                this._client.getQuotes(
                    null,
                    {},
                    new PagingParams(0,5,false),
                    (err, quotes) => {
                        assert.isNull(err);

                        assert.isObject(quotes);
                        assert.isTrue(quotes.data.length >= 2);

                        callback();
                    }
                );
            },
        // Get random quote
            (callback) => {
                this._client.getRandomQuote(
                    null,
                    {},
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);

                        callback();
                    }
                );
            },
        // Update the quote
            (callback) => {
                this._client.updateQuote(
                    null,
                    quote1.id,
                    { text: 'Updated Content 1' },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.text, 'Updated Content 1');
                        assert.equal(quote.author, QUOTE1.author);

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Delete quote
            (callback) => {
                this._client.deleteQuote(
                    null,
                    quote1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete quote
            (callback) => {
                this._client.getQuoteById(
                    null,
                    quote1.id,
                    (err, quote) => {
                        assert.isNull(err);
                        
                        assert.isNull(quote || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
