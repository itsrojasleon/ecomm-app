import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotFoundError } from '../../errors/not-found';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';
import { Order, OrderStatus } from '../../models/order';

const router = express.Router();

router.post(
  '/api/orders',
  currentUser,
  requireAuth,
  [body('productId').isFloat().withMessage('You must provide a productId')],
  async (req: Request, res: Response) => {
    // const { productId } = req.body;
    // // Find the product the user is trying to order in the database
    // const product = await Product.findByPk(productId);
    // if (!product) {
    //   throw new NotFoundError();
    // }
    // const order = await Order.create({
    //   userId: req.currentUser!.id,
    //   productId,
    //   status: OrderStatus.Created
    // });
    // res.status(201).send(order);
  }
);

export { router as newOrderRouter };
