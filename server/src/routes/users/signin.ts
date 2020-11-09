import express, { Response, Request } from 'express';

const router = express.Router();

router.post('/api/users/signin', async (req: Request, res: Response) => {
  res.send();
});

export { router as signinRouter };
