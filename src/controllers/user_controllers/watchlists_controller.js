import Watchlist from '../../models/watchlist_model';

// all of the following functions should be chained after the
// middleware requireAuth(); see its usage in router.js
// remember, req.user is from the middleware requireAuth()

export const getWatchlists = (req, res, next) => {
  req.user.populate('watchlists').execPopulate().then((result) => {
    res.send({ watchlists: req.user.watchlists });
  });
};

export const addWatchlist = (req, res, next) => {
  Watchlist.create({
    name: req.body.name,
  }).then((watchlist) => {
    req.user.watchlists.push(watchlist._id);
    // nested then() is used here because we want to access `watchlist`
    req.user.save().then((user) => {
      res.send({ watchlist });
    });
  });
};

// `null` for `name` or `symbols` signals `no update` for that respective field
export const updateWatchlist = (req, res, next) => {
  Watchlist.findById(req.params.watchlistId).then((watchlist) => {
    if (watchlist === null) {
      res.send({ watchlist: null });
    } else {
      if (req.body.name !== null) {
        watchlist.name = req.body.name;
      }
      if (req.body.symbols !== null) {
        watchlist.symbols = req.body.symbols;
      }
      watchlist.save().then((savedWatchlist) => {
        console.log(`sent: ${savedWatchlist}`);
        res.send({ watchlist: savedWatchlist });
      });
    }
  });
};

// export const removeWatchlists = (req, res, next) => {
//   const deleteManyQuery = {
//     _id: {
//       $in: req.body._ids
//     }
//   };
//   // TODO: update the User document... should we even use deleteMany??
//   // assume that errors are unlikely to happen, so do not detail
//   // which ones are deleted; if error, the client should fetch all
//   // watchlists again
//   Watchlist.deleteMany(deleteManyQuery).then((result) => {
//     res.send({ ok: result.ok });
//   }).catch((error) => {
//     console.log(error);
//     res.status(500).json({ error });
//   });
// };

// unfinished code
// export const addSymbolsToWatchlist = (req, res, next) => {
//   Watchlist.findById(req.params.watchlistId).then((watchlist) => {
//     req.body.newSymbols.forEach((newSymbol) => {
//       if (newSymbol !== '') {
//         watchlist.symbols.push(newSymbol);
//       }
//     });
//     return watchlist.save();
//   }).then((savedWatchlist) => {
//     res.send({ watchlist: savedWatchlist });
//   });
// };

// unfinished code
// export const removeSymbolsFromWatchlist = (req, res, next) => {
//   req.user.populate('watchlists').execPopulate().then(() => {
//     res.send({ watchlists: req.user.populated('watchlists') });
//   }).catch((error) => {
//     console.log(error);
//     res.status(500).json({ error });
//   });
// };
