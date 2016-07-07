## Servicio myBus

Los vehículos de EMT tienen un servicio Web que permite obtener multitud de datos. Como pueden ser:

  - Número de autobús
  - Línea
  - Sentido del recorrido
  - Coordenadas del vehículo, 
  - Tiempos de estimación de llegada a cada una de las paradas hasta el final del recorrido
  - Etc

El sistema solicitará una autenticación basada en `iDclient` y `passKey` y permitirá el acceso. [Puedes obtenerlos aquí](http://opendata.emtmadrid.es/Formulario).

### Ejemplo de uso

En este repositorio tenemos varios ejemplos sobre como obtener información a través de la `API geo` de la EMT y tratarla.
Ya sea con `Python` o con `Node.js` el procedimiento es muy similar.

Para el ejemplo demostrativo vamos a trabajar con `Node.js`.Vamos a obtener las paradas para una linea de bus en concreto en la fecha actual y crear un `CSV` que posteriormente podremos llevarnos a ArcGIS Online para mostrarlas en un mapa:

1. Cargamos las librerías
	```javascript
	var request = require("request"),
			config = require("../config/config.json"),
			fs = require('fs'),
			express = require('express'),
			app = express();

	``` 

2. Obtenemos la fecha actual
	```javascript
	var fullDate = new Date(),
	    day = fullDate.getDate(),
	    month = fullDate.getMonth(),
	    month = month + 1 ,
	    year = fullDate.getFullYear(),
	    date = day + '/'+ month + '/' + year;
	```

3. Establecemos los parámetros de la petición `POST`que haremos contra la API de la EMT
	```javascript
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
	```
	El `config.idClient` y el `config.passKey` son los parámetros de identificación que habremos obtenido previamente registrandonos [aquí](http://opendata.emtmadrid.es/Formulario). y los habremos intriducido correctamente en el `config.json` del directorio `./comfig`.

4. Levantamos el servidor y especificamos el puerto y la ruta a través de los cuales se podrá acceder mediante `{OUR_SERVER}:4000/route-lines/{LINE_NUMBER}` para que nos devuelva el CSV
	```javascript
	app.get('/route-lines/:busLine', function (req, res) {
		options.form.Lines = req.params.busLine;
		res.send(csv);
	 });

	 app.listen(4000, function () {

	});
	```
5. Lanzamos la petición `POST` obtenemos el `JSON`

	```javascript
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  body = JSON.parse(body);
	  var resultRequest = body.resultDescription;
	  console.log('resultado de la consulta: ' + resultRequest);
	 	
	});
	```
6. Tratamos los datos obtenidos en `JSON` para crear el `CSV`

	* Recorremos cada elemento (parada de bus) y dentro de cada elemento cada item (propiedad de la parada) y las vamos ecribiendo en el `	  CSV` separados por `,`
	```javascript
	var elem = body.resultValues[0],
	  columns = Object.keys(elem);

	csv = columns.join(",");
	csv += "\n";

	  
	for (j = 0; j < body.resultValues.length; j++) {
	  var row = body.resultValues[j];
	  
	  for( var element in row) {
	  	csv += row[element];  
      csv += ",";
  	}

  	csv = csv.slice(0, -1);
  	csv += "\n";
	}
	```	
De esta manera creamos un script que al ejecutarlo desde la consola mediante el comando `node geoGetBusLineStopsExportCSV.js` levantamos un servicio al que poder hacerle consultas `HTTP`

Más info: [https://mobilitylabs.emtmadrid.es/portal/index.php/servicios-de-mybus/](https://mobilitylabs.emtmadrid.es/portal/index.php/servicios-de-mybus/)
