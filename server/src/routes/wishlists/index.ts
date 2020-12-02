import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';
import { Wishlist } from '../../models/wishlist';

const router = express.Router();

router.get(
  '/api/wishlists',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const wishlists = await Wishlist.findAll({
      where: { userId: parseInt(req.currentUser!.id) },
      include: [Product]
    });

    res.send(wishlists);
  }
);

export { router as indexWishlistsRouter };
