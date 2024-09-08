import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { Globals, Colors, Spacing, Typography } from '_styles';
import { HeaderBackBtn, RiderAvailItem } from '_molecules';

const CourierAvailability = ({ navigation }) => {
  const [startDate, setStartDate] = useState(moment().startOf('week'));
  const [endDate, setEndDate] = useState(moment().endOf('week'));

  const data = [
    {
      title: 'Mon, April 13',
      shift: ['11:00 - 16:00'],
      avails: ['11:00 - 16:00', '14:00 - 16:00'],
    },
    {
      title: 'Mon, April 14',
      shift: [],
      avails: [],
    },
    {
      title: 'Mon, April 15',
      shift: [],
      avails: [],
    },
    {
      title: 'Mon, April 16',
      shift: ['11:00 - 16:00'],
      avails: [],
    },
    {
      title: 'Mon, April 17',
      shift: [],
      avails: [],
    },
    {
      title: 'Mon, April 18',
      shift: [],
      avails: [],
    },
    {
      title: 'Mon, April 19',
      shift: [],
      avails: [],
    },
  ]

  const onLeftPress = () => {
    setStartDate((date) => date.clone().subtract(7, 'd'));
    setEndDate((date) => date.clone().subtract(7, 'd'));
  };
  const onRightPress = () => {
    setStartDate((date) => date.clone().add(7, 'd'));
    setEndDate((date) => date.clone().add(7, 'd'));
  };


  const renderTop = () => {
    return (
      <View style={styles.inner_container}>
        <TouchableOpacity style={[Globals.v_center, styles.btn]} onPress={onLeftPress}>
          <Feather
            color={Colors.WHITE}
            name="chevron-left"
            size={Spacing.SCALE_24}
          />
        </TouchableOpacity>
        <View style={[Globals.v_center, Globals.flex_1]}>
          <TouchableOpacity >
            <Text style={styles.dateTxt}>
              {startDate.diff(endDate, 'd') === 0
                ? startDate.format('dddd, DD MMMM, YYYY')
                : `${startDate.format('ddd, MMM DD')} - ${endDate.format(
                  'ddd, MMM DD',
                )}`}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onRightPress}
          style={[Globals.v_center, styles.btn]}>
          <Feather
            color={Colors.WHITE}
            name="chevron-right"
            size={Spacing.SCALE_24}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Rider Availability"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={[Globals.container, {paddingBottom: 0}]}>
        {renderTop()}
        <ScrollView style={[Globals.flex_1, Globals.padding_horiz_20]}>
          {
            data.map((item,index) => 
              <RiderAvailItem key={index} data={item} />
            )
          }
          <View style={{height : 20,}}/>
        </ScrollView>
      </View>
    </View>
  );
};
export default CourierAvailability;

const styles = StyleSheet.create({
  inner_container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  dateTxt: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 14,
    color: '#333333',
  },
  btn: {
    backgroundColor: '#EFEFF4',
    width: 34,
    height: 34,
    borderRadius: 17,
  },
});