var express = require('express'),
    faker = require('faker'),
    moment = require('moment'),
    _ = require('lodash'),
    server = express(),
    documentRoot = __dirname + '/build';

server.set('view engine', 'jade');
server.set('views', documentRoot+'/views');

console.log("Use document root: " + documentRoot);
server.use("/", express.static(documentRoot));

server.get("/", function(req, res) {
  var userName = "XIANG, HENRY";
  var currentDate = moment().format("MMMM DD, YYYY")
  res.render("index", {userName: userName, currentDate: currentDate});
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

