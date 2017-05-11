/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function ({multer,model,messages},helper) {


  // This middleware gets Params and add them in req.inputs

  const getParams = (req, res, next) => {
    for(let prop in  req.params) {
      if(req.params.hasOwnProperty(prop))
        req.inputs[prop] = req.params[prop];
    }
    next();
  };


  const isOwnerOfPost = async (req,res,next) => {

    let postId = req.inputs.postId;
    if(!postId)
      return helper.sendResponse(res,messages.BAD_REQUEST);
    try {
      let post = model.Post.count({_id : postId,userId:req.userDetails._id});
      req.isOwner =  !!post;
      next();
    }
    catch (ex){
      return helper.sendResponse(res,messages.INTERNAL_SERVER_ERROR)
    }

  };

  const isOwnerOfComment = async (req,res,next) => {

    let postId = req.inputs.postId;
    let commentId = req.inputs.commentId;
    if(!postId || !commentId)
      return helper.sendResponse(res,messages.BAD_REQUEST);
    try {
      let post = model.Comment.count({_id : commentId,postId : postId,userId:req.userDetails._id});
      req.isOwner =  !!post;
      next();
    }
    catch (ex){
      return helper.sendResponse(res,messages.INTERNAL_SERVER_ERROR)
    }

  };


  const mediaStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  });
  let uploadImageMiddleware = multer({  storage: mediaStorage});



  return {
    getParams,
    uploadImageMiddleware,
    isOwnerOfPost,
    isOwnerOfComment
  }

};