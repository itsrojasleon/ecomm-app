import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { requireAuth } from '../../middlewares/require-auth';
import { currentUser } from '../../middlewares/currentuser';
import { Product } from '../../models/product';
import { NotFoundError } from '../../errors/not-found';

const router = express.Router();

router.put(
  '/api/products/:id',
  currentUser,
  requireAuth,
  [
    body('name')
      .isLength({ min: 1, max: 148 })
      .withMessage('You must provide a name'),
    body('price').isFloat({ gt: 0 }).withMessage('You must provide a price'),
    body('description')
      .isLength({ min: 1, max: 500 })
      .withMessage('You must provide a valid description')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, price, description } = req.body;

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    await product.update({
      name,
      price,
      description
    });

    res.sendStatus(204);
  }
);

export { router as updateProductsRouter };
