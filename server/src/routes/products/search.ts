import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors/bad-request';
import { Product } from '../../models/product';
import { Review } from '../../models/review';
import { User } from '../../models/user';
import { Wishlist } from '../../models/wishlist';

const router = express.Router();

router.get(
  '/api/search',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { term, limit, offset } = req.query;

    if (!term || !limit || !offset) {
      throw new BadRequestError(
        'You must provide a term, a limit and a offset query'
      );
    }
    const { count, rows } = await Product.findAndCountAll({
      where: { name: { [Op.iLike]: `%${term}%` } },
      include: [
        {
          model: Wishlist,
          required: false,
          where: { userId: req.currentUser!.id }
        },
        { model: Review, required: false },
        { model: User }
      ],
      limit: Number(limit),
      offset: Number(offset),
      order: [['id', 'DESC']]
    });

    res.send({ count, rows });
  }
);

export { router as searchProductsRouter };
