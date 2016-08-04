#!/usr/bin/env python
import sys
sys.path.insert(0, '../config/')

import pika
import json
from config import *

# Initialize variables to connect to the server
hostSend = 'amqp.emtmadrid.es'
portSend = 5672
credentSend = pika.PlainCredentials(idClient, passKey)

# Establishing the connection
connection = pika.BlockingConnection(
  pika.ConnectionParameters(
    hostSend, portSend, '/', credentSend
  )
)

# Open a communication channel
channel = connection.channel()
channel.tx_select()

# We build a message to load data into the collection
collectionName = 'MUSEOS.ubicaciones'
with open('json-data/museos.geojson') as data_file:    
  data = json.load(data_file)

message = """
            {
              "target": "datagramServer",
              "vep_data": [{
                "layerData": {
                  "_id": "PM1111",
                  "subsystem": "PUTDATA",
                  "function": "DROP",
                  "layer": {
                    "owner": "%s",
                    "type": "public",
                    "name": "%s"
                  },
                  "instant": "2016-07-19 09:40:26.849000",
                  "system": "LAYERS"
                }
              }]
            }
          """ % (idClient, collectionName)
print message

try:
  # Now we try to the the message
  channel.basic_publish(
    exchange = '',
    routing_key = 'messages',
    body = message,
    properties = pika.BasicProperties(
      delivery_mode = 2, 
      user_id = idClient
    )
  )

  channel.tx_commit()

except Exception as e:

  print "The message can't be published"
  print e

print "Sent"
connection.close()
