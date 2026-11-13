const test = require('node:test');
const assert = require('node:assert/strict');
const { formatearTurno, validarServicio, crearTurno } = require('../turnos');
test('formatea el número de turno', () => assert.equal(formatearTurno(7), 'T-007'));
test('rechaza servicios que no existen', () => assert.equal(validarServicio('Inventado', ['Laboratorio']), false));
test('crea un turno pendiente', () => assert.deepEqual(crearTurno(3, 'Laboratorio'), { id: 3, numero: 'T-003', servicio: 'Laboratorio', estado: 'Pendiente' }));
