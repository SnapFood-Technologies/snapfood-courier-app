import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Globals, Colors, Spacing} from '_styles';
import Config from 'react-native-config';
import {CUSTOMER_LOCATION, MY_LOCATION, VENDOR_LOCATION} from '_assets/images';
import {connect} from 'react-redux';
import {FULL_SCREEN} from '_assets/images';
const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  fullscreen_view: {
    position: 'absolute',

    backgroundColor: 'white',
    width: Spacing.SCALE_48,
    height: Spacing.SCALE_48,
    alignItems: 'center',
    justifyContent: 'center',
    right: Spacing.SCALE_16,
    bottom: Spacing.SCALE_16,
    borderRadius: Spacing.SCALE_24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
const FullmapScreen = (props) => {
  const {latitude, longitude, navigation, route} = props;
  const {order, from} = route.params;
  console.log('FullmapScreen', latitude, longitude);
  return (
    <View style={Globals.flex_1}>
      <MapView
        customMapStyle={Globals.silver_map}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          image={MY_LOCATION}
        />
        <Marker
          coordinate={{
            latitude: parseFloat(order.vendor.latitude),
            longitude: parseFloat(order.vendor.longitude),
          }}
          image={VENDOR_LOCATION}
        />
        <Marker
          coordinate={{
            latitude: parseFloat(order.address.lat),
            longitude: parseFloat(order.address.lng),
          }}
          image={CUSTOMER_LOCATION}
        />
        <MapViewDirections
          origin={{
            latitude: from === 'current' ? latitude : order.latitude,
            longitude: from === 'current' ? longitude : order.longitude,
          }}
          destination={{
            latitude: parseFloat(order.vendor.latitude),
            longitude: parseFloat(order.vendor.longitude),
          }}
          strokeColor={Colors.PRIMARY}
          strokeWidth={Spacing.SCALE_4}
          apikey={Config.API_KEY}
        />
        <MapViewDirections
          origin={{
            latitude: parseFloat(order.vendor.latitude),
            longitude: parseFloat(order.vendor.longitude),
          }}
          destination={{
            latitude: parseFloat(order.address.lat),
            longitude: parseFloat(order.address.lng),
          }}
          strokeColor={Colors.PRIMARY}
          strokeWidth={Spacing.SCALE_4}
          apikey={Config.API_KEY}
        />
      </MapView>
      <TouchableOpacity
        style={styles.fullscreen_view}
        onPress={() => navigation.goBack()}>
        <Image source={FULL_SCREEN} />
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {latitude, longitude} = state.locationInfo;
  return {latitude, longitude};
};
export default connect(mapStateToProps, null)(FullmapScreen);
