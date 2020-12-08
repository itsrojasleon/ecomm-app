import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Cart } from '../../models/cart';

const router = express.Router();

router.put(
  '/api/cart/decrease/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const item = await Cart.findByPk(req.params.id);

    if (!item) {
      throw new BadRequestError('Item not found');
    }

    await item.decrement('quantity');

    res.send(item);
  }
);

export { router as decreaseCartRouter };
