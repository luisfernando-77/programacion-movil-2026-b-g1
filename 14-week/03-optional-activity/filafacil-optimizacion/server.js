import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const target = path.resolve(root, '.' + (url.pathname === '/' ? '/index.html' : url.pathname));
    if (!target.startsWith(root + path.sep)) {
      res.writeHead(403); return res.end('Prohibido');
    }
    const buffer = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(buffer);
  } catch { res.writeHead(404); res.end('No encontrado'); }
}).listen(3000, () => console.log('FilaFácil Semana 14: http://localhost:3000'));
