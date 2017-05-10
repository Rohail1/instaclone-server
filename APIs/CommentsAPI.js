/**
 * Created by Rohail on 5/10/2017.
 */


module.exports.setupFunction = function ({config,messages,models},helper,middlewares,validator,services) {

  const getAllComments = async (req,res) => {

    try {
      let validated = await validator.getCommentsValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let skip = req.query.skip || 0;
      let limit = req.query.limit || 10;
      let commentQuery = {
        postId : req.inputs.postId
      };
      let comments = models.Comment.find(commentQuery).sort("createdAt").skip(skip).limit(limit);
      if(!comments)
        return helper.sendResponse(res,messages.SUCCESSFUL,[]);
      return helper.sendResponse(res,messages.SUCCESSFUL,comments);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const postComment = async (req,res) => {
    try {
      let validated = await validator.createCommentValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let commentObject = new models.Comment();
      commentObject._id = helper.generateObjectId();
      commentObject.comment = req.inputs.comment;
      commentObject.userId = req.userDetails._id;
      commentObject.postId = req.inputs.postId;
      await commentObject.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,commentObject);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const deleteComment = async (req,res) => {
    let validated = await validator.createCommentValidator(req.inputs);
    if(validated.error)
      throw new Error(validated.error.message);
    if(!req.isOwner)
      return helper.sendResponse(res,messages.FORBIDDEN);
    try {
      let commentQuery = {
        postId : req.inputs.postId,
        userId : req.userDetails._id,
        _id : req.inputs.commentId
      };
      await models.Comment.findOneAndRemove(commentQuery);
      return helper.sendResponse(res,messages.SUCCESSFUL);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const updateComment= async (req,res) => {
    let validated = await validator.updateCommentValidator(req.inputs);
    if(validated.error)
      throw new Error(validated.error.message);
    if(!req.isOwner)
      return helper.sendResponse(res,messages.FORBIDDEN);
    try {
      let postQuery = {
        _id : req.inputs.postId,
        userId : req.userDetails._id
      };
      let post = await models.Post.findOneAndUpdate(postQuery);
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

    postComment : {
      route : '/posts/:postId/comments',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : postComment
    },
    getAllComments : {
      route : '/posts/:postId/comments',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [],
      handler : getAllComments
    },
    deleteComment : {
      route : '/posts/:postId/comments/:commentId',
      method : 'DELETE',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : deleteComment
    },
  };

};