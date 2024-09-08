import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Spacing} from '_styles';
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.SCALE_16,
    paddingBottom: Spacing.SCALE_120,
  },
});
const CustomScrollView = (props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {props.children}
    </ScrollView>
  );
};
export default CustomScrollView;
