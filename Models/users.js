/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    firstname : {
      type : String
    },
    lastname : {
      type : String
    },
    email : {
      type : String
    },
    password : {
      type : String
    },
    salt : {
      type : String
    },
    jwt : {
      type : String
    }
  },{
    timeStamp : true
  });

};