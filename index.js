/**
 * @format
 */
import React, {useEffect, useRef} from 'react';
import {AppRegistry, AppState} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store, persistor} from '_redux/store.js';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import { PUSH_NOTI } from '_service';
import messaging from '@react-native-firebase/messaging';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import Geolocation from 'react-native-geolocation-service';


PUSH_NOTI.setupPush();
console.disableYellowBox = true;
const RNRedux = () => { 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
