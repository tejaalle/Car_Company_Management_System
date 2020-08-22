// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/



 




module.exports.datastores = {
  
  
  default: {
  
     adapter: 'sails-mysql',
     
    // url: 'mysql://root:Password@123@localhost:3306/cloud_express_837',
   // url: 'mysql://admin:password@database-1.calzxd6avqel.us-east-1.rds.amazonaws.com:3306/jobs837',
    
     url:  global.url,
   
  },


};
