import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { NotFoundError } from '../../errors/not-found';
import { User } from '../../models/user';

const router = express.Router();

router.get(
  '/api/users/:username',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: [
        'id',
        'name',
        'username',
        'email',
        'createdAt',
        'updatedAt',
        'bio'
      ]
    });

    if (!user) {
      throw new NotFoundError();
    }

    res.send(user);
  }
);

export { router as indexUserRouter };
