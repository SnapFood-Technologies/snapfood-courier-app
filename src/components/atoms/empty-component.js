import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Spacing, Typography} from '_styles';
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.SCALE_12,
  },
});
const EmptyComponent = (props) => {
  return (
    <View style={styles.contianer}>
      <Text style={Typography.MONSERRAT_SEMIBOLD_PRIMARY_17}>{props.text}</Text>
    </View>
  );
};
export default EmptyComponent;
