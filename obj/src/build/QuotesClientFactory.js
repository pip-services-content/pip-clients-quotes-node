"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const QuotesDirectClientV1_1 = require("../version1/QuotesDirectClientV1");
const QuotesHttpClientV1_1 = require("../version1/QuotesHttpClientV1");
const QuotesSenecaClientV1_1 = require("../version1/QuotesSenecaClientV1");
class QuotesClientFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(QuotesClientFactory.DirectClientV1Descriptor, QuotesDirectClientV1_1.QuotesDirectClientV1);
        this.registerAsType(QuotesClientFactory.HttpClientV1Descriptor, QuotesHttpClientV1_1.QuotesHttpClientV1);
        this.registerAsType(QuotesClientFactory.SenecaClientV1Descriptor, QuotesSenecaClientV1_1.QuotesSenecaClientV1);
    }
}
QuotesClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'factory', 'default', 'default', '1.0');
QuotesClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'direct', 'default', '1.0');
QuotesClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'http', 'default', '1.0');
QuotesClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'seneca', 'default', '1.0');
exports.QuotesClientFactory = QuotesClientFactory;
//# sourceMappingURL=QuotesClientFactory.js.map