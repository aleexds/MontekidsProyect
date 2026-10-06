import sqlite3, json, urllib.request

conn = sqlite3.connect('C:/Users/fwdel/.n8n/database.sqlite')
cursor = conn.cursor()
cursor.execute('SELECT nodes, connections FROM workflow_entity WHERE id = ?', ('DUhhS54hn4BB4Aav',))
row = cursor.fetchone()
nodes = json.loads(row[0])
connections = json.loads(row[1])

# Clean up any leftover router nodes
nodes = [n for n in nodes if n['id'] not in ['action-code-router', 'check-override-if']]

# Ensure clean connections
connections['Prepare Context Data'] = {
    'main': [
        [
            {
                'node': 'AI Agent Montekids',
                'type': 'main',
                'index': 0
            }
        ]
    ]
}

for k in ['Action Code Router', 'Check Direct Override']:
    if k in connections:
        del connections[k]

# Set respond-to-webhook responseBody
response_body_expr = '={{ JSON.stringify({ success: true, reply: $("Prepare Context Data").first().json.overrideResponse || $json.output || $json.text || $json.reply || "Operación completada.", role: $("Prepare Context Data").first().json.userRole || "profesor" }) }}'

for n in nodes:
    if n['id'] == 'respond-to-webhook':
        n['parameters']['responseBody'] = response_body_expr

cursor.execute('UPDATE workflow_entity SET nodes = ?, connections = ? WHERE id = ?', (json.dumps(nodes), json.dumps(connections), 'DUhhS54hn4BB4Aav'))
conn.commit()
print('Cleaned workflow saved to SQLite.')

# Deactivate & Activate via REST API
headers = {'X-N8N-API-KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4Y2NlOWU4OC1kYWU1LTQ0Y2YtYjVhMC1lMjUyMDEwNTcyNTciLCJpc3OiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNjk0ZGQ0YzgtNDg0Ny00MmVlLWExYjktZjEwMWZlN2Y0MGRlIiwiaWF0IjoxNzkxMjYyMTEwLCJleHAiOjE3OTM4NTQ4MDB9.zLzzzo3CWYr9wyisOjppZkr-Y0DjimijD_TSXvfukHw'}

try:
    req1 = urllib.request.Request('http://localhost:5678/api/v1/workflows/DUhhS54hn4BB4Aav/deactivate', headers=headers, method='POST')
    res1 = urllib.request.urlopen(req1)
    print('Deactivated:', res1.status)
except Exception as e:
    print('Deactivate err:', e)

try:
    req2 = urllib.request.Request('http://localhost:5678/api/v1/workflows/DUhhS54hn4BB4Aav/activate', headers=headers, method='POST')
    res2 = urllib.request.urlopen(req2)
    print('Activated:', res2.status)
except Exception as e:
    print('Activate err:', e)
