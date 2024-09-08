import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '_scenes';
import { API, CONSTANTS, GLOBAL, TRACKING } from '_service';
import { setCurrentOrder } from '_redux/slices/currentOrder';
import { setHomeTabNav } from 'redux/slices/appInfo';
import { EventRegister } from 'react-native-event-listeners';
import { connect } from 'react-redux';
import { CHANNEL_TYPE } from 'service/constants';

const Stack = createStackNavigator();

const HomeNavigator = (props) => {
  const { rootStackNav, homeTabNav } = props;
  useEffect(() => {

    props.setHomeTabNav(homeTabNav);

    const handleNotification = (notification) => {
      console.log('handleNotification', notification);
      switch (notification.data.type) {
        case 'chat_notification':
          if (notification.data.conversation_id) {
            let channelType = CHANNEL_TYPE.single;
            if (notification.data.conversation_id.includes('order') == true) {
              channelType = CHANNEL_TYPE.order_support;
            }
            rootStackNav.navigate('ChatMessage', {
              channelId: notification.data.conversation_id, channel: channelType
            });
          }

          break;
        case 'order_request_notification':
          homeTabNav.navigate('Requests');
          break;
        case 'poke_notification':
          console.log('poke_notification getCurrentOrders, ', notification.data.order_id)
          API.getCurrentOrders()
            .then((response) => {
              if (response.data.orders) {
                const index = response.data.orders.findIndex(o => o.id == notification.data.order_id);
                if (index != -1) {
                  console.log('poke_notification setCurrentOrder, ',)
                  props.setCurrentOrder(response.data.orders[index]);
                  rootStackNav.navigate('OrderDetail');
                }
              }
            })
            .catch((err) => {
              console.log('getCurrentOrders, ', err)
            });
          break;
        case 'friend_request_notification':
          rootStackNav.navigate('RiderDetail', {
            friend_id: notification.data.friend_id,
          });
          break;
      }
      GLOBAL.unHandledNotification = null;
    };
    
    const listener = EventRegister.addEventListener(
      CONSTANTS.NOTIFICATION_RECEIVED,
      (notification) => {
        handleNotification(notification);
      },
    );
    if (GLOBAL.unHandledNotification) {
      console.log('unhandled 1')
      setTimeout(() => {
        console.log('unhandled 2')
        handleNotification(GLOBAL.unHandledNotification);
      }, 2000)
    }
    return () => EventRegister.removeEventListener(listener);
  }, [rootStackNav, homeTabNav]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return { user: state.personalInfo };
};
const mapDispatchToProps = { setCurrentOrder, setHomeTabNav };
export default connect(mapStateToProps, mapDispatchToProps)(HomeNavigator);
