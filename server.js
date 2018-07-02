let curr = 'http://api.openweathermap.org/data/2.5/weather?zip=48757,us';
let five = 'http://api.openweathermap.org/data/2.5/forecast?zip=48757,us';
let apiKey = '8d2ecc26cb7a1ad860f3228c755c1a65';
// let lat  = 43.451567399999995;
// let long = -83.66042039999999;

let c = curr + '&APPID=' + apiKey;
let f = five + '&APPID=' + apiKey;

var fs = require('fs');
var host = '127.0.0.1';
var port = 3001;
var path = require('path');
var express = require('express');
var fetch = require('node-fetch');

const Current = require('./public/js/models/current.js');
const FiveDay = require('./public/js/models/fiveday.js');

var app = express();
app.use(express.static(__dirname + '/public')); //use static files in ROOT/public folder

app.get('/', function(req, res){ //root dir
    res.sendFile(path.join(__dirname+'/index.html'))
});

// API END POINTS
app.get('/current', async function (req, res) {
  let x = await fetch(c)
  let y = await x.json()
  res.send(new Current(y))
})

app.get('/fiveday', async function (req, res) {
  let x = await fetch(f)
  let y = await x.json()
  res.send(new FiveDay(y))
})

//TODO add a callback that checks if already listening on that port
app.listen(port, host, function (){
  console.log('Server running on port:'+port);
});
