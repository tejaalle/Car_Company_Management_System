/**
 * DisplayresultsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  displayResults: async function (req, res05) {
    let results = await JobParts.find();
    sails.log(results.length);
    if (results.length > 0) res05.view("pages/results", { data05: results });
    else res05.view("pages/error");
  },
};
