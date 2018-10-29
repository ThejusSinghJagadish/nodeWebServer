const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);

app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  fs.appendFile('./server.log', log + '\n', (err) => {
    console.log('Error :', err);
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintain.hbs');
  var now = new Date().toString();
  fs.appendFile('./server.log', `${now} : site under maintainance`);
});

app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Welcome home !!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/help', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Help Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: "Unable to process this request"
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
