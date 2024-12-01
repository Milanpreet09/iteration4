const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'iteration4-iteration-4',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

