import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../errors/bad-request';
import { validateRequest } from '../../middlewares/validate-request';
import { UserRepo } from '../../repos/user-repo';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .isLength({ min: 10, max: 60 })
      .withMessage('Email must be valid'),
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

    const existingUser = await UserRepo.findByEmail(email);

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = await UserRepo.insertAtSignup(email, password, username);

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      'process.env.JWT_KEY!'
    );

    // Store it on session object
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
