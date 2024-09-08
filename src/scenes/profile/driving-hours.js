import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Globals, Spacing, Typography } from '_styles';
import { HeaderBackBtn } from '_molecules';
// svgs
import Svg_edit from 'assets/svgs/profile/edit.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DrivingHours = ({ navigation }) => {
  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Driving Hours"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView style={[Globals.container, Globals.padding_horiz_20]}>
        <View style={styles.itemContainer}>
          <Text style={styles.offlineTxt}>Offline time</Text>
          <View style={[Globals.flex_row, { width: '100%' }]}>
            <View style={[styles.divider, { backgroundColor: Colors.GRAY_600 }]} />
            <Text style={styles.timeTxt}>0 min</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.availableTxt}>Available time</Text>
          <View style={[Globals.flex_row, { width: '100%' }]}>
            <View style={[styles.divider, { backgroundColor: Colors.PRIMARY }]} />
            <Text style={styles.timeTxt}>12 hr 0 min</Text>
            <TouchableOpacity>
              <Svg_edit />
            </TouchableOpacity> 
          </View>
        </View>
        <View>
          <Text style={styles.policyTxt}>Driving Hours Policy</Text>
          <Text style={styles.descTitleTxt}>Office time</Text>
          <Text style={styles.descTxt}>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how.</Text>
          <Text style={styles.descTitleTxt}>Available time</Text>
          <Text style={styles.descTxt}>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how.</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default DrivingHours;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: Spacing.SCALE_10,
    borderRadius: Spacing.SCALE_8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: Spacing.SCALE_16,
  },
  divider: {
    width: 3,
    height: 20,
    marginRight: 11,
  },
  timeTxt: {
    flex: 1,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 18,
    color: '#333333',
    lineHeight: 24,
  },
  offlineTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 12,
    color: Colors.GRAY_600,
    marginBottom: 6,
  },
  availableTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 12,
    color: Colors.PRIMARY,
    marginBottom: 6,
  },
  policyTxt : {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 16,
    color: Colors.LIGHTBLACK,
    marginVertical: 24, 
  },
  descTitleTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 14,
    color: Colors.LIGHTBLACK,
    marginTop: 16,
    marginBottom: 6,
  },
  descTxt : {
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    fontSize: 12,
    color: Colors.LIGHTBLACK,
  }
})
