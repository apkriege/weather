let apiKey = '8d2ecc26cb7a1ad860f3228c755c1a65';

buildURL = (type, zip) => {
  let base = 'http://api.openweathermap.org/data/2.5/'
  return base + type + '?zip=' + zip + ',us' + '&APPID=' + apiKey
}

var fs = require('fs');
var host = '127.0.0.1';
var port = 3001;
var path = require('path');
var express = require('express');
var fetch = require('node-fetch');
var bodyParser = require('body-parser');

const Current = require('./public/js/models/current.js');
const FiveDay = require('./public/js/models/fiveday.js');

var app = express();
app.use(express.static(__dirname + '/public')); //use static files in ROOT/public folder
app.use(bodyParser.json())

app.get('/', function(req, res){ //root dir
    res.sendFile(path.join(__dirname+'/index.html'))
});

// API END POINTS
app.get('/current/:zip', async function (req, res) {
  let z = req.params.zip;
  let c = buildURL('weather', z);
  let x = await fetch(c)
  let y = await x.json()
  res.send(new Current(y))
})

app.get('/fiveday/:zip', async function (req, res) {
  let z = req.params.zip;
  let c = buildURL('forecast', z);
  let x = await fetch(c)
  let y = await x.json()
  res.send(new FiveDay(y))
})

//TODO add a callback that checks if already listening on that port
app.listen(port, host, function (){
  console.log('Server running on port:'+port);
});
