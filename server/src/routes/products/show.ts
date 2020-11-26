import express, { Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found';
import { Product } from '../../models/product';

const router = express.Router();

router.get('/api/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    throw new NotFoundError();
  }

  res.send(product);
});

export { router as showProductRouter };
