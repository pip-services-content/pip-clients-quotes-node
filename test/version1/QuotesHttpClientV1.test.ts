let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { QuotesMemoryPersistence } from 'pip-services-Quotes-node';
import { QuotesController } from 'pip-services-Quotes-node';
import { QuotesHttpServiceV1 } from 'pip-services-Quotes-node';
import { IQuotesClientV1 } from '../../src/version1/IQuotesClientV1';
import { QuotesHttpClientV1 } from '../../src/version1/QuotesHttpClientV1';
import { QuotesClientFixtureV1 } from './QuotesClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('QuotesRestClientV1', ()=> {
    let service: QuotesHttpServiceV1;
    let client: QuotesHttpClientV1;
    let fixture: QuotesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new QuotesMemoryPersistence();
        let controller = new QuotesController();

        service = new QuotesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-quotes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-quotes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-quotes', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new QuotesHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new QuotesClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
