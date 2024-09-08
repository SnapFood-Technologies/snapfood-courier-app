import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Globals, Typography, Colors } from '_styles';
import { HeaderBackBtn, ReviewItem, RateItem } from '_molecules';
import { API, CONSTANTS } from '_service';
import { handleErrorMsg } from '_utils';
import { EmptyComponent } from '_atoms'; 

const ViewReviewScreen = ({ navigation }) => {

  const [r1, setR1] = useState(0);
  const [r2, setR2] = useState(0);
  const [r3, setR3] = useState(0);
  const [r4, setR4] = useState(0);
  const [r5, setR5] = useState(0);
  const [reviewCnt, setReviewCnt] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  const [shouldFetch, setShouldFetch] = useState(true);
  const [reviews, setReviews] = useState([]);
  const allLoaded = useRef(false);
  const page = useRef(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    API.getReviewOverall()
      .then((response) => {
        setR1(response.data.r1);
        setR2(response.data.r2);
        setR3(response.data.r3);
        setR4(response.data.r4);
        setR5(response.data.r5);
        setReviewCnt(response.data.reviewCnt);
        setAvgRating(response.data.avgRating);
      })
      .catch((err) => {
        handleErrorMsg(err);
      });
  }, []);

  useEffect(() => {
    if (shouldFetch === false) {
      return;
    }
    console.log('fetchReview', page.current);
    setShouldFetch(false);
    setRefreshing(true);
    API.getReviews({
      page: page.current,
    })
      .then((response) => {
        console.log(response.data);
        setRefreshing(false);
        if (response.data.reviews.length === 0) {
          allLoaded.current = true;
        }
        page.current = page.current + 1;
        setReviews((oldReviews) => [...oldReviews, ...response.data.reviews]);
        console.log(response.data);
      })
      .catch((err) => {
        setRefreshing(false);
        handleErrorMsg(err);
        console.log(err);
      });
  }, [shouldFetch]);

  const keyExtractor = (item, index) => index.toString();
  const fetchMore = () => {
    console.log('FetchMore');
    if (allLoaded.current === true || refreshing === true) {
      return;
    }
    console.log('fetchMore');
    setShouldFetch(true);
  };

  const renderOverview = () => {
    return (
      <View style={[Globals.h_center, Globals.padding_horiz_20, Globals.padding_vert_20]}>
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', paddingTop: 12,}}>
          <Text style={{fontSize: 36, lineHeight: 40, fontFamily: Typography.FONT_FAMILY_POPPINS_BOLD, color: Colors.LIGHTBLACK}}>{avgRating}</Text>
          <Text style={{fontSize: 14, fontFamily: Typography.FONT_FAMILY_POPPINS_BOLD, color: '#586060'}}>{reviewCnt} Reviews</Text>
        </View>
        <View style={[Globals.v_center, Globals.flex_1, {marginLeft: 25}]}>
          <RateItem maxValue={reviewCnt} value={r5} />
          <RateItem maxValue={reviewCnt} value={r4} />
          <RateItem maxValue={reviewCnt} value={r3} />
          <RateItem maxValue={reviewCnt} value={r2} />
          <RateItem maxValue={reviewCnt} value={r1} />
        </View> 
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <ReviewItem
        rating={item.rating}
        avatar={item.photo}
        name={item.customer_name}
        time={item.created_at}
        description={item.comment}
      />
    );
  };

  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Rating And Reviews"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={Globals.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={reviews}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          style={Globals.padding_horiz_10}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={Globals.flex_grow_1}
          onEndReached={() => {
            fetchMore();
          }}
          ListHeaderComponent={renderOverview}
          ListEmptyComponent={
            allLoaded.current && <EmptyComponent text={CONSTANTS.NO_REVIEWS} />
          }
          ListFooterComponent={refreshing && <ActivityIndicator />}
        />
      </View>
    </View>
  );
};
export default ViewReviewScreen;
