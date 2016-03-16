var server = require('./backend.js'),
    livereload = require('express-livereload'),
    webpack = require('webpack'),
    ProgressPlugin = require('webpack/lib/ProgressPlugin'),
    config = require('./webpack.config.js'),
    sprintf = require("sprintf-js").sprintf,
    port = '8000',
    watchDir = __dirname + '/build';

server.listen(port, function(){
  console.log("Starting server on port " + port); 
});

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
    console.log(sprintf("Time: %dms", stats.endTime - stats.startTime));
  }
  // console.log(stats);
});

livereload(server, config={watchDir: watchDir});
