import sqlite3, json

conn = sqlite3.connect('C:/Users/fwdel/.n8n/database.sqlite')
cursor = conn.cursor()
cursor.execute('SELECT nodes FROM workflow_entity WHERE id = ?', ('DUhhS54hn4BB4Aav',))
row = cursor.fetchone()
nodes = json.loads(row[0])

for n in nodes:
    if n['id'] == 'respond-to-webhook':
        n['parameters']['responseBody'] = '={{ JSON.stringify({ debug_prepare: $("Prepare Context Data").first().json, llm_output: $json }) }}'

cursor.execute('UPDATE workflow_entity SET nodes = ? WHERE id = ?', (json.dumps(nodes), 'DUhhS54hn4BB4Aav'))
conn.commit()
print('Debug responseBody saved.')
