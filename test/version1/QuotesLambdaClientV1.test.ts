import { YamlConfigReader } from 'pip-services-commons-node';
import { QuotesClientFixtureV1 } from './QuotesClientFixtureV1';
import { QuotesLambdaClientV1 } from '../../src/version1/QuotesLambdaClientV1';

suite('QuotesLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: QuotesLambdaClientV1;
    let fixture: QuotesClientFixtureV1;

    setup((done) => {
        client = new QuotesLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new QuotesClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});