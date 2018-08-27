let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { QuotesMemoryPersistence } from 'pip-services-Quotes-node';
import { QuotesController } from 'pip-services-Quotes-node';
import { IQuotesClientV1 } from '../../src/version1/IQuotesClientV1';
import { QuotesDirectClientV1 } from '../../src/version1/QuotesDirectClientV1';
import { QuotesClientFixtureV1 } from './QuotesClientFixtureV1';

suite('QuotesDirectClientV1', ()=> {
    let client: QuotesDirectClientV1;
    let fixture: QuotesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new QuotesMemoryPersistence();
        let controller = new QuotesController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-quotes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-quotes', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new QuotesDirectClientV1();
        client.setReferences(references);

        fixture = new QuotesClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
