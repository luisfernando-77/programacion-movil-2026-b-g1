import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import type { Product } from "../services/products";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton routerLink="/nuevo" expand="block">
          Crear producto
        </IonButton>

        {loading && <IonSpinner />}

        {error && <p>{error}</p>}

        {!loading &&
          products.map((product) => (
            <IonCard key={product.id}>
              <IonCardHeader>
                <IonCardTitle>{product.nombre}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <p>Precio: ${product.precio}</p>

                <IonButton routerLink={`/productos/${product.id}`}>
                  Ver detalle
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
}