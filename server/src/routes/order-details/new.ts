import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request';
import { OrderDetails } from '../../models/order-details';

const router = express.Router();

router.post(
  '/api/order-details',
  currentUser,
  requireAuth,
  [
    body('quantity')
      .isFloat({ min: 0 })
      .withMessage('You must provide a quantity greater than 0'),
    body('orderId').isFloat().withMessage('You must provide a valid orderId'),
    body('productId')
      .isFloat()
      .withMessage('You must provide a valid productId')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { quantity, orderId, productId } = req.body;

    const order = await Order.findOne({ where: { id: orderId } });

    if (!order) {
      throw new BadRequestError('Order not found');
    }

    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    const orderDetails = await OrderDetails.create({
      userId: req.currentUser!.id,
      quantity,
      orderId,
      productId
    });

    res.send(orderDetails);
  }
);

export { router as newOrderDetailsRouter };
