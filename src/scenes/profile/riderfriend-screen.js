import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {Globals} from '_styles';
import {HeaderBackBtn, RiderItem} from '_molecules';
import {RiderFriendStyles as styles} from './profile-styles';
import {API, CONSTANTS} from '_service';
import TouchableScale from 'react-native-touchable-scale';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors, Spacing} from '_styles';
import {handleErrorMsg} from '_utils';
import {EmptyComponent} from '_components';
import {useFocusEffect} from '@react-navigation/core';
const RiderFriendScreen = ({navigation}) => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const allLoaded = useRef(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const page = useRef(0);
  const fetchMore = () => {
    if (allLoaded.current === true || refreshing === true) {
      return;
    }
    console.log('fetchMore');
    setShouldFetch(true);
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log('RiderFriend - useFocusEffect');
      page.current = 0;
      allLoaded.current = false;
      setData([]);
      setShouldFetch(true);
    }, []),
  );
  useEffect(() => {
    console.log('useEffect', shouldFetch);
    if (shouldFetch === false) {
      return;
    }
    setRefreshing(true);
    setShouldFetch(false);
    const fetchFriends = async () => {
      API.fetchFriends({page: page.current})
        .then((response) => {
          setRefreshing(false);
          if (response.data.friends.length === 0) {
            allLoaded.current = true;
          }
          page.current = page.current + 1;
          setData((oldData) => [...oldData, ...response.data.friends]);
          console.log(response.data);
        })
        .catch((err) => {
          setRefreshing(false);
          handleErrorMsg(err);
          console.log(err);
        });
    };
    fetchFriends();
  }, [shouldFetch]);
  const keyExtractor = (item, index) => item.id;
  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableScale
        onPress={() =>
          navigation.navigate('RiderDetail', {friend_id: item.id})
        }>
        <RiderItem
          avatar={item.profile_img}
          name={item.name}
          online={item.status}
          rightIcon={
            <Icon
              name="message1"
              color={Colors.PRIMARY}
              size={Spacing.SCALE_24}
            />
          }
        />
      </TouchableScale>
    );
  };

  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Rider Friends List"
          onPress={() => navigation.goBack()}
          rightBtn={
            <Button
              containerStyle={styles.back_btn}
              icon={
                <Icon
                  name="search1"
                  size={Spacing.SCALE_24}
                  color={Colors.LIGHTBLACK}
                />
              }
              type="clear"
              onPress={() => navigation.navigate('SearchRider')}
            />
          }
        />
      </View>
      <View style={Globals.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          style={Globals.padding_horiz_20}
          contentContainerStyle={[Globals.flex_grow_1, ]}
          onEndReached={() => {
            fetchMore();
          }}
          ListEmptyComponent={
            allLoaded.current && <EmptyComponent text={CONSTANTS.NO_FRIEND} />
          }
          ListFooterComponent={refreshing && <ActivityIndicator />}
        />
      </View>
    </View>
  );
};
export default RiderFriendScreen;
