/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Globals, Colors, Spacing, Typography} from '_styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';
// svgs
import Svg_myloc from 'assets/svgs/order/mappin_my.svg';
import Svg_target from 'assets/svgs/order/mappin_target.svg';
import Svg_vendor from 'assets/svgs/order/mappin_vendor.svg';
import Svg_fullscreen from 'assets/svgs/order/full-screen.svg';

const styles = StyleSheet.create({
  street: {
    fontSize: 12,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: Colors.LIGHTBLACK,
  },
  distance: {
    fontSize: 10,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.LIGHTBLACK,
  },
  time: {
    fontSize: 10,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: Colors.GRAY_600,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.GRAY_700,
    marginHorizontal: 6,
  },
  tooltip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    height: 50,
    marginBottom: 8,
  },
  tooltipView: {},
  fullscreen_view: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.SCALE_24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62,
    backgroundColor: 'white',
    width: Spacing.SCALE_36,
    height: Spacing.SCALE_36,
    elevation: 4,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

const OrderMapView = (props) => {
  const {latitude, longitude, order, status, style, navigation} = props;

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const [vendor_distance, setVendorDistance] = useState(0);
  const [vendor_duration, setVendorDuration] = useState(0);

  const getRegion = () => {
    let region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    if (
      status == true &&
      order != null &&
      order.address != null &&
      order.address.lat != null &&
      order.address.lng != null
    ) {
      let latitudeDelta = Math.abs(latitude - Number(order.address.lat));
      let longitudeDelta = Math.abs(longitude - Number(order.address.lng));
      let middle_lat = (Number(order.address.lat) + latitude) / 2;
      let middle_lng = (Number(order.address.lng) + longitude) / 2;
      region = {
        latitude: middle_lat - latitudeDelta * 0.1,
        longitude: middle_lng - longitudeDelta * 0.1,
        latitudeDelta: latitudeDelta * 1.3,
        longitudeDelta: longitudeDelta * 1.3,
      };
    }
    return region;
  };

  const targetPin = () => {
    return (
      <View>
        <View style={[Globals.h_center, styles.tooltip]}>
          <View>
            <Text style={styles.distance}>{distance.toFixed(1)} km</Text>
            <Text style={styles.time}>{parseInt(duration)} min</Text>
          </View>
          <View style={styles.divider} />
          {order.address != null && (
            <Text style={styles.street}>{order.address.street}</Text>
          )}
        </View>
        <Svg_target width={32} height={32} />
      </View>
    );
  };

  const vendorPin = () => {
    return (
      <View>
        <View style={[Globals.h_center, styles.tooltip]}>
          <View>
            <Text style={styles.distance}>{vendor_distance.toFixed(1)} km</Text>
            <Text style={styles.time}>{parseInt(vendor_duration)} min</Text>
          </View>
          <View style={styles.divider} />
          {order.vendor != null && (
            <Text style={styles.street}>{order.vendor.address}</Text>
          )}
        </View>
        <Svg_vendor width={32} height={32} />
      </View>
    );
  };

  return (
    <View style={style}>
      <MapView
        customMapStyle={Globals.silver_map}
        provider={PROVIDER_GOOGLE}
        // initialRegion={{
        //   latitude: latitude - 0.0035,
        //   longitude: longitude,
        //   latitudeDelta: 0.01,
        //   longitudeDelta: 0.01,
        // }}
        style={style}
        region={getRegion()}>
        {order && status == true && (
          <Marker
            coordinate={{
              latitude: Number(order.address.lat),
              longitude: Number(order.address.lng),
            }}
            centerOffset={{x: 0.1, y: 1}}
            anchor={{x: 0.1, y: 1}}>
            {targetPin()}
          </Marker>
        )}
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}>
          <Svg_myloc />
        </Marker>
        {order && status == true && (
          <MapViewDirections
            origin={{latitude: latitude, longitude: longitude}}
            destination={{
              latitude: Number(order.address.lat),
              longitude: Number(order.address.lng),
            }}
            strokeColor={Colors.PRIMARY}
            strokeWidth={Spacing.SCALE_4}
            apikey={Config.API_KEY}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
              setDistance(result.distance);
              setDuration(result.duration);
            }}
          />
        )}
        {order && status == true && (
          <Marker
            coordinate={{
              latitude: Number(order.vendor.latitude),
              longitude: Number(order.vendor.longitude),
            }}
            centerOffset={{x: 0.1, y: 1}}
            anchor={{x: 0.1, y: 1}}>
            {vendorPin()}
          </Marker>
        )}
        {order && status == true && (
          <MapViewDirections
            origin={{latitude: latitude, longitude: longitude}}
            destination={{
              latitude: Number(order.vendor.latitude),
              longitude: Number(order.vendor.longitude),
            }}
            strokeColor={Colors.ORANGE_SNAPFOOD}
            strokeWidth={Spacing.SCALE_4}
            apikey={Config.API_KEY}
            onReady={(result) => {
              console.log(`Vendor Distance: ${result.distance} km`);
              console.log(`Vendor Duration: ${result.duration} min.`);
              setVendorDistance(result.distance);
              setVendorDuration(result.duration);
            }}
          />
        )}
      </MapView>
      {order && status == true && (
        <TouchableOpacity
          style={styles.fullscreen_view}
          onPress={() =>
            navigation.navigate('FullMap', {
              order: order,
              from: 'current',
            })
          }>
          <Svg_fullscreen />
        </TouchableOpacity>
      )}
    </View>
  );
};
const mapStateToProps = (state) => {
  const {latitude, longitude} = state.locationInfo;
  console.log('mapStateToProps', latitude, longitude);
  return {latitude, longitude};
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(OrderMapView);
