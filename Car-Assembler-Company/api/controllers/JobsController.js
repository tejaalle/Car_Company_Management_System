/**
 * JobsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Jobs = require("../models/Jobs");
const authenticate = require("../policies/isAuthenticated");

async function getdata(url) {
  return new Promise((resolve, reject) => {
    var request = require('request');
    request.get({
        url: url
        
      }, function(error, response, body) {
        if (error) {
          sails.log.error(error);
          reject(error)
        }
        else {
         // sails.log.info(response); 
          resolve(JSON.parse(body))
        }
      });
    
})
}

async function deletedata(url,bod) {
    return new Promise((resolve, reject) => {
      var request = require('request');
      request.delete({
       
          url: url,
          body:bod,
          json: true
        }, function(error, response, body) {
          if (error) {
            sails.log.error(error);
            reject(error)
          }
          else {
            sails.log.info(body); 
            resolve(body)
          }
        });
      
  })
  }
async function postdata(url,bod) {
    return new Promise((resolve, reject) => {
      var request = require('request');
      request.post({
       
          url: url,
          body:bod,
          json: true
        }, function(error, response, body) {
          if (error) {
            sails.log.error(error);
            reject(error)
          }
          else {
            sails.log.info(body); 
            resolve(body)
          }
        });
      
  })
  }
function GetSortOrder(sort) {    
    return function(a, b) {    
        if (a[sort] > b[sort]) {    
            return 1;    
        } else if (a[sort] < b[sort]) {    
            return -1;    
        }    
        return 0;    
    }
}


module.exports = {
    //webpages
    //function to list all the success jobs
    success05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var item05 = await getdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/getallsuccessjobs');
        console.log(item05);
        var jobs05 = item05
        jobs05 = jobs05.sort(GetSortOrder("partId05"));
        jobs05 = jobs05.sort(GetSortOrder("userId05"));
        jobs05 = jobs05.sort(GetSortOrder("jobName05"));
        res05.view('success',{jobs:jobs05});}

     ,


     //function to find a the success jobs
    searchJob05:function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        res05.view("searchJob",{exists:false})  
     },

    //function to find a the success jobs
    foundSearchJob05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var jobName05 = req05.body.jobName05;
        var body = {"jobName05":jobName05}
        console.log(body);
        var item05 = await postdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/getjobsuccessjobs',body);
        console.log(item05)
        if(!item05.length){
            res05.view("searchJob",{exists:true})  
        }
        else{
          var  jobs05 = item05;
          res05.view('success',{jobs:jobs05});
        }
        
        
     },

    
    //function to list all the jobs
    list05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var jobs05 = await getdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/getjobslist');
        console.log(jobs05);
      
        jobs05 = jobs05.sort(GetSortOrder("partId05"));
        jobs05 = jobs05.sort(GetSortOrder("jobName05"));
        res05.view('list',{jobs:jobs05});


    },
   
    //function which renders the add page
    add05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }  
    var parts05 = await getdata('http://projectcloud-env.eba-6saqrkmu.us-east-1.elasticbeanstalk.com/getParts');
   
    var  partsList05 = []
    
     for( i=0;i<parts05.length;i++){
         partsList05.push(parts05[i].partId05)

     }
     console.log(partsList05);
     if(partsList05.length===0){
      res05.view("noadd");
    }
    else{
      res05.view('add',{exists:false,partsList05:partsList05})
    }
     
    },

    //function which creates new job
    create05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var jobName05 = req05.body.jobName05;
        var partId05 = req05.body.partId05;
        var qty05 = req05.body.qty05;
        var body = {"jobName05":jobName05,"partId05":partId05}
        var item05 = await postdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/getjob',body);
        console.log(item05)
        if(item05.length===0 ){
            var body1 = {"jobName05":jobName05,"partId05":partId05,"qty05":qty05}
            await postdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/addjob',body1);
           
            res05.redirect("/jobs/list");     
            
        }
        else{
            
            var item05 = await getdata('https://e0o6yn652b.execute-api.us-east-1.amazonaws.com/Dev/getparts');
             var parts05 = []
            for(var i =0; i<item05.Items.length;i++){
               parts05.push(item05.Items[i]);

             }
               //var parts05 = [{"partId05":1005,"partName05":"teja","qty":89},{"partId05":2005,"partName05":"teja","qty":89},{"partId05":3005,"partName05":"teja","qty":89},{"partId05":4005,"partName05":"teja","qty":89},]
            var  partsList05 = []
               
            for( i=0;i<parts05.length;i++){
                partsList05.push(parts05[i].partId05)
           
            }
            if(partsList05.length===0){
              res05.view("noadd");
            }
            else{
            res05.view("add",{exists:true,partsList05:partsList05}) ; 
            }
        }
     

    },

    //function that deletes the job
    delete05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var jobName05 = req05.body.jobName05;
        var partId05 = req05.body.partId05;
        var body = {"jobName05":jobName05,"partId05":partId05}
        try{
        await deletedata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/deletejob',body);
        }
        catch(err){
          res05.send("error occured");
        }
       res05.redirect("/jobs/list");     
    
        
    },

    //function that editss the job
    edit05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var jobName05 = req05.body.jobName05;
        var partId05 = req05.body.partId05;
        var job05 = {"jobName05":jobName05,"partId05":partId05};
        res05.view("edit",{job05:job05}) ;  
        
    },
    //function that updates the job
    editedList05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var jobName05 = req05.body.jobName05;
        var partId05 = req05.body.partId05;
        var qty05 = req05.body.qty05;
        var body = {"jobName05":jobName05,"partId05":partId05,"qty05":qty05}
         
         try{
          await postdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/createjob',body);
          }
          catch(err){
            res05.send("error occured");
          }
       res05.redirect("/jobs/list");     
             
        
    },
   

    //function the renders the finding quantity page
    findQty05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
     res05.view("findQty",{exists:false})     
        
    },

    //function that displays the quantity of a particular job
    displayQty05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var jobName05 = req05.body.jobName05;
        var partId05 = req05.body.partId05;
        var body = {"jobName05":jobName05,"partId05":partId05}
        var item05 = await postdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/getjob',body);
        
        if(item05.length === 0){
            res05.view("findQty",{exists:true})  
        }
        else{
          var jobs05 =item05;
         // var  jobs05 = [{"jobName05":item05.Item["jobName05"].S,"partId05":item05.Item["partId05"].N,"qty05":item05.Item["qty05"].N}]
        res05.view('displayQty',{jobs:jobs05});
        }          
           
       },

    //function that renders the update page   
    update05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        res05.view("update",{exists:false}) 
    },

    //function that updates the job
    updatedList05: async function(req05,res05){
      if(req05.session.me==null){
        return res05.redirect('/');
      }
        var jobName05 = req05.body.jobName05;
        var partId05 = req05.body.partId05;
        var qty05 = req05.body.qty05;
        var body = {"jobName05":jobName05,"partId05":partId05}
        var item05 = await postdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/getjob',body);
        
        if(item05.length === 0){
            res05.view("update",{exists:true}) 
        }
        else{
            
            var body1 = {"jobName05":jobName05,"partId05":partId05,"qty05":qty05}
            try{
              await postdata(' https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/createjob',body1);
               }
              catch(err){
                res05.send("error occured");
              }
                res05.redirect("/jobs/list");     
            
        }
        
    },
    
    //************************************************************************************************************************ */
   
     //************************************************************************************************************************ */
     capacityChange05:async function(req05,res05){
       
       if(typeof(req05.body.jobName05)==="undefined" || typeof(req05.body.partId05)==="undefined" || typeof(req05.body.transactionId05)==="undefined"){
         res05.send("notPrepared");
         return;
       }
       if(req05.body.jobName05==="" || req05.body.partId05==="" || req05.body.transactionId05===""){
        res05.send("notPrepared");
        return;
      }
      try{
          console.log(req05.body.jobName05+"req05.body.jobName05")
          console.log(req05.body.partId05+"req05.body.partId05")
          await sails.getDatastore().sendNativeQuery("XA start $1",[req05.body.transactionId05]);
          console.log('first step');
          await sails.getDatastore().sendNativeQuery("update table_jobs_05 set capacity05 = capacity05-1 where jobName05 = $1 and partId05 = $2 ",[req05.body.jobName05,req05.body.partId05]);
          console.log('second step');
          await sails.getDatastore().sendNativeQuery("XA end $1",[req05.body.transactionId05]);
          console.log('third step');
          await sails.getDatastore().sendNativeQuery("XA prepare $1",[req05.body.transactionId05]);
          console.log('fourth step');

      }
      catch(err){
        console.log(err)
         res05.send("notPrepared");
         return;
      }
      res05.send("prepared");
    
  },
  capacityFinalize05:async function(req05,res05){
    
    if(typeof(req05.body.result)==="undefined" ||  typeof(req05.body.transactionId05)==="undefined"){
      console.log('entered undefined');
      res05.send("notdone");
      return;
    }
    if(req05.body.result==="" ||  req05.body.transactionId05===""){
      console.log('entered empty string');
      res05.send("notdone");
      return;
    }
      try{
          console.log(req05.body.result)
          if(req05.body.result==="commit") {
              console.log('entered commit');
              await sails.getDatastore().sendNativeQuery("XA commit $1",[req05.body.transactionId05]); 
          }
          else{
              await sails.getDatastore().sendNativeQuery("XA rollback $1",[req05.body.transactionId05]);  
          }
      }
      catch(err){
          res05.send("notdone");
          return;
      }
      res05.send("done");

  },
  //************************************************************************************************************************ */
  verification: async function (req, res) {
    console.log('in verify()');
    console.log(req.session.me);
    var email = req.param('email');
    var password = req.param('password');
    var otp = req.param('otp');
    console.log(email, password, otp);
    User.findOne({email:email}).exec(function (err, status){
      if(err){
        console.log(err);
        res.send(500,{error:'Database Error'});
      }
      console.log(status);
      if (status==undefined){
        return res.view('user/verify', {message:"otp incorrect", email: email,
        password: password});
      }
      if(status.otp===otp){
        req.session.me = status.id;
        req.session.authenticated = true;
        return res.redirect('/');
      }
      else{
        return res.view('user/verify', {message:"otp incorrect", email: email,
        password: password});
      }
      
    });
  },
    
  

};



