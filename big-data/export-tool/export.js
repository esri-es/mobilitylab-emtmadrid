var request = require("request"),
    https = require('https'),
    config = require("../../config/config.json"),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    StringDecoder = require('string_decoder').StringDecoder;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/*var options = { 
      method: 'POST',
      
    };*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var options = {
  hostname: 'rbdata.emtmadrid.es',
  port: 8443,
  method: 'POST',
  headers: { 
        'content-type': "application/json",
        'cache-control': "no-cache"
      } 
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.post('/:collection/:data', function(req, res) {
  options.path = "/DataProvider/api/dmz/getCollection/"+req.body.username+"/"+req.body.password+"/Layers/"+req.params.collection+"."+req.params.data+"/";
  data=req.body.body;
  
  var ajax = https.request(options, function (response) {
    var obj = "";  
    response.on('data', function (chunk) {
      decoder = new StringDecoder('utf8');
      textChunk = decoder.write(chunk);
      obj += textChunk;
    });

    response.on("end", function(chunk) {
      try{
        obj = JSON.parse(obj);
        data = eval(obj.data);
        res.send(obj);

        var aux = path.join(__dirname, './data/', req.params.collection + "."+req.params.data+".json")
        fs.writeFile(aux, JSON.stringify(data), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
        
      }catch(e){
        console.log("e=",e)
        console.log("obj=",obj)
        
        res.send(obj);
      }
    });
  });

  ajax.write(data);
  ajax.end();
  ajax.on('error', (e) => {
    console.error(e);
    ajax.write(e);
    ajax.end();
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function ObjectId(id){return id;}