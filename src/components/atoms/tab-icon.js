import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Spacing} from '_styles';
import {
  HOME_TAB,
  REQUEST_TAB,
  ORDER_TAB,
  PROFILE_TAB,
  EARNING_TAB,
  HOME_TAB_FOCUSED,
  REQUEST_TAB_FOCUSED,
  ORDER_TAB_FOCUSED,
  EARNING_TAB_FOCUSED,
  PROFILE_TAB_FOCUSED,
} from '_assets/images';
const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_8,
  },
});
const TabIcon = (props) => {
  let iconName;
  switch (props.index) {
    case 'Home':
      iconName = props.focused ? HOME_TAB_FOCUSED : HOME_TAB;
      break;
    case 'Requests':
      iconName = props.focused ? REQUEST_TAB_FOCUSED : REQUEST_TAB;
      break;
    case 'Orders':
      iconName = props.focused ? ORDER_TAB_FOCUSED : ORDER_TAB;
      break;
    case 'Earnings':
      iconName = props.focused ? EARNING_TAB_FOCUSED : EARNING_TAB;
      break;
    case 'Profile':
      iconName = props.focused ? PROFILE_TAB_FOCUSED : PROFILE_TAB;
      break;
  }
  return <Image source={iconName} style={styles.container} />;
};
export default TabIcon;
