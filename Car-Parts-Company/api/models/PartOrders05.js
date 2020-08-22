/**
 * PartOrders05.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'table_part_orders_y_05',
  attributes: {
    partId05: { type: 'number', required: true, columnName:'partId05'},
    jobName05: { type: 'String', required: true, columnName:'jobName05' },
    userId05:{type: 'number',required: true, columnName:'userId05'},
    qty:{type: 'number',required: true, columnName:'qty'},
    transactionId05: { type: 'String', required: true, columnName:'transactionId05' },
  },
};

