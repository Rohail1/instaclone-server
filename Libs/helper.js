/**
 * Created by Rohail Najam on 2/6/2017.
 */


module.exports=  function ({mongoose,bcrypt,jwtWhiteSheet,fs}) {


  return {

    generateSalt : (saltRounds) =>{
      return bcrypt.genSalt(saltRounds);
    },
    generateHash : (password,salt) =>{
      return bcrypt.hash(password,salt);
    },
    authenticatePassword : (password,hash) =>{
      return bcrypt.compare(password,hash);
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
    },
    isPublicRoute : (path) => {
      for (let i = 0; i < jwtWhiteSheet.length; i++) {
        if (path.includes(jwtWhiteSheet[i])) {
          return true;
        }
      }
      return false;

    },
    uploadImageToCloudinary : function (file) {
      let destination =  file instanceof Object ? file.path : file;
      return cloudinary.uploader.upload(destination)
    },
    removeFile : function (path) {
      fs.removeSync(path);
    },
    getCloudinaryImage : function (name) {
      return cloudinary.api.resource(name)
    },
/*    getImageUrls : function (image,...parameters) {
      return {
        imageUrl : image.url,
        thumbnailImageUrl : [defaults.cloudinaryBaseUrl,config.CLOUDINARY.cloud_name,
          image.resource_type,image.type,parameters.join(),[image.public_id,image.format].join('.')].join('/')
      }
    },*/
    createCloudinaryImageUrl : function (baseUrl,endUrl,...parameters) {
      return [baseUrl,parameters.join(),endUrl].join('/');
    },
    deleteCloudinaryImage : function (public_id) {
      return cloudinary.uploader.destroy(public_id)
    }

  };
};