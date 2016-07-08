import sys
sys.path.insert(0, '../config/')

import requests

url = "https://rbdata.emtmadrid.es:8443/DataProvider/api/dmz/getCollection/mobilitylabs.usertest/usertest/Layers/BUSTEST.eventpos/"

#payload = "{\"keyid\": \"9224\" }"
payload = "{\"namestudio\": \"RECORRIDOLINEA26_07062016_PARADA_540\" }"


headers = {
  'content-type': "application/json",
  'cache-control': "no-cache"
}

response = requests.request("POST", url, data=payload, headers=headers, verify=False)

print(response.text)

 
