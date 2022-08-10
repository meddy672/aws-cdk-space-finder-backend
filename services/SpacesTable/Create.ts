import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { MissingFieldError, validateAsSpaceEntry } from '../Shared/InputValidator';
import { generateRandomId, getEventBody } from '../Shared/Utils';
import { DynamoDB } from 'aws-sdk';


const dbClient = new DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME;

async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    console.log('Event:',JSON.stringify(event, null, 2));

    const item = getEventBody(event);
    item.spaceId = generateRandomId();

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Created item with id '+ item.spaceId
    }

    try {
        validateAsSpaceEntry(item);

        await dbClient.put({
            TableName: TABLE_NAME!,
            Item: item
        }).promise();
    } catch (err) {
        let message = 'unknown error';;
        if (err instanceof MissingFieldError) {
            result.statusCode = 403;
            message = err.message;
        } else if(err instanceof Error) {
            result.statusCode = 500;
            message = err.message;
        }
        result.body = message;
    }

    return result;
}

export { handler };