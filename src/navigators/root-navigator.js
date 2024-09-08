import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import { connect } from 'react-redux'
const Stack = createStackNavigator();
const RootNavigator = React.forwardRef((props, ref) => { 
  return (
    <NavigationContainer>
      <Stack.Navigator
        ref={ref}
        screenOptions={{ headerShown: false, gestureEnabled: false }}>
        {
          props.isLoggedIn ? <Stack.Screen name="App" component={AppNavigator} />
            :
            <Stack.Screen name="Auth" component={AuthNavigator} />
        } 
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const mapStateToProps = ({ app }) => {
  return {
    isLoggedIn : app.isLoggedIn, 
  }
}
export default connect(mapStateToProps, null)(RootNavigator);