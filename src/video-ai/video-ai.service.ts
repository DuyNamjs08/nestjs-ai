import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';


@Injectable()
export class VideoAiService {
    private s3: S3;

    constructor() {
        this.s3 = new S3({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    async uploadVideo(fileBuffer: Buffer, fileName: string): Promise<string> {
        if (!process.env.AWS_BUCKET_NAME) {
            throw new Error('AWS_BUCKET_NAME is not defined');
        }
        if (!fileName) {
            throw new Error('fileName is required');
        }
        const uploadResult = await this.s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
            Body: fileBuffer,
            ContentType: 'video/mp4',
            ACL: 'public-read', // hoặc private tuỳ nhu cầu
        }).promise();

        return uploadResult.Location; // trả về URL video
    }
}
