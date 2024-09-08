import React from 'react';
import {View, Text, StyleSheet} from 'react-native'; 
import {Spacing, Typography, Colors} from '_styles';
import AppTooltip from 'components/organisms/app-tooltip';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.SCALE_4,
  },
  key : {
    fontSize: 12, 
    fontFamily : Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.LIGHTBLACK
  },
  value : {
    fontSize: 12, 
    fontFamily : Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.PRIMARY,
    marginRight: 8
  },
});
const EarnedAmount = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.key, props.fontSize && {fontSize: props.fontSize}]}>
        Earned Amount :{' '}
      </Text>
      <Text style={[styles.value, props.fontSize && {fontSize: props.fontSize}]}>
        {props.amount == 'N/A' ? 'N/A' : `${props.amount} L`}
      </Text>
      {
        props.amount == 'N/A' && 
        <AppTooltip description={'Earnings are shown once the order is delivered'}/>
      }
    </View>
  );
};
export default EarnedAmount;
