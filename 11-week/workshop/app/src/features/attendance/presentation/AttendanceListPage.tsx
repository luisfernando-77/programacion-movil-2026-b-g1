
import { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

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

export default function AttendanceListPage() {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadAttendance() {
    setLoading(true);
    setError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');

      if (mode === 'error') {
        throw new Error('Simulated network error');
      }

      setRecords(mode === 'empty' ? [] : demoAttendance);
    } catch {
      setRecords([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAttendance();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Attendance History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (event) => {
            await loadAttendance();
            event.detail.complete();
          }}
        >
          <IonRefresherContent />
        </IonRefresher>

        {loading ? (
          <IonList aria-label="Loading attendance">
            {[1, 2, 3].map((item) => (
              <IonItem key={item}>
                <IonSkeletonText animated style={{ width: '80%' }} />
              </IonItem>
            ))}
          </IonList>
        ) : error ? (
          <div className="auth-container" role="alert">
            <p>Could not load attendance records.</p>
            <IonButton onClick={() => void loadAttendance()}>
              Retry
            </IonButton>
          </div>
        ) : records.length === 0 ? (
          <div className="auth-container">
            <p>No attendance records found.</p>
          </div>
        ) : (
          <IonList>
            {records.map((record) => (
              <IonItem
                key={record.id}
                button
                detail
                routerLink={`/attendance/${record.id}`}
                routerDirection="forward"
                aria-label={`View attendance details for ${record.course}`}
              >
                <IonLabel>
                  <h2>{record.course}</h2>
                  <p>{record.date} — {record.status}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
