import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  EarningSummaryScreen,
  OrderSummaryScreen,
  RequestSummaryScreen,
} from '_scenes';
import HomeNavigator from './home-navigator';
import ProfileNavigator from './profile-navigator';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  ToastAndroid,
} from 'react-native';
import { API, CONSTANTS, GLOBAL, TRACKING, LOCATION, STORAGE, Alerts } from '_service';
import Geolocation from 'react-native-geolocation-service';
import { TabIcon } from '_atoms';
import { Spacing, Typography } from '_styles';
import TouchableScale from 'react-native-touchable-scale';
import { setLocation } from '_redux/slices/locationInfo';
import { connect } from 'react-redux';
import { PUSH_NOTI } from '_service';

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  tabContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: Spacing.SCALE_24,
    // position: 'absolute',
    // bottom: 0,
    shadowOpacity: 0.07,
    shadowRadius: 2.62,
    elevation: 4,
    shadowColor: '#656D74',
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },
  tab_btn: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = async () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name == 'Requests') {
              try {
                let hasPermission = await LOCATION.checkLocationPermission();
                if (hasPermission) {
                  navigation.navigate(route.name);
                }
                else {
                  let answered = await STORAGE.getData(STORAGE.KEYS.LOCATION_PERM_ANSWERED);
                  if (answered == true) {
                    LOCATION.showAlertSetting();
                  }
                  else {
                    navigation.navigate('LocationPermissionScreen');
                  }
                }
              }
              catch (error) {
                LOCATION.showAlertSetting();
              }
            }
            else {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableScale
            activeScale={0.6}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={1}
            style={styles.tab_btn}
            key={route.name}>
            <TabIcon index={route.name} focused={isFocused} />
            <Text
              style={
                isFocused
                  ? Typography.POPPINS_SEMIBOLD_LIGHTBLACK_10
                  : Typography.POPPINS_REGULAR_GRAY_600_10
              }>
              {label}
            </Text>
          </TouchableScale>
        );
      })}
    </View>
  );
}
const TabNavigator = (props) => {
  useEffect(() => {
    const getLocationUpdates = async () => {
      const permission = await LOCATION.checkLocationPermission();

      if (!permission) {
        return;
      }

      PUSH_NOTI.showLocalNotification({
        title: 'SnapFood Courier', message: 'Tracking location updates', body: 'Tracking location updates', data: {}
      });
      //watch ID 

      GLOBAL.watchID = Geolocation.watchPosition(
        (position) => {
          console.log('location Update');

          props.setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: null,
          });

          API.getLocation({
            latlng: `${position.coords.latitude},${position.coords.longitude}`,
          })
            .then((response) => {
              props.setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                address: response.data.results[0].formatted_address,
              });

              console.log('getLocation ', response.data.results[0].formatted_address);
            })
            .catch((error) => {
              console.log('getLocation ', error);
            });
          API.updateLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
            .then((response) => {
              TRACKING.updateLocation(props.user.unique_id, position.coords.latitude, position.coords.longitude);
            })
            .catch((err) => {
              console.log('updateLocation err ', err.response.data);
            });
        },
        (error) => {
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 30000,
          fastestInterval: 2000,
          forceRequestLocation: true,
          showLocationDialog: true,
          useSignificantChanges: true,
        },
      );
    };
    getLocationUpdates();
  }, [props.isLocationPermited]);

  return (
    <Tab.Navigator tabBar={(prop) => <MyTabBar {...prop} />}>
      <Tab.Screen
        name={"Home"}
        children={(_props) => <HomeNavigator rootStackNav={props.navigation} homeTabNav={_props.navigation} {..._props} />}
      />
      <Tab.Screen name="Requests" component={RequestSummaryScreen} />
      <Tab.Screen name="Orders" component={OrderSummaryScreen} />
      <Tab.Screen name="Earnings" component={EarningSummaryScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  return { user: state.personalInfo, isLocationPermited : state.locationInfo.isLocationPermited };
};
const mapDispatchToProps = { setLocation };
export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
