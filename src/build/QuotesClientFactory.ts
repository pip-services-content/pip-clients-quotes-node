import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-components-node';

import { QuotesDirectClientV1 } from '../version1/QuotesDirectClientV1';
import { QuotesHttpClientV1 } from '../version1/QuotesHttpClientV1';
import { QuotesSenecaClientV1 } from '../version1/QuotesSenecaClientV1';
import { QuotesLambdaClientV1 } from '../version1/QuotesLambdaClientV1';

export class QuotesClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-quotes', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-quotes', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-quotes', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-quotes', 'client', 'seneca', 'default', '1.0');
	public static LambdaClientV1Descriptor = new Descriptor('pip-services-quotes', 'client', 'lambda', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(QuotesClientFactory.DirectClientV1Descriptor, QuotesDirectClientV1);
		this.registerAsType(QuotesClientFactory.HttpClientV1Descriptor, QuotesHttpClientV1);
		this.registerAsType(QuotesClientFactory.SenecaClientV1Descriptor, QuotesSenecaClientV1);
		this.registerAsType(QuotesClientFactory.LambdaClientV1Descriptor, QuotesLambdaClientV1);
	}
	
}
