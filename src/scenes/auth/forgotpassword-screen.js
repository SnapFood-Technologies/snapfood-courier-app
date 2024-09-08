import React, {useState} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import {Globals} from '_styles';
import {API, CONSTANTS} from '_service';
import {FORGOTPASSWORD_IMG, EMAIL_ICON} from '_assets/images';
import {ForgotPasswordStyles as styles} from './auth-styles';
import {
  HeaderBackBtn,
  CustomInput,
  PrimaryBtn,
  LoadingSpinner,
} from '_components';
import {handleErrorMsg} from '_utils';
import Toast from 'react-native-toast-message';
const ForgotPasswordScreen = ({navigation}) => {
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');
  const onClkForgotPassword = () => {
    console.log('onClkForgotPassword');
    setSpinner(true);
    API.forgotPassword({email})
      .then((response) => {
        
        setSpinner(false);
        Toast.show({
          type: 'success',
          text1: CONSTANTS.APP_NAME,
          text2: response.data.message,
        });
        navigation.goBack();
      })
      .catch((err) => {
        console.log('forgotPassword', err)
        setSpinner(false);
        handleErrorMsg(err);
      });
  };
  return (
    <View style={Globals.flex_1}>
      <LoadingSpinner visible={spinner} />
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Forgot Password"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={Globals.container}>
        <ScrollView contentContainerStyle={[Globals.padding_horiz_20, styles.scroll_container]}>
          <Image source={FORGOTPASSWORD_IMG} style={styles.forgot_img} />
          <Text style={styles.description}>
            {CONSTANTS.FORGOT_PASSWORD_DESCRIPTION}
          </Text>
          <CustomInput
            label="Email"
            icon={<Image source={EMAIL_ICON} />}
            keyboardType="email-address"
            editable
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.topSpacing}>
            <PrimaryBtn title="Send password" onPress={onClkForgotPassword} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default ForgotPasswordScreen;
