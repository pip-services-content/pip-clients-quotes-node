let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { QuotesMemoryPersistence } from 'pip-services-Quotes-node';
import { QuotesController } from 'pip-services-Quotes-node';
import { QuotesRestServiceV1 } from 'pip-services-Quotes-node';
import { IQuotesClientV1 } from '../../src/version1/IQuotesClientV1';
import { QuotesRestClientV1 } from '../../src/version1/QuotesRestClientV1';
import { QuotesClientFixtureV1 } from './QuotesClientFixtureV1';

var restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('QuotesRestClientV1', ()=> {
    let service: QuotesRestServiceV1;
    let client: QuotesRestClientV1;
    let fixture: QuotesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new QuotesMemoryPersistence();
        let controller = new QuotesController();

        service = new QuotesRestServiceV1();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-quotes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-quotes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-quotes', 'service', 'rest', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new QuotesRestClientV1();
        client.setReferences(references);
        client.configure(restConfig);

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
