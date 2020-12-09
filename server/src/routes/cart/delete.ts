import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Cart } from '../../models/cart';

const router = express.Router();

router.delete(
  '/api/cart/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const item = await Cart.findByPk(req.params.id);

    if (!item) {
      throw new BadRequestError('Item not found');
    }

    await item.destroy();

    res.sendStatus(200);
  }
);

// remove all the items
router.delete(
  '/api/cart',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    await Cart.destroy({ where: { userId: req.currentUser!.id } });

    res.sendStatus(200);
  }
);

export { router as deleteCartRouter };
