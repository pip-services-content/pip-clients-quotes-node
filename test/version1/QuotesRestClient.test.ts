let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

let QuotesMemoryPersistence = require('pip-services-quotes/lib/src/persistence/QuotesMemoryPersistence').QuotesMemoryPersistence;
let QuotesController = require('pip-services-quotes/lib/src/logic/QuotesController').QuotesController;
let QuotesRestService = require('pip-services-quotes/lib/src/services/version1/QuotesRestService').QuotesRestService;

import { QuotesRestClient } from '../../src/version1/QuotesRestClient';
import { QuotesClientFixture } from './QuotesClientFixture';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.protocol', 'http',
    'endpoint.host', 'localhost',
    'endpoint.port', 3000
);

suite('QuotesRestClient', ()=> {    
    let db = new QuotesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new QuotesController();
    ctrl.configure(new ComponentConfig());

    let service = new QuotesRestService();
    service.configure(restConfig);

    let client = new QuotesRestClient();
    client.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service, client);
    let fixture = new QuotesClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});