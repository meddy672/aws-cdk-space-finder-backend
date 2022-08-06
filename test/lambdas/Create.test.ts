import { handler } from '../../services/SpaceTable/Create';

const event = {
    body: {
        location: 'Paris'
    }
}

handler(event as any, {} as any);