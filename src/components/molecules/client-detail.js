import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, View, Text, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import {connect} from 'react-redux';
import {Divider, Button} from 'react-native-elements';
import {LocationMark, DodecagonRatingStar} from '_atoms';
import {Typography, Spacing, Colors, Globals} from '_styles';
import {API, CHAT, CONSTANTS} from '_service';
import {isEmpty} from '../../utils/common';
import {handleErrorMsg} from '../../utils';
// svgs
import Svg_phone from 'assets/svgs/order/phone.svg';
import {CHANNEL_TYPE} from 'service/constants';

const styles = StyleSheet.create({
  container: {
    ...Globals.flex_row_space_between,
    paddingBottom: Spacing.SCALE_4,
  },
  avatar: {
    height: Spacing.SCALE_45,
    width: Spacing.SCALE_45,
    borderRadius: Spacing.SCALE_28,
    marginRight: Spacing.SCALE_16,
  },
  btn_container: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  btn_outline: {
    borderRadius: 8,
    borderColor: Colors.GRAY_700,
    borderWidth: 1,
    marginRight: Spacing.SCALE_4,
  },
  btn: {
    borderRadius: 8,
    marginLeft: Spacing.SCALE_4,
    backgroundColor: Colors.PRIMARY,
  },
  btn_title: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    lineHeight: 18,
  },
  btn_title_outline: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    lineHeight: 18,
  },
});

const ClientDetail = (props) => {
  const {customer_data, right, location, navigation, user, hide_phone} = props;

  const onChat = async () => {
    let found_channel = await CHAT.findSingleChannel(
      user.unique_id,
      customer_data.id,
    );
    let channel_id = null;
    if (found_channel != null) {
      channel_id = found_channel.id;
    } else {
      channel_id = await CHAT.createSingleChannel(user, customer_data);
    }

    if (channel_id != null) {
      navigation.navigate('ChatMessage', {
        channelId: channel_id,
        channel: CHANNEL_TYPE.single,
      });
    } else {
      handleErrorMsg('Something went wrong');
    }
  };

  const onGiveReview = () => {
    Toast.show({
      type: 'info',
      text1: CONSTANTS.APP_NAME,
      text2: 'This is an upcoming feature.',
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <FastImage
          source={{
            uri:
              Config.USER_PROFILE_IMG_BASE_URL +
              (isEmpty(customer_data.photo) ? 'default' : customer_data.photo),
          }}
          style={styles.avatar}
        />
        <View style={Globals.flex_1}>
          <Text style={Typography.POPPINS_SEMIBOLD_LIGHTBLACK_16}>
            {customer_data.full_name}
          </Text>
          {location && <LocationMark location={props.location} />}
          {hide_phone ? null : (
            <Text style={Typography.POPPINS_REGULAR_GRAY_600_12}>
              {customer_data.phone}
            </Text>
          )}
        </View>
        <DodecagonRatingStar rating={'0.0'} />
        {right && (
          <View style={Globals.flex_row}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${customer_data.phone}`);
              }}>
              <Svg_phone />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {right && (
        <View style={styles.btn_container}>
          <View style={Globals.flex_1}>
            <Button
              type="outline"
              buttonStyle={styles.btn_outline}
              title={'Chat'}
              titleStyle={styles.btn_title_outline}
              onPress={onChat}
            />
          </View>
          <View style={Globals.flex_1}>
            <Button
              buttonColor="red"
              title={'Give Review'}
              disabled={true}
              onPress={onGiveReview}
              buttonStyle={styles.btn}
              titleStyle={styles.btn_title}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {user: state.personalInfo};
};
export default connect(mapStateToProps, null)(ClientDetail);
