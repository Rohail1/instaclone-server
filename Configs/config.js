/**
 * Created by Rohail Najam on 2/5/2017.
 */

const path = require('path');
const rootPath = path.normalize(__dirname+"/../");


const configurations = {

  development : {
    port : 3000,
    rootPath : rootPath,
    db: {
      name : "instaclone"
    },
    logStyle : 'dev',
    jwtSecret : 'jwtSceretString',
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth'
    }
  },

  production : {
    port : process.env.PORT || 3000,
    rootPath : rootPath,
    logStyle : 'combined',
    jwtSecret : 'jwtSceretString',
    db: {
      name : "instaclone"
    },
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth'
    }
  },

  testing : {
    port : process.env.PORT || 3000,
    rootPath : rootPath,
    logStyle : 'combined',
    jwtSecret : 'jwtSceretString',
    API_DIR : '/APIs',
    VALIDATOR_DIR : '/Validators',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth'
    },
    db: {
      name : "instaclone"
    },
  }
};


function returnConfiguration(env) {
  return configurations[env];
}

module.exports = returnConfiguration;