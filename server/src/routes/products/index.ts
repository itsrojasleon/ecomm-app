import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';

const router = express.Router();

// all products
router.get('/api/products', async (req: Request, res: Response) => {
  const products = await Product.findAll();

  res.send(products);
});

// user products
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

// user wishlist
router.get(
  '/api/products/wishlist',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const products = await Product.findAll({
      where: { userId: req.currentUser!.id, wishlisted: true }
    });

    res.send(products);
  }
);

export { router as indexProductsRouter };
