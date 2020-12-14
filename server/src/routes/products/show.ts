import express, { Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found';
import { Product } from '../../models/product';
import { Review } from '../../models/review';
import { User } from '../../models/user';

const router = express.Router();

router.get('/api/products/:id', async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id, {
    include: [User, Review]
  });

  if (!product) {
    throw new NotFoundError();
  }

  res.send(product);
});

export { router as showProductsRouter };
