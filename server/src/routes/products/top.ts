import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';
import { Wishlist } from '../../models/wishlist';
import { Review } from '../../models/review';
import { User } from '../../models/user';

const router = express.Router();

router.get(
  '/api/products/resources/ratings',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const products = await Product.findAll({
      include: [
        {
          model: Review,
          as: 'reviews',
          where: { score: { [Op.gt]: 3 } },
          required: true
        },
        {
          model: User,
          required: false
        },
        {
          model: Wishlist,
          required: false
        }
      ],
      order: [
        [{ model: Review, as: 'reviews' }, 'score', 'DESC']
        // ['id', 'DESC']
      ]
    });

    res.send(products);
  }
);

export { router as topProductsRouter };
