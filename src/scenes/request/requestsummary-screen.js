/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Globals, Colors, Spacing} from '_styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {RequestSummaryStyles as styles} from './request-styles';
import {connect} from 'react-redux';
import {OfflineWarning, OrderRequest} from '_components';
import {API} from '_service';
import {handleErrorMsg} from '_utils';
import Toast from 'react-native-toast-message';
import {CONSTANTS} from '_service';
import MapViewDirections from 'react-native-maps-directions';
import {useFocusEffect} from '@react-navigation/native';
import {increaseRejected, toggleStatus} from 'redux/slices/personalInfo';
import Toggle from 'react-native-toggle-element';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'react-native-config';
import {OrderMapView} from '_organisms';
import {
  MY_LOCATION,
  CUSTOMER_LOCATION,
  VENDOR_LOCATION,
  MAP_BG,
} from '_assets/images';
// svgs
import Svg_myloc from 'assets/svgs/order/mappin_my.svg';
import Svg_target from 'assets/svgs/order/mappin_target.svg';

const RequestSummaryScreen = (props) => {
  const {
    latitude,
    longitude,
    currentOrder,
    increaseRejected,
    status,
    toggleStatus,
    navigation,
  } = props;
  const [shouldFetch, setShouldFetch] = useState(true);
  const [order, setOrder] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const onOnlineOffline = () => {
    API.updateStatus()
      .then(() => {
        toggleStatus();
      })
      .catch((err) => {
        handleErrorMsg(err);
      });
  };
  const onAccept = () => {
    setSpinner(true);
    API.acceptOrderRequest({order_id: order.id})
      .then((response) => {
        setSpinner(false);
        setShouldFetch(true);
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };

  const onReject = () => {
    setSpinner(true);
    API.rejectOrderRequest({order_id: order.id})
      .then((response) => {
        setSpinner(false);
        increaseRejected();
        setShouldFetch(true);
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };
  const onDetail = () => {
    console.log('onDetail');
    navigation.navigate('RequestDetail', {order: order});
  };
  useFocusEffect(
    React.useCallback(() => {
      setShouldFetch(true);
    }, []),
  );
  useEffect(() => {
    if (shouldFetch === false) {
      return;
    }
    API.setAllDeliveryRequestSeen().catch((err) => {
      handleErrorMsg(err);
    });
    setShouldFetch(false);
    setSpinner(true);
    const fetchDeliveryRequest = async () => {
      API.getDeliveryRequest()
        .then((response) => {
          console.log('getDeliveryRequest ', response.data);
          setSpinner(false);
          const orderData = response.data.order;
          setOrder(orderData);
        })
        .catch((err) => {
          setSpinner(false);
          handleErrorMsg(err);
        });
    };
    fetchDeliveryRequest();
  }, [shouldFetch]);

  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <View style={Globals.flex_1}>
          <Text style={Globals.hearder_title}>Order Requests</Text>
        </View>
      </View>
      <View style={styles.map_container}>
        <OrderMapView
          order={order}
          status={status}
          style={{flex: 1}}
          navigation={navigation}
        />
        <Toggle
          containerStyle={styles.statusToggle}
          value={status}
          rightTitle={!status ? 'Offline' : ''}
          leftTitle={status ? 'Online' : ''}
          onPress={(val) => {
            onOnlineOffline();
          }}
          thumbActiveComponent={
            <Icon name="bicycle-basket" size={Spacing.SCALE_28} color="white" />
          }
          thumbInActiveComponent={
            <Icon name="bicycle-basket" size={Spacing.SCALE_28} color="white" />
          }
          activeBackgroundColor={Colors.PRIMARY}
          thumbButton={{
            activeBackgroundColor: Colors.PRIMARY,
            inActiveBackgroundColor: Colors.GRAY_300,
            activeColor: Colors.PRIMARY,
            inActiveColor: '#AAAAAA',
            width: status ? 70 : 80,
          }}
          thumbStyle={[
            styles.thumb,
            {
              width: 45,
              height: 45,
              right: status ? 50 : undefined,
            },
          ]}
          trackBarStyle={{justifyContent: 'space-between'}}
          trackBar={{
            activeBackgroundColor: 'white',
            inActiveBackgroundColor: 'white',
            width: Spacing.SCALE_125,
            height: Spacing.SCALE_48,
            borderWidth: 3,
          }}
        />
        <ImageBackground
          style={[Globals.padding_horiz_10, {marginTop: -28, marginBottom: 16}]}
          source={MAP_BG}>
          {order && status === true && (
            <OrderRequest
              order={order}
              spinner={spinner}
              onAccept={onAccept}
              onReject={onReject}
              onDetail={onDetail}
              navigation={navigation}
            />
          )}
          {status === false && <OfflineWarning />}
        </ImageBackground>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {latitude, longitude} = state.locationInfo;
  const {currentOrder} = state.currentOrder;
  const {status} = state.personalInfo;
  console.log('mapStateToProps', latitude, longitude);
  return {latitude, longitude, currentOrder, status};
};
const mapDispatchToProps = {
  increaseRejected,
  toggleStatus,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestSummaryScreen);
