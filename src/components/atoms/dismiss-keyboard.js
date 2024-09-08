import React from 'react';
import {TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const DismissKeyboard = (props) => (
  <TouchableWithoutFeedback
    style={styles.container}
    onPress={() => Keyboard.dismiss()}>
    {props.children}
  </TouchableWithoutFeedback>
);
export default DismissKeyboard;
