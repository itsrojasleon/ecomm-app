import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { Review } from '../../models/review';

const router = express.Router();

router.delete(
  '/api/reviews/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      throw new BadRequestError('Review not found');
    }

    await review.destroy();

    res.sendStatus(200);
  }
);

export { router as deleteReviewRouter };
