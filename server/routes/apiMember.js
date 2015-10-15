var bodyParser = require('body-parser'),
    jwt      = require('jsonwebtoken'),
    config   = require('../../config'),
    superSecret = config.secret,
    Member   =  require('../models/member');

  module.exports = function(app, express){

    //instance of router
    var memberRouter = express.Router();

    memberRouter.route('/members')

      .get(function(req, res){

        Member.find(function(err, members){

          if (err) res.send(err);

          res.json(members);

        })

      });

    memberRouter.use(function(req, res, next){

      //log
      console.log("admin accessing members");

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

    memberRouter.route('/members')

      .post(function(req, res){
        // create new member
        var member = new Member();
        member.name = req.body.name;
        member.description = req.body.description;
        member.instrument = req.body.instrument;
        member.image = req.body.image;
        //save and check for errors

        member.save(function(err){
          if(err){
            if(err.code == 11000)
              return res.json({ sucess: false, message:"A member with that name already exists"})
            else
              return res.send(err);
          }

            res.json({message: 'Member Created!'})
        })
      });


    memberRouter.route('/members/:member_id')

      .get(function(req, res){

        Member.findById(req.params.member_id, function(err, member){

          if(err) res.send(err);

          res.json(member);

        });

      })


      .put(function(req, res){

        Member.findById(req.params.member_id, function(err, member){

          if(err) res.send(err);

          if(req.body.name) member.name = req.body.name;
          if(req.body.description) member.description = req.body.description;
          if(req.body.image) member.image = req.body.image;
          if(req.body.instrument) member.instrument = req.body.instrument;

          member.save(function(err){
            if(err) res.send(err);

            res.json({messsage: "Member Updated!"});

          });

        });

      })
      .delete(function(req, res){
        Member.remove({
          _id: req.params.member_id
        },

        function(err, user){
          if(err) return res.send(err);

          res.json({ message: 'Successfully deleted'});
        });


    });


    return memberRouter;

  }
