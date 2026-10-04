import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      setError('');

      const response = await fetch('http://localhost:3000/api/tasks');

      if (!response.ok) {
        throw new Error('Error loading tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch {
      setError('Could not connect to the API');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      setError('');

      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description
        })
      });

      if (!response.ok) {
        throw new Error('Error creating task');
      }

      setTitle('');
      setDescription('');

      await loadTasks();
    } catch {
      setError('Could not create the task');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Title"
            labelPlacement="stacked"
            value={title}
            onIonInput={(e) => setTitle(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonTextarea
            label="Description"
            labelPlacement="stacked"
            value={description}
            onIonInput={(e) => setDescription(e.detail.value ?? '')}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={createTask}
        >
          Create Task
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList>
          {tasks.map((task) => (
            <IonItem
              key={task.id}
              button
              onClick={() => navigate(`/task/${task.id}`)}
            >
              <IonLabel>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;