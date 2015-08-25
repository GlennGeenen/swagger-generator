# swagger-generator (swagger 2.0)

**WORK IN PROGRESS!**

Package to generate swagger json from annotations in node

	npm install swagger-generator
	

## Installation

Adds this lines to app.js

	var swaggerJson = require('swagger-generator');
	// set Swagger configuration
	swaggerJson.swagger = "2.0";
	swaggerJson.basePath = "/api/v1";
	swaggerJson.info = {
	  title: "Title-of-swagger",
	  version: "0.0.1"
	};
	
	// Scan given directory
	swaggerJson.render('./app/**/*.js');
	
	
Adds this lines to a controller method

	var swagger = require('swagger-generator');
	
	module.exports = {
    	 json: function (req, res) {
      	   res.ok(swagger);
    	 }
    };
    
    
## Swagger annotations

	• @SwaggerTag
	• @SwaggerPath
    • @SwaggerDefinition
    • @SwaggerProperty
    
    
## Examples

Swagger definition

	/**
     * @Class();
     * @SwaggerDefinition({
     *   "User": {
     *     "type": "object",
     *     "required": ["name"]
     *   }
     * })
	 */
	var schema = {
	  /**
       * @Property("firstName");
       * @SwaggerProperty({
       *   "firstName": {
       *     "type": "string"
       *   }
       * })
       */
	  firstName: {type: String},

	  /**
       * @Property("name");
       * @SwaggerProperty({
       *   "name": {
       *     "type": "string"
       *   }
       * })
       */
	  name: {type: String},
	  
	}
	
Swagger paths
	
	/**
     * @Class();
     * @SwaggerTag([
     *   {
     *     "name": "user-resource",
     *     "description": "User-reource\\Endpoints",
     *     "external url" : {
     *       "description": "Swagger documenation",
     *       "url" : "https://github.com/imi187/swagger-generator"
     *     }
     *   }
     * ])
     */
   	var controller = {
   	  
   	  /**
       * @Method("list");
       * @SwaggerPath({
       *   "/user/": {
       *     "get": {
       *       "tags": [
       *         "user-resource"
       *       ],
       *       "parameters": [],
       *       "responses": {
       *         "200": {
       *           "description": "Find all user"
       *         }
       *       }
       *     }
       *   }
       * })
       */
   	  list: function(){
   	    //code
   	  }
   	} 