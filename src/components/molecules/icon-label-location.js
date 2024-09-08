import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Globals, Spacing, Colors} from '_styles';
import {LabelWithLocation} from '_atoms';
const styles = StyleSheet.create({
  icon_container: {
    width: Spacing.SCALE_24,
    alignItems: 'center',
    marginRight: Spacing.SCALE_8,
  },
});
const IconLabelLocation = (props) => {
  const {icon, label, location} = props;
  return (
    <View style={{...Globals.flex_row, paddingRight: Spacing.SCALE_16}}>
      <View style={styles.icon_container}>{icon}</View>
      <LabelWithLocation label={label} location={location} />
    </View>
  );
};
export default IconLabelLocation;
