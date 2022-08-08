import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Read';

// const event: APIGatewayProxyEvent = {
//     queryStringParameters: {
//         location: 'London'
//     }
// } as any;

const event = {}

handler(event as any, {} as any)