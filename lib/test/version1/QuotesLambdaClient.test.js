"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var QuotesLambdaClient_1 = require('../../src/version1/QuotesLambdaClient');
var QuotesClientFixture_1 = require('./QuotesClientFixture');
var config = pip_services_runtime_node_4.ConfigReader.read('./config/config.yaml');
var clientConfigs = config.getSection(pip_services_runtime_node_3.Category.Clients) || [];
var lambdaConfig = _.find(clientConfigs, function (c) {
    return c.getDescriptor().getType() == 'lambda';
});
suite('QuotesLambdaClient', function () {
    // Skip test if lambda is not configured
    if (lambdaConfig == null)
        return;
    var config = pip_services_runtime_node_2.ComponentConfig.fromValue(lambdaConfig);
    var client = new QuotesLambdaClient_1.QuotesLambdaClient();
    client.configure(config);
    var fixture = new QuotesClientFixture_1.QuotesClientFixture(client);
    suiteSetup(function (done) {
        client.link(new pip_services_runtime_node_1.ComponentSet());
        client.open(done);
    });
    suiteTeardown(function (done) {
        client.close(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
