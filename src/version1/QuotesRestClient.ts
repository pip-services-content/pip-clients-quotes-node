let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { RestClient } from 'pip-services-runtime-node';

import { IQuotesClient } from './IQuotesClient';

export class QuotesRestClient extends RestClient implements IQuotesClient {       
	/**
	 * Unique descriptor for the QuotesRestClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-quotes", "rest", "1.0"
	);
    
    constructor(config?: any) {
        super(QuotesRestClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
                
    public getQuotes(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quotes', callback);
        
        let params = {};
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);

        this.call('get', 
            '/quotes', 
            correlationId,
            params, 
            callback
        );
    }

    public getRandomQuote(correlationId: string, filter: any, callback) {
        callback = this.instrument(correlationId, 'quotes.get_random_quote', callback);

        let params = {};
        this.addFilterParams(params, filter);
        
        this.call('get', 
            '/quotes/random',
            correlationId,
            params, 
            callback
        );        
    }

    public getQuoteById(correlationId: string, quoteId: string, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quote_by_id', callback);
        
        this.call('get', 
            '/quotes/' + quoteId,
            correlationId,
            {}, 
            callback
        );        
    }

    public createQuote(correlationId: string, quote: any, callback) {
        callback = this.instrument(correlationId, 'quotes.create_quote', callback);

        this.call('post', 
            '/quotes',
            correlationId,
            {}, 
            quote, 
            callback
        );
    }

    public updateQuote(correlationId: string, quoteId: string, quote: any, callback) {
        callback = this.instrument(correlationId, 'quotes.update_quote', callback);
        
        this.call('put', 
            '/quotes/' + quoteId, 
            correlationId,
            {}, 
            quote, 
            callback
        );
    }

    public deleteQuote(correlationId: string, quoteId: string, callback) {
        callback = this.instrument(correlationId, 'quotes.delete_quote', callback);

        let params = {};
        this.addCorrelationId(params, correlationId);

        this.call('delete', 
            '/quotes/' + quoteId, 
            correlationId,
            {}, 
            callback
        );
    }
    
}
