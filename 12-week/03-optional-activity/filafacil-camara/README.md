# Semana 12 · FilaFácil - Integración de cámara con Capacitor

## Descripción
Para esta actividad de Programación Móvil se agregó una pantalla de cámara al proyecto FilaFácil. El usuario puede solicitar permiso para acceder a la cámara, tomar una foto y visualizarla en la aplicación. También se muestra un mensaje si el permiso es rechazado o se cancela la captura.

## Tecnologías
- HTML y CSS para la interfaz.
- JavaScript para el comportamiento.
- Vite para preparar los archivos web.
- Capacitor y `@capacitor/camera` para acceder a la cámara nativa.

## Ejecutar en Android (prueba real)
Requisitos: Node.js y Android Studio instalados; celular Android con depuración USB activada, o un dispositivo conectado y configurado en Android Studio.

Desde esta carpeta, en una terminal:

```bash
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

En Android Studio selecciona tu celular conectado y presiona Run (▶). `npx cap add android` solo se usa la primera vez; para cambios futuros basta con `npm run build` y `npx cap sync android`.

**Importante:** abrir `index.html` directamente no ejecuta este proyecto, porque utiliza imports de npm y Vite. `npm run dev` sirve para revisar la interfaz en navegador, pero la evaluación del plugin nativo debe hacerse en Android.

## Pruebas de cámara y permisos
1. Abrir la aplicación instalada en el celular.
2. Pulsar **Tomar foto** y permitir acceso a la cámara.
3. Tomar una foto y verificar que se muestre en pantalla.
4. Para probar permiso denegado, quitar el permiso de cámara desde los Ajustes de Android (o reinstalar si hace falta) y volver a intentar.
5. Comprobar que aparezca el mensaje que indica que no se autorizó el acceso.

La aplicación no envía fotos a un servidor. La foto se muestra en la pantalla actual.

## Evidencias pendientes
Agregar capturas auténticas dentro de `evidencias/`:
- `1-permiso-camara.png`
- `2-foto-tomada.png`
- `3-permiso-denegado.png`

**Estado:** código preparado; prueba en dispositivo real y capturas pendientes de realizar.

## Criterios cubiertos
- Plugin nativo de cámara: `@capacitor/camera`.
- Solicitud y comprobación de permisos: `Camera.checkPermissions()` y `Camera.requestPermissions()`.
- Manejo de rechazo, cancelación y errores.
- Documentación para prueba en Android.

## Entrega
Guardar la carpeta en `12-week/03-optional-activity/filafacil-camara` de tu fork. Después subir los cambios con el mensaje `Entrega semana 12`.
