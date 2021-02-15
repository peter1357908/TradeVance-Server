import { Router } from 'express';

import * as UserController from './controllers/user_controller';
import { requireSignin } from './services/passport';
// import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.send('This is the root of the API route; you should not be here.');
});

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

export default router;
