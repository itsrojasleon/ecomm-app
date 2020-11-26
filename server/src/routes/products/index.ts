import express, { Response, Request } from 'express';
import { Product } from '../../models/product';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response) => {
  // add some logic with orderId
  const products = await Product.findAll();

  res.send(products);
});

export { router as indexProductRouter };
