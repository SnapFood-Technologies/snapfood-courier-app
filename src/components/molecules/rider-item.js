import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Spacing, Colors, Typography} from '_styles';
import FastImage from 'react-native-fast-image';
import {Badge} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: Spacing.SCALE_6,
    borderRadius: Spacing.SCALE_8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: Spacing.SCALE_12,
    justifyContent: 'space-between',
  },
  inner_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar_img: {
    borderRadius: Spacing.SCALE_20,
    width: Spacing.SCALE_40,
    height: Spacing.SCALE_40,
    marginRight: Spacing.SCALE_8,
  },
  badge_container: {
    position: 'absolute',
    right: Spacing.SCALE_12,
    bottom: 0,
  },
});
const RiderItem = (props) => {
  const {avatar, name, online} = props; 
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View>
          <FastImage source={{uri: avatar}} style={styles.avatar_img} />
          <Badge
            status={online ? 'success' : 'error'}
            containerStyle={styles.badge_container}
          />
        </View>
        <Text style={Typography.MONSERRAT_SEMIBOLD_DARKBLACK_16}>{name}</Text>
      </View>
      {props.rightIcon}
    </View>
  );
};
export default RiderItem;
