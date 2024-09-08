import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors, Spacing, Typography } from '_styles';
import FastImage from 'react-native-fast-image';
import { Divider } from 'react-native-elements';
import { CONSTANTS } from '_service';
import Config from 'react-native-config';
import moment from 'moment-timezone';
import { DashDivider } from '_atoms';

const styles = StyleSheet.create({
  container: { 
    padding: Spacing.SCALE_8,
    backgroundColor: 'white',
    marginVertical: 5, 
    borderRadius: Spacing.SCALE_8,
    marginHorizontal: Spacing.SCALE_16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  inner_container: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  divider: {
    height: 1,
    backgroundColor: Colors.GRAY_100,
    marginVertical: Spacing.SCALE_8,
  },
  avatar: {
    width: Spacing.SCALE_48,
    height: Spacing.SCALE_48,
    borderRadius: Spacing.SCALE_4,
    borderWidth: 1,
    borderColor: Colors.GRAY_200,
    marginRight: Spacing.SCALE_12,
  },
  time: {
    ...Typography.MONSERRAT_MEDIUM_LIGHTGRAY_11,
    position: 'absolute',
    right: Spacing.SCALE_8, 
  },
  price : {
    fontSize: 14, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.PRIMARY,
  },
  address :{
    fontSize: 12, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: Colors.GRAY_600,
  },
});
const OrderSummaryItem = (props) => {
  const { order } = props; 
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <FastImage
          source={{ uri: Config.SERVER_URL + order.vendor.logo_thumbnail_path }}
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.price, {color: Colors.LIGHTBLACK}]}>
            {order.vendor.title}
          </Text>
          <Text style={styles.address}>
            {order.vendor.address}
          </Text>
        </View>
      </View>
      <DashDivider />
      <View style={styles.inner_container}>
        <Text style={[styles.price, {color: Colors.LIGHTBLACK}]}>
          {CONSTANTS.EARNED_AMOUNT} :   
        </Text>
        <Text style={[styles.price, {marginLeft: 4}]}>
          {Math.round((order.earning ?? 0) + (order.tip ?? 0))} L
        </Text>
        <Text style={styles.time}>
          {moment.tz(order.created_at, Config.TIME_ZONE).format('DD-MM-YYYY')}
        </Text>
      </View> 
    </View>
  );
};
export default OrderSummaryItem;
