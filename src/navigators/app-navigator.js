import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './tab-navigator';
import {
  PersonalInfoScreen,
  EditInfoScreen,
  ChangePasswordScreen,
  ViewReviewScreen,
  AvgRatingScreen,
  RiderFriendScreen,
  RiderDetailScreen,
  ChatScreen,
  MessagesScreen,
  NotificationScreen,
  BankAccountScreen,
  MyWalletScreen,
  SearchRiderScreen,
  OrderDetailScreen,
  CommentScreen,
  FullmapScreen,
  CourierAvailability,
  CourierRequirements,
  DrivingHours,
  RequestDetailScreen,
  AddBankScreen,
  LocationPermissionScreen
} from '_scenes';
const Stack = createStackNavigator();
const AppNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="EditInfo" component={EditInfoScreen} />
      <Stack.Screen name="BankAccount" component={BankAccountScreen} />
      <Stack.Screen name="MyWallet" component={MyWalletScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ViewReview" component={ViewReviewScreen} />
      <Stack.Screen name="AvgRating" component={AvgRatingScreen} />
      <Stack.Screen name="RiderFriend" component={RiderFriendScreen} />
      <Stack.Screen name="RiderDetail" component={RiderDetailScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatMessage" component={MessagesScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="SearchRider" component={SearchRiderScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="RequestDetail" component={RequestDetailScreen} />
      <Stack.Screen name="Comments" component={CommentScreen} />
      <Stack.Screen name="FullMap" component={FullmapScreen} />
      <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} />
      <Stack.Screen
        name="CourierAvailability"
        component={CourierAvailability}
      />
      <Stack.Screen
        name="CourierRequirements"
        component={CourierRequirements}
      />
      <Stack.Screen name="DrivingHours" component={DrivingHours} /> 
      <Stack.Screen name="AddBankScreen" component={AddBankScreen} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
