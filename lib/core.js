'use strict';

/**
 * Import dependencies
 * @type {*|exports}
 */
var glob = require('glob');
var async = require('async');
var parser = require('./parser');

var swaggerKeys = {
  tag: 'SwaggerTag',
  path: 'SwaggerPath',
  definition: 'SwaggerDefinition',
  property: 'SwaggerProperty'
};

function addTag(tags, tag) {

  if (tag.length) {
    tags.push(tag[0]);
  }

}

function parsePath(swagger, path) {

  for (var key in path) {

    if (!swagger[key]) {
      swagger[key] = {};
    }

    for (var elementKey in path[key]) {
      swagger[key][elementKey] = path[key][elementKey];
    }

  }

  return swagger;

}

function getDefinition(comments) {

  for (var i = 0; i < comments.length; ++i) {

    if (comments[i].key === swaggerKeys.definition) {
      return comments[i];
    }

  }

  return null;

}

function parseFile(swagger, file, callback) {

  parser.parseFile(file, function parsedFile(err, comments) {

    if (err) {
      return callback(err);
    }

    var definition = getDefinition(comments);
    if (definition) {

      var definitionName = Object.keys(definition.value)[0];
      var result = definition.value[definitionName];

      if (!result.properties) {
        result.properties = {};
      }

      comments.forEach(function(comment) {

        if (comment.key === swaggerKeys.property) {

          parsePath(result.properties, comment.value);

        }

      });

      swagger.definitions[definitionName] = result;

    } else {

      // We handle tags and paths

      comments.forEach(function(comment) {

        if (comment.key === swaggerKeys.tag) {

          addTag(swagger.tags, comment.value);

        } else if (comment.key === swaggerKeys.path) {

          parsePath(swagger.paths, comment.value);

        }

      });

    }

    callback();

  });
}

function setSwaggerProperties(swagger, directory, callback) {

  glob(directory, function(err, files) {

    if (err) {
      return callback(err);
    }

    async.eachSeries(files, function eachFile(file, cb) {

      parseFile(swagger, file, cb);

    }, callback);

  });

}

module.exports = {

  parseFile: parseFile,
  setSwaggerProperties: setSwaggerProperties

};
