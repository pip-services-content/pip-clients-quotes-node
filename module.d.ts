declare module 'pip-clients-quotes-node' {
	import { IClient } from 'pip-services-runtime-node';
	import { RestClient } from 'pip-services-runtime-node';
	import { SenecaClient } from 'pip-services-runtime-node';
	import { LambdaClient } from 'pip-services-runtime-node';
	import { ComponentDescriptor } from 'pip-services-runtime-node';
	import { ComponentFactory } from 'pip-services-runtime-node';

    export class QuotesFactory extends ComponentFactory {
        public static Instance: QuotesFactory;	
        constructor();	
    }

    module Version1 {
        export interface IQuotesClient extends IClient {
            getQuotes(correlationId: string, filter: any, paging: any, callback: any);
            getRandomQuote(correlationId: string, filter: any, callback: any);
            getQuoteById(correlationId: string, quoteId: string, callback: any);
            createQuote(correlationId: string, quote: any, callback: any);
            updateQuote(correlationId: string, quoteId: string, quote: any, callback: any);
            deleteQuote(correlationId: string, quoteId: string, callback: any);
        }

        export class QuotesRestClient extends RestClient implements IQuotesClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            public getQuotes(correlationId: string, filter: any, paging: any, callback);
            public getRandomQuote(correlationId: string, filter: any, callback);
            public getQuoteById(correlationId: string, quoteId: string, callback);
            public createQuote(correlationId: string, quote: any, callback);
            public updateQuote(correlationId: string, quoteId: string, quote: any, callback);
            public deleteQuote(correlationId: string, quoteId: string, callback);
        }

        export class QuotesLambdaClient extends LambdaClient implements IQuotesClient {                   
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            public getQuotes(correlationId: string, filter: any, paging: any, callback);
            public getRandomQuote(correlationId: string, filter: any, callback);
            public getQuoteById(correlationId: string, quoteId: string, callback);
            public createQuote(correlationId: string, quote: any, callback);
            public updateQuote(correlationId: string, quoteId: string, quote: any, callback);
            public deleteQuote(correlationId: string, quoteId: string, callback);
        }

        export class QuotesSenecaClient extends SenecaClient implements IQuotesClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            public getQuotes(correlationId: string, filter: any, paging: any, callback);
            public getRandomQuote(correlationId: string, filter: any, callback);
            public getQuoteById(correlationId: string, quoteId: string, callback);
            public createQuote(correlationId: string, quote: any, callback);
            public updateQuote(correlationId: string, quoteId: string, quote: any, callback);
            public deleteQuote(correlationId: string, quoteId: string, callback);
        }
    }
}
