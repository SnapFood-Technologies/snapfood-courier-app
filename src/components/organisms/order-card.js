import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors, Spacing, Typography, Globals} from '_styles';
import {ClientDetail} from '_molecules';
import {DashDivider, EarnedAmount} from '_atoms';
import {ITEM_ICON} from '_assets/images';
import {Divider, Button} from 'react-native-elements';
import {CONSTANTS} from '_service';
import {ORDER_STATUS} from 'service/constants';
import PaymentMethod from 'components/atoms/payment-method';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: Spacing.SCALE_12,
    borderRadius: Spacing.SCALE_12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Spacing.SCALE_4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1,
    marginBottom: Spacing.SCALE_12,
  },
  dish_container: {
    flexDirection: 'row',
  },
  item_icon: {
    marginTop: Spacing.SCALE_2,
    marginRight: Spacing.SCALE_8,
  },
  id_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider_container: {
    marginVertical: Spacing.SCALE_8,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.GRAY_200,
  },
  btn_container: {
    flexDirection: 'row',
    marginTop: 8,
  },
  btn_outline: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.GRAY_700,
    marginRight: Spacing.SCALE_4,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.PRIMARY,
    marginLeft: Spacing.SCALE_4,
    backgroundColor: Colors.PRIMARY,
  },
  btn_title: {
    fontSize: Typography.FONT_SIZE_13,
    fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM,
  },
  btn_title_outline: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_13,
    fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM,
  },
  vendorinfo_container: {
    flexDirection: 'row',
  },
  orderID: {
    fontSize: 12,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: Colors.GRAY_600,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1ED7AA',
    marginHorizontal: 6,
  },
  completedTxt: {
    fontSize: 14,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.GREEN_200,
    lineHeight: 18,
  },
});
const OrderCard = (props) => {
  const {order, status, pickupOrder, deliveredOrder, amount, navigation} =
    props;
  return (
    <View style={styles.container}>
      <ClientDetail customer_data={order.customer} navigation={navigation} />
      <DashDivider />
      <View style={styles.dish_container}>
        <Image source={ITEM_ICON} style={styles.item_icon} />
        <View style={Globals.flex_1}>
          <View style={styles.vendorinfo_container}>
            <Text
              style={[
                Globals.flex_1,
                Typography.MONSERRAT_SEMIBOLD_LIGHTBLACK_15,
              ]}>
              {order.vendor.title}
            </Text>
            <PaymentMethod order={order} />
          </View>
          <View style={styles.id_container}>
            <Text style={styles.orderID}>Order ID: {order.order_number}</Text>
          </View>
          <View style={[styles.id_container]}>
            <EarnedAmount
              amount={order.status == ORDER_STATUS.delivered ? amount : 'N/A'}
            />
          </View>
        </View>
      </View>
      {order.status == ORDER_STATUS.delivered ? (
        <View style={[styles.id_container, {marginTop: 20}]}>
          <View style={styles.dot} />
          <Text style={styles.completedTxt}>
            Completed on {moment(order.updated_at).format('DD MMM hh:mm A')}
          </Text>
        </View>
      ) : (
        <View style={styles.btn_container}>
          <View style={Globals.flex_1}>
            <Button
              type="outline"
              buttonStyle={styles.btn_outline}
              title={CONSTANTS.ORDER_DETAIL}
              titleStyle={styles.btn_title_outline}
              onPress={props.onDetail}
            />
          </View>
          <View style={Globals.flex_1}>
            {order.status == ORDER_STATUS.accepted ? (
              <Button
                buttonColor="red"
                title="Pickup Order"
                onPress={() => {
                  pickupOrder(order);
                }}
                buttonStyle={styles.btn}
                titleStyle={styles.btn_title}
              />
            ) : order.status == ORDER_STATUS.picked_by_rider ? (
              <Button
                buttonColor="red"
                title="Mark As Delivered"
                onPress={() => {
                  deliveredOrder(order);
                }}
                buttonStyle={styles.btn}
                titleStyle={styles.btn_title}
              />
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};
export default OrderCard;
