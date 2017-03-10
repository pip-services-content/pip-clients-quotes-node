let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';

let QuotesMemoryPersistence = require('pip-services-quotes/lib/src/persistence/QuotesMemoryPersistence').QuotesMemoryPersistence;
let QuotesController = require('pip-services-quotes/lib/src/logic/QuotesController').QuotesController;
let QuotesSenecaService = require('pip-services-quotes/lib/src/services/version1/QuotesSenecaService').QuotesSenecaService;

import { QuotesSenecaClient } from '../../src/version1/QuotesSenecaClient';
import { QuotesClientFixture } from './QuotesClientFixture';

suite('QuotesSenecaClient', ()=> {        
    let db = new QuotesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new QuotesController();
    ctrl.configure(new ComponentConfig());

    let service = new QuotesSenecaService();
    service.configure(new ComponentConfig());

    let client = new QuotesSenecaClient();
    client.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    let fixture = new QuotesClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});