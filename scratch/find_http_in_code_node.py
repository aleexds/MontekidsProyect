import urllib.request
import urllib.error
import json

API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4Y2NlOWU4OC1kYWU1LTQ0Y2YtYjVhMC1lMjUyMDEwNTcyNTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNjk0ZGQ0YzgtNDg0Ny00MmVlLWExYjktZjEwMWZlN2Y0MGRlIiwiaWF0IjoxNzkxMjYyMTEwLCJleHAiOjE3OTM4NTQ4MDB9.zLzzzo3CWYr9wyisOjppZkr-Y0DjimijD_TSXvfukHw'
URL = 'http://localhost:5678/api/v1/workflows/DUhhS54hn4BB4Aav'

req = urllib.request.Request(URL, headers={'X-N8N-API-KEY': API_KEY})
with urllib.request.urlopen(req) as resp:
    wf = json.loads(resp.read().decode('utf-8'))

# Test exploring available globals in toolCode
explore_code = '''try {
  const keys = Object.keys(globalThis);
  const hasHelpers = typeof helpers !== 'undefined';
  const hasThisHelpers = typeof this !== 'undefined' && typeof this.helpers !== 'undefined';
  const hasFetch = typeof fetch !== 'undefined';

  if (hasHelpers) {
    const res = await helpers.httpRequest({ url: 'http://localhost:3000/reports', method: 'GET' });
    return JSON.stringify(res);
  } else if (hasThisHelpers) {
    const res = await this.helpers.httpRequest({ url: 'http://localhost:3000/reports', method: 'GET' });
    return JSON.stringify(res);
  } else if (hasFetch) {
    const res = await fetch('http://localhost:3000/reports');
    return JSON.stringify(await res.json());
  } else {
    return "GLOBALS: " + keys.join(", ");
  }
} catch(e) {
  return "ERR: " + e.message + " | " + e.stack;
}'''

for node in wf['nodes']:
    if node['id'] == 'tool-revisar-reportes':
        node['type'] = '@n8n/n8n-nodes-langchain.toolCode'
        node['parameters']['jsCode'] = explore_code

update_payload = {
    'name': wf['name'],
    'nodes': wf['nodes'],
    'connections': wf['connections'],
    'settings': wf.get('settings', {})
}

put_req = urllib.request.Request(URL, data=json.dumps(update_payload).encode('utf-8'), headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='PUT')
with urllib.request.urlopen(put_req) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    print('UPDATED TOOL FOR EXPLORATION!')

act_req = urllib.request.Request(f'{URL}/activate', data=b'{}', headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(act_req) as resp:
    act_res = json.loads(resp.read().decode('utf-8'))
    print('ACTIVATED STATUS:', act_res.get('active'))
