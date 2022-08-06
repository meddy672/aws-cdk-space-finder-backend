import {v4 } from 'uuid';
import { S3 } from 'aws-sdk';

const s3Client = new S3();

const handler = async (event:any, context: any) => {
    const buckets = await s3Client.listBuckets().promise();
    console.log('Event', JSON.stringify(event, null, 2));
    return {
        statusCode: 200,
        body: 'Here are your buckets'+JSON.stringify(buckets, null, 2)
    }
}

export  { handler }