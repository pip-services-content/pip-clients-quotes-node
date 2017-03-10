let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaClient } from 'pip-services-runtime-node';

import { IQuotesClient } from './IQuotesClient';

export class QuotesSenecaClient extends SenecaClient implements IQuotesClient {       
	/**
	 * Unique descriptor for the QuotesSenecaClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-quotes", "seneca", "1.0"
	);
    
    constructor(config?: any) {
        super(QuotesSenecaClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
                
    public getQuotes(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quotes', callback);
        this.call(
            'quotes', 'get_quotes', 
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
            'quotes', 'get_random_quote', 
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
            'quotes', 'get_quote_by_id', 
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
            'quotes', 'create_quote', 
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
            'quotes', 'update_quote', 
            correlationId,
            {
                quote_id: quoteId,
                quote: quote
            }, 
            callback
        );
    }

    public deleteQuote(correlationId: string, quoteId: string, callback) {
        callback = this.instrument(correlationId, 'quotes.delete_quote', callback);
        this.call(
            'quotes', 'delete_quote', 
            correlationId,
            {
                quote_id: quoteId
            }, 
            callback
        );
    }
    
}
