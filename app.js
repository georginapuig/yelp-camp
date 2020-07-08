var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// (route, callback)
app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  const campgrounds = [
    {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'},
    {name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1550957886-ac45931e5779?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'},
    {name: 'Mountain Goat\'s Rest', image: 'https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'},
    {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1578145288677-6e6842916b90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'},
    {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1587077742261-7a49f1f3c0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'}
  ];
  //                         name       : data
  res.render('campgrounds', {campgrounds: campgrounds});
});
// process.env.PORT, process.env.IP
app.listen(3000, function() {
  console.log('The Yelp camp server has started');
});