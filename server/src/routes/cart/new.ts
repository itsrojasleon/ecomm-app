import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Cart } from '../../models/cart';
import { Product } from '../../models/product';

const router = express.Router();

router.post(
  '/api/cart',
  currentUser,
  requireAuth,
  [
    body('productId').isFloat().withMessage('You must provide a productId'),
    body('quantity').isFloat().withMessage('You must provide a quantity')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;

    // Make sure the product exists
    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    // If a product already exists just update the quantity by one
    const existingCart = await Cart.findOne({
      where: { productId, userId: req.currentUser!.id }
    });

    if (existingCart) {
      await existingCart.increment('quantity');

      return res.status(201).send(existingCart);
    }

    const cart = await Cart.create({
      productId,
      userId: req.currentUser!.id,
      quantity
    });

    res.send(cart);
  }
);

export { router as newCartRouter };
