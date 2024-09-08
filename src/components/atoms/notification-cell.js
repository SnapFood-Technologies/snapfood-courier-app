import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Globals, Spacing, Typography } from '_styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.SCALE_10,
    shadowColor: '#888',
    shadowOffset: {
      width: Spacing.SCALE_4,
      height: Spacing.SCALE_4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.84,
    elevation: 1,
    backgroundColor: 'white',
    padding: Spacing.SCALE_12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.SCALE_12,
  },
  icon_container: {
    alignItems: 'center',
    borderRadius: Spacing.SCALE_24,
    width: Spacing.SCALE_48,
    height: Spacing.SCALE_48,
    justifyContent: 'center',
    marginRight: Spacing.SCALE_16,
  },
  time: {
    fontSize: 10,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: '#aaa',
    textAlign: 'right',
  }
});
const NotificationCell = (props) => {
  const { type, message, seen, friend_id, created_at, navigation } = props;

  const bkg_color = type === 1 ? '#FF0060' : type === 2 ? '#5663FF' : '#00EDD2';
  const icon =
    type === 1 ? 'people-alt' : type === 2 ? 'delivery-dining' : 'message';

  const getTime = () => {
    let diff_days = moment(created_at, 'YYYY-MM-DD HH:mm:ss').diff(moment(new Date()), 'days');
    if (diff_days == 0) {
      return moment(created_at, 'YYYY-MM-DD HH:mm:ss').format('LT')
    }
    return moment(created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
  }

  const onPressItem=()=>{
    if (type === 1 && friend_id != null) { // friend request
      navigation.navigate('RiderDetail', {friend_id: friend_id})
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <View style={{ ...styles.icon_container, backgroundColor: bkg_color }}>
        <Icon name={icon} size={Spacing.SCALE_32} color="white" />
      </View>
      <View style={Globals.flex_1}>
        <Text
          style={styles.time}>
          {getTime()}
        </Text>
        <Text
          style={[
            seen
              ? Typography.MONSERRAT_MEDIUM_MEDIUMGRAY_13
              : Typography.MONSERRAT_BOLD_MEDIUMGRAY_13,
            {flex: 1,}
          ]}>
          {message}
        </Text>
      </View> 
    </TouchableOpacity>
  );
};
export default NotificationCell;
