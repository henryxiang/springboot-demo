var express = require('express'),
    faker = require('faker'),
    moment = require('moment'),
    _ = require('lodash'),
    server = express(),
    documentRoot = __dirname + '/build';

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

module.exports = server;

