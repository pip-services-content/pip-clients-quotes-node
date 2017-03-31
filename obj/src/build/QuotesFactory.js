"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const QuotesDirectClientV1_1 = require("../version1/QuotesDirectClientV1");
const QuotesRestClientV1_1 = require("../version1/QuotesRestClientV1");
const QuotesSenecaClientV1_1 = require("../version1/QuotesSenecaClientV1");
class QuotesFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(QuotesFactory.DirectClientV1Descriptor, QuotesDirectClientV1_1.QuotesDirectClientV1);
        this.registerAsType(QuotesFactory.RestClientV1Descriptor, QuotesRestClientV1_1.QuotesRestClientV1);
        this.registerAsType(QuotesFactory.SenecaClientV1Descriptor, QuotesSenecaClientV1_1.QuotesSenecaClientV1);
    }
}
QuotesFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'factory', 'default', 'default', '1.0');
QuotesFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'direct', 'default', '1.0');
QuotesFactory.RestClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'rest', 'default', '1.0');
QuotesFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'client', 'seneca', 'default', '1.0');
exports.QuotesFactory = QuotesFactory;
//# sourceMappingURL=QuotesFactory.js.map