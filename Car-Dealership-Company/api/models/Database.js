/**
 * Database.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "table_users_05",
  attributes: {
    id: {
      type: "number",
      unique: true,
      required: true,
      columnName: "id",
    },
    userName: {
      type: "string",
      unique: true,
      required: true,
      columnName: "userName05",
    },
    password: {
      type: "string",
      required: true,
      columnName: "password05",
    },
  },
};
