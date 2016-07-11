//Load libs
var request = require("request"),
		config = require("../config/config.json"),
		fs = require('fs'),
    express = require('express'),
    app = express();

//get current date
var fullDate = new Date(),
    day = fullDate.getDate(),
    month = fullDate.getMonth(),
    month = month + 1 ,
    year = fullDate.getFullYear(),
    date = day + '/'+ month + '/' + year;
//request params
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
//When have a get request on {OUR_SERVER}:4000/route-lines/{LINE_NUMBER}
app.get('/route-lines/:busLine', function (req, res) {
 	options.form.Lines = req.params.busLine;
 	//Request to the EMT server
 	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  body = JSON.parse(body);
	  var resultRequest = body.resultDescription;
	  console.log('resultado de la consulta: ' + resultRequest);
	 	
	 	try{
      //get and write CSV headers
  	 	var elem = body.resultValues[0],
          columns = Object.keys(elem);
      csv = columns.join(",");
      csv += "\n";

      //go through each element of each item and add it to the CSV separated by commas 
  		for (j = 0; j < body.resultValues.length; j++) {
  		  var row = body.resultValues[j];
  		  
  		  for( var element in row) {
  		  	csv += row[element];  
          csv += ",";
      	}

      	csv = csv.slice(0, -1);
      	csv += "\n";
  		}
    }catch(e){
      csv = "No existe la línea "+req.params.busLine;
    }
    //then send CSV as the response (and print in the console)
    res.send(csv);
    console.log(csv);
	});
 });

//set the server port
 app.listen(4000, function () {
   console.log('Example app listening on port 4000!');
 });





