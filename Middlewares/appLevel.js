/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function ({messages, jwt,models,config},helpers) {

  // This middleware get all the inputs from params ,query ,body and place them in req.inputs
  const getInputs =  (req, res, next) => {
    req.inputs = {};
    for(let prop in  req.body) {
      if(req.body.hasOwnProperty(prop))
        req.inputs[prop] = req.body[prop];
    }
    for(let prop in  req.query) {
      if(req.query.hasOwnProperty(prop))
        req.inputs[prop] = req.query[prop];
    }
    next();
  };

  const jwtVerification = async (req, res, next) => {
    try {

      if(helpers.isPublicRoute(req.path))
        return next();
      let token = req.headers['instaclone-token'];
      let decodedToken = jwt.verify(token, config.jwtSecret);
      let user = await models.User.findOne({_id : decodedToken._id});
      if(!user)
        return helper.sendResponse(res,messages.INVALID_JWT);
      req.userDetails = user;
      next();
    }catch (ex){
      return helpers.sendResponse(res,messages.INVALID_JWT)
    }
  };



  // Array Order of the middleware Matters so we follow FIFO

  return [
    getInputs,
    jwtVerification
  ]

};