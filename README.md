# swagger-generator (swagger 2.0)

**WORK IN PROGRESS!**

Package to generate swagger json from annotations in node

## Installation

    npm install swagger-generator

## Usage

    var swaggerGenerator = require('swagger-generator');

    var object = {
      swagger: '2.0',
      basePath: '/api/v1',
      info: {
        title: 'Title-of-swagger',
        version: '0.0.1'
      }
    };

    // Fill object with annotations in given directory
    swaggerGenerator.parseSwagger(object, './app/**/*.js', function(err) {
      console.log(err);
    });

## Swagger annotations

  • @SwaggerTag
  • @SwaggerPath
  • @SwaggerDefinition
  • @SwaggerProperty

## Examples

Swagger definition

    /**
     * @SwaggerDefinition({
     *   "User": {
     *     "type": "object",
     *     "required": ["name"]
     *   }
     * })
     */
    var schema = {

      /**
       * @SwaggerProperty({
       *   "firstName": {
       *     "type": "string"
       *   }
       * })
       */
      firstName: {type: String},

      /**
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
     * @SwaggerTag([
     *   {
     *     "name": "user-resource",
     *     "description": "User-reource\\Endpoints",
     *     "externalDocs" : {
     *       "description": "Swagger documenation",
     *       "url" : "https://github.com/imi187/swagger-generator"
     *     }
     *   }
     * ])
     */
     var controller = {

       /**
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
