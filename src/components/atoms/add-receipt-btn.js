import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'; 
import {Spacing, Typography, Colors, Globals} from '_styles';
const styles = StyleSheet.create({
  container: { 
    width: 60,
    height: 60,
    borderStyle : 'dashed',
    borderColor: Colors.GRAY_700,
    borderWidth: 1,
    borderRadius: 1,
  }, 
  value : {
    fontSize: 12, 
    fontFamily : Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: '#636363',
    textAlign: 'center',
  },
});
const AddReceiptBtn = (props) => {
  return (
    <TouchableOpacity style={[Globals.v_center, styles.container]}> 
      <Text style={[styles.value ]}>
        Add Receipt
      </Text>
    </TouchableOpacity>
  );
};
export default AddReceiptBtn;
