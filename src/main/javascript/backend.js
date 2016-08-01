var express = require('express'),
    cookieParser = require('cookie-parser')
    faker = require('faker'),
    moment = require('moment'),
    _ = require('lodash'),
    server = express(),
    documentRoot = __dirname + '/build';

server.set('view engine', 'jade');
server.set('views', documentRoot+'/views');

console.log("Use document root: " + documentRoot);
server.use("/", express.static(documentRoot));

server.use(cookieParser());

server.get("/", function(req, res) {
  var userName = faker.name.firstName() + ' ' + faker.name.lastName();
  var currentDate = moment().format("MMMM DD, YYYY")
  res.render("index", {userName: userName, currentDate: currentDate});
});

server.get("/logger", function(req, res) {
  var enableLog = '';
  if (req.query.enable) {
    enableLog = 'true'; 
  }
  res.cookie('enableLog', enableLog);
  res.json({enableLog: enableLog});
});

server.get("/test", function(req, res) {
  res.render("test", {title: 'Testing Page'});
});

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

module.exports = server;

