/**
 * Created by Rohail on 5/8/2017.
 */

module.exports.setupFunction = function ({config,messages,models},helper,middlewares,validator) {

  async function signup(req,res) {

    try {
      let validated = await validator.signupValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let userCount = await models.User.count({email: req.inputs.email});
      if(userCount > 0)
        return helper.sendResponse(res,messages.EMAIL_ALREADY_EXISIT);
      let salt = await helper.generateSalt(10);
      let password = await helper.generateHash(req.inputs.password,salt);
      let user = new models.User();
      user._id = helper.generateObjectId();
      user.firstname = req.inputs.firstname;
      user.lastname = req.inputs.lastname;
      user.email = req.inputs.email;
      user.password = password;
      user.salt = salt;
      await user.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    }catch (ex){
      return helper.sendError(res,ex)
    }
  }

  module.exports.APIs = {

    signup : {
      route : '/signup',
      method : 'POST',
      prefix : config.API_PREFIX.AUTH,
      middlewares : [],
      handler : signup
    }

  };

};