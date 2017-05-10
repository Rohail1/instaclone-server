/**
 * Created by Rohail on 5/10/2017.
 */


module.exports = function ({joi}) {

  createPostValidator = function (input) {
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


  return  {
    createPostValidator
  }


};
