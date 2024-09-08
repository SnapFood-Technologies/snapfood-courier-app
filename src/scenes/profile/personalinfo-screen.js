import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import {Globals} from '_styles';
import {HeaderBackBtn} from '_molecules';
import {CustomInput, PrimaryBtn} from '_atoms';
import {PersonalInfoStyles as styles} from './profile-styles';
import { isEmpty } from 'utils/common';
import Svg_user from 'assets/svgs/profile/user.svg';
import Svg_email from 'assets/svgs/profile/email.svg';
import Svg_phone from 'assets/svgs/profile/phone.svg';

const PersonalInfoScreen = ({
  navigation,
  email,
  name,
  phone_number,
  profile_img,
}) => {
  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Personal Information"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={[Globals.container, Globals.padding_horiz_20]}>
        <View style={styles.innerContainer}>
          {/* <FastImage source={{uri: Config.USER_PROFILE_IMG_BASE_URL + (isEmpty(profile_img) ? 'default' : profile_img) }} 
          style={Globals.profileImg} /> */}
          <CustomInput label="Full Name" icon={<Svg_user />} value={name} />
          <CustomInput label="Email" icon={<Svg_email />} value={email} />
          <CustomInput label="Phone Number" icon={<Svg_phone />} value={phone_number} />
        </View>
        <PrimaryBtn
          title="Save info"
          onPress={() => navigation.navigate('EditInfo')}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {name, email, phone_number, profile_img} = state.personalInfo;
  return {name, email, phone_number, profile_img};
};
export default connect(mapStateToProps, null)(PersonalInfoScreen);
