import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

let Version1 = require('../version1');

export class QuotesFactory extends ComponentFactory {
	public static Instance: QuotesFactory = new QuotesFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(Version1.QuotesRestClient.Descriptor, Version1.QuotesRestClient);
		this.register(Version1.QuotesSenecaClient.Descriptor, Version1.QuotesSenecaClient);
		this.register(Version1.QuotesLambdaClient.Descriptor, Version1.QuotesLambdaClient);
	}
	
}
