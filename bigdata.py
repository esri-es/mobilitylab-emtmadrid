import httplib
import requests

url="http://rbdata.emtmadrid.es:8443/DataProvider/api/dmz/getCollection/test/@EMT123/Layers/SENPM25MAD.eventpos/"
query= { "idStation": "28079038", "$and": [ { "value": { "$gt": "00025" } } ] }

headers = {
  'content-type': "application/json",
  'cache-control': "no-cache"
}
headers = {
  'content-type': "application/json",
  'cache-control': "no-cache"
}
response = requests.request("POST", url, data=query, headers=headers)

print(response.text)