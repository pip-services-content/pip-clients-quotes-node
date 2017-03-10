"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var Version1 = require('../version1');
var QuotesFactory = (function (_super) {
    __extends(QuotesFactory, _super);
    function QuotesFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(Version1.QuotesRestClient.Descriptor, Version1.QuotesRestClient);
        this.register(Version1.QuotesSenecaClient.Descriptor, Version1.QuotesSenecaClient);
        this.register(Version1.QuotesLambdaClient.Descriptor, Version1.QuotesLambdaClient);
    }
    QuotesFactory.Instance = new QuotesFactory();
    return QuotesFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.QuotesFactory = QuotesFactory;
