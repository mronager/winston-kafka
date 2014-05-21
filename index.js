var os = require('os');
var util = require('util');
var winston = require('winston');
var kafka = require('kafka-node');

module.exports = winston.transports.Kafka = Kafka;
util.inherits(Kafka, winston.Transport);

function Kafka (options) {
  this.name = 'Kafka';
  this.level = options.level || 'info';
  this.topic = options.topic;
  var client = new kafka.Client(options.host);
  this.producer = new kafka.Producer(client);
}

Kafka.prototype.log = function (level, message, meta, done) {
  var data = {
    level     : level,
    message   : message,
    meta      : meta,
    hostname  : os.hostname,
    timestamp : Date.now()
  };
  send(data, this.topic, this.producer, done);
};

function send (data, topic, producer, done) {
  if (!producer.ready) return done(new Error('producer not ready'));
  var message = JSON.stringify(data);
  var payload = {
    topic    : topic,
    messages : message
  };
  producer.send([payload], done);
}
