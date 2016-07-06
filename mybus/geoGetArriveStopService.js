var request = require("request"),
    config = require("../config/config.json"),
    express = require('express'),
    app = express();

var options = { 
      method: 'POST',
      url: 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php',
      headers: { 
         'content-type': 'application/x-www-form-urlencoded',
         'user-agent': 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)' 
      },
      form: { 
        idClient: config.idClient,
        passKey: config.passKey
      } 
    };

app.get('/stop/:idStop', function(req, res) {
  options.form.idStop = req.params.idStop;

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    body = JSON.parse(body);
    var elem = body.arrives[0];
    columns = Object.keys(elem);
    csv = columns.join(",");
    csv += "\n"
    body.arrives.forEach(function(item, i){
      
      for(var elem in item) {    
      
        if (item.hasOwnProperty(elem)) {
          csv += item[elem];
        }
        if(i<columns.length){
          csv += ",";
        }
      }
      csv += "\n"
    });
    
    res.send(csv);
    
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});