import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Spacing, Colors, Globals, Typography} from '_styles';
import Config from 'react-native-config';
import {connect} from 'react-redux';
// svgs
import Svg_checked from 'assets/svgs/order/checked_item.svg';
import Svg_unchecked from 'assets/svgs/order/unchecked_item.svg';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon_container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
  },
  label_container: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  active_divider: {
    flex: 1,
    height: 5,
    backgroundColor: Colors.PRIMARY,
  },
  inactive_divider: {
    flex: 1,
    height: 5,
    backgroundColor: Colors.GRAY_600,
  },
  active_label: {
    maxWidth: 70,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    fontSize: 12,
    color: Colors.PRIMARY,
  },
  inactive_label: {
    maxWidth: 70,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    fontSize: 12,
    color: Colors.GRAY_600,
  },
});
const OrderDeliveryStepper = ({active_index, labels = []}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>
        {labels.slice(0, labels.length - 1).map((label, index) => (
          <View key={index} style={[Globals.flex_row, Globals.flex_1]}>
            {index + 1 <= active_index ? (
              <Svg_checked
                width={24}
                height={24}
                style={{marginHorizontal: 10}}
              />
            ) : (
              <Svg_unchecked
                width={24}
                height={24}
                style={{marginHorizontal: 10}}
              />
            )}
            <View
              style={
                index + 1 <= active_index
                  ? styles.active_divider
                  : styles.inactive_divider
              }
            />
          </View>
        ))}
        {active_index == labels.length ? (
          <Svg_checked width={24} height={24} style={{marginHorizontal: 10}} />
        ) : (
          <Svg_unchecked
            width={24}
            height={24}
            style={{marginHorizontal: 10}}
          />
        )}
      </View>
      {
        <View style={styles.label_container}>
          {labels.slice(0, labels.length - 1).map((label, index) => (
            <View key={index} style={[Globals.flex_row, Globals.flex_1]}>
              <Text
                style={
                  index + 1 <= active_index
                    ? styles.active_label
                    : styles.inactive_label
                }>
                {label}
              </Text>
              <View style={{flex: 1}} />
            </View>
          ))}
          <Text
            style={
              active_index == labels.length
                ? styles.active_label
                : styles.inactive_label
            }>
            {labels[labels.length - 1]}
          </Text>
        </View>
      }
    </View>
  );
};
const mapStateToProps = (state) => {
  const {address} = state.locationInfo;
  return {address};
};
export default connect(mapStateToProps, null)(OrderDeliveryStepper);
