/**
 * Created by Rohail on 5/10/2017.
 */


module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    postId : {
      type : Schema.Types.ObjectId
    },
    userId : {
      type : Schema.Types.ObjectId,
      ref : "User"
    },
    comment : {
      type : String
    }
  },{
    timeStamp : true
  });

};