var bodyParser = require('body-parser'),
    jwt      = require('jsonwebtoken'),
    config   = require('../../config'),
    superSecret = config.secret,
    Show   =  require('../models/shows');

  module.exports = function(app, express){

    //instance of router
    var showRouter = express.Router();

    showRouter.route('/shows')

      .get(function(req, res){

        Show.find(function(err, shows){

          if (err) res.send(err);

          res.json(shows);

        })

      });

    showRouter.use(function(req, res, next){

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

      .post(function(req, res){
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
            if(err.code == 11000)
              return res.json({ sucess: false, message:"A show with that name already exists"})
            else
              return res.send(err);
          }

            res.json({message: 'show Created!'})
        })
      });


    showRouter.route('/shows/:show_id')

      .get(function(req, res){

        Show.findById(req.params.show_id, function(err, show){

          if(err) res.send(err);

          res.json(show);

        });

      })


      .put(function(req, res){

        Show.findById(req.params.show_id, function(err, show){

          if(err) res.send(err);

        if(req.body.name) show.title = req.body.title;
        if(req.body.date) show.date = req.body.date;
        if(req.body.location) show.location = req.body.location;
        if(req.body.description) show.description = req.body.description;
        if(req.body.venue) show.venue = req.body.venue;
        if(req.body.upcoming) show.upcoming = req.body.upcoming;

          show.save(function(err){
            if(err) res.send(err);

            res.json({messsage: "Show Updated!"});

          });

        });

      })
      .delete(function(req, res){
        Show.remove({
          _id: req.params.show_id
        },

        function(err, show){
          if(err) return res.send(err);

          res.json({ message: 'Successfully deleted'});
        });


    });


    return showRouter;

  }
