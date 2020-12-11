import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { Product } from '../../models/product';
import { Wishlist } from '../../models/wishlist';

const router = express.Router();

router.get(
  '/api/products',
  currentUser,
  async (req: Request, res: Response) => {
    const products = await Product.findAll({
      include: [
        {
          model: Wishlist,
          where: { userId: req.currentUser!.id },
          required: false
        }
      ]
    });

    res.send(products);
  }
);

export { router as indexProductsRouter };
