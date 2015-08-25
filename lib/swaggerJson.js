'use strict';

var annotations = require('annotation');
var swaggerJsonCore = require('./swaggerJson/core.js');


module.exports = {

  swagger: "2.0",
  info: {
    title: "title of project",
    version: "0.0.1"
  },
  paths: {},
  definitions: {},
  tags: [],

  /**
   *
   * @param {String} annotationsDirectory
   */
  render: function(annotationsDirectory) {
    swaggerJsonCore.setSwaggerProperties(this, annotationsDirectory);
  }

};
