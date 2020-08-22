/**
 * DatabaseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

async function getData05(url) {
  return new Promise((resolve, reject) => {
    var request = require("request");
    request.get(
      {
        url: url,
      },
      function (error, response, body) {
        if (error) {
          sails.log.error(error);
          reject(error);
        } else {
          // sails.log.info(response);
          resolve(JSON.parse(body));
        }
      }
    );
  });
}
async function putData05(url, body) {
  return new Promise((resolve, reject) => {
    var request = require("request");
    request.put(
      {
        url: url,
        body: body,
        headers: {
          "content-type": "application/json",
        },
        json: true,
      },
      function (error, response, body) {
        if (error) {
          sails.log.error(error);
          console.log(error);
          reject(error);
        } else {
          // sails.log.info(response);
          resolve(response);
        }
      }
    );
  });
}

async function postData05(url, body) {
  return new Promise((resolve, reject) => {
    var request = require("request");
    request.post(
      {
        url: url,
        body: body,
        headers: {
          "content-type": "application/json",
        },
        json: true,
      },
      function (error, response, body) {
        if (error) {
          sails.log.error(error);
          reject(error);
        } else {
          // sails.log.info(response);
          resolve(response);
        }
      }
    );
  });
}
module.exports = {
  login: async function login(req05, res05) {
    let data05 = await Database.findOne({
      userName: req05.body.userName05,
      password: req05.body.password05,
    });
    if (!data05) {
      res05.view("pages/redirect", { data05: "User Not Authenticated" });
    }
    if (data05) {
      console.log(req05.body.partId05);
      console.log(req05.body.partName05);
      console.log(req05.body.qty05 + "Qty");
      console.log(req05.body.jobName05);
      console.log(req05.body.capacity05);
      let userid = data05.id;
      console.log(req05.body.orderType05);
      if (req05.body.orderType05 === "One") {
        let response05 = await getData05(
          "http://projectcloud-env.eba-6saqrkmu.us-east-1.elasticbeanstalk.com/getPartsByID/" +
            req05.body.partId05 +
            "/" +
            req05.body.partName05
        );
        console.log(response05);
        response05 = response05[0];
        console.log(response05.qoh05 + "Qoh");
        if (req05.body.capacity05 > 0) {
          if (req05.body.qty05 <= response05.qoh05) {
            let jobOrderExists = await sails.models.jobparts.find({
              userId: userid,
              carName: req05.body.jobName05,
              partId: req05.body.partId05,
              result: true,
            });
            console.log(jobOrderExists);
            if (jobOrderExists.length === 0) {
              let trasnsactionId = Date.now().toString();
              let newQoh05 = response05.qoh05 - req05.body.qty05;
              let updatePartsbody05 = {};
              updatePartsbody05.partId05 = req05.body.partId05;
              updatePartsbody05.partName05 = req05.body.partName05;
              updatePartsbody05.qoh05 = newQoh05;
              updatePartsbody05.transactionId05 = trasnsactionId;
              console.log(updatePartsbody05);
              let prepareYMsg = await putData05(
                "http://projectcloud-env.eba-6saqrkmu.us-east-1.elasticbeanstalk.com/updateParts",
                updatePartsbody05
              );
              let updateCapacity05 = {};
              updateCapacity05.transactionId05 = trasnsactionId;
              updateCapacity05.jobName05 = req05.body.jobName05;
              updateCapacity05.partId05 = req05.body.partId05;

              console.log(updateCapacity05);
              let prepareXMsg = await postData05(
                "http://129.173.67.179:1337/capacityChange",
                updateCapacity05
              );

              console.log(prepareXMsg.body + "X");
              console.log(prepareYMsg.body + "Y");
              await sails
                .getDatastore()
                .sendNativeQuery("XA start $1", [trasnsactionId]);
              await sails
                .getDatastore()
                .sendNativeQuery(
                  "INSERT INTO table_car_parts_05(`partId05`,`carName05`,`userId05`,`qty05`,`dateTime05`,`result05`,`transactionId05`) VALUES ($1,$2,$3,$4,$5,$6,$7)",
                  [
                    req05.body.partId05,
                    req05.body.jobName05,
                    userid,
                    req05.body.qty05,
                    new Date(),
                    true,
                    trasnsactionId,
                  ]
                );
              await sails
                .getDatastore()
                .sendNativeQuery("XA end $1", [trasnsactionId]);
              await sails
                .getDatastore()
                .sendNativeQuery("XA prepare $1", [trasnsactionId]);
              if (
                prepareYMsg.body === "prepared" &&
                prepareXMsg.body === "prepared"
              ) {
                let commitBody = {};
                commitBody.transactionId05 = trasnsactionId;
                commitBody.result05 = "commit";
                commitBody.result = "commit";
                await postData05(
                  "http://projectcloud-env.eba-6saqrkmu.us-east-1.elasticbeanstalk.com/response",
                  commitBody
                );
                await postData05(
                  "http://129.173.67.179:1337/capacityFinalize",
                  commitBody
                );
                await sails
                  .getDatastore()
                  .sendNativeQuery("XA commit $1", [trasnsactionId]);
                let partOrdersPost = {};
                partOrdersPost.partId05 = req05.body.partId05;
                partOrdersPost.jobName05 = req05.body.jobName05;
                partOrdersPost.userId05 = userid;
                partOrdersPost.qty = req05.body.qty05;
                partOrdersPost.transactionId05 = trasnsactionId;

                await postData05(
                  "https://e0o6yn652b.execute-api.us-east-1.amazonaws.com/Dev/addsuccessjobs",
                  partOrdersPost
                );

                await postData05(
                  "https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/createsuccessjobs",
                  partOrdersPost
                );

                res05.view("pages/redirect", {
                  data05:
                    "Order is successful.Car Parts Company and Car Assembly company have received the update",
                });
              } else {
                let rollBackBody = {};
                rollBackBody.transactionId05 = trasnsactionId;
                rollBackBody.result05 = "rollback";
                rollBackBody.result = "rollback";
                await postData05(
                  "http://projectcloud-env.eba-6saqrkmu.us-east-1.elasticbeanstalk.com/response",
                  rollBackBody
                );
                await postData05(
                  "http://129.173.67.179:1337/capacityFinalize",
                  rollBackBody
                );
                await sails
                  .getDatastore()
                  .sendNativeQuery("XA rollback $1", [trasnsactionId]);
                await sails
                  .getDatastore()
                  .sendNativeQuery(
                    "INSERT INTO table_car_parts_05(`partId05`,`carName05`,`userId05`,`qty05`,`dateTime05`,`result05`,`transactionId05`) VALUES ($1,$2,$3,$4,$5,$6,$7)",
                    [
                      req05.body.partId05,
                      req05.body.jobName05,
                      userid,
                      req05.body.qty05,
                      new Date(),
                      false,
                      trasnsactionId,
                    ]
                  );
                res05.view("pages/redirect", {
                  data05: "Order is unsuccessful.2 phase commit failed",
                });
              }
            } else {
              await sails.models.jobparts.create({
                carName: req05.body.jobName05,
                partId: req05.body.partId05,
                userId: userid,
                qty: req05.body.qty05,
                dateTime: new Date(),
                result: false,
                transactionId: null,
              });
              res05.view("pages/redirect", {
                data05:
                  "Order is not successful. Order already made for the car part by the user",
              });
            }
          } else {
            await sails.models.jobparts.create({
              carName: req05.body.jobName05,
              partId: req05.body.partId05,
              userId: userid,
              qty: req05.body.qty05,
              dateTime: new Date(),
              result: false,
              transactionId: null,
            });
            res05.view("pages/redirect", {
              data05: "Order is not successful. Qoh is less than required",
            });
          }
        } else {
          await sails.models.jobparts.create({
            carName: req05.body.jobName05,
            partId: req05.body.partId05,
            userId: userid,
            qty: req05.body.qty05,
            dateTime: new Date(),
            result: false,
          });
          res05.view("pages/redirect", {
            data05: "Order is not successful. Capacity is Zero",
          });
        }
      } else {
        let increase = {};
        increase.partId05 = req05.body.partId05;
        increase.userId05 = userid;
        await postData05(
          "http://projectcloud-env.eba-6saqrkmu.us-east-1.elasticbeanstalk.com/requestqohupdate",
          increase
        );
        res05.view("pages/redirect", {
          data05: "Increase Stock Request is made to Parts Company",
        });
      }
    }
  },

  OrderStatus: async function orderstatus(req892, res892) {
    console.log(req892.url);
    url = req892.url;
    let values = url.split("/");
    console.log(values);
    let partId892 = values[1];
    let partName892 = values[2];
    let qty892 = values[3];
    let username = req892.body.username;
    console.log(partId892 + partName892 + qty892 + username);

    let data892 = await Database.findOne({
      username: req892.body.username,
      password: req892.body.password,
    });
    if (!data892) {
      let status =
        "Order Failed due to insufficient quantity of parts or incorrect credentials";
      res892.view("pages/statusPage", { status: status });
    }
    if (data892) {
      // sails.controllers.parts.viewParts();
      let status = "Order Placed Successfully";
      res892.view("pages/statusPage", { status: status });
    }
  },

  addUserauth: async function addParts892(req892, res892) {
    let data892 = {
      username: req892.body.username,
      password: req892.body.password,
    };
    console.log(data892);
    await Database.create(data892).exec(function jobresponse892(
      err892,
      response892
    ) {
      if (err892) {
        console.log(err892);
        res892
          .status(404)
          .send("Either jobName892 or partId892, or both already exists");
      } else {
        res892.send(
          "Data {" +
            req892.body.username +
            ", " +
            req892.body.password +
            "} inserted in Jobdb table"
        );
      }
    });
  },
};
