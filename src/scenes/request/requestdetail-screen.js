import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Globals, Colors, Spacing, Typography } from '_styles';
import { Button } from 'react-native-elements';
import {
  ClientDetail,
  VendorDetail,
  HeaderBackBtn,
  DashWithDivider,
  DashDivider,
  IconLabelLocation,
  ItemDetail,
  BillDetail,
  EarnedAmount,
} from '_components';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Octicons';
import { CONSTANTS } from '_service';
import Config from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  CUSTOMER_LOCATION,
  MY_LOCATION,
  VENDOR_LOCATION,
} from '_assets/images';
import { connect } from 'react-redux';
import { RequestDetailStyles as styles } from './request-styles';
import { API } from '_service';
import { OrderMapView } from '_organisms';


const RequestDetailScreen = (props) => {
  // const {navigation, route, latitude, longitude, address} = props;
  const {
    navigation,
    route,
    latitude,
    longitude,
    address,
  } = props;

  const { order } = route.params;
  const [spinner, setSpinner] = useState(false);

  const onAccept = () => {
    setSpinner(true);
    API.acceptOrderRequest({ order_id: order.id })
      .then((response) => {
        setSpinner(false);
        if (response.data.status === true) {
          navigation.goBack()
        } else {
          Toast.show({
            type: 'info',
            text1: CONSTANTS.APPNAME,
            text2: response.data.message,
          });
        }
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };
  const onReject = () => {
    setSpinner(true);
    API.rejectOrderRequest({ order_id: order.id })
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

  return (
    <View style={styles.container}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title={CONSTANTS.DETAIL_HEADER}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <OrderMapView order={order} status={true} style={styles.map} navigation={navigation} />
        <View style={styles.sub_container}>
          <ClientDetail
            customer_data={order.customer}
            location={order.address.street}
            hide_phone={true}
            navigation={navigation}
            rating={4.5}
          />
          <DashDivider />
          <VendorDetail
            avatar={Config.SERVER_URL + order.vendor.logo_thumbnail_path}
            name={order.vendor.title}
            description={order.vendor.description}
            order={order}
            amount={0}
          />
          <View style={styles.divider_container} />
          <IconLabelLocation
            icon={
              <Icon
                name="location"
                size={Spacing.SCALE_20}
                color={Colors.RED_100}
              />
            }
            label="To"
            location={order.address.street}
          />
          <DashWithDivider />
          {/* <IconLabelLocation
            icon={
              <Icon
                name="primitive-dot"
                size={Spacing.SCALE_20}
                color={Colors.PRIMARY}
              />
            }
            label="Vendor Location"
            location={order.vendor.address}
          />
          <DashWithDivider /> */}
          <IconLabelLocation
            icon={
              <FeatherIcon
                name="compass"
                size={Spacing.SCALE_20}
                color={Colors.GRAY_600}
              />
            }
            label="My Location"
            location={address}
          />
          <DashDivider />
          <View style={styles.detail_container}>
            <Text style={Typography.POPPINS_REGULAR_LIGHTBLACK_12}>
              {CONSTANTS.ITEM_DETAIL}
            </Text>
          </View>
          {order.products.map((item) => (
            <View style={styles.item_container} key={item.id}>
              <ItemDetail
                name={item.title}
                detail={item.description}
                quantity={item.quantity}
                options={item.options}
              />
            </View>
          ))}
          <DashDivider />
          <BillDetail
            item_total={parseInt(order.sub_total)}
            total={parseInt(order.total_price)}
            fee={parseInt(order.delivery_fee)}
            tip={order.tip_rider}
            discount={parseInt(order.discount_amount)}
          />
          <View style={styles.btn_container}>
            <View style={Globals.flex_1}>
              <Button
                title="Accept"
                buttonStyle={styles.btn_green}
                titleStyle={styles.btn_title}
                onPress={onAccept}
              />
            </View>
            <View style={Globals.flex_1}>
              <Button
                title="Reject"
                buttonStyle={styles.btn_red}
                titleStyle={styles.btn_title}
                onPress={onReject}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {spinner && (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => {
  const { latitude, longitude, address } = state.locationInfo;
  return { latitude, longitude, address };
};
export default connect(mapStateToProps, null)(RequestDetailScreen);
