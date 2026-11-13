# FilaFácil – Semana 13: autenticación con token y conectividad

Actividad práctica de Programación Móvil (2026-B). Proyecto sencillo con **frontend web adaptable a móvil** y **backend local Node.js**. No es APK nativo. No requiere librerías externas.

## Requisitos

- Node.js 18 o superior instalado.
- Un navegador web moderno.

## Cómo ejecutar

1. Abre una terminal en la carpeta `filafacil-token`.
2. Ejecuta `npm start`.
3. Abre **http://localhost:3000** (no abras `index.html` como archivo).
4. En la pantalla aparecen las credenciales de demostración:
   - Correo: `demo@filafacil.test`
   - Contraseña: `Demo1234!`

## Cómo comprobar la actividad

1. **Login:** pulsa **Entrar**. El backend `/api/login` responde con un token firmado y vencimiento de 15 minutos.
2. **Petición protegida:** pulsa **Consultar turnos protegidos**. `api.js` manda la cabecera `Authorization: Bearer <token>` a `/api/turnos` y presenta el listado.
3. **401:** pulsa **Probar token inválido (401)** y luego **Consultar turnos protegidos**. El backend rechaza el token y la aplicación vuelve al formulario con un mensaje claro.
4. **Sin conexión:** inicia sesión, marca **Simular falta de conexión** y pulsa **Consultar turnos protegidos**. Aparecerá un mensaje de conexión. Para una prueba de red real, puedes detener el servidor con `Ctrl+C` y volver a realizar la solicitud.
5. Guarda capturas de cada prueba en `evidencias/`.

## Estructura

- `server.js`: servidor HTTP, inicio de sesión, emisión/verificación del token y ruta protegida.
- `public/api.js`: servicio centralizado para todas las solicitudes, cabecera Authorization y tratamiento de 401 o pérdida de red.
- `public/app.js`: eventos y mensajes de interfaz.
- `public/index.html`: pantalla de inicio de sesión y turnos.
- `public/styles.css`: estilo adaptable a móviles.
- `evidencias/`: capturas reales de funcionamiento.

## Medidas y límites de seguridad

- El token solo se guarda **en memoria**, nunca en `localStorage` o en una URL. Se pierde al actualizar la página; inicia sesión de nuevo. Es una opción temporal para la práctica, no almacenamiento persistente seguro.
- Token firmado HS256 con secreto aleatorio en el servidor y expiración de 15 minutos; el servidor valida la firma y expiración antes de mostrar los turnos.
- Las credenciales están definidas en el código **solo para esta demostración local**; **no usar este sistema para producción**. Una app real necesita usuarios en base de datos, contraseñas con hash, HTTPS, controles antiabuso y almacenamiento seguro del dispositivo cuando corresponda.
- La simulación de falta de red es un control de pruebas; no demuestra desconexión real del dispositivo.

## Entrega

Guarda la carpeta en `13-week/03-optional-activity/filafacil-token/` dentro de tu fork. Luego haz commit `Entrega semana 13` y Push origin. No subas `node_modules`.
