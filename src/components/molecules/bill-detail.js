import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements'; 
import { DashDivider } from '_atoms';
import {CONSTANTS} from '_service';
import {Spacing, Typography, Colors} from '_styles';

const styles = StyleSheet.create({
  inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.SCALE_6,
  },
  key : {
    fontSize: 14, 
    fontFamily : Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: Colors.LIGHTBLACK, 
  },
});
const BillDetail = (props) => {
  const {item_total, fee, tip, total, discount} = props;
  return (
    <View>
      <View style={styles.inner_container}>
        <Text style={styles.key}>
          {CONSTANTS.ITEM_TOTAL}
        </Text>
        <Text style={styles.key}>
          {item_total}L
        </Text>
      </View>
      <View style={styles.inner_container}>
        <Text style={styles.key}>
          {CONSTANTS.DELIVERY_FEE}
        </Text>
        <Text style={styles.key}>{fee}L</Text>
      </View> 
      <View style={styles.inner_container}>
        <Text style={styles.key}>
          {CONSTANTS.TIP}
        </Text>
        <Text style={styles.key}>{ tip == null ? 0 : tip }L</Text>
      </View>
      <DashDivider />
      <View style={styles.inner_container}>
        <Text style={[styles.key, {color: Colors.PRIMARY}]}>
          {CONSTANTS.ORDER_DISCOUNT}
        </Text>
        <Text style={[styles.key, {color: Colors.PRIMARY}]}>{discount}L</Text>
      </View>
      <DashDivider />
      <View style={styles.inner_container}>
        <Text style={[styles.key, {fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD}]}>
          {CONSTANTS.TOTAL}
        </Text>
        <Text style={[styles.key, {fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD}]}>
          {total}L
        </Text>
      </View>
    </View>
  );
};
export default BillDetail;
