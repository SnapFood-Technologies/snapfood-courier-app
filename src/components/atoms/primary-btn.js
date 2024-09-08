import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Colors, Spacing, Typography} from '_styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: Spacing.SCALE_48,
    borderRadius: 6,
  },
  title : {
    fontSize: 18, 
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    lineHeight: 24,
  }
});
const PrimaryBtn = (props) => {
  return (
    <Button
      buttonStyle={[styles.container, props.style]}
      titleStyle={styles.title}
      title={props.title}
      onPress={props.onPress}
      {...props}
    />
  );
};
export default PrimaryBtn;
