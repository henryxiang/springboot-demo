var express = require('express'),
    livereload = require('express-livereload'),
    webpack = require('webpack'),
    ProgressPlugin = require('webpack/lib/ProgressPlugin'),
    config = require('./webpack.config.js'),
    faker = require('faker'),
    moment = require('moment'),
    _ = require('lodash'),
    sprintf = require("sprintf-js").sprintf,
    server = express(),
    port = '8000',
    documentRoot = __dirname + '/build';

//server.set('port', port);

console.log("Use document root: " + documentRoot);
server.use("/", express.static(documentRoot));

server.get("/user/:id", function(req, res) {
  var user = {
    id: req.params.id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthday: faker.date.past()
  };
  res.json(user);
});

server.get("/users", function(req, res) {
  var users = [];
  for (var i = 0; i < 10; i++) {
    var user = {
      id: _.uniqueId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthday: faker.date.past()
    };
    users.push(user);
  }
  res.json(users);
});

console.log("Starting server on port " + port);
server.listen(port);
// livereload(server, config={watchDir: documentRoot});

var compiler = webpack(config);
compiler.apply(new ProgressPlugin(function(percentage, msg) {
  if (percentage === 0) {
    console.log("Compiling source")
  } 
  else if (percentage === 1) {
    console.log("Compiling finished");
  } 
  else {
    process.stdout.write(sprintf("%d%% %-25s\r", Math.round(percentage * 100), msg));
  }
}));
compiler.watch({
  aggregateTimeout: 300, 
  poll: true 
}, function(err, stats) {
  if(err) {
    console.log(err);
  }
  else if (stats.errors || stats.warnings) {
    console.log(stats.errors, stats.warnings);
  }
  else {
    console.log(sprintf("Time used: %.3f seconds", (stats.endTime-stats.startTime)/1000));
  }
  //console.log(stats);
});

livereload(server, config={watchDir: documentRoot});
