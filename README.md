# winston-kafka

A Kafka transport for [winston](https://github.com/flatiron/winston) logging library.

## Installation
``` bash
  $ npm install winston
  $ npm install winston-kafka
```
[![Build Status](https://secure.travis-ci.org/nokk/winston-kafka.png)](http://travis-ci.org/nokk/winston-kafka)

## Usage
``` js
  var winston = require('winston');

  // Adds a Kafka transport (it also adds the field `winston.transports.Kafka`)
  winston.add(require('winston-kafka'), options);
```

The Kafka transport accepts the following options:

* __level:__ Level of messages that this transport should log (default: `'info'`).
* __zookeeperHost:__ Hostname and port to the zookeeper server (host:port). 
* __topic:__ The topic to submit the messages to.

## License
MIT