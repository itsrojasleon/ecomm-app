import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Wishlist } from '../../models/wishlist';
import { Review } from '../../models/review';

const router = express.Router();

router.get(
  '/api/wishlist',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const wishlist = await Wishlist.findAll({
      where: { userId: parseInt(req.currentUser!.id) },
      include: [Product, User]
    });

    res.send(wishlist);
  }
);

export { router as indexWishlistRouter };
