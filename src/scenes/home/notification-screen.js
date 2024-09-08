import React, {useEffect, useState, useRef} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Globals} from '_styles';
import {HeaderBackBtn, EmptyComponent} from '_components';
import NotificationCell from 'components/atoms/notification-cell';
import {API, CONSTANTS} from '_service';
import {handleErrorMsg} from '_utils';
import {FlatList} from 'react-native';
const NotificationScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const allLoaded = useRef(false);
  const page = useRef(0);
  useEffect(() => {
    console.log('useEffect', shouldFetch);
    if (shouldFetch === false) {
      return;
    }
    setRefreshing(true);
    setShouldFetch(false);
    const fetchNotifications = () => {
      API.getNotifications({page: page.current})
        .then((response) => {
          setRefreshing(false);
          if (response.data.notifications.length === 0) {
            allLoaded.current = true;
          }
          page.current = page.current + 1;
          setNotifications((oldNotifications) => [
            ...oldNotifications,
            ...response.data.notifications,
          ]); 
        })
        .catch((err) => {
          setRefreshing(false);
          handleErrorMsg(err);
        });
    };
    fetchNotifications();
  }, [shouldFetch]);

  const renderItem = ({item}) => { 
    return (
      <NotificationCell
        type={item.type}
        message={item.message}
        seen={item.seen}
        friend_id={item.friend_id}
        created_at={item.created_at}
        navigation={navigation}
      />
    );
  };
  const fetchMore = () => {
    if (allLoaded.current === true || refreshing === true) {
      return;
    }
    console.log('fetchMore');
    setShouldFetch(true);
  };
  const keyExtractor = (item, index) => item.id.toString();
  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Notifications"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={Globals.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={notifications}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          style={{paddingHorizontal: 20,}}
          contentContainerStyle={Globals.flex_grow_1}
          onEndReached={() => {
            fetchMore();
          }}
          ListEmptyComponent={
            allLoaded.current && (
              <EmptyComponent text={CONSTANTS.NO_NOTIFICATION} />
            )
          }
          ListFooterComponent={refreshing && <ActivityIndicator />}
        />
      </View>
    </View>
  );
};
export default NotificationScreen;
