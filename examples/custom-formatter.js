/*
 * custom-formater.js: Custom formater in winston
 *
 * (C) 2012, Nodejitsu Inc.
 *
 */

var winston = require('../lib/winston');
var util = require('util');

logger = new winston.Logger();

logger.add(winston.transports.Console, {
  timestamp: function () {
    return (new Date).toUTCString()
  },
  stringify: function (options) {
    var output = options.timestamp ? options.timestamp + ' - ' : '';
    output += options.level.toUpperCase();
    output += ': ' + (options.message instanceof Error ? formatError(options.message) : util.format(options.message));

    if (options.meta) {
      output += ' - metadata: ' + util.format(options.meta);
    }

    return output;
  }
});

function formatError(err) {
  return '"' + err.message + '" ' + err.stack.split(/\n\s*/)[1];
}


logger.info('String message', { 'foo': true, bar: false });
logger.info({foo: true, bar: false});
logger.info(['foo', 'bar']);
logger.warn(new Date, { 'foo': 'bar' });
logger.error(new Error('Test error'));