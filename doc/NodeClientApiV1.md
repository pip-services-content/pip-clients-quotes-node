# Client API (version 1) <br/> Quotes Microservices Client SDK for Node.js

Node.js client API for Quotes microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [MultiStringV1 class](#class1)
* [QuoteV1 class](#class2)
* [DataPage<QuoteV1> class](#class3)
* [IQuoteClientV1 interface](#interface)
    - [configure()](#operation0)
    - [setReferences()](#operation1)
    - [open(correlationId, )](#operation2)
    - [close(correlationId, )](#operation3)
    - [getQuotes()](#operation4)
    - [getRandomQuote()](#operation5)
    - [getQuoteById()](#operation6)
    - [createQuote()](#operation7)
    - [updateQuote()](#operation8)
    - [deleteQuoteById()](#operation9)
* [QuotesDirectClientV1 class](#client_direct)
* [QuotesRestClientV1 class](#client_rest)
* [QuotesSenecaClientV1 class](#client_seneca)
* [QuotesLambdaClientV1 class](#client_lambda)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-quotes-node": "^1.1.0",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-quotes-node');

// Client configuration
var config = {
    connection: {
        type: 'http',
        host: 'localhost', 
        port: 8002
    }
};

// Create the client instance
var client = sdk.QuotesRestClientV1(config);

// Open client connection to the microservice
client.open(correlationId, null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
    
    // Create a new quote
    var quote = {
        text: { en: 'Get in hurry slowly' },
        author: { en: 'Russian proverb' },
        tags: ['time management'],
        status: 'completed'
    };

    client.createQuote(
        null,
        quote,
        function (err, quote) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Create quote is');
            console.log(quote);
            
            // Get the list of quotes on 'time management' topic
            client.getQuotes(
                {
                    tags: 'time management',
                    status: 'completed'
                },
                {
                    paging: true,
                    skip: 0,
                    take: 10
                },
                function(err, page) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Quotes on time management are');
                    console.log(page.data);
                    
                    // Close connection
                    client.close(correlationId, ); 
                }
            );
        }
    );
});
```

### <a name="class1"></a> MultiStringV1 class

String that contains versions in multiple languages

**Properties:**
- en: string - English version of the string
- sp: string - Spanish version of the string
- de: string - German version of the string
- fr: string - Franch version of the string
- pt: string - Portuguese version of the string
- ru: string - Russian version of the string
- .. - other languages can be added here

### <a name="class2"></a> QuoteV1 class

Represents an inspirational quote

**Properties:**
- id: string - unique quote id
- text: MultiString - quote text in different languages
- author: MultiString - name of the quote author in different languages
- status: string - editing status of the quote: 'new', 'writing', 'translating', 'completed' (default: 'new')
- tags: string[] - (optional) search tags that represent topics associated with the quote
- all_tags: string[] - (read only) explicit and hash tags in normalized format for searching  

### <a name="class3"></a> DataPage<QuoteV1> class

Represents a paged result with subset of requested quotes

**Properties:**
- data: QuoteV1[] - array of retrieved Quote page
- count: int - total number of objects in retrieved resultset

## <a name="interface"></a> IQuotesClientV1 interface

If you are using Typescript, you can use IQuotesClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IQuotesClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IQuotesClientV1 {
    configure(config);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quote, callback);
    deleteQuoteById(correlationId, quoteId, callback);
}
```

### <a name="operation0"></a> configure(config)

Sets component configuration

**Arguments:** 
- config: ComponentConfig - component configuration. Calling this method is not required when configuration is set in constructor

### <a name="operation1"></a> setReferences(references)

Initializes client references. Calling this method is not required when configuration is set in constructor

**Arguments:** 
- references: IReferences - references to other components, such as ILog or ICounters


### <a name="operation2"></a> open(correlationId, callback)

Opens connection to the microservice

**Callback function parameters:**
- correlationId: string - (optional) unique id that identifies distributed transaction
- err - Error or null is no error occured

### <a name="operation3"></a> close(correlationId, callback)

Closes connection to the microservice

**Callback function parameters:**
- correlationId: string - (optional) unique id that identifies distributed transaction
- err - Error or null is no error occured

### <a name="operation4"></a> getQuotes(correlationId, filter, paging, callback)

Retrieves a collection of quotes according to specified criteria

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- filter: any - filter parameters
  - tags: string[] - (optional) list tags with topic names
  - status: string - (optional) quote editing status
  - author: string - (optional) author name in any language 
  - except_ids: string[] - (optional) quote ids to exclude 
- paging: any - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
  - paging: bool - (optional) true to enable paging and return total count
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: DataPage<QuoteV1> - retrieved quotes in page format

### <a name="operation5"></a> getRandomQuote(correlationId, filter, callback)

Retrieves a random quote from filtered resultset

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- filter: any - filter parameters
  - tags: string[] - (optional) list tags with topic names
  - status: string - (optional) quote editing status
  - author: string - (optional) author name in any language
  - except_ids: string[] - (optional) quote ids to exclude 
- callback: (err, quote) => void - callback function
  - err: Error - occured error or null for success
  - quote: QuoteV1 - random quote, null if object wasn't found 

### <a name="operation6"></a> getQuoteById(correlationId, quoteId, callback)

Retrieves a single quote specified by its unique id

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- quoteId: string - unique Quote id
- callback: (err, quote) => void - callback function
  - err: Error - occured error or null for success
  - quote: QuoteV1 - retrieved quote, null if object wasn't found 

### <a name="operation7"></a> createQuote(correlationId, quote, callback)

Creates a new quote

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- quote: QuoteV1 - Quote object to be created. If object id is not defined it is assigned automatically.
- callback: (err, quote) => void - callback function
  - err: Error - occured error or null for success
  - quote: QuoteV1 - created quote object

### <a name="operation8"></a> updateQuote(correlationId, quote, callback)

Updates quote specified by its unique id

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- quote: QuoteV1 - quote object with new values. Partial updates are supported
- callback: (err, quoteV1) => void - callback function
  - err: Error - occured error or null for success
  - quote: Quote - updated quote object 

### <a name="operation9"></a> deleteQuoteById(correlationId, quoteId, callback)

Deletes quote specified by its unique id

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- quoteId: string - unique quote id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_direct"></a> QuotesDirectClientV1 class

QuotesDirectClientV1 is a direct client to call controller inside microservice container

```javascript
class QuotesDirectClientV1 extends DirectClient implements IQuotesClientV1 {
    constructor(config: any = null);
    configure(config);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quoteId, quote, callback);
    deleteQuoteById(correlationId, quoteId, callback);
}
```

**Constructor config properties:** 
- ...

## <a name="client_rest"></a> QuotesRestClientV1 class

QuotesRestClientV1 is a client that implements HTTP/REST protocol

```javascript
class QuotesRestClientV1 extends RestClient implements IQuotesClientV1 {
    constructor(config: any = null);
    configure(config);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quote, callback);
    deleteQuoteById(correlationId, quoteId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> QuotesSenecaClientV1 class

QuotesSenecaClientV1 is a client that implements Seneca protocol

```javascript
class QuotesSenecaClientV1 extends SenecaClient implements IQuotesClientV1 {
    constructor(config: any = null);        
    configure(config);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quote, callback);
    deleteQuoteById(correlationId, quoteId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_lambda"></a> QuotesLambdaClientV1 class

QuotesLambdaClientV1 is a client that calls AWS Lamba functions

```javascript
class QuotesLambdaClientV1 extends LambdaClient implements IQuotesClientV1 {
    constructor(config: any = null);        
    configure(config);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quote, callback);
    deleteQuoteById(correlationId, quoteId, callback);
}
```

**Constructor config properties:** 
- connection: object - AWS Lambda connection properties
  - protocol: "aws"
  - region: string - AWS availability region like "us-east-1"
  - function: string - unique function name or arn like "arn:aws:lambda:us-east-1:268549927901:function:pip-services-template-node"
- credential: object - AWS Lambda access keys and additional parameters
  - access\_key\_id: string - AWS access key id
  - secret\_access\_key: string - AWS secret access key
- options: object
  - timeout: number - communication timeout in milliseconds (default: 30,000)
  