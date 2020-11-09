import express, { Response, Request } from 'express';

const router = express.Router();

router.post('/api/users/signout', async (req: Request, res: Response) => {
  res.send();
});

export { router as signoutRouter };
