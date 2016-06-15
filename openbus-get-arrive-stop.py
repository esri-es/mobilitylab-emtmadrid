import urllib
import urllib2
import json
from config import *

stopFindBusTest=72

urlGetFindBusTest="https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php"

useragent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'

params = {
  'idClient' : idClient,
  'passKey' : passKey,
  'idStop' : stopFindBusTest
}

headers = { 'User-Agent' : useragent,'Content-type':'application/x-www-form-urlencoded' }

data = urllib.urlencode(params)

req = urllib2.Request(urlGetFindBusTest, data, headers)

response = urllib2.urlopen(req)

results = response.read()

resultJson = json.loads(results)

if resultJson.has_key('arrives'):
    resultJsonbus = resultJson['arrives']
    for results in resultJsonbus:
        print results