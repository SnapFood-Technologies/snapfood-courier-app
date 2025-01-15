import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Globals, Typography, Colors } from '_styles';
import { HeaderBackBtn } from '_molecules';
import {
  PasswordInput,
  CustomInput,
  PrimaryBtn,
  DismissKeyboard,
  LoadingSpinner,
} from '_atoms';
import { ChangePasswordStyles as styles } from './profile-styles';
import { API, CONSTANTS } from '_service';
import { handleErrorMsg } from '_utils';
import Toast from 'react-native-toast-message'; 
// svgs
import Svg_radio_checked from 'assets/svgs/profile/radio_checked.svg';
import Svg_radio_unchecked from 'assets/svgs/profile/radio_unchecked.svg';

const AddBankScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc_code, setIfscCode] = useState('');
  const [other, setOther] = useState('');
  const [account_type, setAccountType] = useState('Saving');
  const [iban_number, setIbanNumber] = useState('');
  const [swift_code, setSwiftCode] = useState('');

  const [spinner, setSpinner] = useState(false);
  const onSubmit = () => {
  };
  return (
    <DismissKeyboard>
      <View style={Globals.flex_1}>
        <LoadingSpinner visible={spinner} />
        <View style={Globals.header}>
          <HeaderBackBtn
            title="Add Bank Account"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={Globals.container}>
          <ScrollView style={Globals.padding_horiz_20}>
            <View style={styles.innerContainer}>
              <CustomInput
                editable
                label="Bank Name"
                icon={null}
                value={name}
                onChangeText={setName}
              />
              {/* <View style={{ marginBottom: 20, }}   >
                <View style={{ width: '100%', paddingHorizontal: 7, }}>
                  <Text style={[Typography.POPPINS_MEDIUM_LIGHTGRAY_12, { color: '#9D9D9D' }]}>Account type</Text>
                  <View style={[Globals.h_center, { width: '100%', marginVertical: 12, }]}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row'  }} onPress={()=>setAccountType('Saving')}>
                      {account_type == 'Saving' ? <Svg_radio_checked /> : <Svg_radio_unchecked />} 
                      <Text style={[{ flex: 1, marginLeft: 8, }, Typography.POPPINS_MEDIUM_LIGHTBLACK_16]}>Saving</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={()=>setAccountType('Current')}>
                      {account_type == 'Current' ? <Svg_radio_checked /> : <Svg_radio_unchecked />}
                      <Text style={[{ flex: 1, marginLeft: 8, }, Typography.POPPINS_MEDIUM_LIGHTBLACK_16]}>Current</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#aaa' }} />
                </View>
              </View> */}
              {/* <CustomInput
                editable
                label="Account Number"
                icon={null}
                value={accountNumber}
                onChangeText={setAccountNumber}
              /> */}
              <CustomInput
                editable
                label="IBAN Number"
                icon={null}
                value={iban_number}
                onChangeText={setIbanNumber}
              />
              {/* <CustomInput
                editable
                label="IFSC Code"
                icon={null}
                value={ifsc_code}
                onChangeText={setIfscCode}
              /> */}
              <CustomInput
                editable
                label="Swift Code"
                icon={null}
                value={swift_code}
                onChangeText={setSwiftCode}
              />
              <CustomInput
                editable
                label="Other Details"
                icon={null}
                value={other}
                onChangeText={setOther}
              />
            </View>
            <PrimaryBtn style={{marginTop: 20,}} title="Submit" onPress={onSubmit} />
          </ScrollView>
        </View>
      </View>
    </DismissKeyboard>
  );
};
export default AddBankScreen;
