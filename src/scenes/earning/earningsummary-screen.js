import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Divider, Overlay } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import {
  OrderSummaryItem,
  EarningWithPeriodView,
  WaveDivder,
  DashDivider,
  LoadingSpinner,
  PrimaryBtn,
  EmptyComponent,
} from '_components';
import { API, CONSTANTS } from '_service';
import { Globals, Spacing, Colors, Typography } from '_styles';
import { BarChart } from 'react-native-chart-kit';
import { EarningSummaryStyles as styles } from './earning-styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment-timezone';
import Config from 'react-native-config';
import { handleErrorMsg } from '_utils';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// svgs
import Svg_calendar from 'assets/svgs/earning/calendar.svg';
import Svg_close from 'assets/svgs/earning/close.svg';

const EarningSummaryScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(moment().startOf('week'));
  const [endDate, setEndDate] = useState(moment().endOf('week'));
  const [shouldFetchRange, setShouldFetchRange] = useState(true);
  const [insideLoadingSpinner, setInsideLoadingSpinner] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [deliveryEarning, setDeliveryEarning] = useState(0);
  const [tip, setTip] = useState(0);
  const [selectedEarning, setSelectedEarning] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [insideCalendar, setInsideCalendar] = useState(false);
  const chartConfig = {
    backgroundColor: "#f00",
    fillShadowGradient: Colors.PRIMARY,
    fillShadowGradientOpacity: 1,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0,
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => Colors.PRIMARY,
    labelColor: (opacity = 1) => Colors.GRAY_600,
    propsForDots: {
      r: Spacing.SCALE_8,
      strokeWidth: '2',
      stroke: 'white',
    },
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item, index }) => {
    return <OrderSummaryItem order={item} />;
  };
  const [orderList, setOrderList] = useState([]);
  const [selectedOrderList, setSelectedOrderList] = useState([]);
  const refRBSheet = useRef();
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]);
  useFocusEffect(
    React.useCallback(() => {
      setShouldFetchRange(true);
    }, []),
  );
  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    setInsideLoadingSpinner(true);

    API.getPastOrders({
      start_date: selectedDate.format('YYYY-MM-DD'),
      end_date: selectedDate.format('YYYY-MM-DD'),
    })
      .then((response) => {
        setInsideLoadingSpinner(false);
        console.log(response.data);
        const pastOrders = response.data.pastOrders;
        let totalEarning = 0;
        pastOrders.forEach((pastOrder) => {
          totalEarning =
            totalEarning + (pastOrder.earning ?? 0) + (pastOrder.tip ?? 0);
        });
        setSelectedEarning(Math.round(totalEarning));
        setSelectedOrderList(pastOrders);
      })
      .catch((err) => {
        console.log('EarningSummaryScreen', err);
        setInsideLoadingSpinner(false);
        handleErrorMsg(err);
      });
  }, [selectedDate]);
  useEffect(() => {
    if (shouldFetchRange === false) {
      return;
    }
    setShouldFetchRange(false);
    setLoadingSpinner(true);
    API.getPastOrders({
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD'),
    })
      .then((response) => {
        setLoadingSpinner(false);
        const pastOrders = response.data.pastOrders;
        var totalTip = 0,
          totalDeliveryEarning = 0;
        var earningArr = Array(7).fill(0);
        pastOrders.forEach((pastOrder) => {
          if (pastOrder.earning) {
            totalDeliveryEarning += pastOrder.earning;
          }
          if (pastOrder.tip) {
            totalTip += pastOrder.tip;
          }
          const createdDate = moment.tz(pastOrder.created_at, Config.TIME_ZONE);
          createdDate.startOf('day');
          earningArr[
            createdDate.diff(startDate.startOf('day'), 'days')
          ] += Math.round(pastOrder.earning + pastOrder.tip);
        });
        setOrderList(pastOrders);
        setChartData(earningArr);
        setTip(Math.round(totalTip));
        setDeliveryEarning(Math.round(totalDeliveryEarning));
      })
      .catch((err) => {
        setLoadingSpinner(false);
        handleErrorMsg(err);
      });
  }, [shouldFetchRange, startDate, endDate]);
  const onSelectDate = () => {
    setOverlayVisible(true);
  };
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      return;
    }
    setSelectedDate(moment(date))
    setOverlayVisible(false);
    refRBSheet.current.open();
    // setStartDate(moment(date).startOf('week'));
    // setEndDate(moment(date).endOf('week'));
  };
  const onLeftRange = () => {
    setStartDate((date) => date.clone().subtract(7, 'd'));
    setEndDate((date) => date.clone().subtract(7, 'd'));
    setShouldFetchRange(true);
  };
  const onRightRange = () => {
    setStartDate((date) => date.clone().add(7, 'd'));
    setEndDate((date) => date.clone().add(7, 'd'));
    setShouldFetchRange(true);
  };
  const onSheetDateChange = (date) => {
    setSelectedDate(moment(date));
    setInsideCalendar(false);
  };
  const onSheetSelectDate = () => {
    setInsideCalendar(true);
  };
  const onLeftSelected = () => {
    setSelectedDate((selected) => selected.clone().subtract(1, 'd'));
  };
  const onRightSelected = () => {
    setSelectedDate((selected) => selected.clone().add(1, 'd'));
  };

  console.log('start ', startDate.toDate(), 'end ', endDate.toDate())
  return (
    <>
      <LoadingSpinner visible={loadingSpinner} />
      <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)} >
        <CalendarPicker
          disabledDates={(date) => date.startOf('day') > moment()}
          initialDate={startDate.toDate()}
          selectedStartDate={startDate.toDate()}
          selectedEndDate={endDate.toDate()}
          width={Dimensions.get('window').width - 40}
          onDateChange={onDateChange}
          showDayStragglers={true}
          allowRangeSelection={true}
          allowBackwardRangeSelect={true}
          selectedRangeStartStyle={styles.day_start}
          selectedRangeEndStyle={styles.day_start}
          selectedRangeStyle={styles.day_range}
          todayBackgroundColor="white"
          selectedRangeStartTextStyle={Typography.POPPINS_MEDIUM_WHITE_14}
          selectedRangeEndTextStyle={Typography.POPPINS_MEDIUM_WHITE_14}
          textStyle={Typography.POPPINS_MEDIUM_GRAY_600_14}
          monthTitleStyle={Typography.POPPINS_SEMIBOLD_BLACK_18}
          yearTitleStyle={Typography.POPPINS_SEMIBOLD_BLACK_18}
          customDayHeaderStyles={(dayOfWeek, month, year) => {
            return {
              style: {
                borderWidth: 0,
              },
              textStyle: Typography.POPPINS_SEMIBOLD_BLACK_12,
            };
          }}
          previousComponent={
            <View style={styles.chevron_container}>
              <Icon
                name="chevron-left"
                size={Spacing.SCALE_32}
                color={Colors.WHITE}
              />
            </View>
          }
          nextComponent={
            <View style={styles.chevron_container}>
              <Icon
                name="chevron-right"
                size={Spacing.SCALE_32}
                color={Colors.WHITE}
              />
            </View>
          }
        />
      </Overlay>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={Dimensions.get('window').height * 0.9}
        customStyles={{
          wrapper: {
            backgroundColor: '#22222255',
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: 'transparent',
            borderTopLeftRadius: Spacing.SCALE_20,
            borderTopRightRadius: Spacing.SCALE_20,
          },
        }}>
        {/* <Overlay visible={insideCalendar}>
          <CalendarPicker
            disabledDates={(date) => date.startOf('day') > moment()}
            width={Spacing.SCALE_350}
            onDateChange={onSheetDateChange}
            showDayStragglers={true}
            selectedDayColor="#50B7ED32"
            todayBackgroundColor="white"
            textStyle={Typography.POPPINS_MEDIUM_GRAY_600_14}
            monthTitleStyle={Typography.POPPINS_SEMIBOLD_BLACK_18}
            yearTitleStyle={Typography.POPPINS_SEMIBOLD_BLACK_18}
            customDayHeaderStyles={(dayOfWeek, month, year) => {
              return {
                style: {
                  borderWidth: 0,
                },
                textStyle: Typography.POPPINS_SEMIBOLD_BLACK_12,
              };
            }}
            previousComponent={
              <View style={styles.chevron_container}>
                <Icon
                  name="chevron-left"
                  size={Spacing.SCALE_24}
                  color={Colors.GRAY_500}
                />
              </View>
            }
            nextComponent={
              <View style={styles.chevron_container}>
                <Icon
                  name="chevron-right"
                  size={Spacing.SCALE_24}
                  color={Colors.GRAY_500}
                />
              </View>
            }
          />
        </Overlay> */}
        <LoadingSpinner visible={insideLoadingSpinner} />
        <View style={[Globals.v_center, styles.sheetCloseBtn]}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {
            refRBSheet.current.close()
          }}>
            <Svg_close />
          </TouchableOpacity>
        </View>
        <View style={[Globals.container, styles.sheetContainer]}> 
          <EarningWithPeriodView
            earning={selectedEarning}
            startDate={selectedDate}
            endDate={selectedDate}
            onSelectDate={onSheetSelectDate}
            onLeftPress={onLeftSelected}
            onRightPress={onRightSelected}
          />
          <FlatList
            data={selectedOrderList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={Globals.flex_grow_1}
            ListEmptyComponent={<EmptyComponent text={CONSTANTS.NO_ORDER} />}
          />
        </View>

      </RBSheet>
      <View style={Globals.flex_1}>
        <View style={Globals.header}>
          <View style={Globals.flex_1}>
            <Text style={Globals.hearder_title}>Earnings</Text>
          </View>
        </View>
        <View style={styles.container}>
          <EarningWithPeriodView
            earning={tip + deliveryEarning}
            startDate={startDate}
            endDate={endDate}
            onSelectDate={() => { }}
            onLeftPress={onLeftRange}
            onRightPress={onRightRange}
          />
          <FlatList
            data={orderList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={Globals.flex_grow_1}
            ListEmptyComponent={<EmptyComponent text={CONSTANTS.NO_ORDER} />}
            ListHeaderComponent={
              <View  >
                <BarChart
                  data={{
                    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                    datasets: [
                      {
                        data: chartData,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width - 20} // from react-native
                  height={210}
                  withInnerLines={false}
                  yAxisInterval={1} // optional, defaults to 1
                  yLabelsOffset={0}
                  yAxisSuffix=" L"
                  // showValuesOnTopOfBars={true}
                  chartConfig={chartConfig}
                  fromZero={true}
                  style={styles.chart}
                  onDataPointClick={({ index }) => {
                    // setSelectedDate(startDate.clone().add(index, 'd'));
                    // refRBSheet.current.open();
                    console.log('on datapoint click')
                  }}
                />
                <View style={Globals.padding_horiz_10}>
                  <View style={styles.summary_container}>
                    <View style={{ marginBottom: 8, }}>
                      <Text
                        style={[styles.summary_title,
                        styles.margin_padding_8,
                        ]}>
                        {CONSTANTS.SUMMARY}
                      </Text>
                    </View>
                    <View style={styles.inner_container}>
                      <Text style={styles.summary_key}>
                        {CONSTANTS.DELIVERY_EARNINGS}
                      </Text>
                      <Text style={Typography.MONSERRAT_MEDIUM_LIGHTBLACK_14}>
                        {deliveryEarning} L
                      </Text>
                    </View>
                    <View style={[styles.inner_container, { marginBottom: 6, }]}>
                      <Text style={styles.summary_key}>
                        {CONSTANTS.TIP_RECEIVED}
                      </Text>
                      <Text style={Typography.MONSERRAT_MEDIUM_LIGHTBLACK_14}>
                        {tip} L
                      </Text>
                    </View>
                    <DashDivider />
                    <View style={[styles.inner_container, { marginTop: 6 }]}>
                      <Text style={styles.summary_total}>
                        {CONSTANTS.TOTAL}
                      </Text>
                      <Text style={Typography.MONSERRAT_SEMIBOLD_LIGHTBLACK_15}>
                        {deliveryEarning + tip} L
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.weekly_container}>
                  <View style={styles.inner_container}>
                    <Text style={styles.summary_title}>
                      {CONSTANTS.WEEKLY_ORDER_SUMMARY}
                    </Text>
                    <TouchableOpacity onPress={() => setOverlayVisible(true)}>
                      <Svg_calendar />
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            }
          />
        </View>
      </View>
    </>
  );
};
export default EarningSummaryScreen;
