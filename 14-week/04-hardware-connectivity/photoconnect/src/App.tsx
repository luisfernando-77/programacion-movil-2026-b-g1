
import { useState } from 'react';

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Navigate, Route } from 'react-router-dom';

import {
  cameraOutline,
  personOutline,
  logOutOutline,
} from 'ionicons/icons';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';

import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

interface AppTabsProps {
  token: string;
  onLogout: () => void;
}

const AppTabs: React.FC<AppTabsProps> = ({
  token,
  onLogout,
}) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path="camera"
          element={<Home />}
        />

        <Route
          path="profile"
          element={
            <Profile
              token={token}
              onUnauthorized={onLogout}
            />
          }
        />

        <Route
          index
          element={<Navigate to="camera" replace />}
        />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton
          tab="camera"
          href="/tabs/camera"
        >
          <IonIcon icon={cameraOutline} />
          <IonLabel>Camera</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="profile"
          href="/tabs/profile"
        >
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="logout"
          onClick={onLogout}
        >
          <IonIcon icon={logOutOutline} />
          <IonLabel>Logout</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/tabs/camera" replace />
              ) : (
                <Login onLogin={setToken} />
              )
            }
          />

          <Route
            path="/tabs/*"
            element={
              token ? (
                <AppTabs
                  token={token}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/home"
            element={
              <Navigate
                to={
                  token
                    ? '/tabs/camera'
                    : '/login'
                }
                replace
              />
            }
          />

          <Route
            path="/"
            element={
              <Navigate
                to={
                  token
                    ? '/tabs/camera'
                    : '/login'
                }
                replace
              />
            }
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
