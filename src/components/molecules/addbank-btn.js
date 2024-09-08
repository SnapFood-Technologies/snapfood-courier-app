import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Spacing, Typography} from '_styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {CONSTANTS} from '_service';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner_container: {
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    width: Spacing.SCALE_48,
    height: Spacing.SCALE_48,
    borderRadius: Spacing.SCALE_24,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.SCALE_12,
  },
});
const AddBankBtn = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}>
      <View style={styles.inner_container}>
        <Icon name="plus" color={Colors.PRIMARY} size={Spacing.SCALE_36} />
      </View>
      <Text style={Typography.MONSERRAT_SEMIBOLD_PRIMARY_17}>
        {CONSTANTS.ADD_BANK_ACCOUNT}
      </Text>
    </TouchableOpacity>
  );
};
export default AddBankBtn;
