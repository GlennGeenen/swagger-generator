'use strict';

var fs = require('fs');

function parseComments(comments) {
  var commentList = [];

  var regex = /@(.*)\((.*)\)/g;
  var match;

  for (var i in comments) {
    var subComments = comments[i].split(';');
    for (var j in subComments) {

      while ((match = regex.exec(subComments[j])) != null) {

        var value = (match[2]) ? match[2] : false;
        var parsed;

        try {
          parsed = JSON.parse(value);
        } catch (err) {
          console.log(err);
          continue;
        }

        var obj = {
          key: match[1],
          value: parsed
        };

        commentList.push(obj);

      }
    }
  }

  return commentList;
}

function parse(dataString) {

  var regex   = /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g;
  var replaceRegex = /(\*|[\r\n])/g;

  var matches = [];
  var result;
  var match;

  while ((match = regex.exec(dataString)) != null) {
    result = match[0].replace(replaceRegex, '');
    result.trim();

    if (result) {
      matches.push(result);
    }
  }

  if (!matches.length) {
    return [];
  }

  return parseComments(matches);

}

function parseFile(path, callback) {

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }

    var comments = parse(data.toString());
    callback(null, comments);

  });

}

module.exports = {
  parseFile: parseFile
};
