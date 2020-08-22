module.exports = {
  tableName: "table_car_parts_05",
  attributes: {
    carName: {
      type: "string",
      required: true,
      columnName: "carName05",
    },
    trasnsactionId: {
      type: "string",
      required: false,
      columnName: "transactionId05",
    },
    partId: {
      required: true,
      columnName: "partId05",
      type: "number",
    },
    userId: {
      required: true,
      columnName: "userId05",
      type: "number",
    },
    qty: {
      required: true,
      columnName: "qty05",
      type: "number",
    },
    dateTime: {
      required: true,
      columnName: "dateTime05",
      type: "string",
      columnType: "datetime",
    },
    result: {
      required: true,
      columnName: "result05",
      type: "boolean",
    },
  },
};
