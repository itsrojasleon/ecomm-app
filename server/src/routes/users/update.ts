import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { NotFoundError } from '../../errors/not-found';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request';

const router = express.Router();

router.put(
  '/api/users/:username',
  currentUser,
  requireAuth,
  [
    body('username').not().isEmpty().withMessage('You must provide a username'),
    body('name').not().isEmpty().withMessage('You must provide a name'),
    body('bio').not().isEmpty().withMessage('You must provide a biography')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, name, bio } = req.body;

    const existingUser = await User.findOne({
      where: { id: req.currentUser!.id, username: req.params.username }
    });

    if (!existingUser) {
      throw new NotFoundError();
    }

    try {
      await existingUser.update({
        username,
        name,
        bio
      });
    } catch (err) {
      throw new BadRequestError('Something went wrong');
    }

    // Update user's jwt
    const userJwt = jwt.sign(
      {
        id: req.currentUser!.id,
        email: req.currentUser!.email,
        username: existingUser.username
      },
      'process.env.JWT_KEY!'
    );

    // Store it on session object
    req.session = { jwt: userJwt };

    res.send(existingUser);
  }
);

export { router as updateUserRouter };
