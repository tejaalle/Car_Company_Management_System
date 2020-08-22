/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'table_part_orders_x_05',
  attributes: {
    jobName05:{
      type:'string',
      required:true
    },
    partId05:{
      type:"number",
      required:true
    },
    userId05:{
      type:"number",
      required:true
    },
    qty:{
      type:"number",
      required:true
    }

  },
  datastore: 'default'

};

