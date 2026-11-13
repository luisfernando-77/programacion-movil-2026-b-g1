// Pantalla de ejemplo. No se conecta con una API real.
const tabs = document.querySelectorAll('.pestana');
const panels = document.querySelectorAll('.panel');
const estado = document.getElementById('estado');
let temporizador;
let turnoCreado = false;

function abrirTab(nombre) {
  tabs.forEach(tab => {
    const activo = tab.dataset.tab === nombre;
    tab.classList.toggle('activa', activo);
    if (activo) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });
  panels.forEach(panel => panel.classList.toggle('oculto', panel.id !== nombre));
}

function mostrarEstado(tipo) {
  clearTimeout(temporizador);
  estado.innerHTML = '<div class="mensaje"><h3>Cargando...</h3><p>Consultando información del turno.</p></div>';
  temporizador = setTimeout(() => {
    if (tipo === 'datos') {
      estado.innerHTML = '<div class="mensaje exito"><h3>Turno confirmado</h3><p><strong>Número:</strong> A-025</p><p><strong>Personas antes de ti:</strong> 3</p><p><strong>Estado:</strong> En espera</p></div>';
    } else if (tipo === 'vacio') {
      estado.innerHTML = '<div class="mensaje"><h3>Sin turnos</h3><p>Aún no tienes turnos registrados. Puedes solicitar uno desde Inicio.</p></div>';
    } else {
      estado.innerHTML = '<div class="mensaje error" role="alert"><h3>No pudimos cargar los turnos</h3><p>Ocurrió un error de ejemplo. Intenta consultar nuevamente.</p><button id="reintentar">Reintentar</button></div>';
      document.getElementById('reintentar').addEventListener('click', () => mostrarEstado('datos'));
    }
  }, 800);
}

tabs.forEach(tab => tab.addEventListener('click', () => abrirTab(tab.dataset.tab)));
document.getElementById('solicitar').addEventListener('click', () => {
  turnoCreado = true;
  abrirTab('mis-turnos');
  mostrarEstado('datos');
});
document.getElementById('ver-datos').addEventListener('click', () => mostrarEstado('datos'));
document.getElementById('ver-vacio').addEventListener('click', () => mostrarEstado('vacio'));
document.getElementById('ver-error').addEventListener('click', () => mostrarEstado('error'));
mostrarEstado('vacio');
