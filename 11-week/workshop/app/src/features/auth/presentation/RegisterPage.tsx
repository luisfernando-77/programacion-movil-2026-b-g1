
import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

type UserRole = 'STUDENT' | 'TEACHER';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole | undefined>();

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit =
    name.trim().length > 0 &&
    validEmail &&
    password.length > 0 &&
    role !== undefined;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Attendance Control</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="auth-container">
          <h1>Create account</h1>
          <p>Register as a student or teacher.</p>

          <IonItem>
            <IonInput
              label="Name"
              labelPlacement="stacked"
              value={name}
              autocomplete="name"
              onIonInput={(event) =>
                setName(String(event.detail.value ?? ''))
              }
            />
          </IonItem>

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
              autocomplete="new-password"
              value={password}
              onIonInput={(event) =>
                setPassword(String(event.detail.value ?? ''))
              }
            />
          </IonItem>

          <IonText color="medium">
            <p>Role</p>
          </IonText>

          <IonRadioGroup
            value={role}
            onIonChange={(event) =>
              setRole(event.detail.value as UserRole)
            }
          >
            <IonItem>
              <IonRadio value="STUDENT">
                Student
              </IonRadio>
            </IonItem>

            <IonItem>
              <IonRadio value="TEACHER">
                Teacher
              </IonRadio>
            </IonItem>
          </IonRadioGroup>

          <IonButton
            expand="block"
            className="ion-margin-top"
            disabled={!canSubmit}
          >
            Create account
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            routerLink="/login"
          >
            Already have an account? Log in
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
