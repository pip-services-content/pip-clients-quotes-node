let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { PagingParams, MultiString } from 'pip-services3-commons-node';

import { QuoteV1 } from '../../src/version1/QuoteV1';
import { QuoteStatusV1 } from '../../src/version1/QuoteStatusV1';
import { IQuotesClientV1 } from '../../src/version1/IQuotesClientV1';

let QUOTE1: QuoteV1 = {
    id: '1',
    text: new MultiString({ en: 'Text 1' }),
    author: new MultiString({ en: 'Author 1' }),
    status: QuoteStatusV1.Completed,
    tags: [],
    all_tags: []
};
let QUOTE2: QuoteV1 = {
    id: '2',
    text: new MultiString({ en: 'Text 2' }),
    author: new MultiString({ en: 'Author 2' }),
    status: QuoteStatusV1.Completed,
    tags: ['TAG 1'],
    all_tags: ['tag1']
};

export class QuotesClientFixtureV1 {
    private _client: IQuotesClientV1;
    
    constructor(client: IQuotesClientV1) {
        this._client = client;
    }
        
    testCrudOperations(done) {
        let quote1, quote2;

        async.series([
        // Create one quote
            (callback) => {
                this._client.createQuote(
                    null,
                    QUOTE1,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        // assert.equal(quote.text.get('en'), QUOTE1.text.get('en'));
                        // assert.equal(quote.author.get('en'), QUOTE1.author.get('en'));

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
                        // assert.equal(quote.text.get('en'), QUOTE2.text.get('en'));
                        // assert.equal(quote.author.get('en'), QUOTE2.author.get('en'));

                        quote2 = quote;

                        callback();
                    }
                );
            },
        // Get all quotes
            (callback) => {
                this._client.getQuotes(
                    null,
                    null,
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
                    null,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);

                        callback();
                    }
                );
            },
        // Update the quote
            (callback) => {
                quote1.text.en = 'Updated Content 1';

                this._client.updateQuote(
                    null,
                    quote1,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        // assert.equal(quote.text.get('en'), 'Updated Content 1');
                        // assert.equal(quote.author.get('en'), QUOTE1.author.get('en'));

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Delete quote
            (callback) => {
                this._client.deleteQuoteById(
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
