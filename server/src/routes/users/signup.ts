import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 25 })
      .withMessage('Password must be between 5 and 30 characters'),
    body('username')
      .trim()
      .isLength({ min: 5, max: 40 })
      .withMessage(
        'username must be provided and be between 5 and 25 characters'
      )
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
  }
);

export { router as signupRouter };
