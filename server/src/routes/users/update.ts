import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { currentUser } from '../../middlewares/currentuser';
import { requireAuth } from '../../middlewares/require-auth';
import { NotFoundError } from '../../errors/not-found';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request';
import { NotAuthorizedError } from '../../errors/not-authorized';

const router = express.Router();

router.put(
  '/api/users',
  currentUser,
  requireAuth,
  [
    body('name').not().isEmpty().withMessage('You must provide a name'),
    body('bio').not().isEmpty().withMessage('You must provide a biography')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, bio } = req.body;

    const existingUser = await User.findByPk(req.currentUser!.id);

    if (!existingUser) {
      throw new NotFoundError();
    }

    // Make sure somebody is not going to mess trying to get someone's info
    if (existingUser.id !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    try {
      await existingUser.update({ name, bio });
    } catch (err) {
      throw new BadRequestError(`Something went wrong ${err}`);
    }

    res.send(existingUser);
  }
);

export { router as updateUserRouter };
