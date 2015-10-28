var bodyParser = require('body-parser'),
    jwt      = require('jsonwebtoken'),
    config   = require('../../config'),
    superSecret = config.secret,
    News   =  require('../models/news'),
    moment = require('moment');

module.exports = function(app, express){

    var newsRouter = express.Router();

    newsRouter.route('/news')

      .get(function(req, res, next){
        console.log("Getting News!");
        News.find(function(err, news){

          if(err){
            next(err);
          };

          res.json(news);

        })

      });

    newsRouter.route('/news/:news_id')

      .get(function(req, res, next){

        News.findById(req.params.news_id, function(err, news){

          if(err){
            next(err);
          }
          if (!news) {
            var notFound = new Error("Could not find that news");
            notFound.status = 404;
            return next(notFound);
          }


          res.json(news);


        });

      });

    newsRouter.use('/news/:news_id', function(req, res, next){

      console.log("admin accessing news");

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
    newsRouter.use('/news', function(req, res, next){

      console.log("admin accessing news");

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

    newsRouter.route('/news')

      .post(function(req, res, next){
        // created new news item
        var news = new News();
        news.date = req.body.date;
        news.title = req.body.title;
        news.story = req.body.story;
        news.createdBy = req.body.createdBy;
        news.modifiedBy = req.body.modifiedBy;
        // save and check for errors

        news.save(function(err){
          if(err){
            if(err.code == 11000){
              var newsExists = new Error("You already have news with that date");
              newsExists.status = 500;
              return next(newsExists);
            }
            else
              return next(err);
          }
            res.json({message: "News Created!"})
        })

      });

  return newsRouter;

}
