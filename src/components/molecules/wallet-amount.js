import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Spacing, Typography, Colors } from '_styles';
import { CONSTANTS } from '_service';
// svgs
import Svg_wallet from '../../assets/svgs/profile/wallet.svg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flexDirection: 'row',
    padding: Spacing.SCALE_12,
    paddingVertical: Spacing.SCALE_18,
    alignItems: 'center',
    borderRadius: Spacing.SCALE_12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 2,
    marginBottom: Spacing.SCALE_24,
  },
  inner_container: { 
    flex: 1,
    flexDirection: 'column',
    marginLeft: Spacing.SCALE_12, 
    justifyContent: 'center', 
  },
});
const WalletAmount = (props) => {
  const { amount } = props;
  return (
    <View style={styles.container}>
      <Svg_wallet />
      <View style={styles.inner_container}>
        <Text style={Typography.POPPINS_MEDIUM_WHITE_12}>
          {CONSTANTS.WALLET_AMOUNT}
        </Text>
        <Text style={Typography.POPPINS_SEMIBOLD_WHITE_36}>
          {amount}L
        </Text>
      </View>
    </View>
  );
};
export default WalletAmount;
