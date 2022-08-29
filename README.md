# Welcome SpaceFinder Backend

The Spacefinder Backend is an aws cdk project built with Typescript and using Amazon Cognito, AWS Lambda APIGateway and DynamoDB.

## Overview
The main stack is the SpaceStack which integrates API endpoint with respective lambda functions, provides lambda functions with privilleges to perform CRUD operations on DynamoDB Table, and creates a User Pool with Amazon Cognito for authentication. The main compute layer for the SpaceFinder Backend is the AWS Lambda, and the handlers can be found within the `services/SpacesTable` directory. Each handler within the directory is responsible for one of the CRUD operations on the *SpacesTable*. Authentication is added to each endpoint via the `this.authorizer` property on the SpaceStack class.

## Required Software
- AWS CLI
- Node.js

## Installation
Clone repsoitory
```
git clone https://github.com/meddy672/aws-cdk-space-finder-backend.git
```

cd into root directory
```
cd aws-cdk-space-finder-backend
```
intall dependencies
```
npm install
```
 to deploy the app to your aws account run:
 ```
 cdk deploy
 ```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
