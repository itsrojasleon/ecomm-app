import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Review } from '../../models/review';

const router = express.Router();

router.get(
  '/api/reviews/:productId',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId }
    });

    res.send(reviews);
  }
);

export { router as indexReviewsRouter };
