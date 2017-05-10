/**
 * Created by Rohail on 5/10/2017.
 */

module.exports = function ({enums,config},helper) {
  return function(file){
    return new Promise((resolve, reject) => {
      if(!file){
        if(!file) reject('File is Undefined');
      }
      try {
        helper.uploadImageToCloudinary(file)
          .then(function (image) {
            let photo = {};
            photo.cloudinaryPublicId = image.public_id;
            photo.width = image.width;
            photo.height = image.height;
            photo.signature = image.signature;
            photo.version = image.version;
            photo.format = image.format;
            photo.sizeInBytes = image.bytes;
            photo.url = image.url;
            photo.secureUrl = image.secure_url;
            photo.originalFileName = image.original_filename;
            photo.resourceType = image.resource_type;
            photo.deliveryType = image.type;
            photo.etag = image.etag;

            // Structure URL of Cloudinary
            //http://res.cloudinary.com/<cloud_name>/<resource_type>/<type>/<version>/<public_id>.<format>
            // version is optional if remove it will return original image  It can be replaced by parameters for image transformation

            photo.baseUrl = [enums.cloudinaryBaseUrl,config.CLOUDINARY.cloud_name,photo.resourceType,photo.deliveryType].join('/');
            photo.endUrl = [photo.cloudinaryPublicId,photo.format].join('.');
            helper.removeFile(file.path);
            resolve(photo);
          }).catch(function (error) {
          reject(error);
        })
      }
      catch (ex){
        reject (ex);
      }
    })
  }
};
