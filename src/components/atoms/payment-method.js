import React from 'react';
import {View, Text, StyleSheet} from 'react-native'; 
import {Spacing, Typography, Globals, Colors} from '_styles';
const styles = StyleSheet.create({
  container: { 
    height: 24, 
    paddingHorizontal: 9, 
    borderRadius: 12,
    backgroundColor: '#1ED7AA'
  },
  outline_container : {
    height: 24, 
    paddingHorizontal: 9, 
    borderRadius: 12,
    borderWidth : 1,
    borderColor: '#1ED7AA', 
  },
  text : {
    fontSize: 12, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.WHITE,
    lineHeight: 18,
  },
  outline_text : {
    fontSize: 12, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: '#1ED7AA',
    lineHeight: 18,
  },
});
const PaymentMethod = ({order}) => {
  console.log('order.payment', order.payment, order.payment.type == 'cash')
  const getType = ()=>{ 
    if (order.payment == null) { return ''}
    if (order.payment.type == 'cash') { return 'Cash'} 
    return 'Prepaid'
  }

  return (
    <View style={[Globals.v_center, getType() == 'Cash' ? styles.outline_container : styles.container]}>
      <Text style={getType() == 'Cash' ? styles.outline_text : styles.text}>
        {getType()}
      </Text> 
    </View>
  );
};
export default PaymentMethod;
