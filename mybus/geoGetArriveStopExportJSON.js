var request = require("request"),
    fs = require('fs'),
    path = require('path'),
    config = require("../config/config.json");

var options = { 
  method: 'POST',
  url: 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php',
  headers: { 
     'content-type': 'application/x-www-form-urlencoded',
     'user-agent': 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)' 
  },
  form: { 
    idClient: config.idClient,
    passKey: config.passKey,
    idStop: process.argv[2]
  } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  var aux = path.join(__dirname, './data/json/', "stop_" + process.argv[2]+".json")
  console.log("aux=",aux)
  fs.writeFile(aux, body, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  }); 
});
