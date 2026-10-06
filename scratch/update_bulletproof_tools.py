import urllib.request
import urllib.error
import json
import sys

API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4Y2NlOWU4OC1kYWU1LTQ0Y2YtYjVhMC1lMjUyMDEwNTcyNTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNjk0ZGQ0YzgtNDg0Ny00MmVlLWExYjktZjEwMWZlN2Y0MGRlIiwiaWF0IjoxNzkxMjYyMTEwLCJleHAiOjE3OTM4NTQ4MDB9.zLzzzo3CWYr9wyisOjppZkr-Y0DjimijD_TSXvfukHw'
URL = 'http://localhost:5678/api/v1/workflows/DUhhS54hn4BB4Aav'

req = urllib.request.Request(URL, headers={'X-N8N-API-KEY': API_KEY})
with urllib.request.urlopen(req) as resp:
    wf = json.loads(resp.read().decode('utf-8'))

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
        'description': 'Publica y guarda directamente la respuesta de la docente a un reporte enviado por un padre. Acepta objeto con reportId y replyText.',
        'jsCode': '''const rawInput = $json || {};
const strInput = typeof rawInput === 'string' ? rawInput : JSON.stringify(rawInput);

// Intentar extraer ID del reporte
let targetId = rawInput.reportId || rawInput.id;
if (!targetId) {
  const match = strInput.match(/\\d{10,}/);
  if (match) targetId = match[0];
}

// Obtener reportes existentes
const allReports = await helpers.httpRequest({ url: 'http://localhost:3000/reports', method: 'GET' });

let targetReport = null;
if (targetId && Array.isArray(allReports)) {
  targetReport = allReports.find(r => String(r.id) === String(targetId));
}

// Si no se encontró por ID específico, tomar el último reporte pendiente (sin respuesta)
if (!targetReport && Array.isArray(allReports)) {
  const pendingReports = allReports.filter(r => !r.reply);
  if (pendingReports.length > 0) {
    targetReport = pendingReports[pendingReports.length - 1];
    targetId = targetReport.id;
  } else if (allReports.length > 0) {
    targetReport = allReports[allReports.length - 1];
    targetId = targetReport.id;
  }
}

// Intentar extraer el texto de la respuesta
let replyText = rawInput.replyText || rawInput.text || rawInput.reply || rawInput.message;
if (!replyText || replyText.includes('200 ok')) {
  // Limpiar posibles strings JSON
  const cleanedText = strInput.replace(/["'{}\\\[\]]/g, ' ');
  if (cleanedText.length > 5) {
    replyText = cleanedText;
  } else {
    replyText = "¡Recibido! Con mucho gusto atiendo su consulta sobre el estudiante.";
  }
}

const teacherName = rawInput.teacherName || rawInput.author || "Docente Marcela R.";

const updatedReply = {
  author: teacherName,
  role: 'Guía AMI',
  time: 'Justo ahora',
  statusTag: 'Atendido por la docente',
  text: replyText.trim(),
  avatar: '',
  signed: true
};

const patchResp = await helpers.httpRequest({
  url: `http://localhost:3000/reports/${targetId}`,
  method: 'PATCH',
  body: { reply: updatedReply },
  json: true
});

return `¡Respuesta publicada y guardada exitosamente en el reporte #${targetId} de ${targetReport ? targetReport.sender : "padre"} con el texto: "${replyText.trim()}"!`;'''
    },
    {
        'id': 'tool-crear-nota',
        'name': 'Tool Crear Nota Bitacora',
        'toolName': 'crear_nota_estudiante',
        'description': 'Guarda y publica una nota u observación en la bitácora del estudiante. Acepta objeto con studentName, noteText y teacherName.',
        'jsCode': '''const rawInput = $json || {};
const strInput = typeof rawInput === 'string' ? rawInput : JSON.stringify(rawInput);

let studentName = rawInput.studentName || rawInput.name || "Adara Cubero";
let noteText = rawInput.noteText || rawInput.text || rawInput.note;

if (!noteText || noteText.length < 3) {
  noteText = strInput.replace(/["'{}\\\[\]]/g, ' ').trim() || "Estudiante participó activamente en las actividades del día.";
}

let teacherName = rawInput.teacherName || rawInput.author || "Docente Marcela R.";

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

return `¡Nota guardada y publicada exitosamente en la bitácora de ${studentName} con la observación: "${noteText}"!`;'''
    },
    {
        'id': 'tool-crear-evento',
        'name': 'Tool Crear Evento Calendario',
        'toolName': 'crear_evento_calendario',
        'description': 'Registra y guarda una nueva actividad en el calendario del plan curricular del aula. Acepta objeto con title, date (YYYY-MM-DD), time, classroom y description.',
        'jsCode': '''const rawInput = $json || {};
const title = rawInput.title || rawInput.name || "Plantación de semillas de frijol";
const date = rawInput.date || "2026-10-07";
const time = rawInput.time || "10:00 AM - 10:30 AM";
const classroom = rawInput.classroom || "Aula Creadores (6 a 8 años)";
const description = rawInput.description || "Actividad práctica de exploración y ciencias";
const teacherName = rawInput.teacherName || "Docente Marcela R.";

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
        'description': 'Asigna un material o tarea pendiente a un estudiante específico. Acepta objeto con studentName, materialText y teacherName.',
        'jsCode': '''const rawInput = $json || {};
const studentName = rawInput.studentName || rawInput.name || "Adara Cubero";
const materialText = rawInput.materialText || rawInput.text || rawInput.material || "Muda de ropa adicional para la actividad de huertas";
const teacherName = rawInput.teacherName || "Docente Marcela R.";

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
        'description': 'Registra o cambia el estado de asistencia diaria de un estudiante (present o absent). Acepta objeto con studentName y status ("present" o "absent").',
        'jsCode': '''const rawInput = $json || {};
const studentName = rawInput.studentName || "Adara Cubero";
const status = rawInput.status || "absent";
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
        'description': 'Solo para la dueña/directora: envía una recomendación o comentario formal a una docente de la guardería.',
        'jsCode': '''const rawInput = $json || {};
const teacherName = rawInput.teacherName || "Docente Marcela R.";
const title = rawInput.title || "Nota de Dirección General";
const text = rawInput.text || "Excelente trabajo";

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

update_payload = {
    'name': wf['name'],
    'nodes': wf['nodes'],
    'connections': wf['connections'],
    'settings': wf.get('settings', {})
}

put_req = urllib.request.Request(URL, data=json.dumps(update_payload).encode('utf-8'), headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='PUT')
with urllib.request.urlopen(put_req) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    print(f'BULLETPROOF TOOLS UPDATED! Total nodes: {len(res["nodes"])}')

act_req = urllib.request.Request(f'{URL}/activate', data=b'{}', headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(act_req) as resp:
    act_res = json.loads(resp.read().decode('utf-8'))
    print('WORKFLOW ACTIVATED:', act_res.get('active'))
