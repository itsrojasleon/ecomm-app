import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Order } from '../../models/order';

const router = express.Router();

router.post(
  '/api/orders',
  currentUser,
  requireAuth,
  [
    body('total').isFloat().withMessage('You must provide a total value'),
    validateRequest
  ],
  async (req: Request, res: Response) => {
    const { total } = req.body;

    const order = await Order.create({
      userId: req.currentUser!.id,
      total
    });

    res.send(order);
  }
);

export { router as newOrderRouter };
