/**
 * Created by özge on 11/14/2015.
 */

var express = require ("express");
var app = express();
var path    = require("path");
console.log(__dirname)
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/login.html'));
});

app.get('/mainpage',function(req,res){
    res.sendFile(path.join(__dirname+'/MainPage.html'));
});

app.get('/basket',function(req,res){
    res.sendFile(path.join(__dirname+'/basket.html'));
});

app.listen(63342);
