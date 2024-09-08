import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '_scenes';
const Stack = createStackNavigator();
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="Menu" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export default ProfileNavigator;
