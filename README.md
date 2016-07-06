**REPOSITORIO NO-OFICIAL**

Este repositorio ha sido creado con el objetivo de recopilar recursos que ayuden a los desarrolladores a empezar a trabajar con los servicios ofrecidos en la plataforma [MobilityLabs](http://mobilitylab.emtmadrid.es/portal/).

> **Nota**: estos recursos han sido generados utilizando los [ejemplos del portal de MobilityLabs](http://mobilitylab.emtmadrid.es/portal/index.php/soporte/crear-nuevas-colecciones/)

# Recursos

## Scripts en Python

Para poder ejecutar los scripts tan sólo es necesario:

1. Crear un fichero `config.py` en el directorio raíz (usando [esta plantilla](https://github.com/esri-es/mobilitylab-emtmadrid/blob/master/config.py.sample) como base)<br>
La `iDclient` y `passKey` puedes conseguirlas [registrándote aquí](http://opendata.emtmadrid.es/Formulario)

2. Ejecutar `pip install -r requirements.txt` en la línea de comandos desde el directorio raíz
3. Ejecutar los scripts, por ejemplo:

  3.1. `python openbus-get-arrive-stop.py`
  3.2. `python connect-reative-box.py`
  3.3. `myBus.py`
  3.4. `send-msg-to-amqp.py	`

## Colección de POSTMAN

Para explorar la [API de OpenData de la EMT](http://opendata.emtmadrid.es/Servicios-web) hemos empezado a crear una [colección de POSTMAN](https://www.getpostman.com/) con algunas llamandas a los cuatros servicios disponibles: [Bus](http://opendata.emtmadrid.es/Servicios-web/BUS), [Geo](http://opendata.emtmadrid.es/Servicios-web/GEO), [Media](http://opendata.emtmadrid.es/Servicios-web/MEDIA) e [Inforparking](http://opendata.emtmadrid.es/Servicios-web/PARKING)

# Más info

Recomendamos a cualquier persona que se dirija al [portal de MobilityLabs](http://opendata.emtmadrid.es/Home) para encontrar toda la documentación detallada para trabajar con estos servicios 
