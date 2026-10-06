import sqlite3, json

conn = sqlite3.connect('C:/Users/fwdel/.n8n/database.sqlite')
cursor = conn.cursor()
cursor.execute('SELECT nodes FROM workflow_entity WHERE id = ?', ('DUhhS54hn4BB4Aav',))
row = cursor.fetchone()
nodes = json.loads(row[0])

# Make Action Code Router ALWAYS return output 0
for n in nodes:
    if n['id'] == 'action-code-router':
        n['parameters']['jsCode'] = """const item = $input.first().json;
return [[{ json: item }], []];"""

cursor.execute('UPDATE workflow_entity SET nodes = ? WHERE id = ?', (json.dumps(nodes), 'DUhhS54hn4BB4Aav'))
conn.commit()
print('Action Code Router updated to ALWAYS return output 0')
