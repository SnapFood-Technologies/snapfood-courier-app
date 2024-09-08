import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {Globals, Spacing, Colors} from '_styles';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'; 
import {SearchRiderStyles as styles} from './profile-styles';
import {API, CONSTANTS} from '_service';
import {RiderItem} from '_molecules';
import TouchableScale from 'react-native-touchable-scale';
import {handleErrorMsg} from '_utils';
import {EmptyComponent} from '_atoms';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../components/molecules/searchbox';

const SearchRiderScreen = ({navigation}) => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const [search, updateSearch] = useState('');
  const page = useRef(0);
  const allLoaded = useRef(false);
  const filter = useRef('');
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const onSearch = (text) => {
    updateSearch(text);
    filter.current = text;
    page.current = 0;
    allLoaded.current = false;
    setData([]);
    setShouldFetch(true);
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
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
              name="right"
              color={Colors.LIGHTGRAY}
              size={Spacing.SCALE_16}
            />
          }
        />
      </TouchableScale>
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      page.current = 0;
      allLoaded.current = false;
      setData([]);
      setShouldFetch(true);
    }, []),
  );
  useEffect(() => {
    console.log('useEffect', shouldFetch, page);
    if (shouldFetch === false) {
      return;
    }
    setRefreshing(true);
    setShouldFetch(false);

    const fetch = async () => {
      API.fetchRiders({page: page.current, filter: filter.current})
        .then((response) => {
          setRefreshing(false);
          if (response.data.riders.length === 0) {
            allLoaded.current = true;
          }
          page.current = page.current + 1;
          setData((oldData) => [...oldData, ...response.data.riders]);
          console.log(response.data);
        })
        .catch((err) => {
          setRefreshing(false);
          handleErrorMsg(err);
        });
    };
    fetch();
  }, [shouldFetch]);

  const fetchMore = () => {
    if (allLoaded.current === true || refreshing === true) {
      return;
    }
    console.log('fetchRiders');
    setShouldFetch(true);
  };
  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <View style={styles.header_container}>  
          <SearchBar
            onChangeText={onSearch} 
            onClose={()=>{
              navigation.goBack()
            }}
            hint={'Type here to search'}
          /> 
        </View>
      </View> 
      <View style={Globals.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          style={Globals.padding_horiz_20}
          contentContainerStyle={Globals.flex_grow_1}
          ListEmptyComponent={
            allLoaded.current && <EmptyComponent text={CONSTANTS.NO_RIDER} />
          }
          onEndReached={() => {
            fetchMore();
          }}
          ListFooterComponent={refreshing && <ActivityIndicator />}
        />
      </View>
    </View>
  );
};
export default SearchRiderScreen;
