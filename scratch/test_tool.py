import urllib.request
import urllib.error
import json

API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4Y2NlOWU4OC1kYWU1LTQ0Y2YtYjVhMC1lMjUyMDEwNTcyNTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNjk0ZGQ0YzgtNDg0Ny00MmVlLWExYjktZjEwMWZlN2Y0MGRlIiwiaWF0IjoxNzkxMjYyMTEwLCJleHAiOjE3OTM4NTQ4MDB9.zLzzzo3CWYr9wyisOjppZkr-Y0DjimijD_TSXvfukHw'
URL = 'http://localhost:5678/api/v1/workflows/DUhhS54hn4BB4Aav'

req = urllib.request.Request(URL, headers={'X-N8N-API-KEY': API_KEY})
with urllib.request.urlopen(req) as resp:
    wf = json.loads(resp.read().decode('utf-8'))

# Clean out any previous test tools
wf['nodes'] = [n for n in wf['nodes'] if not n['id'].startswith('tool-')]
wf['connections'] = {k: v for k, v in wf['connections'].items() if not k.startswith('Tool ')}

test_tool = {
    'parameters': {
        'name': 'revisar_buzon_reportes',
        'description': 'Consulta los reportes y mensajes enviados por los padres al centro educativo Montekids.',
        'jsCode': 'const res = await fetch("http://localhost:3000/reports"); return JSON.stringify(await res.json());'
    },
    'type': '@n8n/n8n-nodes-langchain.toolCode',
    'typeVersion': 1,
    'position': [760, 480],
    'id': 'tool-revisar-reportes',
    'name': 'Tool Revisar Reportes'
}

wf['nodes'].append(test_tool)
wf['connections']['Tool Revisar Reportes'] = {
    'ai_tool': [
        [
            {
                'node': 'AI Agent Montekids',
                'type': 'ai_tool',
                'index': 0
            }
        ]
    ]
}

update_payload = {
    'name': wf['name'],
    'nodes': wf['nodes'],
    'connections': wf['connections'],
    'settings': wf.get('settings', {})
}

put_req = urllib.request.Request(URL, data=json.dumps(update_payload).encode('utf-8'), headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='PUT')
try:
    with urllib.request.urlopen(put_req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        print('SUCCESS adding @n8n/n8n-nodes-langchain.toolCode! Total nodes:', len(res['nodes']))
except urllib.error.HTTPError as e:
    print('HTTP ERROR:', e.code)
    print('RESPONSE BODY:', e.read().decode('utf-8'))
