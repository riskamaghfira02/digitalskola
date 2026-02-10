const Ajv = require("ajv").default;
const api_schema = {
    schema_loginuser:{
"$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "status": {
      "type": "number"
    },
    "token": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  },
  "required": [
    "status",
    "token",
    "message"
  ]
    },

  schema_getuser: {
"$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "status": {
      "type": "number"
    },
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "age": {
            "type": "number"
          },
          "protected": {
            "type": "boolean"
          }
        },
        "required": [
          "userId",
          "username",
          "age"
        ]
      }
    }
  },
  "required": [
    "status",
    "users"
  ]
  }
}
module.exports = { api_schema };