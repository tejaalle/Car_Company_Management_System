/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful,
 * such as when you deploy to a server, or a PaaS like Heroku.
 *
 * For example:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * The same command-line arguments and env vars are supported, e.g.:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/app.js
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);

async function getUrl(){
  return new Promise((resolve, reject) => {
    var request = require('request');
    request.get({
        url: "https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/secret"
        
      }, function(error, response, body) {
        if (error) {
          sails.log.error(error);
          reject(error)
        }
        else {
          console.log(body);
          body = JSON.parse(body);
          var url = "mysql://"
url = url.concat(body.username);
url = url.concat(":")
url = url.concat(body.password)
url = url.concat("@")
url = url.concat(body.host)
url = url.concat(":3306/")
url = url.concat(body.db)
         // sails.log.info(response); 
         console.log(url)
          resolve(url)
        }
      });
    
})
 }

 async function loadSecrets() {
  let response05 = await getUrl();
  console.log(response05);
  global.url = response05;
  console.log(global.url );
  return response05;
}

// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
var sails;
var rc;
try {
  sails = require('sails');
  rc = require('sails/accessible/rc');
} catch (err) {
  console.error('Encountered an error when attempting to require(\'sails\'):');
  console.error(err.stack);
  console.error('--');
  console.error('To run an app using `node app.js`, you need to have Sails installed');
  console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
  console.error('in the same directory as your app and run `npm install`.');
  console.error();
  console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
  console.error('also run this app with `sails lift`.  Running with `sails lift` will');
  console.error('not run this file (`app.js`), but it will do exactly the same thing.');
  console.error('(It even uses your app directory\'s local Sails install, if possible.)');
  return;
}//-•


// Start server
(async () => {
  await loadSecrets();
  console.log(global.url + "New");
  sails.lift(rc("sails"));
})();
