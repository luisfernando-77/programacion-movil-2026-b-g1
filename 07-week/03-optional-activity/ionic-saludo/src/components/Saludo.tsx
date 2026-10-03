import { IonButton } from '@ionic/react';

interface SaludoProps {
  nombre: string;
}

const Saludo: React.FC<SaludoProps> = ({ nombre }) => {
  return (
    <div>
      <h2>Hola, {nombre}</h2>
      <IonButton>Saludar</IonButton>
    </div>
  );
};

export default Saludo;