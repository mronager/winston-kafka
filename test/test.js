var assert = require('assert');

//Node.js driver client class
var KafkaClient = require('kafka-node');
var winston = require('winston');
var async = require('async');

//Transport class
var Kafka = require('../index.js');

var client;
var producer;
var consumer;
var topic = '_exist_topic_test';
var zookeeperHost = 'localhost:2181';
var logger;

before(function (done) {
  client = new KafkaClient.Client(zookeeperHost);
  producer = new KafkaClient.Producer(client);
  producer.on('ready', function () {
    producer.createTopics([topic], false, done);
  });
});

before(function (done) {
  var config = {
    topic: topic,
    zookeeperHost: zookeeperHost,
    handleExceptions: true
  };
  winston.add(winston.transports.Kafka, config);
  logger = new (winston.Logger)({ exitOnError: false });
  done();
})

// before(function (done) {
//   consumer = new KafkaClient.Consumer(client, [{ topic: topic }]);
//   consumer.on('ready', done);
// });

describe('Kafka transport', function () {

  describe('construtor', function () {
    it('should fail if zookeeperHost is missing', function () {
      assert.throws(function () {
        new Kafka({ topic: topic });
      });
    });

    it('should fail if topic is missing', function () {
      assert.throws(function () {
        new Kafka({ zookeeperHost: zookeeperHost });
      });
    });
  });

  describe('test kafka transport', function () {

    it.skip('should fail if topic does not exist', function (done) {
      done(false);
    });

    it('should insert message without meta', function (done) {
      logger.log('info', 'Message w/o meta', function (err, data) {
        done(err, data);
      });
    });

    it('should insert message with meta', function (done) {
      logger.log('info', 'Message w/ meta', { val: 1 }, function (err, data) {
        done(err, data)
      });
    });

    it('should insert warning message', function (done) {
      logger.log('warn', 'Warning message', function (err, data) {
        done(err, data)
      });
    });
  });
});