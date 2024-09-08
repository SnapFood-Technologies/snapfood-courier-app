import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Globals} from '_styles';
import {HeaderBackBtn} from '_molecules';
import {
  PasswordInput,
  PrimaryBtn,
  DismissKeyboard,
  LoadingSpinner,
} from '_atoms';
import {ChangePasswordStyles as styles} from './profile-styles';
import {API, CONSTANTS} from '_service';
import {handleErrorMsg} from '_utils';
import Toast from 'react-native-toast-message';
const ChangePasswordScreen = ({navigation}) => {
  const [current_password, setCurrent] = useState('');
  const [new_password, setNew] = useState('');
  const [confirm_password, setConfirm] = useState('');
  const [spinner, setSpinner] = useState(false);
  const onClkChangePassword = () => {
    console.log(current_password, new_password, confirm_password);
    setSpinner(true);
    API.changePassword({current_password, new_password, confirm_password})
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
        setSpinner(false);
        handleErrorMsg(err);
      });
  };
  return (
    <DismissKeyboard>
      <View style={Globals.flex_1}>
        <LoadingSpinner visible={spinner} />
        <View style={Globals.header}>
          <HeaderBackBtn
            title="Change Password"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={Globals.container}>
          <ScrollView style={Globals.padding_horiz_20}>
            <View style={styles.innerContainer}>
              <PasswordInput
                label="Current Password"
                value={current_password}
                onChangeText={setCurrent}
              />
              <PasswordInput
                label="New Password"
                value={new_password}
                onChangeText={setNew}
              />
              <PasswordInput
                label="Confirm Password"
                value={confirm_password}
                onChangeText={setConfirm}
              />
            </View>
            <PrimaryBtn title="Change Password" onPress={onClkChangePassword} />
          </ScrollView>
        </View>
      </View>
    </DismissKeyboard>
  );
};
export default ChangePasswordScreen;
