import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ForgotPasswordScreen, LoginScreen} from '_scenes';
import {API, CONSTANTS, GLOBAL, STORAGE} from '_service';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
