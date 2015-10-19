// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');    // call express
var app        = express();       // define our app using express
var cors       = require('cors')
var bodyParser = require('body-parser');  // get body-parser
var morgan     = require('morgan');     // used to see requests
var mongoose   = require('mongoose');
var config     = require('./config');
var path       = require('path');


// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


app.use(cors());
// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API =================
// ====================================
// API ROUTES ------------------------
var apiRoutes = require('./server/routes/admin')(app, express);
var memberRoutes = require('./server/routes/apiMember')(app, express);
var showRoutes = require('./server/routes/apiShow')(app, express);

app.use('/admin', apiRoutes);
app.use('/api', memberRoutes);
app.use('/api', showRoutes);

app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }

  res.status(404);
  res.send(err.message || 'Not found');
});


app.use(function(err, req, res, next) {

  res.status(500);
  res.send('oops! something broke');
});

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res, err) {

  res.sendFile(path.join(__dirname + '/app/index.html'));

});





app.listen(config.port);
console.log('Magic happens on port ' + config.port);
