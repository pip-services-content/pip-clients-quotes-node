"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var QuotesMemoryPersistence = require('pip-services-quotes/lib/src/persistence/QuotesMemoryPersistence').QuotesMemoryPersistence;
var QuotesController = require('pip-services-quotes/lib/src/logic/QuotesController').QuotesController;
var QuotesRestService = require('pip-services-quotes/lib/src/services/version1/QuotesRestService').QuotesRestService;
var QuotesRestClient_1 = require('../../src/version1/QuotesRestClient');
var QuotesClientFixture_1 = require('./QuotesClientFixture');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.protocol', 'http', 'endpoint.host', 'localhost', 'endpoint.port', 3000);
suite('QuotesRestClient', function () {
    var db = new QuotesMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new QuotesController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new QuotesRestService();
    service.configure(restConfig);
    var client = new QuotesRestClient_1.QuotesRestClient();
    client.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, client);
    var fixture = new QuotesClientFixture_1.QuotesClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
