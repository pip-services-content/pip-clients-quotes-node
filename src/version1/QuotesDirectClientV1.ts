import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { IQuotesClientV1 } from './IQuotesClientV1';
import { IQuotesBusinessLogic } from 'pip-services-quotes-node';
import { QuoteV1 } from './QuoteV1';

export class QuotesDirectClientV1 extends DirectClient<IQuotesBusinessLogic> implements IQuotesClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-quotes", "controller", "*", "*", "*"))
    }

    public getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<QuoteV1>) => void): void {
        let timing = this.instrument(correlationId, 'quotes.get_quotes');
        this._controller.getQuotes(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getRandomQuote(correlationId: string, filter: FilterParams, 
        callback: (err: any, quote: QuoteV1) => void): void {
        let timing = this.instrument(correlationId, 'quotes.get_random_quote');
        this._controller.getRandomQuote(correlationId, filter, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }

    public getQuoteById(correlationId: string, quoteId: string, 
        callback: (err: any, quote: QuoteV1) => void): void {
        let timing = this.instrument(correlationId, 'quotes.get_quote_by_id');
        this._controller.getQuoteById(correlationId, quoteId, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }

    public createQuote(correlationId: string, quote: QuoteV1, 
        callback: (err: any, quote: QuoteV1) => void): void {
        let timing = this.instrument(correlationId, 'quotes.create_quote');
        this._controller.createQuote(correlationId, quote, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }

    public updateQuote(correlationId: string, quote: QuoteV1, 
        callback: (err: any, quote: QuoteV1) => void): void {
        let timing = this.instrument(correlationId, 'quotes.update_quote');
        this._controller.updateQuote(correlationId, quote, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }

    public deleteQuoteById(correlationId: string, quoteId: string,
        callback: (err: any, quote: QuoteV1) => void): void {
        let timing = this.instrument(correlationId, 'quotes.delete_quote_by_id');
        this._controller.deleteQuoteById(correlationId, quoteId, (err, quote) => {
            timing.endTiming();
            callback(err, quote);
        });
    }
}