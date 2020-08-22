/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

const User = require('../models/User');

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    // See `api/responses/login.js`
    return res.login({
      email: req.param('email'),
      password: req.param('password'),
      successRedirect: 'user/verify',
      invalidRedirect: '/login'
    });
  },

  /**
   * `UserController.verify()`
   */
 

  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a simple response letting the user agent know they were logged out
    // successfully.
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/');
  },


  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {

    
    existUser = await sails.models.user.findOne({email: req.param('email')})
    if(existUser){
      return res.view('user/login');
    }
    else{
    await  sails.models.user.create({jobName05: "teja",
    name: req.param('name'),
    email: req.param('email'),
    // TODO: But encrypt the password first
    password: req.param('password')})
    user = await sails.models.user.findOne({email: req.param('email')});
    console.log(user);
    
      req.session.me = user.id;
      // res.session.authenticated=true;
      console.log(req.session.me+"req.session.me after assigning user.id")
      
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      //create token
    function getRandomString(length) {
      var s = '';
      do { s += Math.random().toFixed(36).substr(2); } while (s.length < length);
      s = s.substr(0, length);
      
      return s;
    }
    
    const token = getRandomString(6);
    
    console.log(token);
    
    // insert token into database
    sails.models.user.update({email: req.param('email')}, {otp: token}).exec((err, updated_user) => {
      console.log(updated_user);
      if (err) return  res.serverError();
      else if(!updated_user) return res.notFound("User doesn't exist!!!");
    });

    //send token in email
    function sendEmail(toEmail, otp){
      var AWS = require('aws-sdk');
      AWS.config.update({accessKeyId: 'AKIAJD76LSDVPHILXG7Q', secretAccessKey: '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', region: 'us-east-2'});

      var params = {
        Destination: { /* required */
          CcAddresses: [
            //'EMAIL_ADDRESS',
            /* more items */
          ],
          ToAddresses: [
            toEmail,
            /* more items */
          ]
        },
        Message: { /* required */
          Body: { /* required */
            Html: {
             Charset: "UTF-8",
             Data: "Hi,\nPlease enter this otp "+otp
            },
            Text: {
             Charset: "UTF-8",
             Data: "TEXT_FORMAT_BODY"
            }
           },
           Subject: {
            Charset: 'UTF-8',
            Data: 'One Time Password'
           }
          },
        Source: 'rachakondasumithsai@gmail.com', /* required */
        ReplyToAddresses: [
           'rachakondasumithsai@gmail.com',
          /* more items */
        ],
      };
      var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
      sendPromise.then(
        function(data) {
          console.log(data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });
      console.log("email sent");
    }

    sendEmail(req.param('email'), token);
      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.view('user/verify', {message: "",email: req.param('email'), password: req.param('password')});
   
  }
}
};

