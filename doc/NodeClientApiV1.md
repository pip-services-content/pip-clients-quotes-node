# Client API (version 1) <br/> Quotes Microservices Client SDK for Node.js

Node.js client API for Quotes microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [MultiString class](#class1)
* [Quote class](#class2)
* [QuotePage class](#class3)
* [IQuoteClient interface](#interface)
    - [configure()](#operation0)
    - [link()](#operation1)
    - [open()](#operation2)
    - [close()](#operation3)
    - [getQuotes()](#operation4)
    - [getRandomQuote()](#operation5)
    - [getQuoteById()](#operation6)
    - [createQuote()](#operation7)
    - [updateQuote()](#operation8)
    - [deleteQuote()](#operation9)
* [QuotesDirectClient class](#client_direct)
* [QuotesRestClient class](#client_rest)
* [QuotesSenecaClient class](#client_seneca)
* [QuotesLambdaClient class](#client_lambda)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-quotes-node": "*",
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

If you are using Typescript, add the following type definition where compiler can find it
```javascript
/// <reference path="../node_modules/pip-clients-quotes-node/module.d.ts" />
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-quotes-node').Version1;

// Client configuration
var config = {
    endpoint: {
        type: 'http',
        host: 'localhost', 
        port: 8002
    }
};

// Create the client instance
var client = sdk.QuotesRestClient(config);

// Open client connection to the microservice
client.open(function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
    
    // Create a new quote
    var quote = {
        text: 'Get in hurry slowly',
        author: 'Russian proverb',
        tags: ['time management'],
        status: 'completed'
    };

    client.createQuote(
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
                function(err, quotesPage) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Quotes on time management are');
                    console.log(quotesPage.data);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

### <a name="class1"></a> MultiString class

String that contains versions in multiple languages

**Properties:**
- en: string - English version of the string
- sp: string - Spanish version of the string
- de: string - German version of the string
- fr: string - Franch version of the string
- pt: string - Portuguese version of the string
- ru: string - Russian version of the string
- .. - other languages can be added here

### <a name="class2"></a> Quote class

Represents an inspirational quote

**Properties:**
- id: string - unique quote id
- text: MultiString - quote text in different languages
- author: MultiString - name of the quote author in different languages
- status: string - editing status of the quote: 'new', 'writing', 'translating', 'completed' (default: 'new')
- tags: string[] - (optional) search tags that represent topics associated with the quote
- all_tags: string[] - (read only) explicit and hash tags in normalized format for searching  

### <a name="class3"></a> QuotePage class

Represents a paged result with subset of requested quotes

**Properties:**
- data: Quote[] - array of retrieved Quote page
- count: int - total number of objects in retrieved resultset

## <a name="interface"></a> IQuotesClient interface

If you are using Typescript, you can use IQuotesClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IQuotesClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IQuotesClient {
    configure(config);
    link(components);
    open(callback);
    close(callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quoteId, quote, callback);
    deleteQuote(correlationId, quoteId, callback);
}
```

### <a name="operation0"></a> configure(config)

Sets component configuration

**Arguments:** 
- config: ComponentConfig - component configuration. Calling this method is not required when configuration is set in constructor

### <a name="operation1"></a> init(components)

Initializes client references. Calling this method is not required when configuration is set in constructor

**Arguments:** 
- components: ComponentSet - references to other components, such as ILog or ICounters


### <a name="operation2"></a> open(callback)

Opens connection to the microservice

**Callback function parameters:**
- err - Error or null is no error occured

### <a name="operation3"></a> close(callback)

Closes connection to the microservice

**Callback function parameters:**
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
  - page: DataPage - retrieved quotes in page format

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
  - quote: Quote - random quote, null if object wasn't found 

### <a name="operation6"></a> getQuoteById(correlationId, quoteId, callback)

Retrieves a single quote specified by its unique id

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- quoteId: string - unique Quote id
- callback: (err, quote) => void - callback function
  - err: Error - occured error or null for success
  - quote: Quote - retrieved quote, null if object wasn't found 

### <a name="operation7"></a> createQuote(correlationId, quote, callback)

Creates a new quote

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- quote: Quote - Quote object to be created. If object id is not defined it is assigned automatically.
- callback: (err, quote) => void - callback function
  - err: Error - occured error or null for success
  - quote: Quote - created quote object

### <a name="operation8"></a> updateQuote(correlationId, quoteId, quote, callback)

Updates quote specified by its unique id

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- quoteId: string - unique quote id
- quote: Quote - quote object with new values. Partial updates are supported
- callback: (err, quote) => void - callback function
  - err: Error - occured error or null for success
  - quote: Quote - updated quote object 

### <a name="operation9"></a> deleteQuote(correlationId, quoteId, callback)

Deletes quote specified by its unique id

**Arguments:** 
- correlationId: string - (optional) unique id that identifies distributed transaction
- quoteId: string - unique quote id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_direct"></a> QuotesDirectClient class

QuotesDirectClient is a direct client to call controller inside microservice container

```javascript
class QuotesDirectClient extends DirectClient implements IQuotesClient {
    constructor(config: any = null);
    configure(config);
    link(components);
    open(callback);
    close(callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quoteId, quote, callback);
    deleteQuote(correlationId, quoteId, callback);
}
```

**Constructor config properties:** 
- ...

## <a name="client_rest"></a> QuotesRestClient class

QuotesRestClient is a client that implements HTTP/REST protocol

```javascript
class QuotesRestClient extends RestClient implements IQuotesClient {
    constructor(config: any = null);
    configure(config);
    link(components);
    open(callback);
    close(callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quoteId, quote, callback);
    deleteQuote(correlationId, quoteId, callback);
}
```

**Constructor config properties:** 
- endpoint: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> QuotesSenecaClient class

QuotesSenecaClient is a client that implements Seneca protocol

```javascript
class QuotesSenecaClient extends SenecaClient implements IQuotesClient {
    constructor(config: any = null);        
    configure(config);
    link(components);
    open(callback);
    close(callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quoteId, quote, callback);
    deleteQuote(correlationId, quoteId, callback);
}
```

**Constructor config properties:** 
- endpoint: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_lambda"></a> QuotesLambdaClient class

QuotesLambdaClient is a client that calls AWS Lamba functions

```javascript
class QuotesLambdaClient extends LambdaClient implements IQuotesClient {
    constructor(config: any = null);        
    configure(config);
    link(components);
    open(callback);
    close(callback);
    getQuotes(correlationId, filter, paging, callback);
    getRandomQuote(correlationId, filter, callback);
    getQuoteById(correlationId, quoteId, callback);
    createQuote(correlationId, quote, callback);
    updateQuote(correlationId, quoteId, quote, callback);
    deleteQuote(correlationId, quoteId, callback);
}
```

**Constructor config properties:** 
- endpoint: object - AWS Lambda connection properties
  - protocol: "aws"
  - region: string - AWS availability region like "us-east-1"
  - function: string - unique function name or arn like "arn:aws:lambda:us-east-1:268549927901:function:pip-services-template-node"
- options: object - AWS Lambda access keys and additional parameters
  - access\_key\_id: string - AWS access key id
  - secret\_access\_key: string - AWS secret access key
  - timeout: number - communication timeout in milliseconds (default: 30,000)
  