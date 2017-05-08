/**
 * Created by Rohail Najam on 2/6/2017.
 */


module.exports=  function ({mongoose,bcrypt}) {


  return {

    generateSalt : (saltRounds) =>{
      return bcrypt.genSalt(saltRounds);
    },
    generateHash : (password,salt) =>{
      return bcrypt.hash(password,salt);
    },
    copyObjects: (a,propToExclude) => {
      let obj = JSON.parse(JSON.stringify(a));
      if(propToExclude)
        for(let i =0;i<propToExclude.length;i++)
          delete obj[propToExclude[i]];
      return obj;
    },
    sendResponse :  (res, message,data) => {
      let responseMessage = {
        success : message.success,
        message : message.message
      };
      if(data)
        responseMessage.data = data;
      return res.status(message.code).json(responseMessage);
    },
    sendError : (res,error) => {
      let responseMessage = {
        success : false,
        message : error.message
      };
      return res.status(500).json(responseMessage);
    },
    generateObjectId : (id) => {
      if(id){
        return mongoose.Types.ObjectId(id);
      }else {
        return mongoose.Types.ObjectId();
      }
    }
  };
};