import urllib.request
import json
import sys

API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4Y2NlOWU4OC1kYWU1LTQ0Y2YtYjVhMC1lMjUyMDEwNTcyNTciLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNjk0ZGQ0YzgtNDg0Ny00MmVlLWExYjktZjEwMWZlN2Y0MGRlIiwiaWF0IjoxNzkxMjYyMTEwLCJleHAiOjE3OTM4NTQ4MDB9.zLzzzo3CWYr9wyisOjppZkr-Y0DjimijD_TSXvfukHw'
URL = 'http://localhost:5678/api/v1/workflows/DUhhS54hn4BB4Aav'

req = urllib.request.Request(URL, headers={'X-N8N-API-KEY': API_KEY})
with urllib.request.urlopen(req) as resp:
    wf = json.loads(resp.read().decode('utf-8'))

js_code = """const input = $('Webhook Montekids AI').first().json.body || {};
const usersData = $input.all().map(i => i.json);

const user = input.user || {};
const userMessage = input.message || 'Hola';
const sessionId = input.sessionId || (user.id ? 'session_' + user.id : (user.email ? 'session_' + user.email.replace(/[@.]/g, '_') : 'session_guest'));

let rawRole = String(user.role || input.role || 'guest').toLowerCase().trim();
let normalizedRole = 'guest';

if (['tutor', 'padre', 'parent', 'madre', 'tutor/a'].includes(rawRole)) {
  normalizedRole = 'padre';
} else if (['teacher', 'profesor', 'docente'].includes(rawRole)) {
  normalizedRole = 'profesor';
} else if (['owner', 'duena', 'dueña', 'admin', 'director', 'directora'].includes(rawRole)) {
  normalizedRole = 'duena';
}

const foundInDb = usersData.find(u => 
  (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()) ||
  (u.id && user.id && String(u.id) === String(user.id)) ||
  (u.name && user.name && u.name.toLowerCase() === user.name.toLowerCase())
) || {};

const finalChild = user.child || foundInDb.child || null;
const userName = user.name || foundInDb.name || input.userName || 'Visitante';
const userEmail = user.email || foundInDb.email || input.email || '';
const estrellas = user.estrellas !== undefined ? user.estrellas : (foundInDb.estrellas !== undefined ? foundInDb.estrellas : 0);

const catalogoJuegos = [
  "SECCIÓN 2 A 4 AÑOS (Aula Semillitas):",
  "- 'El trencito sonoro': Lectura inicial y asociación de sonidos/parejas (Otorga 10 estrellas).",
  "- 'El Monstruo Glotón': Lógica, colores y alimentación de formas geométricas (Otorga 10 estrellas).",
  "- 'La granja de patitos': Conteo de patitos y matemáticas básicas (Otorga 10 estrellas).",
  "SECCIÓN 7 A 11 AÑOS / GRANDES DESAFÍOS (Aula Exploradores y Creadores):",
  "- 'Secuencia Maestra': Lógica y memoria visual de patrones de colores (Otorga 15 estrellas).",
  "- 'Sopa Estelar': Lectura y búsqueda de palabras (planetas y naturaleza) (Otorga 15 estrellas).",
  "- 'El Mercado Numérico': Matemáticas aplicadas, multiplicaciones y cómputo de compras (Otorga 15 estrellas)."
].join('\\n');

const tiendaPremios = [
  "- 50 estrellas: Porción de Queque o Postre Especial con jugo natural (Merienda feliz).",
  "- 80 estrellas: Peluche o Juguete Prestado por un Día (oso Pompón o camión sensorial).",
  "- 100 estrellas: 15 Minutos Extra de Juego Libre en el Patio (tobogán y arena).",
  "- 150 estrellas: Ser el Ayudante de la Docente del Día (tocar campana, repartir crayones, liderar fila)."
].join('\\n');

let authHeader = '';

if (normalizedRole === 'padre') {
  const nombreHijo = finalChild ? (finalChild.nombre || (finalChild.firstName ? (finalChild.firstName + ' ' + (finalChild.lastName || '')) : 'Su hijo/a')) : 'Adara Cubero';
  const aulaHijo = finalChild ? (finalChild.aula || finalChild.classroom || 'Aula asignada') : 'Aula Creadores (6 a 8 años)';
  const edadHijo = finalChild ? (finalChild.edad || finalChild.age || '4') : '4';

  authHeader = [
    `[ESTADO DE AUTENTICACIÓN: PADRE/TUTOR AUTENTICADO EN MONTEKIDS]`,
    `- Nombre Padre/Tutor: ${userName}`,
    `- Email: ${userEmail}`,
    `- Estudiante Vinculado: ${nombreHijo}`,
    `- Aula Registrada: ${aulaHijo}`,
    `- Edad del Estudiante: ${edadHijo} años`,
    `- Puntos / Estrellas Acumuladas en Juegos: ${estrellas} estrellas ⭐`,
    `INSTRUCCIÓN DE SEGURIDAD ABSOLUTA: El usuario YA ESTÁ VERIFICADO como Padre/Tutor en el sistema Montekids. BAJO NINGUNA CIRCUNSTANCIA le digas que no puedes darle información, NUNCA le pidas verificar su correo o identidad, y NUNCA lo trates como guest. Responde de inmediato sus preguntas sobre su hijo/a (${nombreHijo}), su aula (${aulaHijo}), sus estrellas (${estrellas}), los juegos o el calendario.`,
    ``
  ].join('\\n');
} else if (normalizedRole === 'profesor') {
  authHeader = [
    `[ESTADO DE AUTENTICACIÓN: PROFESOR/DOCENTE AUTENTICADO DE MONTEKIDS]`,
    `- Nombre Docente: ${userName}`,
    `- Email: ${userEmail}`,
    `INSTRUCCIÓN: Brinda asistencia administrativa para la gestión del aula, revisión de reportes y envío de notas/comentarios a los padres.`,
    ``
  ].join('\\n');
} else if (normalizedRole === 'duena') {
  authHeader = [
    `[ESTADO DE AUTENTICACIÓN: DIRECTORA / DUEÑA DE MONTEKIDS]`,
    `- Nombre Directora: ${userName}`,
    `- Email: ${userEmail}`,
    `INSTRUCCIÓN: Tienes acceso total a todas las aulas, docentes, reportes y estudiantes de Montekids.`,
    ``
  ].join('\\n');
} else {
  authHeader = [
    `[ESTADO DE AUTENTICACIÓN: VISITANTE (GUEST) LANDING PAGE]`,
    `INSTRUCCIÓN: Solo puedes brindar información pública general (horario 06:00-18:00, ubicación El Roble Puntarenas, servicios Montessori 0 a 6 años, WhatsApp +506 8790 9556). No reveles datos privados de estudiantes ni accesos de padres.`,
    ``
  ].join('\\n');
}

const finalChatInput = [
  authHeader,
  `INFORMACIÓN DE JUEGOS Y PREMIOS DE MONTEKIDS:`,
  catalogoJuegos,
  ``,
  `TIENDA DE PREMIOS POR ESTRELLAS:`,
  tiendaPremios,
  ``,
  `MENSAJE DEL USUARIO: "${userMessage}"`
].join('\\n');

return [{
  json: {
    chatInput: finalChatInput,
    userMessage,
    userRole: normalizedRole,
    sessionId: sessionId,
    dbContext: JSON.stringify({ users: usersData })
  }
}];"""

