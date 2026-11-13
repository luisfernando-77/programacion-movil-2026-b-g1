// Backend de práctica para Semana 13. SOLO demostración local.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const PORT = Number(process.env.PORT || 3000);
const SECRET = crypto.randomBytes(32); // se renueva al reiniciar el servidor
const DEMO_EMAIL = 'demo@filafacil.test';
const DEMO_PASSWORD = 'Demo1234!';
const PUBLIC = path.join(__dirname, 'public');
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const json = (res, status, body) => {res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(body));};
const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
const signature = (data) => crypto.createHmac('sha256', SECRET).update(data).digest('base64url');

function issueToken(email) {
  const payload = {sub: email, iss:'filafacil-local', exp:Math.floor(Date.now()/1000)+15*60};
  const data = `${b64url({alg:'HS256',typ:'JWT'})}.${b64url(payload)}`;
  return `${data}.${signature(data)}`;
}
function verifyToken(raw) {
  if (!raw || raw.length > 2048) return null;
  const parts=raw.split('.');
  if (parts.length!==3) return null;
  const [header,payload,provided]=parts;
  const data=`${header}.${payload}`;
  const expected=signature(data);
  if (provided.length!==expected.length || !crypto.timingSafeEqual(Buffer.from(provided),Buffer.from(expected))) return null;
  try {
    const h=JSON.parse(Buffer.from(header,'base64url').toString('utf8'));
    const p=JSON.parse(Buffer.from(payload,'base64url').toString('utf8'));
    if(h.alg!=='HS256'||h.typ!=='JWT'||p.iss!=='filafacil-local'||p.sub!==DEMO_EMAIL||!Number.isInteger(p.exp)||p.exp<=Date.now()/1000) return null;
    return p;
  } catch {return null;}
}
const safeEqual=(a,b)=>{const x=crypto.createHash('sha256').update(String(a)).digest();const y=crypto.createHash('sha256').update(String(b)).digest();return crypto.timingSafeEqual(x,y);};
const server=http.createServer((req,res)=>{
  if(req.url==='/api/login' && req.method==='POST') {
    let text='';
    req.on('data',chunk=>{text+=chunk;if(text.length>4096)req.destroy();});
    req.on('end',()=>{
      try {
        const {email,password}=JSON.parse(text);
        if(!safeEqual(email,DEMO_EMAIL)||!safeEqual(password,DEMO_PASSWORD))return json(res,401,{message:'Correo o contraseña incorrectos.'});
        return json(res,200,{token:issueToken(DEMO_EMAIL),expiresInSeconds:900});
      } catch {return json(res,400,{message:'Datos de inicio de sesión incorrectos.'});}
    });
    return;
  }
  if(req.url==='/api/turnos' && req.method==='GET') {
    const auth=req.headers.authorization || '';
    const user=verifyToken(auth.startsWith('Bearer ')?auth.slice(7):'');
    if(!user)return json(res,401,{message:'Sesión vencida o token inválido.'});
    return json(res,200,{usuario:user.sub,turnos:[{id:'A-017',servicio:'Atención general',estado:'En espera'},{id:'B-004',servicio:'Orientación',estado:'Confirmado'}]});
  }
  if (req.url?.startsWith('/api/')) return json(res,404,{message:'Ruta no encontrada'});
  if(req.method!=='GET'&&req.method!=='HEAD') return json(res,405,{message:'Método no permitido'});
  const pathname=req.url==='/'?'/index.html':(req.url||'').split('?')[0];
  const allowed=new Set(['/index.html','/styles.css','/api.js','/app.js']);
  if(!allowed.has(pathname))return json(res,404,{message:'Archivo no encontrado'});
  const file=path.join(PUBLIC,pathname.slice(1));
  fs.readFile(file,(err,bytes)=>{
    if(err)return json(res,404,{message:'Archivo no encontrado'});
    res.writeHead(200,{'Content-Type':MIME[path.extname(file)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:bytes);
  });
});
server.listen(PORT,'127.0.0.1',()=>console.log(`FilaFácil: http://localhost:${PORT}`));
