
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
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonIcon,
} from '@ionic/react';

import { logInOutline } from 'ionicons/icons';
import { login, getProfile } from '../services/api';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!username.trim() || !password) {
      setError('Please enter your username and password.');
      return;
    }

    setLoading(true);

    try {
      const result = await login(
        username.trim(),
        password
      );

      if (!result.accessToken) {
        throw new Error('No access token received.');
      }

      // Verify the token using a protected endpoint.
      await getProfile(result.accessToken);

      onLogin(result.accessToken);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed. Please try again.'
      );
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
              Welcome Back
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Sign in to access your camera
              and protected data.
            </p>

            <IonItem>
              <IonInput
                label="Username"
                labelPlacement="stacked"
                placeholder="Enter username"
                value={username}
                onIonInput={(event) =>
                  setUsername(event.detail.value ?? '')
                }
              />
            </IonItem>

            <IonItem>
              <IonInput
                type="password"
                label="Password"
                labelPlacement="stacked"
                placeholder="Enter password"
                value={password}
                onIonInput={(event) =>
                  setPassword(event.detail.value ?? '')
                }
              />
            </IonItem>

            {error && (
              <IonText color="danger">
                <p role="alert">{error}</p>
              </IonText>
            )}

            <IonButton
              expand="block"
              onClick={handleLogin}
              disabled={loading}
              style={{ marginTop: '20px' }}
            >
              {loading ? (
                <IonSpinner name="crescent" />
              ) : (
                <>
                  <IonIcon
                    icon={logInOutline}
                    slot="start"
                  />
                  Sign In
                </>
              )}
            </IonButton>

            <p style={{ marginTop: '20px' }}>
              Demo credentials:
            </p>

            <IonText color="medium">
              <p>Username: emilys</p>
              <p>Password: emilyspass</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
