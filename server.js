/**
 * Created by Rohail Najam on 2/5/2017.
 */

require('dotenv').config();
const express = require('express');
let app = express();
app.locals.env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
app.locals.title = "Project Name";
const config = require('./configs/config')(app.locals.env);
const dependencies = require('./Libs/dependencies')(app,express,config);
require('./Configs/express')(dependencies);
let helpers = require('./Libs/helper')(dependencies);
require('./Routes/routes')(dependencies,helpers);

app.listen(config.port,() => {

  console.log("::::::::::::::::::::::::::: server Status :::::::::::::::::::::::::::::::");
  console.log("Application name: %s",app.locals.title);
  console.log("Server started on: %s",(new Date()));
  console.log("Running on port: %s",config.port);
  console.log("Environment: %s", app.locals.env);

});