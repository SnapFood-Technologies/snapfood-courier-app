import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {LoginStyles as styles} from './auth-styles';
import {Colors, Typography} from '_styles';
import {LOGO_IMG, LOGIN_IMG, EMAIL_ICON} from '_assets/images';
import {
  CustomInput,
  PasswordInput,
  PrimaryBtn,
  LoadingSpinner,
} from '_components';
import {Button, CheckBox} from 'react-native-elements';
import {API, CONSTANTS, GLOBAL, STORAGE, CHAT} from '_service';
import {connect} from 'react-redux';
import {setProfile} from '_redux/slices/personalInfo';
import {setLoggedStatus} from '_redux/slices/appInfo';
import {generateRandom, handleErrorMsg} from '_utils';
import firestore from '@react-native-firebase/firestore';
import SvgPass from '../../assets/svgs/profile/pass_icon.svg';

// eslint-disable-next-line no-shadow
const LoginScreen = ({navigation, setProfile, setLoggedStatus}) => {
  const [isRemeber, setRemeber] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState(
    __DEV__ ? 'oralf.lapaj+1@snapfood.al' : '',
  );
  const [password, setpassword] = useState(__DEV__ ? 'Test1234!' : '');

  const initiateChatWithAdmin = async (rider_data) => {
    let conversationId;

    let found_channel = await CHAT.findAdminSupportChannel(
      rider_data.unique_id,
    );
    if (found_channel != null) {
      conversationId = found_channel.id;
    } else {
      let channelID = await CHAT.createAdminSupportChannel(rider_data);
      if (channelID != null) {
        conversationId = channelID;
      } else {
        // handleErrorMsg('Creating of Admin Support channel went wrong!')
      }
    }

    GLOBAL.conversationId = conversationId;
  };

  const onClkLogin = async () => {
    //navigation.push('App');
    //return;
    setSpinner(true);
    const device_token = await STORAGE.getData('device_token');
    API.signIn({email, password, device_token})
      .then(async (response) => {
        const rider = response.data.rider;
        //save api_token in async storage
        await STORAGE.storeData('api_token', rider.api_token);
        //save remember me in async storage
        if (isRemeber === true) {
          await STORAGE.storeData('is_remember', 'true');
        } else {
          await STORAGE.removeData('is_remember');
        }
        initiateChatWithAdmin(response.data.rider);
        setProfile(rider);
        GLOBAL.isLoggedIn = true;
        setSpinner(false);
        setTimeout(() => {
          setLoggedStatus(true);
        }, 1000);
      })
      .catch((err) => {
        console.log('API.signIn', err);
        setSpinner(false);
        handleErrorMsg(err);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard_view}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LoadingSpinner visible={spinner} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll_container}
          showsVerticalScrollIndicator={false}>
          <Image source={LOGO_IMG} style={styles.logo_img} />
          <Image source={LOGIN_IMG} style={styles.login_img} />
          <CustomInput
            label="Email"
            icon={<Image source={EMAIL_ICON} />}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable
          />
          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setpassword}
          />
          <CheckBox
            title={CONSTANTS.REMEMBER_ME}
            checked={isRemeber}
            onPress={() => setRemeber(!isRemeber)}
            textStyle={Typography.POPPINS_MEDIUM_LIGHTBLACK_14}
            checkedColor={Colors.PRIMARY}
            containerStyle={styles.remember_container}
          />
          <PrimaryBtn
            title="Log in"
            onPress={onClkLogin}
            titleStyle={Typography.POPPINS_MEDIUM_WHITE_18}
          />
          <Button
            type="clear"
            title="Forgot Password"
            titleStyle={Typography.POPPINS_MEDIUM_PRIMARY_16}
            containerStyle={styles.forgot_container}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapDispatchToProps = {setProfile, setLoggedStatus};
export default connect(null, mapDispatchToProps)(LoginScreen);
