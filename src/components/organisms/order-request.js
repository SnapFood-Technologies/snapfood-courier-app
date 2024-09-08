import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Spacing, Colors, Globals, Typography} from '_styles';
import {Button} from 'react-native-elements';
import {DashDivider, EarnedAmount} from '_atoms';
import Config from 'react-native-config';
import {
  ClientDetail,
  VendorDetail,
  IconLabelLocation,
  DashWithDivider,
} from '_molecules';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BlurView} from '@react-native-community/blur';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: Spacing.SCALE_12,
  },
  shadow_1: {
    height: Spacing.SCALE_24,
    backgroundColor: 'white',
    opacity: 0.7,
    marginHorizontal: Spacing.SCALE_36,
    borderTopLeftRadius: Spacing.SCALE_12,
    borderTopRightRadius: Spacing.SCALE_12,
  },
  shadow_2: {
    marginTop: -Spacing.SCALE_12,
    height: Spacing.SCALE_12,
    backgroundColor: 'white',
    opacity: 0.7,
    marginHorizontal: Spacing.SCALE_18,
    borderTopLeftRadius: Spacing.SCALE_12,
    borderTopRightRadius: Spacing.SCALE_12,
  },
  container: {
    padding: Spacing.SCALE_16,
    backgroundColor: 'white',
    borderRadius: Spacing.SCALE_12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Spacing.SCALE_4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn_green: {
    marginHorizontal: Spacing.SCALE_4,
    backgroundColor: Colors.GREEN_200,
    borderRadius: Spacing.SCALE_6,
  },
  btn_red: {
    marginLeft: Spacing.SCALE_4,
    backgroundColor: Colors.RED_200,
    borderRadius: Spacing.SCALE_6,
  },
  btn_detail: {
    marginLeft: Spacing.SCALE_4,
    backgroundColor: Colors.YELLOW_200,
    borderRadius: Spacing.SCALE_6,
  },
  btn_container: {
    marginTop: Spacing.SCALE_12,
    flexDirection: 'row',
  },
  btn_title: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    lineHeight: 24,
  },
  divider_container: {
    marginVertical: Spacing.SCALE_8,
  },
  divider: {
    height: 0.7,
    backgroundColor: Colors.GRAY_200,
  },
});

const OrderRequest = (props) => {
  const {order, spinner, onAccept, onReject, onDetail, address, navigation} =
    props;
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onDetail}>
      {/* <View style={styles.shadow_1} /> */}
      {/* <View style={styles.shadow_2} /> */}
      <View style={styles.container}>
        <ClientDetail
          customer_data={order.customer}
          navigation={navigation}
          location={order.address.street}
          hide_phone
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
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <IconLabelLocation
              icon={
                <SimpleLineIcon
                  name="location-pin"
                  size={Spacing.SCALE_20}
                  color={Colors.PRIMARY}
                />
              }
              label="To"
              location={order.address.street}
            />
            <DashWithDivider />
            {/* <IconLabelLocation
              icon={
                <SimpleLineIcon
                  name="location-pin"
                  size={Spacing.SCALE_16}
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
          </View>
          <View style={{width: 50}}>{/* TODO: Timer count down */}</View>
        </View>

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
        {spinner && (
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        )}
        {spinner && (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const mapStateToProps = (state) => {
  const {address} = state.locationInfo;
  return {address};
};
export default connect(mapStateToProps, null)(OrderRequest);
