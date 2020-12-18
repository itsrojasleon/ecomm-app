import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Order } from '../../models/order';

const router = express.Router();

router.get(
  '/api/orders',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const orders = await Order.findAll({
      where: { userId: req.currentUser!.id }
    });

    res.send(orders);
  }
);

export { router as indexOrderRouter };
