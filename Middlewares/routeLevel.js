/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function ({multer}) {


  // This middleware gets Params and add them in req.inputs

  const getParams = (req, res, next) => {
    for(let prop in  req.params) {
      if(req.params.hasOwnProperty(prop))
        req.inputs[prop] = req.params[prop];
    }
    next();
  };


  const mediaStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  });
  const uploadImageMiddleware = multer({  storage: mediaStorage});


  return {
    getParams,
    uploadImageMiddleware
  }

};