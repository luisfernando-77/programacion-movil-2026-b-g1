function formatearTurno(numero) {
  return `T-${String(numero).padStart(3, '0')}`;
}
function validarServicio(servicio, disponibles) {
  return typeof servicio === 'string' && disponibles.includes(servicio);
}
function crearTurno(id, servicio) {
  return { id, numero: formatearTurno(id), servicio, estado: 'Pendiente' };
}
module.exports = { formatearTurno, validarServicio, crearTurno };
