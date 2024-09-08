import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {Globals, Typography} from '_styles';
import {
  HeaderBackBtn,
  WalletAmount,
  PrimaryBtn,
  CashOutItem,
} from '_components';
import {MyWalletStyles as styles} from './profile-styles';
import {API, CONSTANTS} from '_service';
import { LIGHTBLACK } from 'styles/colors';
const MyWalletScreen = ({navigation}) => {
  const list = [
    // {
    //   amount: 100,
    //   bank: 'Axis',
    //   time: 'Now',
    // },
    // {
    //   amount: 100,
    //   bank: 'Axis',
    //   time: 'Now',
    // },
    // {
    //   amount: 100,
    //   bank: 'Axis',
    //   time: 'Now',
    // },
  ];

  const [myTotal, setTotal] = useState(0);

  useEffect(()=>{
    API.getMyWalletTotal()
    .then(({data}) => {
      setTotal(parseInt(data.total || 0))
    })
    .catch(err => {
      console.log('getMyWalletTotal err ', err);
    })
  }, [])

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item, index}) => {
    return <CashOutItem data={item} />;
  };
  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn title="My Wallet" onPress={() => navigation.goBack()} />
      </View>
      <View style={[Globals.container, Globals.padding_horiz_20, Globals.padding_vert_20]}>
        <WalletAmount amount={myTotal} />
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={
            <Text style={[Typography.POPPINS_SEMIBOLD_BLACK_18, {fontSize: Typography.FONT_SIZE_16}]}>
              Cash Out History
            </Text>
          }
          ListEmptyComponent={<Text style={[Typography.POPPINS_MEDIUM_PRIMARY_16, {width: '100%', textAlign: 'center', marginTop: 40, color: LIGHTBLACK, fontSize: Typography.FONT_SIZE_16}]}>There are not cashout available at this moment!</Text>}
          showsVerticalScrollIndicator={false}
        />
        {/* <View>
          <Text style={styles.tip}>{CONSTANTS.MAX_WITHDRAW_AMOUNT}</Text>
          <PrimaryBtn title={CONSTANTS.WITHDRAW_AMOUNT} disabled={true}/>
        </View> */}
      </View>
      <View />
    </View>
  );
};
export default MyWalletScreen;
