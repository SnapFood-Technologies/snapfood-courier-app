import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Spacing, Colors, Typography, Globals } from '_styles';
import { DashDivider } from '_atoms';
import AddTimeModal from 'components/modals/AddTimeModal';
// svgs
import Svg_add from 'assets/svgs/profile/plus.svg';
import Svg_edit from 'assets/svgs/profile/edit.svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', 
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: Spacing.SCALE_10,
    borderRadius: Spacing.SCALE_8,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    padding: Spacing.SCALE_12, 
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#EFEFF4',
    marginTop: 14,
  },
  v_divider: {
    width: 3,
    height: 20,
    marginRight: 11,
  },
  itemContainer: {
    flexDirection: 'column',
    width : '100%',
    marginTop: 14,
  },
  shiftTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 12,
    color: Colors.PRIMARY,
    marginBottom: 6,
  },
  timeTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 18,
    color: '#333',
    flex : 1,
  },
  availTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 12,
    color: Colors.GREEN_200,
    marginBottom: 6,
  }
});

const RiderAvailItem = ({ data }) => { 

  const [isShowAddTime, showAddTimeModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[Globals.flex_row]}>
        <Text style={styles.title}>{data.title}</Text>
        <TouchableOpacity onPress={()=>showAddTimeModal(true)}>
          <Svg_add />
        </TouchableOpacity>
      </View>
      {
        ((data.shift != null && data.shift.length > 0) || (data.avails != null && data.avails.length > 0)) &&
        <View style={[Globals.v_center, {width : '100%'}]}>
          <View style={styles.divider} />
          {
            (data.shift != null && data.shift.length > 0) &&
            <View style={styles.itemContainer}>
              <Text style={styles.shiftTxt}>Shift</Text>
              {
                data.shift.map((shift_item, index) =>
                  <View key={index} style={[Globals.flex_row, { width: '100%' }]}>
                    <View style={[styles.v_divider, { backgroundColor: Colors.PRIMARY }]} />
                    <Text style={styles.timeTxt}>{shift_item}</Text>
                    <TouchableOpacity>
                      <Svg_edit />
                    </TouchableOpacity>
                  </View>
                )
              }
            </View>
          }
          {
            (data.avails != null && data.avails.length > 0) &&
            <View style={styles.itemContainer}>
              <Text style={styles.availTxt}>Availability</Text>
              {
                data.avails.length > 1 && data.avails.slice(0, data.avails.length - 1).map((avail_item, index) =>
                  <View key={index} style={{ flexDirection: 'column' }}>
                    <View  style={[Globals.flex_row, { width: '100%' }]}>
                      <View style={[styles.v_divider, { backgroundColor: Colors.GREEN_200 }]} />
                      <Text style={styles.timeTxt}>{avail_item}</Text>
                      <TouchableOpacity>
                        <Svg_edit />
                      </TouchableOpacity>
                    </View>
                    <DashDivider />
                  </View>
                )
              }
              {
                data.avails.slice(data.avails.length - 1, data.avails.length).map((avail_item, index) =>
                  <View key={index} style={[Globals.flex_row, { width: '100%' }]}>
                    <View style={[styles.v_divider, { backgroundColor: Colors.GREEN_200 }]} />
                    <Text style={styles.timeTxt}>{avail_item}</Text>
                    <TouchableOpacity>
                      <Svg_edit />
                    </TouchableOpacity>
                  </View>
                )
              }
            </View>
          }
        </View>
      } 
      <AddTimeModal 
        showModal={isShowAddTime}
        onYes={()=>{
          showAddTimeModal(false);
        }}
        onClose={()=>{
          showAddTimeModal(false);
        }}
      />
    </View>
  );
};
export default RiderAvailItem;
