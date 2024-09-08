import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors, Globals, Spacing, Typography } from '_styles'; 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  }, 
  label: {
    fontSize: 12,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: Colors.LIGHTBLACK,  
    marginLeft: 15,
    width: 80,
  },
});
const RateItem = ({ maxValue, value }) => {  
  return (
    <View style={styles.container}>
      <Progress.Bar progress={maxValue == 0 ? 0 : value / maxValue} borderWidth={0} width={null} color={Colors.RED_800} unfilledColor={Colors.GRAY_700} style={Globals.flex_1}/>
      {
        maxValue == 0 ?  <Text style={styles.label}>0 / 0%</Text>
        : <Text style={styles.label}>{value} / { parseInt((value * 100) / maxValue) }%</Text>
      } 
    </View>
  );
};
export default RateItem;
