const $ = selector => document.querySelector(selector);
const CLAVE = 'filafacil-ultimo-turno-v1';
function mensaje(elemento, texto, tipo = 'info') { elemento.textContent = texto; elemento.className = `mensaje ${tipo}`; }
function presentarUltimo() {
  try {
    const dato = JSON.parse(localStorage.getItem(CLAVE) || 'null');
    $('#ultimo-turno').textContent = dato ? `${dato.numero} · ${dato.servicio} (${dato.estado})` : 'Todavía no hay turnos guardados.';
  } catch { $('#ultimo-turno').textContent = 'No se pudo leer el turno local.'; }
}
function cambiarTab(tab) {
  document.querySelectorAll('[data-tab]').forEach(b => { const activa = b.dataset.tab === tab; b.classList.toggle('active', activa); if (activa) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  document.querySelectorAll('.vista').forEach(v => v.classList.toggle('oculto', v.id !== tab));
  if (tab === 'turnos') cargarTurnos();
}
async function cargarServicios() {
  const select = $('#servicio'); select.disabled = true; $('#pedir').disabled = true;
  mensaje($('#mensaje-inicio'), 'Cargando servicios…');
  try {
    const servicios = await API.servicios();
    select.replaceChildren(new Option('Selecciona un servicio', ''));
    servicios.forEach(s => select.add(new Option(s, s)));
    select.disabled = false; $('#pedir').disabled = false;
    mensaje($('#mensaje-inicio'), 'Servicios disponibles. Ya puedes solicitar tu turno.', 'exito');
  } catch (err) { mensaje($('#mensaje-inicio'), `${err.message} Recarga la página para reintentar.`, 'error'); }
}
async function cargarTurnos() {
  mensaje($('#mensaje-turnos'), 'Cargando turnos…'); $('#lista').replaceChildren();
  try {
    const turnos = await API.turnos();
    if (!turnos.length) return mensaje($('#mensaje-turnos'), 'No hay turnos registrados.');
    mensaje($('#mensaje-turnos'), `Se encontraron ${turnos.length} turnos.`, 'exito');
    turnos.forEach(t => {
      const li = document.createElement('li'); li.className = 'turno';
      const nombre = document.createElement('strong'); nombre.textContent = t.numero;
      const detalle = document.createElement('span'); detalle.textContent = `${t.servicio} · ${t.estado}`;
      li.append(nombre, detalle); $('#lista').append(li);
    });
  } catch (err) { mensaje($('#mensaje-turnos'), err.message, 'error'); }
}
document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => cambiarTab(b.dataset.tab)));
$('#pedir').addEventListener('click', async () => {
  const servicio = $('#servicio').value;
  if (!servicio) return mensaje($('#mensaje-inicio'), 'Selecciona un servicio antes de continuar.', 'error');
  $('#pedir').disabled = true; mensaje($('#mensaje-inicio'), 'Guardando turno en el servidor…');
  try {
    const turno = await API.solicitarTurno(servicio);
    try { localStorage.setItem(CLAVE, JSON.stringify(turno)); } catch { /* el turno sigue creado en la API */ }
    presentarUltimo(); mensaje($('#mensaje-inicio'), `Turno creado correctamente: ${turno.numero}`, 'exito');
  } catch (err) { mensaje($('#mensaje-inicio'), err.message, 'error'); }
  finally { $('#pedir').disabled = false; }
});
$('#actualizar').addEventListener('click', cargarTurnos);
$('#limpiar').addEventListener('click', () => { try { localStorage.removeItem(CLAVE); } catch {} presentarUltimo(); });
presentarUltimo(); cargarServicios();
