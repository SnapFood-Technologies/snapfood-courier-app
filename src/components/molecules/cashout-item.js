import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Spacing, Typography} from '_styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Spacing.SCALE_8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    paddingHorizontal: Spacing.SCALE_16,
    paddingVertical: Spacing.SCALE_8,
    marginVertical: Spacing.SCALE_8,
  },
  inner_container: {},
});
const CashOutItem = (props) => {
  const {data} = props;
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={[Typography.POPPINS_SEMIBOLD_LIGHTBLACK_20, {fontSize: Typography.FONT_SIZE_24}]}>
          ${data.amount.toFixed(2)}
        </Text>
        <Text style={Typography.MONSERRAT_MEDIUM_LIGHTGRAY_11}>
          Transfer to {data.bank} bank
        </Text>
      </View>
      <Text style={Typography.MONSERRAT_MEDIUM_LIGHTGRAY_11}>{data.time}</Text>
    </View>
  );
};

export default CashOutItem;
