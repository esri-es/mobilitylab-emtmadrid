#!/usr/bin/env python
import pika
import json
from public_config import *

hostSend = 'amqp.emtmadrid.es'
portSend = 5672
credentSend = pika.PlainCredentials(idClientTest, passKeyTest)

connection = pika.BlockingConnection(
  pika.ConnectionParameters(
    hostSend, portSend, '/', credentSend
  )
)

channel = connection.channel()
channel.tx_select()

message = '{ "Test Message" }'

try:

  channel.basic_publish(
    exchange = '',
    routing_key = 'messages',
    body = message,
    properties = pika.BasicProperties(
      delivery_mode = 2, 
      user_id = idClientTest
    )
  )

  channel.tx_commit()

except Exception as e:

  print "The message can't be published"
  print e

print "Sent"
connection.close()