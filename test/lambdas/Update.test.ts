import { handler } from "../../services/SpacesTable/Update";
import { APIGatewayProxyEvent } from "aws-lambda";

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: '0ad886e9-17d9-4d55-8af2-d2766317e610'
    },
    body: {
        location: 'new location'
    }
} as any;

handler(event, {} as any);