// npm init 
// git init
// hub create

var express = require('express'); // npm install express ejs --save  
var bodyParser = require('body-parser'); // npm install body-parser --save  
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
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

app.post('/campgrounds', function(req, res) {
  res.send('you hit the post route');
  // get data from form and add to campgrounds array
  // redirect back to campgrounds page
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log('The Yelp camp server has started');
});
