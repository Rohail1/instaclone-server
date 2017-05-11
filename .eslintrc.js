module.exports = {
  "extends": "eslint:recommended",
  "plugins": [
    "import"
  ],
  "parser" : "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "arrowFunctions":true,
  },
  rules : {
    "no-console":0
  },
  "globals": {
    "module": true,
    "Promise": true,
    "require" : true,
    "console" : true,
    "global" : true,
    "exports" : true,
    "process" : true,
    "__dirname" : true,

  }
};