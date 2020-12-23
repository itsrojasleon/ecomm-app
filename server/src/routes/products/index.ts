import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';
import { Wishlist } from '../../models/wishlist';
import { Review } from '../../models/review';

const router = express.Router();

router.get(
  '/api/products',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const products = await Product.findAll({
      include: [
        {
          model: Wishlist,
          where: { userId: req.currentUser!.id },
          required: false
        },
        {
          model: Review,
          required: false
        }
      ]
    });

    res.send(products);
  }
);

export { router as indexProductsRouter };
