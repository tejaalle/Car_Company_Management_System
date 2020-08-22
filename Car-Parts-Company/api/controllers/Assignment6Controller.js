
module.exports = {

    //for webservice
    getParts: async function (req05, res05) {
        var parts05;
        try {
            parts05 = await sails.models.assignment6.find({})
        }
        catch (err) {
            return res05.badRequest(err);
        }
        return res05.send(parts05);
    },
    getPartsByID: async function (req05, res05) {
        var parts05;
        try {
            parts05 = await sails.models.assignment6.find({partId05 : req05.params.partId05, partName05: req05.params.partName05 })
        } catch (err) {
            return res05.badRequest(err);
        }
        if (parts05.length === 1) {
            return res05.send(parts05);
        }
        else {
            res05.status(400).send({
                code: "404",
                message: "ID Not Found"
            });
        }
    },
    addParts: async function (req05, res05) {
        var parts05;
        try {
            parts05 = await sails.models.assignment6.find({ partId05: req05.body.partId05});
        } catch (err) {
            return res05.badRequest(err);
        }
        if (parts05.length === 1) {
            res05.status(400).send({
                code: "400",
                message: "ID already exist"
            })
        }
        else {
            try {
                await sails.models.assignment6.create({ partId05: req05.body.partId05, partName05: req05.body.partName05, qoh05: req05.body.qoh05 });
            }
            catch (err) {
                return res05.badRequest(err);
            }
            res05.send({ partId05: req05.body.partId05, partName05: req05.body.partName05, qoh05: req05.body.qoh05 });

        }
    },
    updateParts: async function (req05, res05) {

        console.log("entered to update");
        var parts05;
        try {
            parts05 = await sails.models.assignment6.find({ partId05: req05.body.partId05});
            console.log("retrieved parts05"  + parts05);
            console.log("parts length:" + parts05.length);
        } catch (err) {
           // return res05.badRequest(err);
           console.log("not prepared at find");
            res05.send("notPrepared");
        }
        if (parts05.length === 1) {
            console.log("entered parts05.length ===1")
            try
            {
            await sails.getDatastore().sendNativeQuery("XA start $1",[req05.body.transactionId05]);
            console.log("first step in xa")
            await sails.getDatastore().sendNativeQuery("UPDATE table_parts_05 SET $1 WHERE partId05 =$2 AND partName05 = $3 ",
            [{partId05: req05.body.partId05, partName05: req05.body.partName05,qoh05: req05.body.qoh05},req05.body.partId05, req05.body.partName05]);
            console.log("second step in xa")
            await sails.getDatastore().sendNativeQuery("XA end $1",[req05.body.transactionId05]);
            console.log("third step in xa")
            await sails.getDatastore().sendNativeQuery("XA prepare $1",[req05.body.transactionId05]);
            console.log("completed xa")
        }
        catch(err){
          sails.log(err)
          console.log("not prepared at xa");
           res05.send("notPrepared");
        }
         res05.send("prepared");  
              
                
    }         
        else {
            console.log("entered data not found");
            res05.status(400).send({
                code: "400",
                message: "Data not found"
            });
    }
    },
    response:async function(req05, res05){
        
        if(req05.body.result05==="commit")
        {
            try
            {
            await sails.getDatastore().sendNativeQuery("XA commit $1",[req05.body.transactionId05]);
            }
            catch(err){
                console.log(err);
                console.log("not committed");
                 res05.send("not committed");
              }
            res05.send("committed");
    }
    else
    {  
        try
        {
        await sails.getDatastore().sendNativeQuery("XA rollback $1",[req05.body.transactionId05]);
        }
        catch(err){
            console.log(err);
            console.log("not rolled back")
             res05.send("not rolled back");
          }
    res05.send("rolled back");
}
 },
    requestqohupdate: async function(req05, res05) {
        try {
            await sails.models.request05.create({ userId05: req05.body.userId05, partId05: req05.body.partId05, qoh05:1000});
        }
        catch (err) {
            return res05.badRequest(err);
        }
        res05.send({ userId05: req05.body.userId05, partId05: req05.body.partId05});
    },
    //for front end
    viewData: async function (req05, res05) {
        var parts05;
        try {
            parts05 = await sails.models.assignment6.find({})
        }
        catch (err) {
            return res05.badRequest(err);
        }
        res05.view("pages/viewData", { parts05: parts05 });
    },
    addData: async function (req05, res05) {
        var parts05;
        try {
            parts05 = await sails.models.assignment6.find({partId05: req05.body.partId05});
            console.log(parts05);
        } catch (err) {
            return res05.badRequest(err);
        }
        if (parts05.length >= 1) {
            res05.view("pages/addData", {data:true})
        }
        else {
            try {
                await sails.models.assignment6.create({ partId05: req05.body.partId05, partName05: req05.body.partName05, qoh05: req05.body.qoh05 });
            }
            catch (err) {
                return res05.badRequest(err);
            }
        }
        res05.redirect("/viewData");
    },
    updatedata: async function(req05, res05){
        var parts05;
        try {
            
            parts05 = await sails.models.assignment6.find({ partId05: req05.body.partId05});
        } catch (err) {
            return res05.badRequest(err);
        }
        sails.log(parts05);
        res05.view("pages/updateData", { parts05: parts05 })
    },
    declineUpdateQoh: async function(req05, res05){
        try
        {
        await sails.models.request05.destroyOne({partId05: req05.body.partId05});
        }
        catch(err){
            return res05.badRequest(err);
        }
        res05.redirect("/viewData");
    },
    updatData: async function (req05, res05) {
        sails.log({ partId05: req05.body.partId05, partName05: req05.body.partName05 });
        sails.log(req05.body.qoh05)
        try {
            await sails.models.assignment6.update({ partId05: req05.body.partId05},{ qoh05: req05.body.qoh05 });
            res05.redirect("/viewData");
        }
        catch (err) {
            return res05.badRequest(err);
        }
        
    },
    updateQoh: async function (req05, res05) {
        sails.log({ partId05: req05.body.partId05, partName05: req05.body.partName05 });
        sails.log(req05.body.qoh05);
        try
        {
        await sails.models.request05.destroyOne({partId05: req05.body.partId05});
        }
        catch(err){
            return res05.badRequest(err);
        }
        try {
            await sails.models.assignment6.update({ partId05: req05.body.partId05},{ qoh05: req05.body.qoh05 });
        }
        catch (err) {
            return res05.badRequest(err);
        }
        res05.redirect("/viewData");
    },
    viewAllUserData: async function (req05, res05) {
        try {
            var parts05 = await getdata('https://e0o6yn652b.execute-api.us-east-1.amazonaws.com/Dev/getsuccessjobs');           
        console.log(parts05);
        }
        catch (err) {
            return res05.badRequest(err);
        }
        parts05 = parts05.sort(GetSortOrder("partId05"));
        parts05 = parts05.sort(GetSortOrder("userId05"));
        parts05 = parts05.sort(GetSortOrder("jobName05"));

        res05.view("pages/viewUserData", { parts05: parts05 });

    },
    viewUserData: async function (req05, res05) {
        
        var jobName05 = req05.body.jobName05.toUpperCase();
        try {
            var parts05 = await getdata('https://e0o6yn652b.execute-api.us-east-1.amazonaws.com/Dev/getsuccessjobsbyjobname?jobName05='+jobName05);
            console.log(parts05);
        } catch (err) {
            return res05.badRequest(err);
        }
        parts05 = parts05.sort(GetSortOrder("partId05"));
        parts05 = parts05.sort(GetSortOrder("userId05"));
        parts05 = parts05.sort(GetSortOrder("jobName05"));
        if (parts05.length>0) {
            res05.view("pages/viewUserData", { parts05: parts05 });
        }
        else {
            res05.view("pages/userData", {data: true})
        }
    },
    request: async function(req05, res05){
        var parts05;
        try {
            parts05 = await sails.models.request05.find({})
        }
        catch (err) {
            return res05.badRequest(err);
        }
        res05.view("pages/viewrequests", { parts05: parts05 });
    },
    home: async function(req05, res05){
            var count05
        try{
            count05 = await getdata("https://e0o6yn652b.execute-api.us-east-1.amazonaws.com/Dev/getparts");
            value = count05[0].count
            sails.log(value);
        }
        catch(err){
            return res05.badRequest(err);
        }
        res05.view("pages/homepage",  { count05: value });
    }
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
            resolve(JSON.parse(body))
          }
        });  
  })
  }
