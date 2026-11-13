import { formatearTurno, contarPendientes } from './utils.js';
const servicios = ['Atención general', 'Odontología', 'Laboratorio', 'Vacunación', 'Consulta externa'];
const turnos = Array.from({ length: 650 }, (_, i) => ({
  numero: i + 1,
  servicio: servicios[i % servicios.length],
  estado: i % 4 === 0 ? 'Atendido' : 'Pendiente'
}));
const turnosIndexados = turnos.map(t => ({ ...t, textoBusqueda: t.servicio.toLocaleLowerCase('es') }));
const $ = id => document.getElementById(id);
let modo = 'optimizado';
let limite = 25;

function crearElemento(turno) {
  const li = document.createElement('li');
  const izquierda = document.createElement('span');
  const nombre = document.createElement('strong');
  nombre.textContent = formatearTurno(turno.numero);
  const servicio = document.createElement('small');
  servicio.textContent = turno.servicio;
  izquierda.append(nombre, servicio);
  const estado = document.createElement('span');
  estado.className = 'estado';
  estado.textContent = turno.estado;
  li.append(izquierda, estado);
  return li;
}
function filtrarAntes(consulta) {
  return turnos.filter(t => t.servicio.toLocaleLowerCase('es').includes(consulta));
}
function filtrarDespues(consulta) {
  return turnosIndexados.filter(t => t.textoBusqueda.includes(consulta));
}
function pintarAntes(destino, encontrados) {
  destino.replaceChildren();
  // Versión inicial: coloca todos los elementos por separado.
  for (const turno of encontrados) destino.append(crearElemento(turno));
  return encontrados.length;
}
function pintarDespues(destino, encontrados, cantidad = 25) {
  // Mejora: solo muestra la primera página y hace una sola inserción.
  const fragmento = document.createDocumentFragment();
  for (const turno of encontrados.slice(0, cantidad)) fragmento.append(crearElemento(turno));
  destino.replaceChildren(fragmento);
  return Math.min(cantidad, encontrados.length);
}
function actualizar() {
  const consulta = $('busqueda').value.trim().toLocaleLowerCase('es');
  const encontrados = modo === 'original' ? filtrarAntes(consulta) : filtrarDespues(consulta);
  const n = modo === 'original' ? pintarAntes($('lista'), encontrados) : pintarDespues($('lista'), encontrados, limite);
  $('resumen').textContent = `${encontrados.length} coincidencias · ${contarPendientes(encontrados)} pendientes`;
  $('descripcion').textContent = modo === 'original'
    ? 'Antes: renderiza todos los turnos coincidentes en cada búsqueda.'
    : 'Después: precalcula textos de búsqueda, utiliza un fragmento y muestra 25 turnos por página.';
  $('mas').hidden = modo === 'original' || n >= encontrados.length;
  $('original').classList.toggle('active', modo === 'original');
  $('optimizado').classList.toggle('active', modo === 'optimizado');
}
$('original').onclick = () => { modo = 'original'; actualizar(); };
$('optimizado').onclick = () => { modo = 'optimizado'; limite = 25; actualizar(); };
$('busqueda').oninput = () => { limite = 25; actualizar(); };
$('mas').onclick = () => { limite += 25; actualizar(); };

function benchmark(accion, repeticiones = 7) {
  const tiempos = [];
  for (let i = 0; i < repeticiones; i++) {
    const inicio = performance.now();
    accion();
    tiempos.push(performance.now() - inicio);
  }
  return tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
}
$('medir').onclick = () => {
  const consulta = $('busqueda').value.trim().toLocaleLowerCase('es');
  const escenario = document.createElement('ul');
  escenario.className = 'turnos';
  escenario.style.cssText = 'position:absolute;left:-10000px;top:0;width:500px';
  document.body.append(escenario);
  // Misma búsqueda y datos. Antes se dibujan todos; después se dibuja la primera página.
  const antes = benchmark(() => pintarAntes(escenario, filtrarAntes(consulta)));
  const despues = benchmark(() => pintarDespues(escenario, filtrarDespues(consulta)));
  escenario.remove();
  const porcentaje = antes > 0 ? ((antes - despues) / antes * 100) : 0;
  $('resultados').textContent = `Antes: ${antes.toFixed(2)} ms (lista completa)\nDespués: ${despues.toFixed(2)} ms (primeros 25)\nCambio: ${porcentaje.toFixed(1)}% menos tiempo${porcentaje < 0 ? ' (esta medición fue más lenta)' : ''}\nPromedio de 7 ejecuciones. Los resultados cambian según el equipo.`;
  actualizar();
};
actualizar();
