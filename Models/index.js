module.exports = function (mongoose) {

  let Schema = mongoose.Schema;
  let models = {};

  let User = require('./users')(Schema);
  let Post = require('./posts')(Schema);

// Associating Models with Schemas

  models.User = mongoose.model('User', User);
  models.Post = mongoose.model('Post', Post);

  return models;

};
