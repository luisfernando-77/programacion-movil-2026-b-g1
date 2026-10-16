import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import { Navigate, Route } from "react-router-dom";

import { ProductList } from "./pages/ProductList";
import { ProductForm } from "./pages/ProductForm";
import { ProductDetail } from "./pages/ProductDetail";

import "@ionic/react/css/core.css";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/productos"
            element={<ProductList />}
          />

          <Route
            path="/nuevo"
            element={<ProductForm />}
          />

          <Route
            path="/productos/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/"
            element={
              <Navigate
                to="/productos"
                replace
              />
            }
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;