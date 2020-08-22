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

module.exports = {
  viewParts: async function viewparts(req05, res05) {
    let responseJobs05 = await getData05("URL");
    let partData05 = [];
    if (responseJobs05) {
      let jobName05 = req05.params.jobName05;
      for (index = 0; index < responseJobs05.length; index++) {
        if (responseJobs05[index].jobName05 === jobName05) {
          partData05.push(responseJobs05[index]);
        }
      }
    } else {
      res05.send("Cannot find anything to show!");
    }
    console.log(partData05);
    let responseParts05 = await getData05("URL");

    if (responseParts05) {
      console.log(responseParts05);
      for (i = 0; i < partData05.length; i++) {
        for (j = 0; j < responseParts05.length; j++) {
          if (partData05[i].partId05 === responseParts05[j].partId05) {
            partData05[i].partName05 = responseParts05[j].partName05;
            partData05[i].qoh05 = responseParts05[j].qoh05;
            if (partData05[i].qoh05 >= partData05[i].qty05) {
              partData05[i].order = true;
            } else {
              partData05[i].order = false;
            }
          }
        }
      }
      console.log(partData05);
      res05.view("pages/partsData", { data05: partData05 });
    } else {
      res05.send("Cannot find anything to show!");
    }
  },

  partsOrder: async function partsOrder(req05, res05) {
    let data05 = [
      req05.params.partId05,
      req05.params.partName05,
      req05.params.qty05,
      req05.params.jobName05,
      req05.params.capacity05,
      "One",
    ];
    console.log(data05);
    res05.view("pages/login", { data05: data05 });
  },

  partsOrderIncrease: async function partsOrder(req05, res05) {
    let data05 = [
      req05.params.partId05,
      req05.params.partName05,
      req05.params.qty05,
      req05.params.jobName05,
      req05.params.capacity05,
      "Increase",
    ];
    console.log(data05);
    res05.view("pages/login", { data05: data05 });
  },

  addParts892: async function addParts892(req892, res892) {
    let data892 = {
      partId892: req892.body.partId892,
      partName892: req892.body.partName892,
      qty892: req892.body.qty892,
    };
    console.log(data892);
    await Parts.create(data892).exec(function jobresponse892(
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
            req892.body.partId892 +
            ", " +
            req892.body.partName892 +
            ", " +
            req892.body.qty892 +
            "} inserted in Jobdb table"
        );
      }
    });
  },
};
