import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Spacing, Globals, Colors} from '_styles';
import {Divider} from 'react-native-elements';
import Dash from 'react-native-dash';
const styles = StyleSheet.create({
  divider: {
    height: 0.7,
    backgroundColor: Colors.GRAY_200,
  },
  vertical_dash: {
    flexDirection: 'column',
    width: 1,
    height: Spacing.SCALE_16,
  },
  icon_container: {
    width: Spacing.SCALE_24,
    alignItems: 'center',
    marginRight: Spacing.SCALE_8,
  },
});
const DashWithDivider = () => {
  return (
    <View style={Globals.flex_row}>
      <View style={styles.icon_container}>
        <Dash style={styles.vertical_dash} dashColor={Colors.MEDIUMGRAY} />
      </View>
      <View style={Globals.flex_1}>
        <Divider style={styles.divider} />
      </View>
    </View>
  );
};
export default DashWithDivider;
