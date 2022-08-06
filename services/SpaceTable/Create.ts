import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { v4 } from 'uuid';


const dbClient = new DynamoDB.DocumentClient();


async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    console.log('Event:',JSON.stringify(event, null, 2));
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello from the Lambda!'
    };

    const item = typeof event.body === 'object' ? event.body : JSON.parse(event.body)

    item.spaceId = v4();

    try {
        await dbClient.put({
            TableName: 'SpacesTable',
            Item: item
        }).promise();
    } catch (err) {
        console.error(err);
        result.statusCode = 500;
        result.body = 'An error has occurred';
    }

    return result;
}

export { handler };