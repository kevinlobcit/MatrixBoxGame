'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var score;
app.post('/', function(request, response)
{
    score = request.body.score;
    console.log(score);
});
var numberOfRequests = 0;


http.createServer(function (request, responce) {

    console.log('request was made: ' + request.url);
    responce.writeHeader(200, {'Content-type':'text/html'});
    let scoreText = "<input type=\"number\" value=\"" + score + "\" readonly=\"readonly\" name=\"score\">";
    let nameText = "<input type=\"name\" name=\"name\"/>";
    let submitBtn = "<input type=\"submit\" value=\"Submit\">";

    let html = "<!DOCTYPE html><html><head></head><body>" +
    "<form action=\"submit.html\" method=\"post\">" +
    "Your score is: " + scoreText + "<br>" + 
    "Name: " + nameText + "<br>" +
    submitBtn +
    "</form>" + 
    "</body></html>";
    responce.write(html);
    responce.end();
}).listen(8080);
console.log('listening ...');