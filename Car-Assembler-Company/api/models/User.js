/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'User_X_05',
  attributes: {
    jobName05:{
       type:'string',
       required:true
    },
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    otp: {
      type: 'string'
    },
    name:{
      type:'string'
    },
    id:{
      type:"number"
    }

  },


  
  datastore: 'default',
  
 
 
  signup: async function (inputs, cb) {
    // Create a user
    User.create({
      jobName05: "teja",
      name: inputs.name,
      email: inputs.email,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
   
   
  },



  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      email: inputs.email,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
  }
};

