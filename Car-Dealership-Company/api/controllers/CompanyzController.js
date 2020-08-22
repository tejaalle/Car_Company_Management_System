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
  //  This function will view the data that retrieved through GET Operation in web page.
  viewCarData05: async function getview05(req05, res05) {
    let response05 = await getData05(
      "https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/getjobslist"
    );
    console.log(response05);
    if (!response05) {
      res05.send("Cannot find anything to show!");
    }
    if (response05) {
      let jobNames05 = [];
      for (index = 0; index < response05.length; index++) {
        if (!jobNames05.includes(response05[index].jobName05)) {
          jobNames05.push(response05[index].jobName05);
        }
      }
      res05.view("pages/viewData", { data05: jobNames05 });
    }
  },

  jobNameSearch: async function jobnamesearch(req892, res892) {
    console.log("getJobsByID");
    let data892 = await Companyz.find({
      where: {
        jobName892: req892.params.jobName892,
      },
    });
    console.log(data892);
    if (data892.length === 0) {
      res892.status(404).send("jobName892 does not exist");
    } else {
      res892.send(data892);
    }
  },

  jobNameSearchUI: async function jobnamesearchui(req05, res05) {
    let response05 = await getData05(
      "https://v8nlkn60v2.execute-api.us-east-1.amazonaws.com/DEV/getjobslist"
    );
    const request = require("request");

    request.post(
      "https://sft5ksxqae.execute-api.us-east-1.amazonaws.com/dev/helloapi",
      {
        json: {
          jobName05: req05.body.jobName05,
        },
      },
      (error, res, body) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(`statusCode: ${res.statusCode}`);
      }
    );

    if (!response05) {
      res05.send("Cannot find anything to show!");
    }
    if (response05) {
      let jobNames05 = [];
      for (index = 0; index < response05.length; index++) {
        if (response05[index].jobName05 === req05.body.jobName05) {
          if (!jobNames05.includes(response05[index].jobName05)) {
            jobNames05.push(response05[index].jobName05);
          }
        }
      }
      if (jobNames05.length > 0) {
        res05.view("pages/viewData", { data05: jobNames05 });
      } else {
        let status = "Car Name does not exist";
        res05.view("pages/statusPage", { status: status });
      }
    }
  },

  addJob892: async function add892(req892, res892) {
    let data892 = {
      jobName892: req892.body.jobName892,
      partId892: req892.body.partId892,
    };
    console.log(data892);
    await Companyz.create(data892).exec(function jobresponse892(
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
            req892.body.jobName892 +
            ", " +
            req892.body.partId892 +
            "} inserted in Jobdb table"
        );
      }
    });
  },
};
