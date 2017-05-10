/**
 * Created by Rohail on 5/10/2017.
 */


module.exports.setupFunction = function ({config,messages,models,enums},helper,middlewares,validator,services) {

  const getAllPosts = async (req,res) => {

    try {
      let skip = req.query.skip || 0;
      let limit = req.query.limit || 10;
      let posts = models.Post.find({}).sort("-createdAt").skip(skip).limit(limit);
      if(!posts)
        return helper.sendResponse(res,messages.SUCCESSFUL,[]);
      return helper.sendResponse(res,messages.SUCCESSFUL,posts);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const getPostDetails = async (req,res) => {
    try {
      let validated = await validator.getPostDetailValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let skip = req.query.skip || 0;
      let limit = req.query.limit || 10;
      let posts = models.Post.find({}).sort("-createdAt").skip(skip).limit(limit);
      if(!posts)
        return helper.sendResponse(res,messages.SUCCESSFUL,[]);
      return helper.sendResponse(res,messages.SUCCESSFUL,posts);
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

  const deletePost = async (req,res) => {
    if(!req.isOwner)
      return helper.sendResponse(res,messages.FORBIDDEN);
    try {
      let postQuery = {
        _id : req.inputs.postId,
        userId : req.userDetails._id
      };
      let post = await models.Post.findOneAndRemove(postQuery);
      await Promise.all([
        models.Comment.remove({postId : post._id}),
        helper.deleteCloudinaryImage(post.media.cloudinaryPublicId)
      ]);
      return helper.sendResponse(res,messages.SUCCESSFUL);
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
    getAllPosts : {
      route : '/posts',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [],
      handler : getAllPosts
    },
    getPostDetails : {
      route : '/posts/:postId',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : getPostDetails
    },
    deletePost : {
      route : '/posts/:postId',
      method : 'DELETE',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams,middlewares.isOwnerOfPost],
      handler : deletePost
    },
  };

};