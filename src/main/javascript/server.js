var server = require('./backend.js'),
    livereload = require('express-livereload'),
    webpack = require('webpack'),
    ProgressPlugin = require('webpack/lib/ProgressPlugin'),
    config = require('./webpack.config.js'),
    sprintf = require("sprintf-js").sprintf,
    port = '8000',
    watchDir = __dirname + '/build';

console.log("Starting server on port " + port);
server.listen(port);

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

livereload(server, config={watchDir: watchDir});
