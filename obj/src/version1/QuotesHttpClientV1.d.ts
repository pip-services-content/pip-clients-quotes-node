import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';
import { QuoteV1 } from './QuoteV1';
import { IQuotesClientV1 } from './IQuotesClientV1';
export declare class QuotesHttpClientV1 extends CommandableHttpClient implements IQuotesClientV1 {
    constructor(config?: any);
    getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<QuoteV1>) => void): void;
    getRandomQuote(correlationId: string, filter: FilterParams, callback: (err: any, quote: QuoteV1) => void): void;
    getQuoteById(correlationId: string, quoteId: string, callback: (err: any, quote: QuoteV1) => void): void;
    createQuote(correlationId: string, quote: QuoteV1, callback: (err: any, quote: QuoteV1) => void): void;
    updateQuote(correlationId: string, quote: QuoteV1, callback: (err: any, quote: QuoteV1) => void): void;
    deleteQuoteById(correlationId: string, quoteId: string, callback: (err: any, quote: QuoteV1) => void): void;
}
