import React from 'react';
import {View, Text} from 'react-native';
import {Typography} from '_styles';
const LabelWithLocation = (props) => {
  const {label, location} = props;
  return (
    <View>
      <Text style={Typography.MONSERRAT_MEDIUM_GRAY_12}>{label}</Text>
      <Text style={Typography.MONSERRAT_MEDIUM_LIGHTBLACK_12}>{location}</Text>
    </View>
  );
};
export default LabelWithLocation;
