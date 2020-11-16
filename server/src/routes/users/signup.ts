import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../errors/bad-request';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .isLength({ min: 10, max: 120 })
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 25 })
      .withMessage('Password must be between 5 and 30 characters'),
    body('username')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage(
        'username must be provided and be between 5 and 25 characters'
      )
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const existingEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });

    if (existingEmail) {
      throw new BadRequestError('Email is already in use');
    }

    if (existingUsername) {
      throw new BadRequestError('Username is already in use');
    }

    const user = await User.create({ email, username, password });

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
