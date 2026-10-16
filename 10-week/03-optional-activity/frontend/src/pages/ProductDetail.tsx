import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../services/products";
import type { Product } from "../services/products";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProduct(id ?? "");

        setProduct(data);
      } catch {
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle del producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <IonSpinner />}

        {error && <p>{error}</p>}

        {product && (
          <>
            <h2>{product.nombre}</h2>
            <p>ID: {product.id}</p>
            <p>Precio: ${product.precio}</p>
          </>
        )}

        <IonButton routerLink="/productos">
          Volver
        </IonButton>
      </IonContent>
    </IonPage>
  );
}