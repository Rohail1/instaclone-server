/**
 * Created by Rohail on 5/10/2017.
 */


module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    mediaType : {
      type : String
    },
    userId : {
      type : Schema.Types.ObjectId
    },
    content : {
      type : String
    },
    taggedUsers : [{
      type : Schema.Types.ObjectId
    }],
    likedBY : [{
      type : Schema.Types.ObjectId
    }],

    media : {
      cloudinaryPublicId : String,
      width : String,
      height : String,
      signature : String,
      version : String,
      format : String,
      sizeInBytes : String,
      url : String,
      secureUrl : String,
      originalFileName : String,
      resourceType : String,
      deliveryType : String,
      etag : String,
      baseUrl : {
        type : String
      },
      endUrl: {
        type : String
      },
    }
  },{
    timeStamp : true
  });

};