var http =     require ('http');	    // For serving a basic web page.
var mongoose = require ("mongoose");
//var express =  require ("express");
//var socketio = require ("socket.io");



// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://heroku_z802lth6:8uoqc89ntqifsm7undqksf2cfq@ds055935.mongolab.com:55935/heroku_z802lth6';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.
var userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: { type: String, trim: true }
    },

    tel: { type: Number, min: 0},

    koordinat:{
        Latitude:{type: Number, min: 0},
        Longitude:{type: Number, min: 0}
    }

});

//geo
var GeoSchema = new mongoose.Schema({
        location: { 'type': {type: String, enum: "Point", default: "Point"},
        coordinates: { type: [Number,Number],   default: [0,0]} }
});



// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
var PUser   =   mongoose.model('PowerUsers', userSchema);
var GeoJSON =   mongoose.model('GeoJSON',    GeoSchema);


// Clear out old data
PUser.remove({}, function(err) {
    if (err) {
        console.log ('error deleting old data.');
    }
});

GeoJSON.remove({}, function(err) {
    if (err) {
        console.log ('error deleting old data.');
    }
});



// Creating one user.
var bursa = new PUser ({
    name: { first: 'Bursa', last: 'Dan' },
    tel: 16,
    koordinat: {
        Latitude: 40.266864,
        Longitude: 29.063448
    }
});
var GeoBursa = new GeoJSON ({
        location: 'Bursa',
     //   coordinates:[ 40.266864,29.063448] }
         coordinates:[ 40,29] }
);


// Saving it to the database.
bursa.save(function (err) {if (err) console.log ('Error on save!')});
GeoBursa.save(function (err) {if (err) console.log ('Error on save!')});


// Creating more users manually
var giresun = new PUser ({
    name: { first: 'Giresun', last: 'Dan' },
    tel: 28,
    koordinat: {
        Latitude: 40.912811,
        Longitude: 38.389530
    }
});
giresun.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var istanbul = new PUser ({
    name: { first: 'Istanbul', last: 'Dan' },
    tel: 34,
    koordinat: {
        Latitude: 41.00527,
        Longitude: 28.97696
    }
});
istanbul.save(function (err) {if (err) console.log ('Error on save!')});


// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];




http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    createWebpage(req, res);
}).listen(theport);


function createWebpage (req, res) {
    // Let's find all the documents
    PUser.find({}).exec(function(err, result) {
        if (!err) {
            res.write(html1 + JSON.stringify(result, undefined, 3) +  html2 + result.length + html3);




            var query = PUser.find({'name.last': 'Dan'});
            query.where('plaka').lt(93);
            query.exec(function(err, result) {
                if (!err) {
                    res.end(html4 + JSON.stringify(result, undefined, 3) + html5 + result.length + html6 + html7);
                } else {
                    res.end('Error in second query. ' + err)
                }
            });
        } else {
            res.end('Error in first query. ' + err)
        }
    });
}

// Tell the console we're getting ready.
// The listener in http.createServer should still be active after these messages are emitted.
console.log('http server will be listening on port %d', theport);
console.log('CTRL+C to exit');


// The rudimentary HTML content in three pieces.
var html1 = '<title>Sayfa Basligi Yedir</title> \
<head> \
<style> body {color: #394a5f; font-family: sans-serif} </style> \
</head> \
<body> \
<h1>Herkese Yedir</h1> \
<br\> <h2> All Documents in MonogoDB database </h2> <pre><code> ';

var html2 = '</code></pre> <br\> <i>';
var html3 = ' documents. </i> <br\> <br\>';
var html4 = '<h2> Queried (name.last = "Dan", plaka < 93) </h2> <pre><code> ';
var html5 = '</code></pre> <br\> <i>';
var html6 = ' documents. </i> <br\>';
var html7 = '<img src="https://badge.facebook.com/badge/712052938.259.2073113627.png" alt="Smiley face"  > </i> <br\>';
