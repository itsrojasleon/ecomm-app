import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { S3 } from 'aws-sdk';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { config } from '../../config';

const router = express.Router();

const s3 = new S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  apiVersion: '2006-03-01',
  region: 'us-east-2'
});

router.get(
  '/api/upload',
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    const key = `${req.currentUser!.id}/${randomBytes(16).toString(
      'hex'
    )}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: config.AWS_BUCKET_NAME,
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        if (err) {
          console.log(err);
        }

        res.send({ key, url });
      }
    );
  }
);

export { router as uploadRouter };
