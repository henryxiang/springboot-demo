var express = require('express'),
    faker = require('faker'),
    moment = require('moment'),
    server = express(),
    port = '8000',
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


console.log("Starting server on port " + port);
server.listen(port);