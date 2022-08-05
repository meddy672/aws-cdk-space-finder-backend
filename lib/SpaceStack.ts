import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';

export class SpaceStack extends Stack {

  private api = new RestApi(this, 'SpaceApi');

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

      const helloLambda = new Function(this, 'HelloFunction', {
        runtime: Runtime.NODEJS_14_X,
        code: Code.fromAsset(join(__dirname, '..','services','hello')),
        handler: 'hello.handler'
      });

      const helloLambdaIntegration = new LambdaIntegration(helloLambda);
      const helloLambdaResource = this.api.root.addResource('hello');
      helloLambdaResource.addMethod('GET', helloLambdaIntegration);
  }
}
