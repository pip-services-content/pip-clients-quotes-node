import { IClient } from 'pip-services-runtime-node';

/**
 * Interface for Quotes microservice clients version 1
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-21
 */
export interface IQuotesClient extends IClient {
    getQuotes(correlationId: string, filter: any, paging: any, callback: any);
    getRandomQuote(correlationId: string, filter: any, callback: any);
    getQuoteById(correlationId: string, quoteId: string, callback: any);
    createQuote(correlationId: string, quote: any, callback: any);
    updateQuote(correlationId: string, quoteId: string, quote: any, callback: any);
    deleteQuote(correlationId: string, quoteId: string, callback: any);
}
