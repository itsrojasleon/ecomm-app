import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Wishlist } from '../../models/wishlist';

const router = express.Router();

router.post(
  '/api/wishlist',
  currentUser,
  requireAuth,
  [
    body('productId')
      .isFloat()
      .withMessage('You must provide a valid productId')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId } = req.body;

    const wishlist = await Wishlist.findOne({
      where: { productId, userId: req.currentUser!.id }
    });

    if (wishlist) {
      await wishlist.destroy();

      res.sendStatus(200);
    } else {
      const newWishlist = await Wishlist.create({
        productId,
        userId: parseInt(req.currentUser!.id)
      });

      res.status(201).send(newWishlist);
    }
  }
);

export { router as createWishlistRouter };
