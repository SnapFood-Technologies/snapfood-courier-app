import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing, Typography, Globals, Colors } from '_styles';
import FastImage from 'react-native-fast-image';
import AddReceiptBtn from 'components/atoms/add-receipt-btn';
import PaymentMethod from 'components/atoms/payment-method';

const styles = StyleSheet.create({
  avatar: {
    height: Spacing.SCALE_40,
    width: Spacing.SCALE_40,
    borderRadius: Spacing.SCALE_8,
    borderWidth: Spacing.SCALE_1,
    borderColor: Colors.GRAY_700,
    marginRight: Spacing.SCALE_20,
  },
  cash_payment_method: {
    borderColor: Colors.GREEN_200,
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  container: { ...Globals.flex_row, paddingVertical: Spacing.SCALE_4 },
});

const VendorDetail = (props) => {
  const { name, description, order, hide_payment_method, onAddReceipt } = props;
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: props.avatar }} style={styles.avatar} />
      <View style={Globals.flex_1}>
        <Text style={Typography.POPPINS_SEMIBOLD_LIGHTBLACK_14}>{name}</Text>
        <Text style={Typography.POPPINS_REGULAR_GRAY_600_12}>
          {description}
        </Text>
      </View>
      {
        hide_payment_method ? null : <PaymentMethod order={order} />
      } 
      {
        onAddReceipt && <AddReceiptBtn onPress={onAddReceipt}/>
      }
      <View />
    </View>
  );
};
export default VendorDetail;
