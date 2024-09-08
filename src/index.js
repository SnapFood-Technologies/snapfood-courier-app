import React, {createRef, useEffect, useState, useRef} from 'react';
import {StatusBar} from 'react-native';
import RootNavigator from './navigators/root-navigator';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {
  LoadingSpinner,
} from '_components';
import {setProfile} from '_redux/slices/personalInfo';
import {setLoggedStatus} from '_redux/slices/appInfo';
import {generateRandom, handleErrorMsg} from '_utils';
import firestore from '@react-native-firebase/firestore';
import {API, CONSTANTS, GLOBAL, CHAT, STORAGE} from '_service';

const App = (props) => {
  const [isRemeber, setRemeber] = useState(true);
  const [spinner, setSpinner] = useState(false);
 

  const initiateChatWithAdmin = async (rider_data) => {

    let conversationId;
 
    let found_channel = await CHAT.findAdminSupportChannel(rider_data.unique_id);
    if (found_channel != null) {
      conversationId = found_channel.id; 
      console.log("found channel id", conversationId)
    }
    else {  
      let channelID = await CHAT.createAdminSupportChannel(rider_data)
      if (channelID != null) {
        conversationId = channelID;  
        console.log("create channel id", conversationId)
      }
      else {
        // handleErrorMsg('Creating of Admin Support channel went wrong!')
      }
    } 
    
    GLOBAL.conversationId = conversationId;
  };

  const getFcmToken = async () => {
    console.log('getFCMTOKEN');
    let fcmToken = await STORAGE.getData('device_token');
    console.log('fcmToken', fcmToken);
    if (fcmToken == null) {
      fcmToken = await messaging().getToken();
      console.log('fcmToken', fcmToken);
      if (fcmToken) {
        // user has a device token
        await STORAGE.storeData('device_token', fcmToken);
      }
    }
  };

  useEffect(() => {
    
    console.log(navigator);
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      console.log(authStatus);
      console.log('Enabled', enabled);
      if (enabled) {
        getFcmToken();
        console.log('Authorization status:', authStatus);
      }
    }
    requestUserPermission();
  }, []);

  useEffect(() => {
    
    const handleRememberMe = async () => {
      const remember = await STORAGE.getData('is_remember');
      console.log('useEffect', remember);
      if (remember === 'true') { 
        API.rememberMe()
          .then(async (response) => {
            console.log(response.data.message);
            const rider = response.data.rider;

            props.setProfile(rider); 
            GLOBAL.isLoggedIn = true;
            await initiateChatWithAdmin(rider); 
            setTimeout(() => { 
              props.setLoggedStatus(true);
              SplashScreen.hide();
            }, 1000); 
          })
          .catch((err) => {
            console.log('LoginScreen', err); 
            handleErrorMsg(err);
            props.setLoggedStatus(false);
            SplashScreen.hide();
          });
      }
      else {
        props.setLoggedStatus(false);
        SplashScreen.hide();
      }
    };
    handleRememberMe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <LoadingSpinner visible={spinner} />
      <RootNavigator />
    </SafeAreaProvider>
  );
};

const mapDispatchToProps= {
  setProfile, setLoggedStatus
}
export default connect(null, mapDispatchToProps)(App);