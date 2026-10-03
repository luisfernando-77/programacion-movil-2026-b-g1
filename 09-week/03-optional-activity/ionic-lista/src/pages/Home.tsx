import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [contador, setContador] = useState(0);
  const navigate = useNavigate();

  const tareas = [
    'Estudiar Programación Móvil',
    'Hacer actividad de Semana 9',
    'Revisar apuntes',
    'Practicar Ionic React',
    'Subir trabajo a GitHub',
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {tareas.map((tarea, index) => (
            <IonItem key={index}>
              <IonLabel>{tarea}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <h2>Contador: {contador}</h2>

        <IonButton onClick={() => setContador(contador + 1)}>
          Aumentar
        </IonButton>

        <IonButton onClick={() => navigate('/segunda')}>
          Ir a segunda página
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;