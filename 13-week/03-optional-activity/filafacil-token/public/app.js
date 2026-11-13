import { api } from './api.js';
const $ = id => document.getElementById(id);
const estado = $('estado');
function aviso(message, kind='info') {estado.textContent=message;estado.className=`estado ${kind}`;}
function mostrarSesion(activa) {$('login').hidden=activa;$('zona').hidden=!activa;if(!activa)$('turnos').replaceChildren();}
function manejarError(error) {
  if(error.message==='SIN_RED') return aviso('Sin conexión. Comprueba tu internet o que el servidor esté encendido.','error');
  if(error.message==='NO_AUTORIZADO') {mostrarSesion(false);return aviso('Error 401: sesión inválida o vencida. Inicia sesión de nuevo.','error');}
  aviso(error.message,'error');
}
$('login').addEventListener('submit',async event=>{
  event.preventDefault();
  aviso('Iniciando sesión...');
  try {
    await api.ingresar($('correo').value,$('clave').value);
    mostrarSesion(true);
    aviso('Sesión iniciada. Token recibido del backend y guardado temporalmente en memoria.','ok');
  } catch(error) {manejarError(error);}
});
$('consultar').addEventListener('click',async ()=>{
  aviso('Consultando turnos protegidos...');
  try {
    const datos=await api.consultarTurnos();
    $('turnos').replaceChildren();
    datos.turnos.forEach(turno=>{
      const li=document.createElement('li');
      li.textContent=`${turno.id} · ${turno.servicio} · ${turno.estado}`;
      $('turnos').appendChild(li);
    });
    aviso('Consulta protegida exitosa: se envió Authorization: Bearer [token].','ok');
  } catch(error) {manejarError(error);}
});
$('invalidar').addEventListener('click',()=>{api.forzarTokenInvalido();aviso('Token de prueba invalidado. Pulsa «Consultar turnos» para comprobar el error 401.');});
$('sinred').addEventListener('change',event=>{api.setSinRed(event.target.checked);aviso(event.target.checked?'Simulación sin red activada. Intenta consultar.':'Simulación sin red desactivada.');});
$('salir').addEventListener('click',()=>{api.cerrarSesion();mostrarSesion(false);aviso('Sesión cerrada.');});
window.addEventListener('offline',()=>aviso('El dispositivo quedó sin conexión.','error'));
window.addEventListener('online',()=>aviso('Conexión restablecida.'));
mostrarSesion(false);
