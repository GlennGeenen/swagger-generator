"use strict";

/**
 * Import dependencies
 * @type {*|exports}
 */
var annotations = require('annotation');
var glob = require("glob");

module.exports = {

  /**
   * Swagger keys.
   *
   */
  swaggerKeys: {
    "tag": "SwaggerTag",
    "path": "SwaggerPath",
    "definition": "SwaggerDefinition",
    "property": "SwaggerProperty"
  },

  /**
   * Main method, loop through files given by directory param
   *
   * @param swagger
   * @param directory
   */
  setSwaggerProperties: function(swagger, directory) {
    var _this = this;
    glob(directory, function (er, files) {
      for (var f in files) {
        _this.setAnnoForOneFile(swagger, files[f]);
      }
    });
  },

  /**
   * Read Annotations of one file and set in swagger json object.
   *
   * @param swagger
   * @param file
   */
  setAnnoForOneFile: function(swagger, file) {
    var _this = this;
    annotations(file,function (result) {

      // Check if header (SwaggerDefinition Annotation) exists, needed for definition of properties. else paths and tags
      var classHeader = _this.getSwaggerDefinition(result.comments.class);
      if(classHeader) {

        // Get First object's key (Only one tag allowed/class). (Iemand een proppere oplossing ??? )
        for (var className in classHeader) break;

        var entityDefinition = classHeader[className];
        entityDefinition.properties = _this.defineObj({}, result.comments.properties, _this.swaggerKeys.property);
        swagger.definitions[className] = entityDefinition;

      } else {
        // Tag not required for swagger json
        var tag = _this.getSwaggerTag(result.comments.class);
        if(tag) { swagger.tags.push(tag); }
        swagger.paths = _this.defineObj(swagger.paths, result.comments.methods, _this.swaggerKeys.path);
      }
    });
  },

  /**
   * Method to get the tag of a class (SwaggerTag)
   *
   * @param annotations
   * @returns {*}
   */
  getSwaggerTag: function(annotations) {
    var _this = this;
    for (var methodName in annotations) {
      if(annotations[methodName].key == _this.swaggerKeys.tag) {
        if (!annotations[methodName].value[0]) {
          console.log("No tag array element found.");
        }
        return annotations[methodName].value[0];
      }
    }

    return false;
  },

  /**
   * Only first json object rules for header (Swagger)
   *
   * @param annotations
   * @returns {*}
   */
  getSwaggerDefinition: function(annotations, file) {
    var _this = this;
    for (var methodName in annotations) {
      if(annotations[methodName].key == _this.swaggerKeys.definition) {
        for (var className in annotations[methodName].value) { }
        if(!className) {
          console.log("No 'key' found for the annotation 'class'.");
          return false;
        }
        return annotations[methodName].value;
      }
    }

    return false;
  },

  /**
   * Method to set paths for one controller file.
   *
   * @param obj
   * @param annotations
   * @param annotationKey
   * @returns {{}}
   */
  defineObj: function(obj, annotations, annotationKey) {
    for (var key in annotations) {
      var annotation = annotations[key];
      for(var i in annotation) {
        var oneAnnotation = annotation[i];
        if (oneAnnotation.key == annotationKey) {
          for (var objKey in oneAnnotation.value) {
            if (!obj[objKey]) {
              obj[objKey] = {};
            }
            for (var elementKey in oneAnnotation.value[objKey]) {
              obj[objKey][elementKey] = oneAnnotation.value[objKey][elementKey];
            }
          }
        }
      }
    }
    return obj;
  }
};


/*if(stack){
 stack.forEach(function(route){
 if(route.name === 'router') {
 route.handle.stack.forEach(function(childRoute){
 var path = childRoute.route.path;
 if(childRoute.route.path.indexOf(":") > -1) {

 var params = childRoute.route.path.split(":");
 path = params[0];
 params.forEach(function(paramKey) {
 if(params[0] != paramKey) {
 path = path + "{" + paramKey + "}";
 }
 });
 }
 tpaths[path] = {};
 for (var k in childRoute.route.methods) {
 tpaths[path][k] = {};
 tpaths[path][k]['tags'] = ["form-definition"];
 if(childRoute.keys) {
 tpaths[path][k]['parameters'] = [];
 for (var k2 in childRoute.keys) {
 var v2 = childRoute.keys[k2];
 tpaths[path][k]["parameters"].push({
 name: v2.name,
 in: "path",
 description: "field description",
 type: "string"
 });
 }
 }
 if(k == "post" || k == 'put') {
 tpaths[path][k]['parameters'] = [];
 tpaths[path][k]["parameters"].push({
 in: "body",
 name: "body",
 description: "Post/Put document",
 schema: {
 $ref: "#/definitions/FormDefinition"
 }
 });
 }

 tpaths[path][k]['responses'] = {
 "200": {
 "description": "form definition found"
 }
 };
 };
 });
 }
 });
 }*/