
import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

type Profile = {
  name: string;
  email: string;
  role: 'STUDENT' | 'TEACHER';
};

const ProfilePage: React.FC = () => {
  const [profile] = useState<Profile | null>(null);
  const [loading] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Attendance Control</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="auth-container">
          <h1>My profile</h1>

          {loading ? (
            <IonSpinner name="crescent" />
          ) : profile ? (
            <>
              <IonItem>
                <IonLabel>
                  <h2>Name</h2>
                  <p>{profile.name}</p>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>
                  <h2>Email</h2>
                  <p>{profile.email}</p>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>
                  <h2>Role</h2>
                  <p>
                    {profile.role === 'STUDENT'
                      ? 'Student'
                      : 'Teacher'}
                  </p>
                </IonLabel>
              </IonItem>
            </>
          ) : (
            <IonText color="medium">
              <p>
                Profile information is not available.
                Sign in to view your account.
              </p>
            </IonText>
          )}

          <IonButton
            expand="block"
            fill="outline"
            routerLink="/login"
            className="ion-margin-top"
          >
            Back to login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
