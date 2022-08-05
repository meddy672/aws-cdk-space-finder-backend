#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SpaceStack } from '../lib/SpaceStack';

const app = new cdk.App();
new SpaceStack(app, 'AwsCdkSpaceFinderBackendStack', {
  stackName: 'SpaceFinder'
});