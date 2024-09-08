import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import {Spacing, Typography} from '_styles';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.SCALE_4,
  },
  rating: {
    alignSelf: 'flex-start',
  },
});
const RatingCount = (props) => {
  const {rating, count} = props;
  return (
    <View style={styles.container}>
      <AirbnbRating
        size={Spacing.SCALE_24}
        isDisabled
        defaultRating={rating}
        showRating={false}
        starContainerStyle={styles.rating}
      />
      <Text style={Typography.MONSERRAT_SEMIBOLD_LIGHTGRAY_12}>({count})</Text>
    </View>
  );
};
export default RatingCount;
