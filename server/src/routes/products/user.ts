import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';

const router = express.Router();

router.get(
  '/api/products/users/:userId',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const products = await Product.findAll({
      where: { userId: req.params.userId }
    });

    res.send(products);
  }
);

export { router as userProductsRouter };
