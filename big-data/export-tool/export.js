var request = require("request"),
    https = require('https'),
    config = require("../config/config.json"),
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
  options.path = "/DataProvider/api/dmz/getCollection/mobilitylabs.usertest/usertest/Layers/"+req.params.collection+"."+req.params.data+"/";
  data=req.body.body;
  console.log("req.body=",req.body.body);
  console.log("options.path=",options.path);
  //options.form.idStop = req.params.idStop;
  //console.log("options=",options);
  //res.send("hola");
  //console.log("req.body=",req.body.body);
  
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
        res.send(data);

        var aux = path.join(__dirname, './data/', req.params.collection + "."+req.params.data+".json")
        //console.log("obj=",data)
        console.log("aux=",aux)
        fs.writeFile(aux, JSON.stringify(data), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
        
      }catch(e){
        console.log("e=",e)
        console.log("obj=",obj)
      }
    });
  });

  ajax.write(data);
  ajax.end();
  ajax.on('error', (e) => {
    console.error(e);
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function ObjectId(id){return id;}