import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '_styles';
import {CONSTANTS} from '_service';
import Icon from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ORANGE_SNAPFOOD,
    borderRadius: Spacing.SCALE_8,
    padding: Spacing.SCALE_8,
    flexDirection: 'row',
  },
  warning: {
    ...Typography.MONSERRAT_MEDIUM_WHITE_13,
    flex: 1,
    marginLeft: Spacing.SCALE_8,
  },
});
const OfflineWarning = () => {
  return (
    <View style={styles.container}>
      <Icon name="ios-warning-outline" size={Spacing.SCALE_32} color="white" />
      <Text style={styles.warning}>{CONSTANTS.OFFLINE_WARNING}</Text>
    </View>
  );
};
export default OfflineWarning;
