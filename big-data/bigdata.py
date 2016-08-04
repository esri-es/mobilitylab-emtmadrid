import sys
sys.path.insert(0, '../config/')

import httplib
import requests

url= "https://rbdata.emtmadrid.es:8443/DataProvider/api/dmz/getCollection/mobilitylabs.usertest/usertest/Layers/BUSTEST.eventpos/"
query= "{ \"keyid\": \"9224\" }"

headers = {
  'content-type': "application/json",
  'cache-control': "no-cache"
}

response = requests.request("POST", url, data=query, headers=headers, verify=False)

print(response.text)

 
