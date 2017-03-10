"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var QuotesMemoryPersistence = require('pip-services-quotes/lib/src/persistence/QuotesMemoryPersistence').QuotesMemoryPersistence;
var QuotesController = require('pip-services-quotes/lib/src/logic/QuotesController').QuotesController;
var QuotesSenecaService = require('pip-services-quotes/lib/src/services/version1/QuotesSenecaService').QuotesSenecaService;
var QuotesSenecaClient_1 = require('../../src/version1/QuotesSenecaClient');
var QuotesClientFixture_1 = require('./QuotesClientFixture');
suite('QuotesSenecaClient', function () {
    var db = new QuotesMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new QuotesController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new QuotesSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var client = new QuotesSenecaClient_1.QuotesSenecaClient();
    client.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_4.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    var fixture = new QuotesClientFixture_1.QuotesClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_3.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
