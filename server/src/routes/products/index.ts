import express, { Request, Response } from 'express';
import { Product } from '../../models/product';
import { Wishlist } from '../../models/wishlist';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response) => {
  const products = await Product.findAll({ include: [Wishlist] });

  res.send(products);
});

export { router as indexProductsRouter };
