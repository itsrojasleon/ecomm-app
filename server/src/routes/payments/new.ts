import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { requireAuth } from '../../middlewares/require-auth';
import { currentUser } from '../../middlewares/currentuser';
import { Order, OrderStatus } from '../../models/order';
import { NotFoundError } from '../../errors/not-found';
import { NotAuthorizedError } from '../../errors/not-authorized';
import { BadRequestError } from '../../errors/bad-request';
import { stripe } from '../../services/stripe';
import { Payment } from '../../models/payment';

const router = express.Router();

router.post(
  '/api/payments',
  currentUser,
  requireAuth,
  [
    body('token').not().isEmpty().withMessage('You must provide a token'),
    body('orderId').isFloat().withMessage('You must provide an orderId')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (String(order.userId) !== String(req.currentUser!.id)) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for a cancelled error');
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.total * 100,
      source: token
    });

    const payment = await Payment.create({
      orderId,
      stripeId: charge.id,
      userId: req.currentUser!.id
    });

    // At this point somebody already paid for the order
    // update the status of the order to completed
    await order.update({
      status: OrderStatus.Completed
    });

    res.send({ id: payment.id });
  }
);

export { router as createPaymentsRouter };
