var amqp = require('amqp');
var AMQP_OPTIONS = {
  host: 'localhost',
  port: 5672,
  login: 'guest',
  password: 'guest',
  connectionTimeout: 10000,
  authMechanism: 'AMQPLAIN',
  vhost: '/',
  noDelay: true,
  ssl: {
    'enabled' : false
  }
};

function waitForAmqp(options, callback) {
  if(typeof(options) == 'function') {
    callback = options;
    options = {};
  }

  options = options || AMQP_OPTIONS;
  options.timeout = options.connectionTimeout || 1000 * 60 * 2; //2 minutes

  var timeouted = false;
  var connection = amqp.createConnection(options);

  var timeoutHandler = setTimeout(function() {
    timeouted = true;
    callback(new Error('TIMEOUTED_WAIT_FOR_AMQP'));
  }, options.connectionTimeout);

  connection.on('ready', function () {
    clearTimeout(timeoutHandler);
    timeoutHandler = null;
    callback();
  });

  connection.on('error', function (err) {
    console.log('wait-for-amqp: ' + err);
  });

}

module.exports = waitForAmqp;
