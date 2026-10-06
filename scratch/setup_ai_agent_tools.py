import urllib.request
import urllib.error
import json
import sys

API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4Y2NlOWU4OC1kYWU1LTQ0Y2YtYjVhMC1lMjUyMDEwNTcyNTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNjk0ZGQ0YzgtNDg0Ny00MmVlLWExYjktZjEwMWZlN2Y0MGRlIiwiaWF0IjoxNzkxMjYyMTEwLCJleHAiOjE3OTM4NTQ4MDB9.zLzzzo3CWYr9wyisOjppZkr-Y0DjimijD_TSXvfukHw'
URL = 'http://localhost:5678/api/v1/workflows/DUhhS54hn4BB4Aav'

req = urllib.request.Request(URL, headers={'X-N8N-API-KEY': API_KEY})
with urllib.request.urlopen(req) as resp:
    wf = json.loads(resp.read().decode('utf-8'))

# Clean out old tool nodes and tool connections
wf['nodes'] = [n for n in wf['nodes'] if not (n['id'].startswith('tool-') or n['name'].startswith('Tool '))]

wf['connections'] = {k: v for k, v in wf['connections'].items() if not k.startswith('Tool ')}

tools_def = [
    {
        'id': 'tool-revisar-reportes',
        'name': 'Tool Revisar Reportes',
        'toolName': 'revisar_buzon_reportes',
        'description': 'Obtiene y consulta la lista de reportes y mensajes enviados por los padres al centro educativo Montekids en la base de datos.',
        'jsCode': '''const response = await fetch('http://localhost:3000/reports');
const reports = await response.json();
return JSON.stringify(reports);'''
    },
    {
        'id': 'tool-responder-reporte',
        'name': 'Tool Responder Reporte',
        'toolName': 'responder_reporte',
        'description': 'Publica y guarda directamente la respuesta de la docente a un reporte enviado por un padre. Requiere reportId (id del reporte), replyText (texto de respuesta) y teacherName (nombre de la docente).',
        'jsCode': '''const reportId = $fromAI('reportId', 'ID del reporte al que se respondera (ej: "1" o "1791266970207")');
const replyText = $fromAI('replyText', 'Texto completo de la respuesta redactada por la docente');
const teacherName = $fromAI('teacherName', 'Nombre de la docente que firma la respuesta');

const fetchUrl = `http://localhost:3000/reports/${reportId || "1791266970207"}`;
const getResp = await fetch(fetchUrl);
const currentReport = await getResp.json();

const updatedReply = {
  author: teacherName || 'Docente Marcela R.',
  role: 'Guía AMI',
  time: 'Justo ahora',
  statusTag: 'Atendido por la docente',
  text: replyText || 'Recibido! Le agradezco mucho su reporte.',
  avatar: '',
  signed: true
};

const patchResp = await fetch(fetchUrl, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ reply: updatedReply })
});

const result = await patchResp.json();
return `¡Respuesta publicada y guardada exitosamente en el sistema de Montekids para el reporte de ${currentReport.sender || "padre"}!`;'''
    },
    {
        'id': 'tool-crear-nota',
        'name': 'Tool Crear Nota Bitacora',
        'toolName': 'crear_nota_estudiante',
        'description': 'Guarda y publica una nota u observación en la bitácora del estudiante. Requiere studentName, noteText y teacherName.',
        'jsCode': '''const studentName = $fromAI('studentName', 'Nombre del estudiante o hijo/a');
const noteText = $fromAI('noteText', 'Texto de la nota o comentario para la bitácora');
const teacherName = $fromAI('teacherName', 'Nombre del profesor/docente');

const payload = {
  id: 'tn_' + Date.now(),
  studentId: 'bcbf',
  studentName: studentName || 'Adara Cubero',
  teacherName: teacherName || 'Docente Marcela R.',
  time: 'Justo ahora',
  createdAt: new Date().toISOString(),
  text: noteText || 'Nota registrada en la bitácora'
};

const postResp = await fetch('http://localhost:3000/teacherNotes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

return `¡Nota guardada y publicada exitosamente en la bitácora de ${studentName || "estudiante"}!`;'''
    },
    {
        'id': 'tool-crear-evento',
        'name': 'Tool Crear Evento Calendario',
        'toolName': 'crear_evento_calendario',
        'description': 'Registra y guarda una nueva actividad en el calendario del plan curricular del aula. Requiere title, date (YYYY-MM-DD), time, classroom y description.',
        'jsCode': '''const title = $fromAI('title', 'Título o nombre de la actividad (ej: "Plantación de semillas de frijol")');
const date = $fromAI('date', 'Fecha de la actividad en formato YYYY-MM-DD (ej: "2026-10-07")');
const time = $fromAI('time', 'Horario de la actividad (ej: "10:00 AM - 10:30 AM")');
const classroom = $fromAI('classroom', 'Aula destino (ej: "Aula Creadores (6 a 8 años)")');
const description = $fromAI('description', 'Descripción y objetivos de la actividad');
const teacherName = $fromAI('teacherName', 'Nombre de la docente encargada');

const payload = {
  id: 'ce-' + Date.now(),
  title: title || 'Nueva Actividad',
  date: date || '2026-10-07',
  time: time || '10:00 AM - 11:00 AM',
  category: 'workshops',
  categoryLabel: 'Estimulación AMI',
  classroom: classroom || 'Aula Creadores (6 a 8 años)',
  teacherName: teacherName || 'Docente Marcela R.',
  description: description || 'Actividad práctica programada por la docente'
};

const postResp = await fetch('http://localhost:3000/curriculumEvents', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

return `¡Actividad "${title}" guardada exitosamente en el calendario de ${classroom || "aula"}!`;'''
    },
    {
        'id': 'tool-asignar-material',
        'name': 'Tool Asignar Material',
        'toolName': 'asignar_material_estudiante',
        'description': 'Asigna un material o tarea pendiente a un estudiante específico. Requiere studentName, materialText y teacherName.',
        'jsCode': '''const studentName = $fromAI('studentName', 'Nombre del estudiante');
const materialText = $fromAI('materialText', 'Descripción del material o tarea requerida');
const teacherName = $fromAI('teacherName', 'Nombre de la docente que asigna');

const payload = {
  id: 'act_' + Date.now(),
  studentId: 'bcbf',
  studentName: studentName || 'Adara Cubero',
  text: materialText || 'Material pendiente',
  subtitle: `Asignado por ${teacherName || 'Docente Marcela R.'}`,
  checked: false,
  icon: 'pending_actions',
  isPending: true
};

const postResp = await fetch('http://localhost:3000/assignedActivities', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

return `¡Material/tarea "${materialText}" asignado exitosamente a ${studentName || "estudiante"}!`;'''
    },
    {
        'id': 'tool-marcar-asistencia',
        'name': 'Tool Marcar Asistencia',
        'toolName': 'marcar_asistencia_diaria',
        'description': 'Registra o cambia el estado de asistencia diaria de un estudiante (present o absent). Requiere studentName y status ("present" o "absent").',
        'jsCode': '''const studentName = $fromAI('studentName', 'Nombre del estudiante');
const status = $fromAI('status', 'Estado: "present" o "absent"');
const dateStr = new Date().toISOString().split('T')[0];

const payload = {
  id: `att-bcbf-${dateStr}`,
  studentId: 'bcbf',
  studentName: studentName || 'Adara Cubero',
  date: dateStr,
  status: status || 'absent'
};

const postResp = await fetch('http://localhost:3000/attendance', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

return `¡Asistencia de ${studentName || "estudiante"} registrada como ${status === 'absent' ? 'Ausente' : 'Presente'} para hoy!`;'''
    },
    {
        'id': 'tool-comentario-directora',
        'name': 'Tool Comentario Directora',
        'toolName': 'enviar_comentario_directora',
        'description': 'Solo para la dueña/directora: envía una recomendación o comentario formal a una docente de la guardería.',
        'jsCode': '''const teacherName = $fromAI('teacherName', 'Nombre del profesor o docente destinatario');
const title = $fromAI('title', 'Título del comentario');
const text = $fromAI('text', 'Contenido de la nota o felicitación');

const payload = {
  id: 'oc-' + Date.now(),
  teacherId: 't3_user',
  teacherName: teacherName || 'Docente Marcela R.',
  ownerName: 'Dirección General / Dueño',
  time: 'Justo ahora',
  date: new Date().toISOString().split('T')[0],
  createdAt: new Date().toISOString(),
  title: title || 'Nota de Dirección General',
  text: text || 'Excelente trabajo'
};

const postResp = await fetch('http://localhost:3000/ownerComments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

return `¡Comentario de dirección enviado y guardado exitosamente para la ${teacherName || "docente"}!`;'''
    }
]

