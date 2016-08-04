#!/usr/bin/env python
import sys
sys.path.insert(0, '../config/')

import pika
import json
import ipdb
from config import *
from time import gmtime, strftime
from jsonmerge import merge
from pprint import pprint

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

for d in data["features"]:
  
  # This is the most basic structure you need to send
  message = """
            {
              "target": "datagramServer",
              "vep_data": [{
                "layerData": {
                  "_id": "XXX",
                  "subsystem": "PUTDATA",
                  "function": "DROP",
                  "layer": {
                    "owner": "%s",
                    "type": "public",
                    "name": "%s"
                  },
                  "instant": "%s",
                  "system": "LAYERS"
                }
              }]
            }
          """ % (idClient, collectionName, strftime('%Y-%m-%d %H:%M:%S', gmtime()))
  msg = json.loads(message)
  msg["vep_data"][0]["layerData"]["_id"] = str(d["properties"]["OBJECTID"])

  try:
    # Now we try to the the message
    channel.basic_publish(
      exchange = '',
      routing_key = 'messages',
      body = json.dumps(msg),
      properties = pika.BasicProperties(
        delivery_mode = 2, 
        user_id = idClient
      )
    )

    channel.tx_commit()

  except Exception as e:

    print "The message can't be published"
    print e

  # Print final message
  print "Sent:"
  print json.dumps(msg, sort_keys=False, indent=4, separators=(',', ': '))

connection.close()


'''
print message

'''
