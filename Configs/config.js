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
      name : "instaclone",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/instaclone",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
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
      name : "instaclone",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/instaclone",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
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
      name : "instaclone",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/instaclone",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
    },
  }
};


function returnConfiguration(env) {
  return configurations[env];
}

module.exports = returnConfiguration;