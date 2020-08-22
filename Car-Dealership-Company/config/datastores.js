const { get } = require("request");

module.exports.datastores = {
  default: {
    adapter: "sails-mysql",
    // url: global.url,
    url: "mysql://admin:admin@url/carDealer",
  },
};
