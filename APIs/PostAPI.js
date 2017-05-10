/**
 * Created by Rohail on 5/10/2017.
 */


module.exports.setupFunction = function ({config,messages,models,enums},helper,middlewares,validator,services) {

  const getAllPosts = async (req,res) => {

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
      let payload = {
        _id : user._id,
        email : user.email
      };
      user.jwt = jwt.sign(payload,config.jwtSecret);
      await user.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const getPostDetails = async (req,res) => {
    try {
      let validated = await validator.loginValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let user = await models.User.findOne({email: req.inputs.email});
      if(!user)
        return helper.sendResponse(res,messages.AUTHENTICATION_FAILED);
      let isAuthenticated = await helper.authenticatePassword(req.inputs.password,user.password);
      if(!isAuthenticated)
        return helper.sendResponse(res,messages.AUTHENTICATION_FAILED);
      let payload = {
        _id : user._id,
        email : user.email
      };
      user.jwt = jwt.sign(payload,config.jwtSecret);
      await user.save();
      let dataToSend = helper.copyObjects(user,['password','salt']);
      return helper.sendResponse(res,messages.SUCCESSFUL,dataToSend);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const createPost = async (req,res) => {
    try {
      let validated = await validator.createPostValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let post = new models.Post();
      post._id = helper.generateObjectId();
      post.mediaType = enums.mediaType.photo;
      post.userId = req.userDetails._id;
      post.content = req.inputs.content || "";
      post.taggedUsers = req.inputs.taggedUsers || [];
      post.likedBY = [];
      post.media = await services.uploadPhotoService(post,req.file);
      await post.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,post);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  module.exports.APIs = {

    createPost : {
      route : '/posts',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.uploadImageMiddleware.single("mediaFile")],
      handler : createPost
    },
  };

};