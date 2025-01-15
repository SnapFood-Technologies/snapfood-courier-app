import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { Globals, Colors, Spacing, Typography } from '_styles';
import { HeaderBackBtn, RiderAvailItem } from '_molecules';

const CourierAvailability = ({ navigation }) => {
  const [startDate, setStartDate] = useState(moment().startOf('week'));
  const [endDate, setEndDate] = useState(moment().endOf('week'));

  const data = [
    { title: 'Mon, April 13', shift: ['11:00 - 16:00'], avails: ['11:00 - 16:00', '14:00 - 16:00'] },
    { title: 'Mon, April 16', shift: ['11:00 - 16:00'], avails: [] },
    { title: 'Mon, April 17', shift: [], avails: [] },
    { title: 'Mon, April 18', shift: [], avails: [] },
    { title: 'Mon, April 19', shift: [], avails: [] },
    { title: 'Mon, April 20', shift: [], avails: [] },
    { title: 'Mon, April 21', shift: [], avails: [] },
    { title: 'Mon, April 22', shift: [], avails: [] },
    { title: 'Mon, April 23', shift: [], avails: [] },
    { title: 'Mon, April 24', shift: [], avails: [] },
    { title: 'Mon, April 25', shift: [], avails: [] },
    { title: 'Mon, April 26', shift: [], avails: [] },
    { title: 'Mon, April 27', shift: [], avails: [] },
    { title: 'Mon, April 28', shift: [], avails: [] },
    { title: 'Mon, April 29', shift: [], avails: [] },
    { title: 'Mon, April 30', shift: [], avails: [] },
    { title: 'Mon, May 1', shift: [], avails: [] },
  ];

  const onLeftPress = () => {
    setStartDate((date) => date.clone().subtract(7, 'days'));
    setEndDate((date) => date.clone().subtract(7, 'days'));
  };

  const onRightPress = () => {
    setStartDate((date) => date.clone().add(7, 'days'));
    setEndDate((date) => date.clone().add(7, 'days'));
  };

  const renderTop = () => (
    <View style={styles.innerContainer}>
      <TouchableOpacity style={[Globals.v_center, styles.btn]} onPress={onLeftPress}>
        <Feather color={Colors.WHITE} name="chevron-left" size={Spacing.SCALE_24} />
      </TouchableOpacity>
      <View style={[Globals.v_center, Globals.flex_1]}>
        <Text style={styles.dateTxt}>
          {startDate.diff(endDate, 'days') === 0
            ? startDate.format('dddd, DD MMMM, YYYY')
            : `${startDate.format('ddd, MMM DD')} - ${endDate.format('ddd, MMM DD')}`}
        </Text>
      </View>
      <TouchableOpacity style={[Globals.v_center, styles.btn]} onPress={onRightPress}>
        <Feather color={Colors.WHITE} name="chevron-right" size={Spacing.SCALE_24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn title="Rider Availability" onPress={() => navigation.goBack()} />
      </View>
      <View style={[Globals.container, { paddingBottom: 0 }]}>
        {renderTop()}
        <ScrollView
          style={[Globals.flex_1, Globals.padding_horiz_20]}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <FlatList
            data={data}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => <RiderAvailItem data={item} />}
            keyExtractor={(_, index) => `item-${index}`}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default CourierAvailability;

const styles = StyleSheet.create({
  innerContainer: {
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
