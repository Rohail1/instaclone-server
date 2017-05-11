/**
 * Created by Rohail on 5/10/2017.
 */


module.exports = function ({joi}) {

  const createPostValidator =  (input) => {
    let schema = joi.object().keys({
       content:joi.string().optional(),
       taggedUsers: joi.array().optional().error(new Error('Tagged Users must be an array'))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };
  const getPostDetailValidator = (input) => {
    let schema = joi.object().keys({
       postId:joi.string().required().error(new Error("Post Id is required")),
       skip:joi.string().optional().error(new Error("skip must be a number")),
       limit:joi.string().optional().error(new Error("limit must be a number")),
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  const likeDislikePostValidator = (input) => {
    let schema = joi.object().keys({
      postId:joi.string().required().error(new Error("Post Id is required")),
      userId:joi.string().required().error(new Error("User Id is required"))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  return  {
    createPostValidator,
    getPostDetailValidator,
    likeDislikePostValidator
  }


};
