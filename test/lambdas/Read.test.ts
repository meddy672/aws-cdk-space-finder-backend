import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Read';

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: '70df170d-3ccc-4d21-87e2-e36c7748934f'
    }
} as any;

handler(event as any, {} as any)