import sys
sys.path.insert(0, '../config/')

import time
from MeteorClient import MeteorClient

"""
This code is a example for make a connection from a Reactive Box Mobility Madrid
The Reactive Box is a Meteor Server which includes many layers of data.
Current example shows the way of make subscription at PM 2.5  Polutans

For use this program must be include:
- MeteorClient https://github.com/hharnisc/python-meteor
- EventEmitter https://github.com/jfhbrook/pyee
- Websockets (ws4py on https://github.com/Lawouach/WebSocket-for-Python)
- ddpClient https://pypi.python.org/pypi/python-ddp/0.1.0
"""   

def subscribed(subscription):
    print('* SUBSCRIBED {}'.format(subscription))

def unsubscribed(subscription):
    print('* UNSUBSCRIBED {}'.format(subscription))

def added(collection, id, fields):
    print('* ADDED {} {}'.format(collection, id))

    if collection == "users":
        print collection
        #client.subscribe('SENPM25MAD.eventpos.all')
        client.subscribe('SENPM25MAD.eventpos.custom', [{'idStation': '28079008'}])

    else:
        print collection
        print fields

def changed(collection, id, fields, cleared):
    print ("changed:{}".format(id) + " fields: {}".format(fields))

def connected():
    print('* CONNECTED')
    client.login("test", "test")

def subscription_callback(error):
    if error:
        print(error)

try:
    client = MeteorClient('ws://rbmobility.emtmadrid.es:3333/websocket', auto_reconnect = True, auto_reconnect_timeout = 5, debug = False)
    client.on('subscribed', subscribed)
    client.on('unsubscribed', unsubscribed)
    client.on('added', added)
    client.on('connected', connected)
    client.on('changed',changed)   

    client.connect()

    # ctrl + c to kill the script

    while True:
        try:
            time.sleep(1)

        except KeyboardInterrupt:
            break
  
    client.subscribe('SENPM25MAD.eventpos.custom',[{'idStation': '28079008'}])
    #client.unsubscribe("ROUTESMAD.usrtrack.custom")

except Exception as err :
    print err.message