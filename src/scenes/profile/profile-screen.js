import React, {useState} from 'react';
import {View, Text, FlatList, Image, Alert} from 'react-native';
import {Globals} from '_styles';
import { connect } from 'react-redux';
import {ListItem} from 'react-native-elements';
import {ProfileStyles as styles} from './profile-styles';
import TouchableScale from 'react-native-touchable-scale';
import {
  PERSONAL_ICON,
  COURIER_REQUIREMENTS_ICON,
  COURIER_AVAILABILITY_ICON,
  COURIER_DRIVING_HOURS_ICON,
  BANK_ICON,
  WALLET_ICON,
  RIDER_ICON,
  PASSWORD_ICON,
  REVIEW_ICON,
  ADMIN_ICON,
  LOGOUT_ICON,
} from '_assets/images';
import {API, GLOBAL, STORAGE} from '_service';
import {conversationId} from 'service/global';
import {setLoggedStatus} from '_redux/slices/appInfo';
import {CONSTANTS} from '_service';
import Toast from 'react-native-toast-message';
import {LoadingSpinner} from '_components';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import { CHANNEL_TYPE } from 'service/constants';

const ProfileScreen = (props) => {
  const {navigation} = props;
  const list = [
    {
      image: PERSONAL_ICON,
      title: CONSTANTS.MENU_PERSONAL,
      route: 'EditInfo',
    },
    {
      image: COURIER_REQUIREMENTS_ICON,
      title: CONSTANTS.COURIER_REQUIREMENT,
      route: 'CourierRequirements',
    },
    {
      image: COURIER_AVAILABILITY_ICON,
      title: CONSTANTS.COURIER_AVAILABILITY,
      route: 'CourierAvailability',
    },
    {
      image: COURIER_DRIVING_HOURS_ICON,
      title: CONSTANTS.DRIVING_HOURS,
      route: 'DrivingHours',
    },
    {
      image: BANK_ICON,
      title: CONSTANTS.MENU_BANK,
      route: 'BankAccount',
    },
    {
      image: WALLET_ICON,
      title: CONSTANTS.MENU_WALLET,
      route: 'MyWallet',
    },
    {
      image: RIDER_ICON,
      title: CONSTANTS.MENU_SEARCH,
      route: 'RiderFriend',
    },
    {
      image: BANK_ICON,
      title: CONSTANTS.MENU_TEX_INFO,
      route: 'TexInfoScreen',
    },
    {
      image: PASSWORD_ICON,
      title: CONSTANTS.MENU_PASSWORD,
      route: 'ChangePassword',
    },
    {
      image: REVIEW_ICON,
      title: CONSTANTS.MENU_REVIEWS,
      route: 'ViewReview',
    },
    {
      image: ADMIN_ICON,
      title: CONSTANTS.MENU_ADMIN,
      route: 'ChatMessage',
    },
    {
      image: LOGOUT_ICON,
      title: CONSTANTS.MENU_LOGOUT,
      route: 'Auth',
    },
  ];
  const keyExtractor = (item, index) => index.toString();
  const [spinner, setSpinner] = useState(false);
  const onClkListItem = (item) => {
    console.log(item.title);
    if (item.title == CONSTANTS.MENU_LOGOUT) {
      // Works on both Android and iOS
      Alert.alert(CONSTANTS.APP_NAME, CONSTANTS.LOGOUT_CONFIRM, [
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            setSpinner(true);
            API.logout()
              .then(async (response) => {
                const removeStorageData = async () => {
                  await STORAGE.removeData('api_token');
                  await STORAGE.removeData('is_remember');
                };

                const removeLocationUpdates = () => {
                  if (GLOBAL.watchID !== null) {
                    VIForegroundService.stopService().catch((err) => err);
                    Geolocation.clearWatch(GLOBAL.watchID);
                    GLOBAL.watchID = null;
                  }
                };
                removeLocationUpdates();
                await removeStorageData();
                setSpinner(false);
                GLOBAL.conversationId = null;
                GLOBAL.isLoggedIn = false;
                props.setLoggedStatus(false);
                Toast.show({
                  type: 'success',
                  text1: CONSTANTS.APP_NAME,
                  text2: response.data.message,
                });
              })
              .catch((err) => {
                setSpinner(false);
                let message = CONSTANTS.SOMETHING_WRONG;
                if (err.response) {
                  message = err.response.data.message;
                }
                Toast.show({
                  type: 'error',
                  text1: CONSTANTS.APP_NAME,
                  text2: message,
                });
              });
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ]);
    } 
    else if (item.title == CONSTANTS.MENU_ADMIN) {
      navigation.navigate('ChatMessage', { channelId: conversationId, channel : CHANNEL_TYPE.admin_support })
    }
    else {
      navigation.push(item.route);
    }
  };
  const renderItem = ({item}) => {
    return (
      <ListItem
        bottomDivider
        containerStyle={styles.list}
        Component={TouchableScale}
        onPress={() => onClkListItem(item)}>
        <Image source={item.image} style={styles.list_image} />
        <ListItem.Content style={styles.list_content}>
          <ListItem.Title style={styles.list_content_title}>
            {item.title}
          </ListItem.Title>
        </ListItem.Content>

        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <View style={Globals.flex_1}>
      <LoadingSpinner visible={spinner} />
      <View style={Globals.header}>
        <View style={Globals.flex_1}>
          <Text style={Globals.hearder_title}>Profile</Text>
        </View>
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={Globals.flex_1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}; 

const mapStateToProps = (state) => {
  return {user: state.personalInfo };
};
const mapDispatchToProps= {
  setLoggedStatus
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);