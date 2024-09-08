import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors, Spacing, Typography} from '_styles';
const styles = StyleSheet.create({
  container: {
    marginLeft: Spacing.SCALE_4,
    flexDirection: 'row',
  },
});
const RatingStar = (props) => {
  return (
    <View style={styles.container}>
      <Icon name="star" color={Colors.YELLOW_100} size={Spacing.SCALE_12} />
      <Text style={Typography.MONSERRAT_MEDIUM_LIGHTBLACK_10}>
        {props.rating}
      </Text>
    </View>
  );
};
export default RatingStar;
