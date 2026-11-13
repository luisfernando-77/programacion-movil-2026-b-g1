import './styles.css';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const boton = document.querySelector('#tomar-foto');
const estado = document.querySelector('#estado');
const vista = document.querySelector('#vista');
const imagen = document.querySelector('#imagen');

boton.addEventListener('click', async () => {
  boton.disabled = true;
  estado.textContent = 'Comprobando permiso de cámara...';

  try {
    // Capacitor permite consultar los permisos antes de abrir la cámara.
    let permiso = await Camera.checkPermissions();
    if (permiso.camera !== 'granted') {
      estado.textContent = 'Solicitando permiso para usar la cámara...';
      permiso = await Camera.requestPermissions({ permissions: ['camera'] });
    }

    if (permiso.camera !== 'granted') {
      estado.textContent = 'Permiso denegado. Puedes habilitar la cámara en los ajustes del dispositivo.';
      return;
    }

    estado.textContent = 'Abriendo cámara...';
    const foto = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });

    if (!foto.webPath) throw new Error('No se recibió la imagen.');
    imagen.src = foto.webPath;
    vista.hidden = false;
    estado.textContent = 'Foto tomada correctamente.';
  } catch (error) {
    const mensaje = String(error?.message ?? error).toLowerCase();
    if (mensaje.includes('cancel') || mensaje.includes('canceled')) {
      estado.textContent = 'Captura cancelada. Puedes intentar de nuevo.';
    } else if (mensaje.includes('denied') || mensaje.includes('permission') || mensaje.includes('deneg')) {
      estado.textContent = 'No se autorizó el uso de la cámara. Revisa los permisos en Ajustes.';
    } else {
      estado.textContent = Capacitor.isNativePlatform()
        ? 'No se pudo abrir la cámara. Inténtalo de nuevo.'
        : 'Para probar la cámara nativa, ejecuta la aplicación en Android con Capacitor.';
      console.error('Error de cámara:', error);
    }
  } finally {
    boton.disabled = false;
  }
});
