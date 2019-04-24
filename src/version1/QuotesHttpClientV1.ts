import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { QuoteV1 } from './QuoteV1';
import { IQuotesClientV1 } from './IQuotesClientV1';

export class QuotesHttpClientV1 extends CommandableHttpClient implements IQuotesClientV1 {       
    
    constructor(config?: any) {
        super('v1/quotes');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
                
    public getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<QuoteV1>) => void): void {
        this.callCommand( 
            'get_quotes', 
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getRandomQuote(correlationId: string, filter: FilterParams,
        callback: (err: any, quote: QuoteV1) => void): void {
        this.callCommand( 
            'get_random_quote',
            correlationId,
            {
                fitler: filter
            }, 
            callback
        );        
    }

    public getQuoteById(correlationId: string, quoteId: string,
        callback: (err: any, quote: QuoteV1) => void): void {
        this.callCommand( 
            'get_quote_by_id',
            correlationId,
            {
                quote_id: quoteId
            }, 
            callback
        );        
    }

    public createQuote(correlationId: string, quote: QuoteV1,
        callback: (err: any, quote: QuoteV1) => void): void {
        this.callCommand(
            'create_quote',
            correlationId,
            {
                quote: quote
            }, 
            callback
        );
    }

    public updateQuote(correlationId: string, quote: QuoteV1,
        callback: (err: any, quote: QuoteV1) => void): void {
        this.callCommand(
            'update_quote', 
            correlationId,
            {
                quote: quote
            }, 
            callback
        );
    }

    public deleteQuoteById(correlationId: string, quoteId: string,
        callback: (err: any, quote: QuoteV1) => void): void {
        this.callCommand(
            'delete_quote_by_id', 
            correlationId,
            {
                quote_id: quoteId
            }, 
            callback
        );
    }
    
}
