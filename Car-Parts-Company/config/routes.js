/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const Assignment6Controller = require("../api/controllers/Assignment6Controller");

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': "Assignment6Controller.home",
  "GET /getParts": "Assignment6Controller.getParts",
 "GET /getPartsByID/:partId05/:partName05": "Assignment6Controller.getPartsByID",
 "POST /addParts": "Assignment6Controller.addParts",
 "PUT /updateParts":"Assignment6Controller.updateParts",
 "GET /getPartOrdersbyUserId/:userId05": "Assignment6Controller.getPartOrdersbyUserId",
 "POST /insertPartOrders":"Assignment6Controller.insertPartOrders",
 "GET /viewData": "Assignment6Controller.viewData",
 "GET /addData": { view: "pages/addData",locals: {data:false}},
 "POST /updateData": "Assignment6Controller.updateData",
 "POST /addData": "Assignment6Controller.addData",
 "POST /updatData":"Assignment6Controller.updatData",
 "GET /userData":{ view: "pages/userData", locals: {data:false}},
 "GET /viewAllUserData":"Assignment6Controller.viewAllUserData",
 "POST /viewUserData": "Assignment6Controller.viewUserData",
 "POST /response": "Assignment6Controller.response",
 "POST /requestqohupdate": "Assignment6Controller.requestqohupdate",
 "POST /updateQoh":"Assignment6Controller.updateQoh",
 "GET /request":"Assignment6Controller.request",
 "POST /declineUpdateQoh":"Assignment6Controller.declineUpdateQoh",


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
