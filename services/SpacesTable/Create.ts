import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { v4 } from 'uuid';


const dbClient = new DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME;

async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    console.log('Event:',JSON.stringify(event, null, 2));
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Created item with id:'+v4()
    };

    const item = typeof event.body === 'object' ? event.body : JSON.parse(event.body)

    item.spaceId = v4();

    try {
        await dbClient.put({
            TableName: TABLE_NAME!,
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