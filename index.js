'use strict';

var fs = require('fs');
var core = require('./lib/core.js');

function parseSwagger(object, directory, callback) {

  if (!object.swagger) {
    object.swagger = '2.0';
  }

  if (!object.info) {
    object.info = {};
  }

  if (!object.info.title) {
    object.info.title = 'Swagger';
  }

  if (!object.info.version) {
    object.info.version = '0.0.1';
  }

  if (!object.paths) {
    object.paths = {};
  }

  if (!object.definitions) {
    object.definitions = {};
  }

  if (!object.tags) {
    object.tags = [];
  }

  core.setSwaggerProperties(object, directory, callback);

}

function writeSwagger(object, directory, path, callback) {

  parseSwagger(object, directory, function parsed(err, result) {

    if (err) {
      return callback(err);
    }

    fs.writeFile(path, JSON.stringify(result), callback);

  });

}

module.exports = {
  parseSwagger: parseSwagger,
  writeSwagger: writeSwagger
};
