import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';
import { Wishlist } from '../../models/wishlist';
import { Review } from '../../models/review';
import { BadRequestError } from '../../errors/bad-request';
import { User } from '../../models/user';

const router = express.Router();

router.get(
  '/api/products',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { limit, offset } = req.query;

    if (!limit || !offset) {
      throw new BadRequestError('You must provide a limit and offset query');
    }

    const { count, rows } = await Product.findAndCountAll({
      include: [
        {
          model: Wishlist,
          where: { userId: req.currentUser!.id },
          required: false
        },
        {
          model: Review,
          required: false
        },
        {
          model: User,
          required: false
        }
      ],
      limit: Number(limit),
      offset: Number(offset),
      order: [['id', 'DESC']]
    });

    res.send({ count, rows });
  }
);

export { router as indexProductsRouter };
