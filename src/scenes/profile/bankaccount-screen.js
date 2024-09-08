import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Globals, Typography} from '_styles';
import {HeaderBackBtn, PrimaryBtn} from '_components'; 
import {CONSTANTS} from '_service';

const BankAccountScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Bank Accounts"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={[Globals.container, Globals.padding_horiz_20, Globals.padding_vert_20]}>
        <FlatList
          data={[]} 
        />
        <View> 
          <PrimaryBtn title={CONSTANTS.ADD_BANK_ACCOUNT}  
            onPress={()=>{
              navigation.navigate('AddBankScreen')
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default BankAccountScreen;
