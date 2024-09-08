import React from 'react';
import {CONSTANTS} from '_service';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Globals, Typography} from '_styles';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {Colors, Spacing} from '_styles';
import moment from 'moment';
const styles = StyleSheet.create({
  center_container: {
    alignItems: 'center',
    marginBottom: Spacing.SCALE_16,
  },
  left_icon: {
    position: 'absolute',
    left: Spacing.SCALE_16,
    zIndex: 1,
    padding: 4,
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY,
  },
  right_icon: {
    position: 'absolute',
    right: Spacing.SCALE_16,
    zIndex: 1,
    padding: 4,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
  },
  price : {
    fontSize: 30,
    fontFamily: Typography.FONT_FAMILY_POPPINS_BOLD,
    color: Colors.LIGHTBLACK, 
  },  
});
const EarningWithPeriodView = (props) => {
  const {
    startDate,
    endDate,
    earning,
    onSelectDate,
    onLeftPress,
    onRightPress,
  } = props;
  console.log('EarningWithPeriodView', startDate.diff(endDate, 'days'));
  return (
    <View style={styles.inner_container}>
      <TouchableOpacity style={[Globals.v_center, styles.left_icon]} onPress={onLeftPress}>
        <Icon
          color={Colors.WHITE}
          name="chevron-left"
          size={Spacing.SCALE_24}
        />
      </TouchableOpacity>
      <View style={styles.center_container}>
        <TouchableOpacity onPress={onSelectDate}>
          <Text style={Typography.MONSERRAT_MEDIUM_LIGHTBLACK_14}>
            {startDate.diff(endDate, 'd') === 0
              ? startDate.format('dddd, DD MMMM, YYYY')
              : `${startDate.format('DD MMMM')} - ${endDate.format(
                  'DD MMMM',
                )}`}
          </Text>
        </TouchableOpacity>
        <Text style={styles.price}>{earning} L</Text>
        <Text style={[Typography.POPPINS_MEDIUM_PRIMARY_16, {fontSize: 12, marginTop: -4,}]}>
          Earned
        </Text>
      </View>
      {moment().startOf('day') > endDate && (
        <TouchableOpacity
          type="clear"
          onPress={onRightPress}
          style={[Globals.v_center, styles.right_icon]}>
          <Icon
            color={Colors.PRIMARY}
            name="chevron-right"
            size={Spacing.SCALE_24}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default EarningWithPeriodView;
