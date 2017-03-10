let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { LambdaClient } from 'pip-services-runtime-node';

import { IQuotesClient } from './IQuotesClient';

export class QuotesLambdaClient extends LambdaClient implements IQuotesClient {       
	/**
	 * Unique descriptor for the QuotesLambdaClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-quotes", "lambda", "1.0"
	);
    
    constructor(config?: any) {
        super(QuotesLambdaClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getQuotes(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quotes', callback);
        this.call(
            'get_quotes', 
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getRandomQuote(correlationId: string, filter: any, callback) {
        callback = this.instrument(correlationId, 'quotes.get_random_quote', callback);
        this.call(
            'get_random_quote', 
            correlationId,
            {
                filter: filter
            }, 
            callback
        );        
    }

    public getQuoteById(correlationId: string, quoteId: string, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quote_by_id', callback);
        this.call(
            'get_quote_by_id', 
            correlationId,
            {
                quote_id: quoteId
            },
            callback
        );        
    }

    public createQuote(correlationId: string, quote: any, callback) {
        callback = this.instrument(correlationId, 'quotes.create_quote', callback);
        this.call(
            'create_quote', 
            correlationId,
            {
                quote: quote
            }, 
            callback
        );
    }

    public updateQuote(correlationId: string, quoteId: string, quote: any, callback) {
        callback = this.instrument(correlationId, 'quotes.update_quote', callback);
        this.call(
            'update_quote', 
            correlationId,
            {
                quote: quote
            }, 
            callback
        );
    }

    public deleteQuote(correlationId: string, quoteId: string, callback) {
        callback = this.instrument(correlationId, 'quotes.delete_quote', callback);
        this.call(
            'delete_quote', 
            correlationId,
            {
                quote_id: quoteId
            }, 
            callback
        );
    }
    
}
