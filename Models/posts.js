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
    }]
  },{
    timeStamp : true
  });

};