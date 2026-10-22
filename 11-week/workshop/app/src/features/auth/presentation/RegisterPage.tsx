
import { useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLoading,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';

type UserRole = 'STUDENT' | 'TEACHER';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>();

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const nameError = name.trim().length < 3;
  const emailError =
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordError = password.length < 8;

  const valid =
    !nameError && !emailError && !passwordError && !!role;

  const hasChanges =
    name.length > 0 ||
    email.length > 0 ||
    password.length > 0 ||
    role !== undefined;

  async function handleSubmit() {
    if (!valid || loading) return;

    setLoading(true);
    setSubmitError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // This address simulates a server rejection.
      if (email.toLowerCase() === 'error@example.com') {
        throw new Error('Simulated registration service error');
      }

      setShowToast(true);
    } catch {
      setSubmitError(
        'Registration could not be completed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setRole(undefined);
    setSubmitError('');
    setShowToast(false);
  }

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
              onIonInput={(e) =>
                setName(String(e.detail.value ?? ''))
              }
            />
          </IonItem>

          {name.length > 0 && nameError && (
            <IonText color="danger">
              <p role="alert">Enter at least 3 characters.</p>
            </IonText>
          )}

          <IonItem>
            <IonInput
              label="Email"
              labelPlacement="stacked"
              type="email"
              value={email}
              autocomplete="email"
              onIonInput={(e) =>
                setEmail(String(e.detail.value ?? ''))
              }
            />
          </IonItem>

          {email.length > 0 && emailError && (
            <IonText color="danger">
              <p role="alert">Enter a valid email address.</p>
            </IonText>
          )}

          <IonItem>
            <IonInput
              label="Password"
              labelPlacement="stacked"
              type="password"
              value={password}
              autocomplete="new-password"
              onIonInput={(e) =>
                setPassword(String(e.detail.value ?? ''))
              }
            />
          </IonItem>

          {password.length > 0 && passwordError && (
            <IonText color="danger">
              <p role="alert">Use at least 8 characters.</p>
            </IonText>
          )}

          <IonText color="medium">
            <p>Role</p>
          </IonText>

          <IonRadioGroup
            value={role}
            onIonChange={(e) =>
              setRole(e.detail.value as UserRole)
            }
          >
            <IonItem>
              <IonRadio value="STUDENT">Student</IonRadio>
            </IonItem>

            <IonItem>
              <IonRadio value="TEACHER">Teacher</IonRadio>
            </IonItem>
          </IonRadioGroup>

          {submitError && (
            <IonText color="danger">
              <p role="alert">{submitError}</p>
            </IonText>
          )}

          <IonButton
            expand="block"
            className="ion-margin-top"
            disabled={!valid || loading}
            onClick={() => void handleSubmit()}
          >
            Create account
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            color="medium"
            disabled={!hasChanges || loading}
            onClick={() => setShowCancelAlert(true)}
          >
            Cancel registration
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            routerLink="/login"
          >
            Already have an account? Log in
          </IonButton>
        </div>

        <IonLoading
          isOpen={loading}
          message="Checking registration form..."
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Form validated. Demo only: no account was created."
          duration={3500}
          color="success"
        />

        <IonAlert
          isOpen={showCancelAlert}
          onDidDismiss={() => setShowCancelAlert(false)}
          header="Cancel registration?"
          message="Your entered information will be discarded."
          buttons={[
            {
              text: 'Keep editing',
              role: 'cancel',
            },
            {
              text: 'Discard',
              role: 'destructive',
              handler: clearForm,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
}
