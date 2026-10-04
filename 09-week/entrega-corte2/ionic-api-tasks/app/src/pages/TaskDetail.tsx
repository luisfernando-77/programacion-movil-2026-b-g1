import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
}

const TaskDetail: React.FC = () => {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      try {
        setError('');

        const response = await fetch(`http://localhost:3000/api/tasks/${id}`);

        if (!response.ok) {
          throw new Error('Task not found');
        }

        const data = await response.json();
        setTask(data);
      } catch {
        setError('Could not load the task');
      }
    };

    loadTask();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>

          <IonTitle>Task Detail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {task && (
          <>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>ID: {task.id}</p>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TaskDetail;