import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { QuotesDirectClientV1 } from '../version1/QuotesDirectClientV1';
import { QuotesRestClientV1 } from '../version1/QuotesRestClientV1';
import { QuotesSenecaClientV1 } from '../version1/QuotesSenecaClientV1';

export class QuotesFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-quotes', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-quotes', 'client', 'direct', 'default', '1.0');
	public static RestClientV1Descriptor = new Descriptor('pip-services-quotes', 'client', 'rest', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-quotes', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(QuotesFactory.DirectClientV1Descriptor, QuotesDirectClientV1);
		this.registerAsType(QuotesFactory.RestClientV1Descriptor, QuotesRestClientV1);
		this.registerAsType(QuotesFactory.SenecaClientV1Descriptor, QuotesSenecaClientV1);
	}
	
}
