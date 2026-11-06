
import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
} from '@ionic/react';

import { cameraOutline, refreshOutline } from 'ionicons/icons';

import { Capacitor } from '@capacitor/core';

import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';

const Home: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const takePhoto = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Check native camera permissions.
      if (Capacitor.isNativePlatform()) {
        const permissions = await Camera.checkPermissions();

        if (permissions.camera === 'denied') {
          setError(
            'Camera access denied. Enable camera permission in device settings.'
          );
          return;
        }

        if (permissions.camera !== 'granted') {
          const requested = await Camera.requestPermissions({
            permissions: ['camera'],
          });

          if (requested.camera !== 'granted') {
            setError('Camera permission was not granted.');
            return;
          }
        }
      }

      // Open the camera or web camera interface.
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (!image.webPath) {
        throw new Error('No image was returned.');
      }

      setPhoto(image.webPath);
      setMessage('Photo captured successfully!');
    } catch (err) {
      const details =
        err instanceof Error ? err.message : String(err);

      if (/cancel/i.test(details)) {
        setMessage('Photo capture cancelled.');
      } else {
        setError(`Camera error: ${details}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>PhotoConnect</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Camera & Connectivity
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Welcome to PhotoConnect!
              Capture photos using Capacitor Camera.
            </p>

            <p>
              This application handles camera permissions
              and displays captured photos.
            </p>

            <IonButton
              expand="block"
              onClick={takePhoto}
              disabled={loading}
              style={{ marginTop: '20px' }}
            >
              <IonIcon
                icon={cameraOutline}
                slot="start"
              />
              Take Photo
            </IonButton>

            {loading && (
              <div className="ion-text-center ion-padding">
                <IonSpinner name="crescent" />
                <p>Opening camera...</p>
              </div>
            )}

            {message && (
              <IonText color="success">
                <p role="status">{message}</p>
              </IonText>
            )}

            {error && (
              <IonText color="danger">
                <p role="alert">{error}</p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>

        {photo && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                Your Photo
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <img
                src={photo}
                alt="Captured photo"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                }}
              />

              <IonButton
                expand="block"
                fill="outline"
                onClick={takePhoto}
                disabled={loading}
                style={{ marginTop: '16px' }}
              >
                <IonIcon
                  icon={refreshOutline}
                  slot="start"
                />
                Take Another Photo
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
