
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import LoginPage from '../features/auth/presentation/LoginPage';
import RegisterPage from '../features/auth/presentation/RegisterPage';
import ProfilePage from '../features/auth/presentation/ProfilePage';
import AttendanceListPage from '../features/attendance/presentation/AttendanceListPage';

setupIonicReact();

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route
            exact
            path="/attendance"
            component={AttendanceListPage}
          />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
