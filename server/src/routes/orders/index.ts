import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Order, OrderStatus } from '../../models/order';
import { User } from '../../models/user';

const router = express.Router();

router.get(
  `/api/orders`,
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { status } = req.query;

    if (!status) {
      throw new BadRequestError('You must provide a status value');
    }
    // Make sure the status query is available
    // @ts-ignore
    if (!Object.values(OrderStatus).includes(status.toString())) {
      throw new BadRequestError('Not supported');
    }

    const orders = await Order.findAll({
      where: {
        userId: req.currentUser!.id,
        status: status.toString()
      },
      include: [User]
    });

    res.send(orders);
  }
);

export { router as indexOrdersRouter };