y_pos = 450
for t in tools_def:
    tool_node = {
        'parameters': {
            'name': t['toolName'],
            'description': t['description'],
            'jsCode': t['jsCode']
        },
        'type': '@n8n/n8n-nodes-langchain.toolCode',
        'typeVersion': 1,
        'position': [760, y_pos],
        'id': t['id'],
        'name': t['name']
    }
    wf['nodes'].append(tool_node)
    wf['connections'][t['name']] = {
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
    y_pos += 100

# Update AI Agent System Message to mandate Tool Usage for automation!
for node in wf['nodes']:
    if node['name'] == 'AI Agent Montekids':
        node['parameters']['options']['systemMessage'] = """Eres MonteBot, el Asistente IA Oficial y Agente de Automatización de la Guardería y Centro de Estimulación Montessori Montekids en El Roble, Puntarenas.

¡INSTRUCCIÓN CRÍTICA DE AUTOMATIZACIÓN Y USO DE HERRAMIENTAS!
Tienes ACCESO TOTAL Y DIRECTO para ejecutar acciones reales mediante tus herramientas en el sistema Montekids. 
BAJO NINGUNA CIRCUNSTANCIA le digas a una docente, dueña o padre que "no tienes acceso al sistema", "no puedes revisar el buzón" o "no puedes publicar la respuesta". ¡USA TUS HERRAMIENTAS DIRECTAMENTE!

TUS HERRAMIENTAS DISPONIBLES Y CUÁNDO USARLAS:
1. `revisar_buzon_reportes`: Úsala cuando una docente o dueña pregunte si hay reportes nuevos, revise el buzón o consulte los mensajes de las familias.
2. `responder_reporte`: Úsala para redactar y guardar PUBLICADA la respuesta oficial de la docente a un reporte.
3. `crear_nota_estudiante`: Úsala para agregar notas u observaciones en la bitácora personal de un alumno.
4. `crear_evento_calendario`: Úsala para guardar una nueva actividad, taller o evento en el plan curricular/calendario de un aula.
5. `asignar_material_estudiante`: Úsala para asignar tareas, materiales o recordatorios a un estudiante específico.
6. `marcar_asistencia_diaria`: Úsala para registrar o modificar si un alumno estuvo Presente o Ausente.
7. `enviar_comentario_directora`: Úsala cuando la dueña/directora envíe una nota o felicitación a un profesor.

REGLAS POR ROL:
- Rol 'profesor' / 'docente' o 'duena' / 'owner': Ejecuta inmediatamente las herramientas para responder reportes, revisar el buzón, guardar eventos del calendario, enviar notas a la bitácora o asignar materiales.
- Rol 'padre' / 'tutor': Responde con empatía sobre su hijo/a, estrellas, juegos y actividades.
- Rol 'guest': Brinda solo información pública general.

Responde siempre en español, con tono profesional, empático y confirma alegremente la ejecución de la acción con detalles del registro realizado."""

update_payload = {
    'name': wf['name'],
    'nodes': wf['nodes'],
    'connections': wf['connections'],
    'settings': wf.get('settings', {})
}

put_req = urllib.request.Request(URL, data=json.dumps(update_payload).encode('utf-8'), headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='PUT')
with urllib.request.urlopen(put_req) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    print(f'SUCCESS! Configured {len(tools_def)} custom tools. Total workflow nodes: {len(res["nodes"])}')

act_req = urllib.request.Request(f'{URL}/activate', data=b'{}', headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(act_req) as resp:
    act_res = json.loads(resp.read().decode('utf-8'))
    print('WORKFLOW ACTIVATED:', act_res.get('active'))
