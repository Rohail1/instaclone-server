/**
 * Created by Rohail on 5/10/2017.
 */


module.exports = function ({joi}) {

  const createCommentValidator = (input) => {
    let schema = joi.object().keys({
      postId:joi.string().required().error(new Error("Post Id is required")),
      comment:joi.string().required().error(new Error("Comment is required")),
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };
  const getCommentsValidator = (input) => {
    let schema = joi.object().keys({
      postId:joi.string().required().error(new Error("Post Id is required")),
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };
  const deleteCommentValidator = (input) => {
    let schema = joi.object().keys({
      postId:joi.string().required().error(new Error("Post Id is required")),
      commentId:joi.string().required().error(new Error("Comment ID is required")),
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  const updateCommentValidator = (input) => {
    let schema = joi.object().keys({
      postId: joi.string().required().error(new Error("Post Id is required")),
      commentId: joi.string().required().error(new Error("Comment Id is required")),
      comment: joi.string().required().error(new Error("Comment is required")),
    });
    try {
      return joi.validate(input, schema);
    }
    catch (ex) {
      return ex;
    }
  };

  return  {
    createCommentValidator,
    deleteCommentValidator,
    getCommentsValidator,
    updateCommentValidator
  }


};
