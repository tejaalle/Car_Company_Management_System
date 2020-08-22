

module.exports.routes = {

  '/': { view: 'pages/homepage' },
  "GET /jobs/list":"JobsController.list05",
  "GET /jobs/add":"JobsController.add05",
  "POST /jobs/create":"JobsController.create05",
  "POST /jobs/delete":"JobsController.delete05",
  "GET /jobs/findQty":"JobsController.findQty05",
  "POST /jobs/displayQty":"JobsController.displayQty05",
  "GET /jobs/update":"JobsController.update05",
  "POST /jobs/updatedList":"JobsController.updatedList05",
  "POST /jobs/edit":"JobsController.edit05",
  "POST /jobs/editedList":"JobsController.editedList05",
  "GET /jobs/success":"JobsController.success05",
  "GET /jobs/successFind":"JobsController.successFind05",
  "POST /jobs/userJob":"JobsController.userJob05",
  "GET /jobs/searchJob":"JobsController.searchJob05",
  "POST /jobs/foundSearchJob":"JobsController.foundSearchJob05",
  
  "POST /capacityChange":"JobsController.capacityChange05",
  "POST /capacityFinalize":"JobsController.capacityFinalize05",

  //postman
  "GET /listJobs":"JobsController.listJobs05",
  "POST /createJobs":"JobsController.createJobs05",
  "PUT /updateList":"JobsController.updateList05",
  "DELETE /deleteJobs":"JobsController.deleteJobs05",
  "POST /createSuccessJobs":"JobsController.createSuccessJobs05",


  // Endpoints for user controller
  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
  '/logout': 'UserController.logout',
  "POST /verify": "JobsController.verification",
  // view endpoints for user controller
  // HTML Views
  // '/': { view: 'homepage' },
  'get /login': { view: 'user/login' },
  'get /signup': { view: 'user/signup'},
  '/welcome': { view: 'user/welcome' },
  'verify': { view: 'user/verify'},

};
