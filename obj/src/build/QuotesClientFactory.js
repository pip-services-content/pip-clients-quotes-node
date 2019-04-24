"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const QuotesDirectClientV1_1 = require("../version1/QuotesDirectClientV1");
const QuotesHttpClientV1_1 = require("../version1/QuotesHttpClientV1");
const QuotesLambdaClientV1_1 = require("../version1/QuotesLambdaClientV1");
class QuotesClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(QuotesClientFactory.DirectClientV1Descriptor, QuotesDirectClientV1_1.QuotesDirectClientV1);
        this.registerAsType(QuotesClientFactory.HttpClientV1Descriptor, QuotesHttpClientV1_1.QuotesHttpClientV1);
        this.registerAsType(QuotesClientFactory.LambdaClientV1Descriptor, QuotesLambdaClientV1_1.QuotesLambdaClientV1);
    }
}
QuotesClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-quotes', 'factory', 'default', 'default', '1.0');
QuotesClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-quotes', 'client', 'direct', 'default', '1.0');
QuotesClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-quotes', 'client', 'http', 'default', '1.0');
QuotesClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-quotes', 'client', 'lambda', 'default', '1.0');
exports.QuotesClientFactory = QuotesClientFactory;
//# sourceMappingURL=QuotesClientFactory.js.map