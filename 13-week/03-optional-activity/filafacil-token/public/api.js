// Servicio centralizado: TODAS las peticiones a la API pasan por aquí.
const API_BASE = '/api';
let token = null; // En memoria: no se expone en localStorage ni en la URL.
let simularSinRed = false;

export const api = {
  setSinRed(value) { simularSinRed = value; },
  cerrarSesion() { token = null; },
  forzarTokenInvalido() { token = 'token-de-prueba-invalido'; },
  haySesion() { return Boolean(token); },
  async request(route, options = {}) {
    if (simularSinRed || !navigator.onLine) throw new Error('SIN_RED');
    const headers = {'Content-Type':'application/json', ...options.headers};
    if (token) headers.Authorization = `Bearer ${token}`;
    let response;
    try { response = await fetch(`${API_BASE}${route}`, {...options, headers, cache:'no-store'}); }
    catch { throw new Error('SIN_RED'); }
    const data = await response.json().catch(()=>({}));
    if (response.status === 401) {
      token = null;
      throw new Error('NO_AUTORIZADO');
    }
    if (!response.ok) throw new Error(data.message || 'Error al consultar el servidor.');
    return data;
  },
  async ingresar(email, password) {
    const data = await this.request('/login',{method:'POST',body:JSON.stringify({email,password})});
    token = data.token;
    return data;
  },
  async consultarTurnos() { return this.request('/turnos'); }
};
