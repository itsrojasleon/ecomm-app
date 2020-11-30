import express, { Response, Request } from 'express';
import { currentUser } from '../../middlewares/currentuser';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
