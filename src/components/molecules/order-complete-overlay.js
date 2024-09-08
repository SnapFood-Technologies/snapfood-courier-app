/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Spacing, Typography} from '_styles';
import {CONSTANTS} from '_service';
import {ORDER_SUCCESS} from '_assets/images';
import {setOrderStatus, setCurrentOrder} from '_redux/slices/currentOrder';
import {Divider, Overlay} from 'react-native-elements';
import {increaseDelivered} from 'redux/slices/personalInfo';
const styles = StyleSheet.create({
  overlay: {
    padding: Spacing.SCALE_24,
    borderRadius: Spacing.SCALE_8,
  },
  order_success: {
    ...Typography.MONSERRAT_MEDIUM_DARKBLACK_21,
    textAlign: 'center',
    marginTop: Spacing.SCALE_12,
    marginBottom: Spacing.SCALE_16,
  },
  okay: {
    marginTop: Spacing.SCALE_16,
    ...Typography.MONSERRAT_BOLD_PRIMARY_18,
    textAlign: 'center',
  },
});
const OrderCompleteOverlay = (props) => {
  const {onPress} = props;
  return (
    <Overlay overlayStyle={styles.overlay} isVisible={true}>
      <View>
        <Image source={ORDER_SUCCESS} />
        <Text style={styles.order_success}>{CONSTANTS.ORDER_SUCCESS}</Text>
        <Divider />
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.okay}>{CONSTANTS.OKAY}</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};
const mapDispatchToProps = {setOrderStatus, setCurrentOrder, increaseDelivered};
export default connect(null, mapDispatchToProps)(OrderCompleteOverlay);
