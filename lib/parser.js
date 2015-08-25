'use strict';

var fs = require('fs');

function getMatches(regex, dataString) {
  var result = regex.exec(dataString);

  if (result) {
    return result;
  }

  return false;
}

function parseComments(comments) {
  var commentList = [];

  var regex = /@(.*)\((.*)\)/g;
  var match;

  for (var i in comments) {
    var subComments = comments[i].split(';');
    for (var j in subComments) {

      while (match = getMatches(regex, subComments[j])) {
        if (match) {
          var value = (match[2]) ? match[2] : false;

          var obj = {
            key: match[1],
            value: JSON.parse(value)
          };

          commentList.push(obj);
        }
      }
    }
  }

  return commentList;
}

function parse(dataString) {

  var regex   = /\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/g;
  var matches = [];
  var match;

  while (match = getMatches(regex, dataString)) {
    if (match) {
      matches.push(match[0].replace(/(\*|[\r\n])/g, ''));
    }
  }

  if (!matches.length) {
    return [];
  }

  return parseComments(matches);

}

function parseFile(path, callback) {

  fs.exists(path, function(exists) {

    if (!exists) {
      return callback(new Error('File does not exist.'));
    }

    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        return callback(err);
      }

      var comments = parse(data.toString());
      callback(null, comments);

    });

  });

}

module.exports = {
  parseFile: parseFile
};
