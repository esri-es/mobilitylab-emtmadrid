**REPOSITORIO NO-OFICIAL**

Este repositorio ha sido creado con el objetivo de recopilar recursos que ayuden a los desarrolladores a empezar a trabajar con los servicios ofrecidos en la plataforma [MobilityLabs](http://mobilitylab.emtmadrid.es/portal/).

> **Nota**: estos recursos han sido generados utilizando los [ejemplos del portal de MobilityLabs](http://mobilitylab.emtmadrid.es/portal/index.php/soporte/crear-nuevas-colecciones/)

# Recursos

## Scripts en Python

Para poder ejecutar los scripts tan sólo es necesario:

1. Crear un fichero `config.py` en el directorio [config](config/) (usando [esta plantilla](config/config.py.sample) como base)<br>
La `iDclient` y `passKey` puedes conseguirlas [registrándote aquí](http://opendata.emtmadrid.es/Formulario)

2. Ejecutar en la línea de comandos desde el directorio raíz:

  * `pip install -r requirements.txt` (necesitas tener [pip](https://packaging.python.org/installing/) instalado)
  * `npm install` (necesitas tener [Node.js](https://nodejs.org/en/download/) instalado)

3. Ejecutar los scripts (desde sus respectivas carpetas), por ejemplo:
```
python openbus-get-arrive-stop.py
python connect-reative-box.py
python myBus.py
python send-msg-to-amqp.py
node export.js
```

# Más info

Recomendamos a cualquier persona que se dirija al [portal de MobilityLabs](http://opendata.emtmadrid.es/Home) para encontrar toda la documentación detallada para trabajar con estos servicios 
