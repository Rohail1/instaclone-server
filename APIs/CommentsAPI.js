/**
 * Created by Rohail on 5/10/2017.
 */


module.exports.setupFunction = function ({config,messages,models},helper,middlewares,validator) {

  const getAllComments = async (req,res) => {

    try {
      let validated = await validator.getCommentsValidator(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let skip = parseInt(req.inputs.skip )|| 0;
      let limit = parseInt(req.inputs.limit )|| 10;
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

  const postComment = async ( req,res ) => {
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
    let validated = await validator.deleteCommentValidator(req.inputs);
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

  const updateComment = async (req,res) => {

    let validated = await validator.updateCommentValidator(req.inputs);
    if(validated.error)
      throw new Error(validated.error.message);
    if(!req.isOwner)
      return helper.sendResponse(res,messages.FORBIDDEN);
    try {
      let query = {
        postId : req.inputs.postId,
        userId : req.userDetails._id,
        _id : req.inputs.commentId
      };
      let updateQuery = {
        $set : {
          comment : req.inputs.comment
        }
      };
      let comment = await models.Comment.findOneAndUpdate(query,updateQuery,{new : true});
      return helper.sendResponse(res,messages.SUCCESSFUL,comment);
    }
    catch (ex){
      return helper.sendError(res,ex)
    }
  };

  module.exports.APIs = {

    getAllComments : {
      route : '/posts/:postId/comments',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : getAllComments
    },
    postComment : {
      route : '/posts/:postId/comments',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams],
      handler : postComment
    },
    updateComment : {
      route : '/posts/:postId/comments/:commentId',
      method : 'PUT',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams,middlewares.isOwnerOfComment],
      handler : updateComment
    },
    deleteComment : {
      route : '/posts/:postId/comments/:commentId',
      method : 'DELETE',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams,middlewares.isOwnerOfComment],
      handler : deleteComment
    },
  };

};