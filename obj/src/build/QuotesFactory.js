"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const QuotesDirectClientV1_1 = require("../version1/QuotesDirectClientV1");
const QuotesHttpClientV1_1 = require("../version1/QuotesHttpClientV1");
const QuotesSenecaClientV1_1 = require("../version1/QuotesSenecaClientV1");
class QuotesFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(QuotesFactory.DirectClientV1Descriptor, QuotesDirectClientV1_1.QuotesDirectClientV1);
        this.registerAsType(QuotesFactory.HttpClientV1Descriptor, QuotesHttpClientV1_1.QuotesHttpClientV1);
        this.registerAsType(QuotesFactory.SenecaClientV1Descriptor, QuotesSenecaClientV1_1.QuotesSenecaClientV1);
    }
}
QuotesFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'factory', 'default', 'default', '1.0');
QuotesFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'direct', 'default', '1.0');
QuotesFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'http', 'default', '1.0');
QuotesFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'seneca', 'default', '1.0');
exports.QuotesFactory = QuotesFactory;
//# sourceMappingURL=QuotesFactory.js.map