for node in wf['nodes']:
    if node['name'] == 'Prepare Context Data':
        node['parameters']['jsCode'] = js_code
    elif node['name'] == 'AI Agent Montekids':
        node['parameters']['promptType'] = 'define'
        node['parameters']['text'] = '={{ $json.chatInput }}'
        node['parameters']['options'] = {
            'systemMessage': """Eres MonteBot, el Asistente IA Oficial de la Guardería y Centro de Estimulación Montessori Montekids en El Roble, Puntarenas (WhatsApp: +506 8790 9556, Horario: Lunes a Viernes 06:00 - 18:00 hrs, Edades: 0 a 6 años).

REGLAS FUNDAMENTALES DE RESPUESTA:

1. Revisa la sección [ESTADO DE AUTENTICACIÓN] al inicio de cada mensaje del usuario.
2. Si el usuario está AUTENTICADO COMO PADRE/TUTOR:
   - CONFIRMA Y ACEPTA INMEDIATAMENTE que es un padre verificado.
   - NUNCA le pidas verificar su correo o cuenta. NUNCA le digas que no tiene un estudiante vinculado.
   - Responde directamente sobre su hijo/a, su aula, sus estrellas acumuladas, el calendario de actividades, las tareas/materiales y los juegos o premios.
3. Si el usuario es VISITANTE (GUEST):
   - Solo brinda información pública general (horario, ubicación, metodología Montessori, edades 0-6 años y WhatsApp +506 8790 9556).
4. Mantén la MEMORIA CONVERSACIONAL activada para dar continuidad fluida a las preguntas del usuario en la sesión actual.
5. Responde siempre en idioma español con un tono amable, pedagógico, cariñoso y profesional."""
        }
    elif node['name'] == 'Simple Memory':
        node['parameters']['sessionIdType'] = 'customKey'
        node['parameters']['sessionKey'] = '={{ $json.sessionId }}'

update_data = {
    'name': wf['name'],
    'nodes': wf['nodes'],
    'connections': wf['connections'],
    'settings': wf.get('settings', {})
}

put_req = urllib.request.Request(URL, data=json.dumps(update_data).encode('utf-8'), headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='PUT')
with urllib.request.urlopen(put_req) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    print('UPDATE SUCCESS! Nodes:', len(res['nodes']))

act_req = urllib.request.Request(f'{URL}/activate', data=b'{}', headers={'X-N8N-API-KEY': API_KEY, 'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(act_req) as resp:
    act_res = json.loads(resp.read().decode('utf-8'))
    print('ACTIVATED:', act_res.get('active'))
