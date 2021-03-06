import { Router } from 'express';

import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignIn } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.send('This is the root of the API route; you should not be here.');
});

router.post('/sign-in', requireSignIn, UserController.signIn);

router.post('/sign-up', UserController.signUp);

router.get('/own-profile', requireAuth, UserController.getOwnProfile);

export default router;
