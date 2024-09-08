import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

import {Spacing, Colors, Typography, Globals} from '_styles';
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header_title: {
    ...Typography.POPPINS_MEDIUM_LIGHTBLACK_16,
    textAlign: 'center',
  },
  back_btn: {
    position: 'absolute',
    left: 0,
  },
  right_btn: {
    position: 'absolute',
    right: 0,
  },
});
const HeaderBackBtn = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header_title}>{props.title}</Text>
      <Button
        containerStyle={styles.back_btn}
        icon={
          <Icon
            name={'chevron-left'}
            size={Spacing.SCALE_24}
            color={Colors.PRIMARY}
          />
        }
        type="clear"
        onPress={props.onPress}
      />
      <View style={styles.right_btn}>{props.rightBtn}</View>
    </View>
  );
};
export default HeaderBackBtn;
