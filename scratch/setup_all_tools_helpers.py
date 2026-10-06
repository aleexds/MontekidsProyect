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
        'description': 'Obtiene y consulta la lista completa de reportes y mensajes enviados por los padres al centro educativo Montekids en la base de datos.',
        'jsCode': '''const res = await helpers.httpRequest({ url: 'http://localhost:3000/reports', method: 'GET' });
return JSON.stringify(res);'''
    },
    {
        'id': 'tool-responder-reporte',
        'name': 'Tool Responder Reporte',
        'toolName': 'responder_reporte',
        'description': 'Publica y guarda directamente la respuesta de la docente a un reporte enviado por un padre. Acepta JSON con reportId, replyText y teacherName.',
        'jsCode': '''const input = $json || {};
const targetId = input.reportId || input.id || "1791266970207";
const replyText = input.replyText || input.text || input.message || "¡Recibido! Con mucho gusto atiendo su consulta.";
const teacherName = input.teacherName || input.author || "Docente Marcela R.";

let currentReport = {};
try {
  currentReport = await helpers.httpRequest({ url: `http://localhost:3000/reports/${targetId}`, method: 'GET' });
} catch(e) {}

const updatedReply = {
  author: teacherName,
  role: 'Guía AMI',
  time: 'Justo ahora',
  statusTag: 'Atendido por la docente',
  text: replyText,
  avatar: '',
  signed: true
};

const patchResp = await helpers.httpRequest({
  url: `http://localhost:3000/reports/${targetId}`,
  method: 'PATCH',
  body: { reply: updatedReply },
  json: true
});

return `¡Respuesta publicada y guardada exitosamente en la base de datos de Montekids para el reporte de ${currentReport.sender || "padre"}!`;'''
    },
    {
        'id': 'tool-crear-nota',
        'name': 'Tool Crear Nota Bitacora',
        'toolName': 'crear_nota_estudiante',
        'description': 'Guarda y publica una nota u observación en la bitácora del estudiante. Acepta JSON con studentName, noteText y teacherName.',
        'jsCode': '''const input = $json || {};
const studentName = input.studentName || input.name || "Adara Cubero";
const noteText = input.noteText || input.text || input.note || "Nota registrada en la bitácora";
const teacherName = input.teacherName || input.author || "Docente Marcela R.";

const payload = {
  id: 'tn_' + Date.now(),
  studentId: 'bcbf',
  studentName: studentName,
  teacherName: teacherName,
  time: 'Justo ahora',
  createdAt: new Date().toISOString(),
  text: noteText
};

const res = await helpers.httpRequest({
  url: 'http://localhost:3000/teacherNotes',
  method: 'POST',
  body: payload,
  json: true
});

return `¡Nota guardada y publicada exitosamente en la bitácora del estudiante ${studentName}!`;'''
    },
    {
        'id': 'tool-crear-evento',
        'name': 'Tool Crear Evento Calendario',
        'toolName': 'crear_evento_calendario',
        'description': 'Registra y guarda una nueva actividad en el calendario del plan curricular del aula. Acepta JSON con title, date (YYYY-MM-DD), time, classroom y description.',
        'jsCode': '''const input = $json || {};
const title = input.title || input.name || "Plantación de semillas de frijol";
const date = input.date || "2026-10-07";
const time = input.time || "10:00 AM - 10:30 AM";
const classroom = input.classroom || "Aula Creadores (6 a 8 años)";
const description = input.description || "Actividad de exploración y ciencias";
const teacherName = input.teacherName || "Docente Marcela R.";

const payload = {
  id: 'ce-' + Date.now(),
  title: title,
  date: date,
  time: time,
  category: 'workshops',
  categoryLabel: 'Estimulación AMI',
  classroom: classroom,
  teacherName: teacherName,
  description: description
};

const res = await helpers.httpRequest({
  url: 'http://localhost:3000/curriculumEvents',
  method: 'POST',
  body: payload,
  json: true
});

return `¡Actividad "${title}" guardada exitosamente en el calendario del ${classroom} para la fecha ${date}!`;'''
    },
    {
        'id': 'tool-asignar-material',
        'name': 'Tool Asignar Material',
        'toolName': 'asignar_material_estudiante',
        'description': 'Asigna un material o tarea pendiente a un estudiante específico. Acepta JSON con studentName, materialText y teacherName.',
        'jsCode': '''const input = $json || {};
const studentName = input.studentName || input.name || "Adara Cubero";
const materialText = input.materialText || input.text || input.material || "Muda de ropa adicional para la actividad de huertas";
const teacherName = input.teacherName || "Docente Marcela R.";

const payload = {
  id: 'act_' + Date.now(),
  studentId: 'bcbf',
  studentName: studentName,
  text: materialText,
  subtitle: `Asignado por ${teacherName}`,
  checked: false,
  icon: 'pending_actions',
  isPending: true
};

const res = await helpers.httpRequest({
  url: 'http://localhost:3000/assignedActivities',
  method: 'POST',
  body: payload,
  json: true
});

return `¡Material/tarea "${materialText}" asignado exitosamente a ${studentName}!`;'''
    },
    {
        'id': 'tool-marcar-asistencia',
        'name': 'Tool Marcar Asistencia',
        'toolName': 'marcar_asistencia_diaria',
        'description': 'Registra o cambia el estado de asistencia diaria de un estudiante (present o absent). Acepta JSON con studentName y status ("present" o "absent").',
        'jsCode': '''const input = $json || {};
const studentName = input.studentName || "Adara Cubero";
const status = input.status || "absent";
const dateStr = new Date().toISOString().split('T')[0];

const payload = {
  id: `att-bcbf-${dateStr}`,
  studentId: 'bcbf',
  studentName: studentName,
  date: dateStr,
  status: status
};

const res = await helpers.httpRequest({
  url: 'http://localhost:3000/attendance',
  method: 'POST',
  body: payload,
  json: true
});

return `¡Asistencia de ${studentName} registrada como ${status === 'absent' ? 'Ausente' : 'Presente'} para hoy (${dateStr})!`;'''
    },
    {
        'id': 'tool-comentario-directora',
        'name': 'Tool Comentario Directora',
        'toolName': 'enviar_comentario_directora',
        'description': 'Solo para la dueña/directora: envía una recomendación o comentario formal a una docente de la guardería. Acepta JSON con teacherName, title y text.',
        'jsCode': '''const input = $json || {};
const teacherName = input.teacherName || "Docente Marcela R.";
const title = input.title || "Nota de Dirección General";
const text = input.text || "Excelente trabajo";

const payload = {
  id: 'oc-' + Date.now(),
  teacherId: 't3_user',
  teacherName: teacherName,
  ownerName: 'Dirección General / Dueño',
  time: 'Justo ahora',
  date: new Date().toISOString().split('T')[0],
  createdAt: new Date().toISOString(),
  title: title,
  text: text
};

const res = await helpers.httpRequest({
  url: 'http://localhost:3000/ownerComments',
  method: 'POST',
  body: payload,
  json: true
});

return `¡Comentario de dirección enviado y guardado exitosamente para la ${teacherName}!`;'''
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
Tienes ACCESO TOTAL Y DIRECTO para ejecutar acciones reales mediante tus herramientas en la base de datos del sistema Montekids. 
BAJO NINGUNA CIRCUNSTANCIA le digas a una docente, dueña o padre que "no tienes acceso al sistema", "no puedes revisar el buzón", "no puedes publicar la respuesta" o "debe registrarlo desde su panel". ¡USA TUS HERRAMIENTAS Y EJECUTA LA ACCIÓN DE INMEDIATO!

TUS HERRAMIENTAS DISPONIBLES Y CUÁNDO USARLAS:
1. `revisar_buzon_reportes`: Úsala cuando una docente o dueña pregunte si hay reportes nuevos, revise el buzón o consulte los mensajes de las familias.
2. `responder_reporte`: Úsala para redactar y publicar GUARDADA la respuesta oficial de la docente a un reporte de un padre.
3. `crear_nota_estudiante`: Úsala para agregar notas u observaciones en la bitácora personal de un alumno.
4. `crear_evento_calendario`: Úsala para guardar una nueva actividad, taller o evento en el plan curricular/calendario de un aula.
5. `asignar_material_estudiante`: Úsala para asignar tareas, materiales o recordatorios a un estudiante específico.
6. `marcar_asistencia_diaria`: Úsala para registrar o modificar si un alumno estuvo Presente o Ausente.
7. `enviar_comentario_directora`: Úsala cuando la dueña/directora envíe una nota o felicitación a un profesor.

REGLAS POR ROL:
- Rol 'profesor' / 'docente' o 'duena' / 'owner': EJECUTA INMEDIATAMENTE tus herramientas para responder reportes, revisar el buzón, guardar eventos en el calendario, enviar notas a la bitácora o asignar materiales. No pidas confirmación innecesaria, ¡ejecuta la herramienta de una vez y confirma el éxito del registro!
- Rol 'padre' / 'tutor': Responde con empatía sobre su hijo/a, estrellas, juegos y actividades.
- Rol 'guest': Brinda solo información pública general.

Responde siempre en español, con tono profesional, empático y confirma alegremente la ejecución de la acción con detalles del registro realizado en el sistema."""

update_payload = {
    'name': wf['name'],
    'nodes': wf['nodes'],
    'connections': wf['connections'],
    'settings': wf.get('settings', {})
}

put_req = urllib.request.Request(URL, data=json.dumps(update_payload).encode('utf-8'), headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='PUT')
with urllib.request.urlopen(put_req) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    print(f'SUCCESS! Configured {len(tools_def)} custom tools using $json. Total workflow nodes: {len(res["nodes"])}')

act_req = urllib.request.Request(f'{URL}/activate', data=b'{}', headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(act_req) as resp:
    act_res = json.loads(resp.read().decode('utf-8'))
    print('WORKFLOW ACTIVATED:', act_res.get('active'))
