/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  "GET /partsOrder/:jobName05/:partId05/:partName05/:qty05/:capacity05":
    "PartsController.partsOrder",
  "GET /partsQohIncrease/:jobName05/:partId05/:partName05/:qty05/:capacity05":
    "PartsController.partsOrderIncrease",
  "/jobSearchPage05": { view: "pages/jobSearchPage" },
  "GET /getJobids892": "CompanyzController.getJobids892",
  "GET /jobNameSearch/:jobName892": "CompanyzController.jobNameSearch",
  "GET /viewData05": "CompanyzController.viewCarData05",
  "POST /addJob892": "CompanyzController.addJob892",
  "POST /addParts892": "PartsController.addParts892",
  "GET /getParts/:partId892": "PartsController.getParts",
  "GET /viewParts05/:jobName05": "PartsController.viewParts",
  "POST /addUserauth": "DatabaseController.addUserauth",
  "POST /login": "DatabaseController.login",
  "POST /:partId892/:partName892/:qty892/OrderStatus":
    "DatabaseController.OrderStatus",
  "GET /orderCompleteUI/:partId892/:partName892/:qty892":
    "DatabaseController.orderCompleteUI",
  "GET /displayResults": "DisplayresultsController.displayResults",
  "POST /jobNameSearchUI": "CompanyzController.jobNameSearchUI",

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
