// note that these routes are ultimately appended to the `/api` path
// see `server.js` for usage

import { Router } from 'express';

import * as AuthController from './controllers/user_controllers/auth_controller';
import * as ProfileController from './controllers/user_controllers/profile_controller';
import * as WatchlistsController from './controllers/user_controllers/watchlists_controller';
import { requireAuth, requireSignIn } from './services/passport';

const APIRouter = Router();

APIRouter.get('/', (req, res) => {
  res.send('This is the root of the API route; you should not be here.');
});

// AuthController
// ==================================================================
APIRouter.post('/sign-in', requireSignIn, AuthController.signIn);
APIRouter.post('/sign-up', AuthController.signUp);


// ProfileController
// ==================================================================
APIRouter.get('/overview', requireAuth, ProfileController.getOverview);

// WatchlistsController
// ==================================================================
APIRouter.route('/watchlists')
  .get(requireAuth, WatchlistsController.getWatchlists)
  .post(requireAuth, WatchlistsController.addWatchlist);

APIRouter.route('/watchlists/:watchlistId')
  .put(requireAuth, WatchlistsController.updateWatchlist);

export default APIRouter;
