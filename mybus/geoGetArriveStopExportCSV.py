import sys
sys.path.insert(0, '../config/')

import csv
import ipdb
import urllib
import urllib2
import xmltodict
import json 
from public_config import *


if len(sys.argv) < 2:
    print 'Error debes suministrar una parada'

else:

    urlGetFindBusTest = "https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php"

    stopFindBusTest = sys.argv[1]
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

    with open('data/stop_'+str(stopFindBusTest)+'.csv', 'wb') as csvfile:
        spamwriter = csv.writer(csvfile, delimiter=',')
        cols = ['vehiculo','linea','sublinea','viaje','sentido','estado','desfase','posicion','est','nor','alt','zone','band', 'codigo', 'text']
        spamwriter.writerow(cols)

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
                #print results

                valueDict = xmltodict.parse(results)
                item = valueDict.items()[0]
                
                #ipdb.set_trace()
                data = []
                for i in item[1].items()[::1]:
                    if isinstance(i,dict):
                        for j in i.items()[::1]:
                            #print j[1]
                            data.append(j[1])
                    elif (i[0] == 'gps') | (i[0] == 'enParada'):
                        for j in i[1].items()[::1]:
                            #print j[1]
                            data.append(j[1])
                    else:
                        data.append(i[1])
                        #print i[1]
                
                while len(data) != len(cols):
                    data.append(None)
                
                spamwriter.writerow(data)
            

print "end"