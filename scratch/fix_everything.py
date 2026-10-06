import sqlite3, json

conn = sqlite3.connect('C:/Users/fwdel/.n8n/database.sqlite')
cursor = conn.cursor()
cursor.execute('SELECT nodes FROM workflow_entity WHERE id = ?', ('DUhhS54hn4BB4Aav',))
row = cursor.fetchone()
nodes = json.loads(row[0])

if_parameters = {
    "conditions": {
        "options": {
            "caseSensitive": True,
            "leftValue": "",
            "typeValidation": "strict"
        },
        "conditions": [
            {
                "id": "cond_direct",
                "leftValue": "={{ $json.isDirectReply }}",
                "rightValue": True,
                "operator": {
                    "type": "boolean",
                    "operation": "true"
                }
            }
        ],
        "combinator": "and"
    }
}

for n in nodes:
    if n['id'] == 'check-intent-if':
        n['parameters'] = if_parameters

cursor.execute('UPDATE workflow_entity SET nodes = ? WHERE id = ?', (json.dumps(nodes), 'DUhhS54hn4BB4Aav'))
conn.commit()
print('n8n-nodes-base.if node parameters updated with valid v2 boolean operator in SQLite!')
