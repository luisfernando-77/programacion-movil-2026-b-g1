const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { crearTurno, validarServicio } = require('./turnos');

const PORT = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, 'public');
const servicios = ['Atención general', 'Odontología', 'Laboratorio'];
let turnos = [
  { id: 1, numero: 'T-001', servicio: 'Atención general', estado: 'Atendido' },
  { id: 2, numero: 'T-002', servicio: 'Odontología', estado: 'Pendiente' }
];
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
function enviarJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
}
function recibirJSON(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 10000) { reject(new Error('Solicitud demasiado grande')); req.destroy(); } });
    req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch { reject(new Error('JSON inválido')); } });
    req.on('error', reject);
  });
}
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) {
    if (req.method === 'GET' && url.pathname === '/api/servicios') return enviarJSON(res, 200, { datos: servicios });
    if (req.method === 'GET' && url.pathname === '/api/turnos') return enviarJSON(res, 200, { datos: turnos });
    if (req.method === 'POST' && url.pathname === '/api/turnos') {
      try {
        const body = await recibirJSON(req);
        if (!validarServicio(body.servicio, servicios)) return enviarJSON(res, 400, { error: 'Selecciona un servicio válido.' });
        const turno = crearTurno(turnos.length + 1, body.servicio);
        turnos.push(turno);
        return enviarJSON(res, 201, { datos: turno });
      } catch { return enviarJSON(res, 400, { error: 'Solicitud inválida.' }); }
    }
    return enviarJSON(res, 404, { error: 'Ruta de API no encontrada.' });
  }
  if (req.method !== 'GET') { res.writeHead(405); return res.end(); }
  const requested = url.pathname === '/' ? '/index.html' : url.pathname;
  const file = path.resolve(publicDir, '.' + requested);
  if (!file.startsWith(publicDir + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Archivo no encontrado'); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});
if (require.main === module) server.listen(PORT, () => console.log(`FilaFácil MVP: http://localhost:${PORT}`));
module.exports = { server };
