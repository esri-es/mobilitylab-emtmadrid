var request = require("request");

var date = process.argv[2];
var line =  process.argv[3];
if (process.argv.length < 4) {
	console.log('introduce fecha (DD/MM/YYYY) y línea. Ejemplo: "node mobility-node.js 15/06/2016 1"');

}else{
	var options = { method: 'POST',
	  url: 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/bus/GetRouteLines.php',
	  headers: 
	   { 'postman-token': 'fea2d314-70a5-bef8-fd8d-b51f931395fe',
	     'cache-control': 'no-cache',
	     'content-type': 'application/x-www-form-urlencoded',
	     'user-agent': 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)' },
	  form: 
	   { idClient: 'WEB.SERV.carlospj@icloud.com ',
	     passKey: '18D573C2-8093-4632-958D-6C709D11FD5D',
	     SelectDate: date,
	     Lines: line } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  debugger;
	  var json = JSON.parse(body);
	  var resultRequest = json.resultDescription;
	  var resultVal = json.resultValues;
	  console.log(resultRequest);
	  var stopsArry = [];

	  for (i = 0; i < resultVal.length; i++) { 
    	stopsArry[i] = {
    		stopName:resultVal[i].name,
    		coord:{
    			lat: resultVal[i].latitude,
    			long: resultVal[i].longitude
    		}
    	};
		}
		
		var stopsJson = JSON.stringify(stopsArry);
		console.log(stopsJson);
	});

}
