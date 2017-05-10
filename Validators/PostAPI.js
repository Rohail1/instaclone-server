/**
 * Created by Rohail on 5/10/2017.
 */


module.exports = function ({joi}) {

  createPostValidator = function (input) {
    let schema = joi.object().keys({
      /* email:joi.string().email().required().error(new Error('Please enter valid email')),
       password: joi.string().required().error(new Error('Please enter a password')),
       firstname: joi.string().token().required().error(new Error('Please enter your firstname')),
       lastname: joi.string().token().required().error(new Error('Please enter your lastname'))*/
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
