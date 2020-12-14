import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Product } from '../../models/product';
import { Review } from '../../models/review';

const router = express.Router();

router.put(
  '/api/reviews/:id',
  currentUser,
  requireAuth,
  [
    body('productId').isFloat().withMessage('You must provide a productId'),
    body('title').not().isEmpty().withMessage('You must provide a title'),
    body('comment').not().isEmpty().withMessage('You must provide a comment'),
    body('score')
      .isFloat({ min: 0, max: 5 })
      .withMessage('You must provide a score between 0 and 5s')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { productId, title, comment, score } = req.body;

    // Make sure the review already exists
    const existingReview = await Review.findByPk(id);

    if (!existingReview) {
      throw new BadRequestError('Review does not exist');
    }

    // Make sure the product exists
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new BadRequestError('Product does not exist');
    }

    // Update the review
    await existingReview.update({
      productId,
      title,
      comment,
      score
    });

    res.send(existingReview);
  }
);

export { router as updateReviewRouter };
