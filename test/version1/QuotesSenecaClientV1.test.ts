let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { QuotesMemoryPersistence } from 'pip-services-Quotes-node';
import { QuotesController } from 'pip-services-Quotes-node';
import { QuotesSenecaServiceV1 } from 'pip-services-Quotes-node';
import { IQuotesClientV1 } from '../../src/version1/IQuotesClientV1';
import { QuotesSenecaClientV1 } from '../../src/version1/QuotesSenecaClientV1';
import { QuotesClientFixtureV1 } from './QuotesClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('QuotesSenecaClient', () => {
    let service: QuotesSenecaServiceV1;
    let client: QuotesSenecaClientV1;
    let fixture: QuotesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new QuotesMemoryPersistence();
        let controller = new QuotesController();

        service = new QuotesSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-quotes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-quotes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-quotes', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new QuotesSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
