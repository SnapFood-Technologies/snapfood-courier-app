/* eslint-disable no-shadow */
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Globals, Colors, Spacing, Typography} from '_styles';
import {ButtonGroup, Overlay} from 'react-native-elements';
import {OrderSummaryStyles as styles} from './order-styles';
import {
  OrderCard,
  LoadingSpinner,
  EmptyComponent,
  PrimaryBtn,
} from '_components';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-timezone';
import {connect} from 'react-redux';
import {API, CONSTANTS} from '_service';
import {handleErrorMsg} from '_utils';
import {FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {setOrderStatus, setCurrentOrder} from '_redux/slices/currentOrder';
import {increaseDelivered} from 'redux/slices/personalInfo';
import Config from 'react-native-config';
import OrderDeliveredModal from 'components/modals/OrderDeliveredModal';
// svgs
import Svg_calendar from 'assets/svgs/earning/calendar.svg';
import CalendarOrderModal from 'components/modals/CalendarOrderModal';

const OrderSummaryScreen = (props) => {
  const [spinner, setSpinner] = useState(false);
  const {navigation, setCurrentOrder, increaseDelivered} = props;
  const buttons = ['Current', 'Completed'];
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const startDate = useRef(moment.tz(moment(), Config.TIME_ZONE));
  const endDate = useRef(moment.tz(moment(), Config.TIME_ZONE));

  const [isConfrimModal, showConfirmModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isOrderCalendarModal, showOrderCalendarModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setShouldFetch(true);
    }, []),
  );
  useEffect(() => {
    if (shouldFetch === false) {
      return;
    }
    setSpinner(true);
    setShouldFetch(false);
    API.getPastOrders({
      start_date: startDate.current.format('YYYY-MM-DD'),
      end_date: endDate.current.format('YYYY-MM-DD'),
    })
      .then((response) => {
        setSpinner(false);
        setPastOrders(response.data.pastOrders);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
        handleErrorMsg(err);
      });

    API.getCurrentOrders()
      .then((response) => {
        setSpinner(false);
        setCurrentOrders(response.data.orders);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
        handleErrorMsg(err);
      });
  }, [shouldFetch]);
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      if (date === null) {
        endDate.current = startDate.current;
      } else {
        endDate.current = moment.tz(date, Config.TIME_ZONE);
      }
    } else {
      startDate.current = moment.tz(date, Config.TIME_ZONE);
    }
    //setFilterDate(date);
    //setOverlayVisible(false);
  };
  const keyExtractor = (item, index) => item.id;
  const renderItem = ({item}) => {
    return (
      <OrderCard
        order={item}
        amount={Math.round(item.earning + item.tip)}
        pickupOrder={onPickup}
        deliveredOrder={(order) => {
          setSelectedOrder(order);
          showConfirmModal(true);
        }}
        onDetail={() => {
          setCurrentOrder(item);
          navigation.navigate('OrderDetail');
        }}
        navigation={navigation}
      />
    );
  };

  const onPickup = (order) => {
    setSpinner(true);
    API.pickUpOrder({order_id: order.id})
      .then(() => {
        setSpinner(false);
        setShouldFetch(true);
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };

  const markAsDelivered = () => {
    if (selectedOrder == null) {
      return;
    }
    setSpinner(true);
    API.completeOrder({order_id: selectedOrder.id})
      .then(() => {
        setSpinner(false);
        setSelectedOrder(null);
        increaseDelivered();
        setShouldFetch(true);
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };

  const onConfirm = () => {
    endDate.current = endDate.current ?? startDate.current;
    setOverlayVisible(false);
    setShouldFetch(true);
  };

  return (
    <View style={Globals.flex_1}>
      <LoadingSpinner visible={spinner} />
      {overlayVisible && selectedIndex === 1 && (
        <Overlay
          onBackdropPress={() => setOverlayVisible(false)}
          isVisible={true}>
          <CalendarPicker
            selectedStartDate={startDate.current}
            selectedEndDate={endDate.current}
            maxDate={new Date()}
            width={Spacing.SCALE_350}
            onDateChange={onDateChange}
            showDayStragglers={true}
            allowRangeSelection={true}
            allowBackwardRangeSelect={true}
            selectedRangeStartStyle={styles.day_start}
            selectedRangeEndStyle={styles.day_start}
            selectedDayColor="#50B7ED32"
            todayBackgroundColor="white"
            selectedRangeStartTextStyle={Typography.MONSERRAT_SEMIBOLD_WHITE_14}
            selectedRangeEndTextStyle={Typography.MONSERRAT_SEMIBOLD_WHITE_14}
            textStyle={Typography.MONSERRAT_MEDIUM_DARKBLACK_14}
            monthTitleStyle={Typography.MONSERRAT_BOLD_LIGHTBLACK_18}
            yearTitleStyle={Typography.MONSERRAT_BOLD_LIGHTBLACK_18}
            customDayHeaderStyles={(dayOfWeek, month, year) => {
              return {
                style: {
                  borderWidth: 0,
                },
                textStyle: Typography.MONSERRAT_BOLD_DARKBLACK_14,
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
          <View style={styles.btn_container}>
            <PrimaryBtn title="Confirm" onPress={onConfirm} />
          </View>
        </Overlay>
      )}
      <View style={Globals.header}>
        <View style={Globals.flex_1}>
          <Text style={Globals.hearder_title}>Orders</Text>
          <ButtonGroup
            selectedIndex={selectedIndex}
            onPress={(index) => setSelectedIndex(index)}
            buttons={buttons}
            containerStyle={styles.group_container}
            selectedButtonStyle={styles.group_btn_selected}
            buttonStyle={styles.group_btn}
            textStyle={styles.group_btn_txt}
          />
        </View>
      </View>
      <View
        style={[
          Globals.container,
          Globals.padding_horiz_20,
          {paddingBottom: 0, marginTop: selectedIndex === 1 ? 20 : 10},
        ]}>
        {selectedIndex === 1 && (
          <TouchableOpacity
            style={styles.date_select}
            onPress={() => setOverlayVisible(true)}>
            <Text>
              {startDate.current.diff(endDate.current, 'days') === 0
                ? startDate.current.format('DD/MM/YYYY')
                : `${startDate.current.format(
                    'DD/MM/YYYY',
                  )} - ${endDate.current.format('DD/MM/YYYY')}`}
            </Text>
            <Svg_calendar />
          </TouchableOpacity>
        )}
       
        <View style={[Globals.flex_1]}>
          <FlatList
            contentContainerStyle={Globals.flex_grow_1}
            containerStyle={styles.list_content}
            data={selectedIndex == 0 ? currentOrders : pastOrders}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyComponent text={CONSTANTS.NO_ORDER} />}
            ListHeaderComponent={<View style={{width: '100%', marginBottom: 12, alignItems: 'flex-end', justifyContent: 'center', paddingTop: 12}}>  
            <TouchableOpacity style={{marginRight: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={() => showOrderCalendarModal(true)}>
               <Svg_calendar style={{width: Spacing.SCALE_24, height: Spacing.SCALE_24}} />
             </TouchableOpacity>
           </View>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <OrderDeliveredModal
        showModal={isConfrimModal}
        onOk={() => {
          showConfirmModal(false);
          markAsDelivered();
        }}
        onClose={() => {
          showConfirmModal(false);
        }}
      />
      <CalendarOrderModal
        showModal={isOrderCalendarModal}
        onClose={() => {
          showOrderCalendarModal(false);
        }}
      />
    </View>
  );
};
const mapStateToProps = (state) => {
  const {currentOrder, orderStatus} = state.currentOrder;
  return {currentOrder, orderStatus};
};
const mapDispatchToProps = {
  setOrderStatus,
  setCurrentOrder,
  increaseDelivered,
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryScreen);
