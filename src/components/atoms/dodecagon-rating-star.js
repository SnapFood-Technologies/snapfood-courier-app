import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Spacing, Typography} from '_styles';
import {DODECAGON} from '_assets/images';
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.SCALE_12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    ...Typography.POPPINS_SEMIBOLD_WHITE_12,
    position: 'absolute',
    alignSelf: 'center',
    top: 6,
  },
});
const DodecagonRatingStar = (props) => {
  return (
    <View style={styles.container}>
      <Image source={DODECAGON} style={{}} />
      <Text style={styles.text}>{props.rating}</Text>
    </View>
  );
};
export default DodecagonRatingStar;
