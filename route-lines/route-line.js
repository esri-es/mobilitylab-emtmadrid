var request = require("request"),
		config = require("../config/config.json"),
		fs = require('fs'),
    express = require('express'),
    app = express();


var fullDate = new Date(),
    day = fullDate.getDate(),
    month = fullDate.getMonth(),
    month = month + 1 ,
    year = fullDate.getFullYear(),
    date = day + '/'+ month + '/' + year;

var options = { method: 'POST',
  url: 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/bus/GetRouteLines.php',
  headers: 
   { 'postman-token': 'fea2d314-70a5-bef8-fd8d-b51f931395fe',
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded',
     'user-agent': 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)' },
  form: 
   { idClient: config.idClient,
     passKey: config.passKey,
     SelectDate: date } };

app.get('/route-lines/:busLine', function (req, res) {
 	options.form.Lines = req.params.busLine;

 	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  body = JSON.parse(body);
	  var resultRequest = body.resultDescription;
	  console.log('resultado de la consulta: ' + resultRequest);
	 	
	 	var elem = body.resultValues[0],
        columns = Object.keys(elem);
    
    csv = columns.join(",");
    csv += "\n";

    body.resultValues.forEach(function(item, i){
     
      for(var elem in item) {    
          csv += item[elem];
          csv += ",";
      }
      csv += "\n";
    });
    
    res.send(csv);
    console.log(csv);
    // Writing file
    // var aux = path.join(__dirname, './data/json/', "stop_" + process.argv[2]+".json")
	  // console.log("aux=",aux)
	  fs.writeFile('./data/busStops.csv', csv, function(err) {
	      if(err) {
	          return console.log(err);
	      }

	      console.log("The file was saved!");
	  });
	});
 });

 app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
 });





