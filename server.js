var express = require('express');
var request = require('request');
var config = require('./config');

var app = express();


app.use('/', express.static(__dirname + "/client/"));


app.get('/api', function(req, res) {
  request({
    url: 'https://api.gettyimages.com/v3/search/images?phrase=' + req.query.word,
    method: 'GET',
    headers: config
    }, function(error, response, body){
    if(error) {
      console.log("error=====>", error);
    } else {
      console.log(JSON.parse(body));
      if (JSON.parse(body).result_count === 0) {
        // default 404 image
        res.send("http://cache2.asset-cache.net/xt/157744106.jpg?v=1&g=fs1|0|TSIR|44|106&s=1&b=MTc4")
      } else {
        var randNum = Math.floor(Math.random() * (JSON.parse(body).images.length));
        var imageData = JSON.parse(body).images[randNum].display_sizes[0].uri;
        res.send(imageData);
      }
    }
  });
});

app.listen(process.env.PORT || 3333);

