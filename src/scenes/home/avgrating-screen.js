import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import {Globals, Typography} from '_styles';
import {HeaderBackBtn, ReviewItem} from '_molecules';
import {AvgRatingStyles as styles} from './home-styles';
import {Divider} from 'react-native-elements';
import {EmptyComponent, LoadingSpinner, RatingCount} from '_atoms';
import {API, CONSTANTS} from '_service';
import {handleErrorMsg} from '_utils';
const AvgRatingScreen = ({navigation}) => {
  const [spinner, setSpinner] = useState(false);
  const [r1, setR1] = useState(0);
  const [r2, setR2] = useState(0);
  const [r3, setR3] = useState(0);
  const [r4, setR4] = useState(0);
  const [r5, setR5] = useState(0);
  const [reviewCnt, setReviewCnt] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [reviews, setReviews] = useState([]);
  const page = useRef(0);
  const allLoaded = useRef(false);
  const [refreshing, setRefreshing] = useState(false);
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
  useEffect(() => {
    setSpinner(true);
    API.getReviewOverall()
      .then((response) => {
        setSpinner(false);
        setR1(response.data.r1);
        setR2(response.data.r2);
        setR3(response.data.r3);
        setR4(response.data.r4);
        setR5(response.data.r5);
        setReviewCnt(response.data.reviewCnt);
        setAvgRating(response.data.avgRating);
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  }, []);
  const fetchMore = () => {
    console.log('FetchMore');
    if (allLoaded.current === true || refreshing === true) {
      return;
    }
    console.log('fetchMore');
    setShouldFetch(true);
  };
  const keyExtractor = (item, index) => item.id.toString();
  const renderItem = ({item}) => {
    return (
      <ReviewItem
        rating={item.rating}
        avatar="https://i.ibb.co/bzyBndt/refreshingimg-avatar2.png"
        name={item.customer_name}
        time={item.created_at}
        description={item.comment}
      />
    );
  };
  return (
    <View style={Globals.flex_1}>
      <LoadingSpinner visible={spinner} />
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Average Ratings"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.top_container}>
        <View style={styles.overall_container}>
          <Text style={Typography.MONSERRAT_BOLD_LIGHTBLACK_64}>
            {avgRating}
          </Text>
          <Text style={Typography.MONSERRAT_SEMIBOLD_LIGHTBLACK_31}>
            ({reviewCnt})
          </Text>
        </View>
        <View style={styles.detail_container}>
          <RatingCount rating={5} count={r5} />
          <RatingCount rating={4} count={r4} />
          <RatingCount rating={3} count={r3} />
          <RatingCount rating={2} count={r2} />
          <RatingCount rating={1} count={r1} />
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={Globals.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={reviews}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          contentContainerStyle={Globals.flex_grow_1}
          onEndReached={() => {
            fetchMore();
          }}
          ListEmptyComponent={
            allLoaded.current && <EmptyComponent text={CONSTANTS.NO_REVIEWS} />
          }
          ListHeaderComponent={
            <Text style={styles.all_review}>All Reviews</Text>
          }
          ListFooterComponent={refreshing && <ActivityIndicator />}
        />
      </View>
    </View>
  );
};
export default AvgRatingScreen;
