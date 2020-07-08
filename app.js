var express = require('express');
var app = express();

// (route, callback)
app.get('/', function(req, res) {
  res.send('lsnding page soon');
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('The Yelp camp server has started');
});