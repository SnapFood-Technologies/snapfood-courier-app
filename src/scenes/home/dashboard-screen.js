import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Badge } from 'react-native-elements';
import { DashboardStyles as styles } from './home-styles';
import { CONSTANTS, API, CHAT } from '_service';
import {
  LOGO_IMG,
  WALLET,
  CHECKED_BOX,
  CROSSED_BOX,
  STAR,
  BELL,
  MESSAGE,
} from '_assets/images';
import { Spacing, Typography } from '_styles';
import TouchableScale from 'react-native-touchable-scale';
import { CustomScrollView, LoadingSpinner } from '_atoms';
import { connect } from 'react-redux';
import { handleErrorMsg } from '_utils';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
// svgs
import Svg_inprogress from 'assets/svgs/order/inprogress.svg';

const DashboardScreen = (props) => {
  const { delivered, rejected, rider_id, navigation } = props;
  const [spinner, setSpinner] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  const [todayEarning, setTodayEarning] = useState(0);
  const [monthEarning, setMonthEarning] = useState(0);
  const [weekEarning, setWeekEarning] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCnt, setReviewCnt] = useState(0);
  const [inProgressCnt, setInProgressCnt] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setSpinner(true);
      API.getDashboardData()
        .then((response) => {
          console.log('getDashboardData ', response.data);

          setSpinner(false);
          setNotificationCount(response.data.count);
          setTodayEarning(Math.round(response.data.today));
          setWeekEarning(Math.round(response.data.week));
          setMonthEarning(Math.round(response.data.month));
          setReviewCnt(response.data.reviewCnt);
          setAvgRating(response.data.avgRating);
        })
        .catch((err) => {
          setSpinner(false);
          console.log('getDashboardData err ', err);
          handleErrorMsg(err);
        });

      CHAT.fetchUnreadChat('channels', rider_id).then(unreadCnt => {
        setChatCount(unreadCnt);
      })
        .catch((error) => {
          handleErrorMsg(error);
        });

      API.getCurrentOrders()
        .then((response) => { 
          if (response.data != null && response.data.orders != null)  {
            setInProgressCnt(response.data.orders.length || 0)
          } 
        })
        .catch((err) => {
          console.log('getCurrentOrders ', err) 
          handleErrorMsg(err);
        });

    }, [rider_id]),
  );
  
  return (
    <View>
      <LoadingSpinner visible={spinner} />
      <View style={styles.header}>
        <Image source={LOGO_IMG} style={{width: 180, height: 28, resizeMode: 'contain'}}/>
        <View style={styles.header_btn_container}>
          <TouchableOpacity
            style={styles.header_btn}
            onPress={() => navigation.navigate('Notification')}>
            <Image source={BELL} />
            {notificationCount !== 0 && (
              <Badge
                value={notificationCount > 9 ? "9+" : notificationCount}
                containerStyle={[styles.badge_container, { minWidth: 28, }]}
                badgeStyle={styles.badge}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.header_btn}
            onPress={() => navigation.navigate('Chat')}>
            <Image source={MESSAGE} />
            {chatCount !== 0 && (
              <Badge
                value={chatCount > 9 ? "9+" : chatCount}
                containerStyle={[styles.badge_container, { minWidth: 28, }]}
                badgeStyle={{backgroundColor : '#ffa300'}}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <CustomScrollView>
        <Text style={styles.label}>Earnings</Text>
        <TouchableScale
          onPress={() => {
            navigation.navigate('Earnings');
          }}>
          <View style={styles.earning_container}>
            <View style={{ ...styles.row, ...styles.margin_bottom_24 }}>
              <View style={styles.flex_1}>
                <Image source={WALLET} />
              </View>
              <View style={styles.col_flex_2}>
                <Text style={Typography.POPPINS_MEDIUM_WHITE_12}>
                  {CONSTANTS.TODAY_EARNINGS}
                </Text>
                <Text style={Typography.POPPINS_SEMIBOLD_WHITE_36}>
                  {todayEarning}L
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View
                style={{
                  ...styles.col_flex_2,
                }}>
                <Text style={styles.earning_label}>
                  {CONSTANTS.WEEKLY_EARNINGS}
                </Text>
                <View style={styles.border_right_white_1}>
                  <Text style={styles.earning_value}>{weekEarning}L</Text>
                </View>
              </View>
              <View style={styles.col_flex_2}>
                <Text style={styles.earning_label}>
                  {CONSTANTS.MONTHLY_EARNING}
                </Text>
                <Text style={styles.earning_value}>{monthEarning}L</Text>
              </View>
            </View>
          </View>
        </TouchableScale>

        <Text style={styles.label}>Orders</Text>
        <View style={styles.summary_container}>
          <TouchableScale
            style={styles.delivered_container}
            onPress={() => {
              navigation.navigate('Orders');
            }}>
            <Image source={CHECKED_BOX} style={styles.summary_image} />
            <Text
              style={{
                ...Typography.POPPINS_SEMIBOLD_WHITE_48,
                marginTop: Spacing.SCALE_16,
              }}>
              {delivered}
            </Text>

            <Text style={Typography.POPPINS_SEMIBOLD_WHITE_20}>
              {CONSTANTS.DELIVERED}
            </Text>
            <Text style={Typography.POPPINS_MEDIUM_WHITE_16}>
              {CONSTANTS.ORDERS}
            </Text>
          </TouchableScale>

          <TouchableScale
            style={styles.rejected_container}
            onPress={() => {
              navigation.navigate('Orders');
            }}>
            {/* <Image source={CROSSED_BOX} style={styles.summary_image} /> */}
            <Svg_inprogress style={styles.summary_image}/>
            <Text
              style={{
                ...Typography.POPPINS_SEMIBOLD_WHITE_48,
                marginTop: Spacing.SCALE_16,
              }}>
              {inProgressCnt}
            </Text>
            <Text style={Typography.POPPINS_SEMIBOLD_WHITE_20}>
              In Progress
            </Text>
            <Text style={Typography.POPPINS_MEDIUM_WHITE_16}>
              {CONSTANTS.ORDERS}
            </Text>
          </TouchableScale>
        </View>
        <Text style={styles.label}>Ratings</Text>
        <TouchableScale
          style={styles.rating_container}
          onPress={() => {
            navigation.navigate('ViewReview');
          }}>
          <View style={styles.col_flex_2}>
            <Text style={Typography.POPPINS_SEMIBOLD_WHITE_20}>
              {CONSTANTS.MY_RATINGS}
            </Text>
          </View>
          <View>
            <View style={styles.center_row}>
              <Text style={Typography.POPPINS_SEMIBOLD_WHITE_28}>
                {avgRating}
              </Text>
              <Image source={STAR} style={{ marginLeft: Spacing.SCALE_8 }} />
            </View>

            <Text style={Typography.POPPINS_MEDIUM_WHITE_12}>
              {reviewCnt} Reviews
            </Text>
          </View>
        </TouchableScale>
      </CustomScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  const { delivered, rejected, unique_id } = state.personalInfo;
  return { delivered, rejected, rider_id: unique_id };
};
export default connect(mapStateToProps, null)(DashboardScreen);
