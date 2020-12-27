import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors/bad-request';
import { Product } from '../../models/product';

const router = express.Router();

router.get(
  '/api/search',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { term } = req.query;

    console.log('term', term);

    if (!term) {
      throw new BadRequestError('You must provide a term');
    }
    const products = await Product.findAll({
      where: { name: { [Op.iLike]: `%${term}%` } }
    });

    res.send(products);
  }
);

export { router as searchProductsRouter };
