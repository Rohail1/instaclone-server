module.exports = function (mongoose) {

  let Schema = mongoose.Schema;
  let models = {};

  let User = require('./users')(Schema);
  let Post = require('./posts')(Schema);
  let Comment = require('./comments')(Schema);

// Associating Models with Schemas

  models.User = mongoose.model('User', User);
  models.Post = mongoose.model('Post', Post);
  models.Comment = mongoose.model('Comment', Comment);

  return models;

};
