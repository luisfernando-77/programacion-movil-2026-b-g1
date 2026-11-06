
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
  IonSpinner,
  IonText,
  IonIcon,
} from '@ionic/react';

import {
  refreshOutline,
  personOutline,
  warningOutline,
} from 'ionicons/icons';

import {
  getProfile,
  ApiError,
  type AuthUser,
} from '../services/api';

interface ProfileProps {
  token: string;
  onUnauthorized: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  token,
  onUnauthorized,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    setLoading(true);
    setError('');
    setUser(null);

    try {
      const data = await getProfile(token);
      setUser(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Session expired. Please log in again.');
        onUnauthorized();
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Protected Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={personOutline} /> My Profile
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              This section retrieves protected user
              information using an authentication token.
            </p>

            <IonButton
              expand="block"
              onClick={loadProfile}
              disabled={loading}
            >
              <IonIcon
                icon={refreshOutline}
                slot="start"
              />
              Load Protected Data
            </IonButton>

            {loading && (
              <div className="ion-text-center ion-padding">
                <IonSpinner name="crescent" />
                <p>Loading profile...</p>
              </div>
            )}

            {user && !loading && (
              <IonCard color="light">
                <IonCardHeader>
                  <IonCardTitle>
                    User Information
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <p><strong>ID:</strong> {user.id}</p>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Name:</strong> {user.firstName}{' '}
                    {user.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </IonCardContent>
              </IonCard>
            )}

            {error && (
              <IonText color="danger">
                <p role="alert">
                  <IonIcon icon={warningOutline} /> {error}
                </p>
              </IonText>
            )}

            {!loading && !user && !error && (
              <IonText color="medium">
                <p>
                  Press the button to retrieve
                  your protected profile.
                </p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
