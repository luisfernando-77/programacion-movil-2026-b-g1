// Funciones compartidas entre la pantalla y las pruebas.
export function formatearTurno(numero) {
  if (!Number.isInteger(numero) || numero < 1) return 'Turno no válido';
  return `T-${String(numero).padStart(3, '0')}`;
}

export function contarPendientes(turnos) {
  return turnos.filter((turno) => turno.estado === 'Pendiente').length;
}
