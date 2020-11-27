import express, { Response, Request } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response) => {
  // add some logic with orderId
  const products = await Product.findAll();

  res.send(products);
});

router.get(
  '/api/products/owner',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const products = await Product.findAll({
      where: { userId: req.currentUser!.id }
    });

    res.send(products);
  }
);

export { router as indexProductRouter };
