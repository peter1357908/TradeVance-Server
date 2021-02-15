import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';

import apiRouter from './router';

// DB Setup
const config = {
  useNewUrlParser: true, // (node:24427) DeprecationWarning
  useUnifiedTopology: true, // (node:24427) DeprecationWarning
};
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/TradeVance';
mongoose.connect(mongoURI, config);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable for templating
// app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
// app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
// app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// additional init stuff should go before routing

// REGISTER THE ROUTES
// =============================================================================
// all of the routes will be prefixed with /api
// this must go after app.use(bodyParser...), otherwise `req.body` wouldn't work
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('This is the root of the API server of TradeVance; you should not be here.');
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
