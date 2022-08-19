import { S3 } from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

const s3Client = new S3();

const handler = async (event:any, context: any) => {
    if (isAuthorized(event)) {
        const buckets = await s3Client.listBuckets().promise();
        console.log('Event', JSON.stringify(event, null, 2));
        return {
            statusCode: 200,
            body: 'Here are your buckets'+JSON.stringify(buckets, null, 2)
        }
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify('You are not authorized')
        }
    }

}

function isAuthorized(event: APIGatewayProxyEvent) {
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins');
    } else {
        return false;
    }
}

export  { handler }