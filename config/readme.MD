
# config.py

Este fichero va en el directorio raíz utilizando la `iDclient` y `passKey` que puedes conseguir [registrándote aquí](http://opendata.emtmadrid.es/Formulario).

* Si estamos trabajando con python el `config.py` que importaremos a nuestro script debera tener el siguiente aspecto:

```python
# Copy or rename this file to config.py and add your credentials.
# You can get them here: http://opendata.emtmadrid.es/Formulario
idClient = 'your client id'
passKey  = 'your passKey'
```

* Si estamos trabajando con node.js el `config.json` que importaremos a nuestro script debera tener el siguiente aspecto:

```javascript
{ 
  "idClient": "your client id",
  "passKey": "your passKey"
}
```


