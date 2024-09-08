import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Colors, Typography, Spacing} from '_styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.SCALE_4,
  },
  text: {
    marginLeft: Spacing.SCALE_4,
    ...Typography.POPPINS_REGULAR_GRAY_600_12,
  },
});
const LocationMark = (props) => {
  return (
    <View style={styles.container}>
      <Icon
        name="location-pin"
        color={Colors.MEDIUMGRAY}
        size={Spacing.SCALE_12}
      />
      <Text style={styles.text}>{props.location}</Text>
    </View>
  );
};
export default LocationMark;
