import express, { Response, Request } from 'express';
import { currentUser } from '../../middlewares/currentuser';
// import { User } from '../../models/user';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  async (req: Request, res: Response) => {
    // const a = await User.findOne({ where: { id: req.currentUser!.id } });

    // const aa = await a?.getProducts();

    // console.log(aa);

    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
