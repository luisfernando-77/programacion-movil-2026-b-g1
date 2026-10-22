
import { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';

type Attendance = {
  id: number;
  course: string;
  date: string;
  status: string;
};

const demoAttendance: Attendance[] = [
  { id: 1, course: 'Programming', date: '2026-10-19', status: 'Present' },
  { id: 2, course: 'Databases', date: '2026-10-18', status: 'Present' },
];

export default function AttendanceDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [record, setRecord] = useState<Attendance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadDetail() {
    setLoading(true);
    setError(false);
    setRecord(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const params = new URLSearchParams(window.location.search);

      if (params.get('mode') === 'error') {
        throw new Error('Simulated service error');
      }

      const found = demoAttendance.find(
        (item) => item.id === Number(id)
      );

      setRecord(found ?? null);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDetail();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/attendance"
              text="Back"
            />
          </IonButtons>

          <IonTitle>Attendance Detail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {loading ? (
          <IonList aria-label="Loading attendance detail">
            {[1, 2, 3].map((item) => (
              <IonItem key={item}>
                <IonSkeletonText
                  animated
                  style={{ width: '75%' }}
                />
              </IonItem>
            ))}
          </IonList>
        ) : error ? (
          <div className="auth-container" role="alert">
            <p>Could not load attendance details.</p>

            <IonButton onClick={() => void loadDetail()}>
              Retry
            </IonButton>
          </div>
        ) : !record ? (
          <div className="auth-container">
            <h2>Attendance not found</h2>
            <p>No attendance record exists with ID {id}.</p>

            <IonButton routerLink="/attendance">
              Back to history
            </IonButton>
          </div>
        ) : (
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>Course</h2>
                <p>{record.course}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2>Date</h2>
                <p>{record.date}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2>Attendance status</h2>
                <p>{record.status}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2>Record ID</h2>
                <p>{record.id}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
