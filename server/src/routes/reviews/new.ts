import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Product } from '../../models/product';
import { Review } from '../../models/review';

const router = express.Router();

router.post(
  '/api/reviews',
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
    const { productId, title, comment, score } = req.body;

    // Make sure the user is not creating a review twice in the same product
    const existingReview = await Review.findOne({
      where: { userId: req.currentUser!.id, productId }
    });

    if (existingReview) {
      throw new BadRequestError('Duplicated review');
    }

    // Make sure the product exists
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new BadRequestError('Product does not exist');
    }

    // Create the review
    const review = await Review.create({
      productId,
      title,
      comment,
      score,
      userId: req.currentUser!.id
    });

    res.send(review);
  }
);

export { router as newReviewRouter };
