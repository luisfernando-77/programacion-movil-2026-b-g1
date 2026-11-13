import test from 'node:test';
import assert from 'node:assert/strict';
import { formatearTurno, contarPendientes } from '../src/utils.js';

test('formatearTurno añade ceros al número', () => {
  assert.equal(formatearTurno(7), 'T-007');
  assert.equal(formatearTurno(125), 'T-125');
});

test('contarPendientes cuenta solo los turnos pendientes', () => {
  const turnos = [
    { estado: 'Pendiente' },
    { estado: 'Atendido' },
    { estado: 'Pendiente' }
  ];
  assert.equal(contarPendientes(turnos), 2);
});
