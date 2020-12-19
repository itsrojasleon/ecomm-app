import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Order } from '../../models/order';

const router = express.Router();

router.post(
  '/api/orders',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.create({
      userId: req.currentUser!.id
    });

    res.send(order);
  }
);

export { router as newOrderRouter };
