import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { OrderDetails } from '../../models/order-details';
import { Product } from '../../models/product';
import { Order } from '../../models/order';

const router = express.Router();

router.get(
  '/api/orders/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const orders = await OrderDetails.findAll({
      where: { orderId: req.params.id },
      include: [Product, Order]
    });

    res.send(orders);
  }
);

export { router as indexOrderDetailsRouter };
