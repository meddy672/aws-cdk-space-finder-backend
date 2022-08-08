import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';


const dbClient = new DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;

async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    console.log('Event:',JSON.stringify(event, null, 2));
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello from the lambda!'
    };

    try {
        if (event.queryStringParameters) {
            if (PRIMARY_KEY! in event.queryStringParameters) {
                const keyValue = event.queryStringParameters[PRIMARY_KEY!];
                const queryResponse = await dbClient.query({
                    TableName: TABLE_NAME!,
                    KeyConditionExpression: '#zz = :zzzz',
                    ExpressionAttributeNames: {
                        '#zz': PRIMARY_KEY!
                    },
                    ExpressionAttributeValues: {
                        ':zzzz': keyValue
                    }
                }).promise();

                result.body = JSON.stringify(queryResponse);
            }
        } else {
            const response = await dbClient.scan({ TableName: TABLE_NAME!}).promise();
            result.body = JSON.stringify(response);
        }
    } catch (err) {
        console.error(err);
        result.statusCode = 500;
        result.body = 'An error has occurred';
    }

    return result;
}

export { handler };