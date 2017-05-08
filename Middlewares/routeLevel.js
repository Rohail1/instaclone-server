/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function ({mongoose}) {


  // This middleware gets Params and add them in req.inputs

  function getParams(req, res, next) {
    for(let prop in  req.params) {
      if(req.params.hasOwnProperty(prop))
        req.inputs[prop] = req.params[prop];
    }
    next();
  }

  return {
    getParams : getParams
  }

};