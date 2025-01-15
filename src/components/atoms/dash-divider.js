import React from 'react';
import {StyleSheet} from 'react-native';
import Dash from 'react-native-dash';
import {Colors, Spacing} from '_styles';
const styles = StyleSheet.create({
  dash: {
    flex: 1,
    paddingVertical: 2,
    marginVertical: Spacing.SCALE_8,
  },
});
const DashDivider = () => {
  return (
    <Dash
      style={styles.dash}
      dashLength={4}
      dashGap={4}
      dashThickness={1}
      dashColor={Colors.GRAY_200}
    />
  );
};
export default DashDivider;
