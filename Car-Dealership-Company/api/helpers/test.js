module.exports = {
  friendlyName: "Test",

  description: "Test something.",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    console.log("this is a helper");
  },
};
