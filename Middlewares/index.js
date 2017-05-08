/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function (dependencies,helper) {

  let middlewares = {};

  middlewares.APP = require('./appLevel')(dependencies,helper);
  middlewares.ROUTE = require('./routeLevel')(dependencies,helper);

  return middlewares;

};