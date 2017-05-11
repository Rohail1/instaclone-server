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
  "rules" : {
    "no-console":0
  },
  "env" : {
    "node" : true,
    "browser" : true
  },
  "globals": {
    "Promise": true
  }
};