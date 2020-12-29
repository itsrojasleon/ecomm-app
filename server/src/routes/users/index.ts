import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { NotFoundError } from '../../errors/not-found';
import { User } from '../../models/user';
import { Product } from '../../models/product';

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
      ],
      include: [{ model: Product, limit: 15, order: [['id', 'DESC']] }]
    });

    if (!user) {
      throw new NotFoundError();
    }

    res.send(user);
  }
);

export { router as indexUserRouter };
