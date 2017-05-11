var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require('request');
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var mydb;

app.get('/whatsound/api/v1/vagalume/lyrics/values', function (req, res) {
    console.log(req.query);
    var artist = req.query.artist;
    var track =  req.query.track;
    console.log("Entrou");
    // tipo = tracks, artists, albums
    var options = {
        url: "https://api.vagalume.com.br/search.php?art="+artist+"&mus="+track+"&apikey={4861cdfc7de4ae451f9918bcbd040f87}",
        headers: {
            Accept: 'text/json'
        }
    };
    console.log(options.url);
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            if (info != ' ') {
                var message = '';
                var status = true;
                var track = null;
                var translation = null;
             //   console.log(JSON.stringify(info['mus'][0]));
                if(JSON.stringify(info['mus']) == undefined){
                        message = 'Not Found';
                        status = false;
                    }else{
                        track = (info['mus'][0]['text']);
                        translation = (info['mus'][0]['translate']) == undefined? null:(info['mus'][0]['translate'][0]['text']);
                    }
                var json = {
                    "lyrics": {
                        
                    "track": track ,
                    "translation": translation 
                    
                    },
                    
                    "message": message,
                    "status": status    
                    }
                }
                 res.send(json);
                    
                }
        }
        request(options, callback);

    });

app.get('/whatsound/api/v1/vagalume/hotspots', function (req, res) {
    console.log(req.query);
    console.log("Entrou");
    // tipo = tracks, artists, albums
    var options = {
        url: "https://api.vagalume.com.br/hotspots.php?apikey={4861cdfc7de4ae451f9918bcbd040f87}",
        headers: {
            Accept: 'text/json'
        }
    };
    console.log(options.url);
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            if (info != ' ') {
                var result = {
                    "message": ' ' ,
                    "status" : true,
                    "trend" : []
                }
             //   console.log(JSON.stringify(info['mus'][0]));
                if(JSON.stringify(info['hotspots']) == undefined){
                        result.message = 'Not Found';
                        result.status = false;
                    }else{
                        for(var items in Object.keys(info['hotspots'])){
                            result.trend.push({"artist": (JSON.stringify(info['hotspots'][items]['title'])).replace(/\"/g," "),"name": (JSON.stringify(info['hotspots'][items]['musTitle'])).replace(/\"/g,"")});
                        }
                    }
                }
                 res.send(result);
                    
            }
        }
        request(options, callback);

    });

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB']) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);

  //database name
  var dbName = 'mydb';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);
}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));



var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
