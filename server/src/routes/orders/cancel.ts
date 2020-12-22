import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Order, OrderStatus } from '../../models/order';

const router = express.Router();

router.post(
  '/api/orders/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.currentUser!.id }
    });

    if (!order) {
      throw new BadRequestError('Order not found');
    }

    // Update the status property to cancelled
    await order.update({ status: OrderStatus.Cancelled });

    res.send(order);
  }
);

export { router as cancelOrderRouter };
