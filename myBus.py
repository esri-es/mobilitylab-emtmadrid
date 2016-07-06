import urllib
import urllib2
import json 
from public_config import *

stopFindBusTest = 72

urlGetFindBusTest = "https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php"

params = {
    'idClient' : idClient,
    'passKey' : passKey,
    'idStop' : stopFindBusTest
}
data = urllib.urlencode(params)

headers = { 
    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)',
    'Content-type': 'application/x-www-form-urlencoded' 
}

req = urllib2.Request(urlGetFindBusTest, data, headers)
response = urllib2.urlopen(req)
results = response.read()
resultJson = json.loads(results)

if resultJson.has_key('arrives'):
    
    resultJsonbus = resultJson['arrives']
    for results in resultJsonbus:
        #now, we are going to use this bus number for getting data from myBus system
        myBusTest = results['busId']
        print "accesing to bus Id..." + myBusTest
        urlbus = "https://mybus.emtmadrid.es:8073/rests"
        params = "?srv=DatosCoche&Paradas=99&bus=" + myBusTest
        aut_h = urllib2.HTTPPasswordMgrWithDefaultRealm()
        aut_h.add_password(None, urlbus,  idClient, passKey) 
        handler = urllib2.HTTPBasicAuthHandler(aut_h)
        opener = urllib2.build_opener(handler)
        urllib2.install_opener(opener)

        response = urllib2.urlopen(urlbus + params)
        results = response.read()
        print results
        #valueDict = xmltodict.parse(results)

print "end"