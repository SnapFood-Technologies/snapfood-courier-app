import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Spacing, Colors, Typography, Globals } from '_styles';
import { DashDivider } from '_atoms';
import AddTimeModal from 'components/modals/AddTimeModal';
import Svg_add from 'assets/svgs/profile/plus.svg';
import Svg_edit from 'assets/svgs/profile/edit.svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: Spacing.SCALE_10,
    borderRadius: Spacing.SCALE_8,
    padding: Spacing.SCALE_12,
  },
  mainContainer: { 
    flex: 1, 
    marginTop: 14, 
    paddingHorizontal: 15, 
    backgroundColor: Colors.WHITE, 
    borderRadius: Spacing.SCALE_8,
    borderWidth: 1,
    borderColor: Colors.GRAY_100
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 14,
    color: '#333',
    // width: '100%',
    flex: 1,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#EFEFF4',
  },
  v_divider: {
    width: 3,
    height: 20,
    marginRight: 11,
  },
  itemContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingVertical: 10,
  },
  shiftTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 12,
    color: Colors.PRIMARY,
    paddingVertical: 6
  },
  timeTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  availTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 12,
    color: Colors.GREEN_200,
    paddingVertical: 6
  },
  flex_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  v_center: {
    alignItems: 'center',
  },
  flex_row_center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18, 
    alignItems: 'center'
  },
  addBtn: {
    height: 24, 
    width: 24, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

const RiderAvailItem = ({ data }) => {
  const [isShowAddTime, setShowAddTime] = useState(false);
  const { title, shift, avails } = data;

  const renderShiftItems = (shifts) => (
    shifts.map((shift_item, index) => (
      <View key={index} style={[styles.flex_row, { width: '100%' }]}> 
        <View style={[styles.v_divider, { backgroundColor: Colors.PRIMARY }]} />
        <Text style={styles.timeTxt}>{shift_item}</Text>
        <TouchableOpacity>
          <Svg_edit />
        </TouchableOpacity>
      </View>
    ))
  );

  const renderAvailabilityItems = (availabilities) => (
    availabilities.map((avail_item, index) => (
      <View key={index} style={{ flexDirection: 'column' }}>
        <View style={[styles.flex_row, { width: '100%' }]}> 
          <View style={[styles.v_divider, { backgroundColor: Colors.GREEN_200 }]} />
          <Text style={styles.timeTxt}>{avail_item}</Text>
          <TouchableOpacity>
            <Svg_edit />
          </TouchableOpacity>
        </View>
        {index < availabilities.length - 1 && <DashDivider />}
      </View>
    ))
  );

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.flex_row_center]}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity  style={styles.addBtn} onPress={() => setShowAddTime(true)}>
          <Svg_add />
        </TouchableOpacity>
      </View>
      {(shift?.length || avails?.length) > 0 && (
        <View style={[styles.v_center, { width: '100%' }]}> 
         <View style={styles.divider} />
          {shift?.length > 0 && (
            <View style={styles.itemContainer}>
              <Text style={styles.shiftTxt}>Shift</Text>
              {renderShiftItems(shift)}
            </View>
          )}
          {avails?.length > 0 && (
            <View style={styles.itemContainer}>
              <Text style={styles.availTxt}>Availability</Text>
              {renderAvailabilityItems(avails)}
            </View>
          )}
        </View>
      )}
      <AddTimeModal
        showModal={isShowAddTime}
        onYes={() => setShowAddTime(false)}
        onClose={() => setShowAddTime(false)}
      />
    </View>
  );
};

export default RiderAvailItem;
