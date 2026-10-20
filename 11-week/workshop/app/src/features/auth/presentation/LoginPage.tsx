
import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Attendance Control</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="auth-container">
          <h1>Log in</h1>
          <p>Access your attendance account.</p>

          <IonItem>
            <IonInput
              label="Email"
              labelPlacement="stacked"
              type="email"
              autocomplete="email"
              value={email}
              onIonInput={(event) =>
                setEmail(String(event.detail.value ?? ''))
              }
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Password"
              labelPlacement="stacked"
              type="password"
              autocomplete="current-password"
              value={password}
              onIonInput={(event) =>
                setPassword(String(event.detail.value ?? ''))
              }
            />
          </IonItem>

          <IonButton
            expand="block"
            className="ion-margin-top"
            disabled={!email.trim() || !password}
          >
            Log in
          </IonButton>

          <IonText color="medium">
            <p>New to Attendance?</p>
          </IonText>

          <IonButton
            expand="block"
            fill="outline"
            routerLink="/register"
          >
            Create account
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
