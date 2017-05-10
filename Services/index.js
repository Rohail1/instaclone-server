/**
 * Created by Rohail on 5/10/2017.
 */


module.exports = function (dependencies,helper) {

  return {
    uploadPhotoService : require('./uploadPhotoService')(dependencies,helper)
  }

};
