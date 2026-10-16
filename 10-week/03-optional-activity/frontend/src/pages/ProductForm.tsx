import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/products";

export function ProductForm() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!nombre.trim() || !precio || Number(precio) <= 0) {
      setError("Completa los campos correctamente");
      return;
    }

    try {
      setError("");

      await createProduct(nombre, Number(precio));

      navigate("/productos");
    } catch {
      setError("Error al crear el producto");
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuevo producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">
            Nombre
          </IonLabel>

          <IonInput
            value={nombre}
            onIonInput={(e) =>
              setNombre(e.detail.value ?? "")
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            Precio
          </IonLabel>

          <IonInput
            type="number"
            value={precio}
            onIonInput={(e) =>
              setPrecio(e.detail.value ?? "")
            }
          />
        </IonItem>

        {error && <p>{error}</p>}

        <IonButton
          expand="block"
          onClick={handleSubmit}
        >
          Guardar
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          routerLink="/productos"
        >
          Volver
        </IonButton>
      </IonContent>
    </IonPage>
  );
}