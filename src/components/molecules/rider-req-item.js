import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing, Colors, Typography } from '_styles';
// svgs
import Svg_checked from 'assets/svgs/profile/checked.svg';
import Svg_unchecked from 'assets/svgs/profile/non-checked.svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: Spacing.SCALE_10,
    borderRadius: Spacing.SCALE_8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: Spacing.SCALE_12,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 14,
    color: Colors.LIGHTBLACK,
  },
  value: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    fontSize: 12,
  },
  checked: {
    height: 22,
    width: 22,
  },
  unchecked: {
    height: 24,
    width: 24,
  }
});
const RiderReqItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={[styles.value, { color: data.checked == true ?  Colors.PRIMARY : Colors.GRAY_600 }]}>{data.value}</Text>
      </View>
      {data.checked == true ? <View style={styles.checked}><Svg_checked/></View> : <View style={styles.unchecked}><Svg_unchecked /></View>}
    </View>
  );
};
export default RiderReqItem;
