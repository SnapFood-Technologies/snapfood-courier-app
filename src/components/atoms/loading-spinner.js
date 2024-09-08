import React from 'react';
import {Modal, ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {Spacing, Typography, Colors} from '_styles';
const LoadingSpinner = (props) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: Spacing.SCALE_100,
      height: Spacing.SCALE_100,
      backgroundColor: 'white',
      borderRadius: Spacing.SCALE_12,
      alignItems: 'center',
      shadowColor: '#333',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: 'center',
    },
  });
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
          <Text
            style={[
              Typography.MONSERRAT_SEMIBOLD_DARKBLACK_16,
              {marginTop: Spacing.SCALE_8},
            ]}>
            Loading
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default LoadingSpinner;
