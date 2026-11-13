// Todas las peticiones de la app pasan por este único servicio.
async function solicitarAPI(ruta, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`/api${ruta}`, { ...opciones, headers: { 'Content-Type': 'application/json', ...opciones.headers } });
  } catch {
    throw new Error('No hay conexión con el servidor. Comprueba tu red o inicia el servidor.');
  }
  let resultado;
  try { resultado = await respuesta.json(); } catch { throw new Error('Respuesta no válida del servidor.'); }
  if (!respuesta.ok) throw new Error(resultado.error || `Error del servidor (${respuesta.status})`);
  return resultado.datos;
}
const API = {
  servicios: () => solicitarAPI('/servicios'),
  turnos: () => solicitarAPI('/turnos'),
  solicitarTurno: servicio => solicitarAPI('/turnos', { method: 'POST', body: JSON.stringify({ servicio }) })
};
