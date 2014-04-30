var util    = require('util');
var winston = require('winston');
var os      = require("os");
var KafkaClient = require('kafka-node');

var Kafka = winston.transports.Kafka = function (options) {
  this.name = 'kafka';

  this.level = options.level || 'info';
  this.topic = options.topic;
  this.hostname = os.hostname;

  client = new KafkaClient.Client(options.zookeeperHost);
  this.producer = new KafkaClient.Producer(client);
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(Kafka, winston.Transport);

Kafka.prototype._send = function (json, done) {
  var message = JSON.stringify(json);
  this.producer.send([{
    topic: this.topic,
    messages: [message]
  }], function (err) {
    done(err, !err);
  });
}

// Send the log to Kafka
Kafka.prototype.log = function (level, msg, meta, callback) {
  var self = this;
  var message = {
    level: level,
    message: msg,
    meta: meta,
    hostname: this.hostname,
    timestamp: Date.now()
  };
  if (!this.producer.ready) {
    this.producer.on('ready', function () {
      self._send(message, callback);
    });
  } else {
    self._send(message, callback);
  }

};
