import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';
import { IQuotesClientV1 } from './IQuotesClientV1';
import { IQuotesBusinessLogic } from 'pip-services-quotes-node';
import { QuoteV1 } from './QuoteV1';
export declare class QuotesDirectClientV1 extends DirectClient<IQuotesBusinessLogic> implements IQuotesClientV1 {
    constructor();
    getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<QuoteV1>) => void): void;
    getRandomQuote(correlationId: string, filter: FilterParams, callback: (err: any, quote: QuoteV1) => void): void;
    getQuoteById(correlationId: string, quoteId: string, callback: (err: any, quote: QuoteV1) => void): void;
    createQuote(correlationId: string, quote: QuoteV1, callback: (err: any, quote: QuoteV1) => void): void;
    updateQuote(correlationId: string, quote: QuoteV1, callback: (err: any, quote: QuoteV1) => void): void;
    deleteQuoteById(correlationId: string, quoteId: string, callback: (err: any, quote: QuoteV1) => void): void;
}
