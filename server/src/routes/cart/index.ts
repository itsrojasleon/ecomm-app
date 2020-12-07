import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Cart } from '../../models/cart';
import { Product } from '../../models/product';

const router = express.Router();

router.get(
  '/api/cart',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const cart = await Cart.findAll({
      where: { userId: req.currentUser!.id },
      include: [Product]
    });

    res.send(cart);
  }
);

export { router as indexCartRouter };
