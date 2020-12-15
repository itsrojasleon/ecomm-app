import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Review } from '../../models/review';

const router = express.Router();

router.put(
  '/api/reviews/:id',
  currentUser,
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('You must provide a title'),
    body('comment').not().isEmpty().withMessage('You must provide a comment'),
    body('score')
      .isFloat({ min: 0, max: 5 })
      .withMessage('You must provide a score between 0 and 5s')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, comment, score } = req.body;

    // Make sure the review already exists
    const existingReview = await Review.findByPk(req.params.id);

    if (!existingReview) {
      throw new BadRequestError('Review does not exist');
    }

    // Update the review
    await existingReview.update({ title, comment, score });

    res.send(existingReview);
  }
);

export { router as updateReviewRouter };
