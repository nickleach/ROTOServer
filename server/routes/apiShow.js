var bodyParser = require('body-parser'),
    jwt      = require('jsonwebtoken'),
    config   = require('../../config'),
    superSecret = config.secret,
    Show   =  require('../models/shows');

  module.exports = function(app, express){

    //instance of router
    var showRouter = express.Router();

    showRouter.route('/shows')

      .get(function(req, res, next){

        Show.find(function(err, shows){

          if (err) {
            next(err);
          };

          res.json(shows);

        })

      });

    showRouter.use('/shows/:show_id', function(req, res, next){

      //log
      console.log("admin accessing shows");

      //check header or url params or post params for token
      var token = req.body.token || req.param('token') || req.headers['x-access-token'];

      //decode token
      if(token){
        jwt.verify(token, superSecret, function(err, decoded){
          if(err){
            return res.status(403).send({
              success: false,
              message: "Failed to authenticate token"
            });
          }else{
            req.decoded = decoded;

            next();

          }

        });
      }

    });

    showRouter.route('/shows')

      .post(function(req, res, next){
        // create new show
        var show = new Show();
        show.title= req.body.title;
        show.date = req.body.date;
        show.location = req.body.location;
        show.description = req.body.description;
        show.venue = req.body.venue;
        show.upcoming = req.body.upcoming;
        //save and check for errors

        show.save(function(err){
          if(err){
            if(err.code == 11000){
              var showExists = new Error("A show with that title already exists");
              showExists.status = 500;
              return next(showExists);
            }
            else{
              return next(err);
            }
          }

            res.json({message: 'show Created!'})
        })
      });


    showRouter.route('/shows/:show_id')

      .get(function(req, res, next){

        Show.findById(req.params.show_id, function(err, show){

          if(err){
            next(err);
          }
          if (!show) {
            var notFound = new Error("Could not find member");
            notFound.status = 404;
            return next(notFound);
          }


          res.json(show);

        });

      })


      .put(function(req, res, next){

        Show.findById(req.params.show_id, function(err, show){

          if(err) {
            next(err);
          }
          if(!show) {
            var notFound = new Error("Could not find show");
            notFound.status = 404;
            return next(notFound);
          }

        if(req.body.name) show.title = req.body.title;
        if(req.body.date) show.date = req.body.date;
        if(req.body.location) show.location = req.body.location;
        if(req.body.description) show.description = req.body.description;
        if(req.body.venue) show.venue = req.body.venue;
        if(req.body.upcoming) show.upcoming = req.body.upcoming;

          show.save(function(err){
            if(err){
              next(err);
            }

            res.json({messsage: "Show Updated!"});

          });

        });

      })
      .delete(function(req, res, next){
        Show.remove({
          _id: req.params.show_id
        },

        function(err, show){
          if(err) {
           next(err);
          }
          if(!show) {
            var notFound = new Error("Could not find show");
            notFound.status = 404;
            return next(notFound);
          }


          res.json({ message: 'Successfully deleted'});
        });


    });


    return showRouter;

  }
