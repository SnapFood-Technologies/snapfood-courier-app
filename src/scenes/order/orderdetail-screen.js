/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {Globals, Spacing, Colors, Typography} from '_styles';
import Icon from 'react-native-vector-icons/Octicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Config from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';
import {
  HeaderBackBtn,
  IconLabelLocation,
  ItemDetail,
  BillDetail,
  VendorDetail,
  DashWithDivider,
  WaveDivder,
  ClientDetail,
  PrimaryBtn,
  CommentCell,
  LoadingSpinner,
  OrderCompleteOverlay,
} from '_components';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {OrderDetailStyles as styles} from './order-styles';
import {connect} from 'react-redux';
import {DashDivider} from '_atoms';
import {API, CONSTANTS, CHAT} from '_service';
import {useEffect} from 'react';
import {handleErrorMsg} from '_utils';
import {useFocusEffect} from '@react-navigation/native';
import {setCurrentOrder} from 'redux/slices/currentOrder';
import {increaseDelivered} from 'redux/slices/personalInfo';
import PaymentMethod from 'components/atoms/payment-method';
import OrderDeliveredModal from 'components/modals/OrderDeliveredModal';
import {OrderMapView, OrderDeliveryStepper} from '_organisms';
import {MAP_BG} from 'assets/images';
import {CHANNEL_TYPE, ORDER_STATUS} from 'service/constants';
import {MESSAGE} from '_assets/images';

const OrderDetailScreen = (props) => {
  const {
    navigation,
    latitude,
    longitude,
    address,
    order,
    setCurrentOrder,
    increaseDelivered,
    route,
  } = props;

  const [shouldFetch, setShouldFetch] = useState(true);
  const [commentList, setCommentList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isConfrimModal, showConfirmModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [orderSupportChannel, setOrderSupportChannel] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      console.log('useFocusEffect-OrderDetailScreen');
      setShouldFetch(true);
    }, []),
  );
  useEffect(() => {
    if (order === null) {
      return;
    }
    if (shouldFetch === false) {
      return;
    }
    setShouldFetch(false);
    const prodList = [];
    order.products.forEach((item) => {
      prodList.push(
        <View style={styles.item_container} key={item.id}>
          <ItemDetail
            name={item.title}
            detail={item.description}
            quantity={item.quantity}
            options={item.options}
          />
        </View>,
      );
    });
    setProductList(prodList);
    setSpinner(true);
    API.getOrderComments({
      order_id: order.id,
      is_all: false,
    })
      .then((response) => {
        setSpinner(false);
        const comments = response.data.comments;
        const list = [];
        comments.forEach((comment) => {
          list.push(
            <CommentCell
              key={comment.id}
              data={comment}
              name={comment.name}
              message={comment.text}
              avatar={
                comment.avatar ?? 'https://i.ibb.co/bzyBndt/img-avatar2.png'
              }
              created_at={comment.created_at}
              hide_wrapper
            />,
          );
        });
        setCommentList(list);
      })
      .catch((err) => {
        console.log('OrderDetail catch', err);
        setSpinner(false);
        handleErrorMsg(err);
      });
  }, [order, shouldFetch]);

  useEffect(() => {
    if (order.status != ORDER_STATUS.delivered) {
      CHAT.getChannelData('order_support', `order_${order.id}`)
        .then((res) => {
          setOrderSupportChannel(res);
        })
        .catch((err) => {});
    }
  }, [order.id]);

  const markAsDelivered = () => {
    setSpinner(true);
    API.completeOrder({order_id: order.id})
      .then(() => {
        setSpinner(false);
        increaseDelivered();
        navigation.goBack();
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };

  const onPickup = () => {
    setSpinner(true);
    API.pickUpOrder({order_id: order.id})
      .then(() => {
        setSpinner(false);
        setCurrentOrder({...order, status: ORDER_STATUS.picked_by_rider});
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };

  const onOkay = () => {
    setOverlayVisible(false);
    navigation.navigate('Tab');
  };

  const onGoSupport = async () => {
    await CHAT.attendOrderSupportChannel(order.id, props.user);
    navigation.navigate('ChatMessage', {
      channelId: `order_${order.id}`,
      channel: CHANNEL_TYPE.order_support,
    });
  };

  return (
    <View style={Globals.flex_1}>
      <LoadingSpinner visible={spinner} />
      {overlayVisible && <OrderCompleteOverlay onPress={onOkay} />}
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Order Details"
          onPress={() => navigation.navigate('Tab')}
          rightBtn={
            orderSupportChannel != null && (
              <TouchableOpacity
                style={[Globals.h_center, styles.header_btn]}
                onPress={onGoSupport}>
                <Image source={MESSAGE} />
                <Text style={styles.support_title}>Support</Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
      <ScrollView>
        <OrderMapView
          order={order}
          status={true}
          style={{height: 220}}
          navigation={navigation}
        />
        <ImageBackground style={[Globals.padding_horiz_10]} source={MAP_BG}>
          <View style={styles.info_container}>
            <View style={[Globals.flex_row_space_between, {marginBottom: 16}]}>
              <Text style={styles.subject_title}>Delivery Details</Text>
              <PaymentMethod order={order} />
            </View>
            <OrderDeliveryStepper
              active_index={
                order.status == ORDER_STATUS.accepted
                  ? 1
                  : order.status == ORDER_STATUS.picked_by_rider
                  ? 2
                  : 3
              }
              labels={[
                'Pickup Order',
                'On the way to delivery',
                'Mark As Delivered',
              ]}
            />
          </View>
          <View style={styles.info_container}>
            <View style={styles.detail_container}>
              <Text style={Typography.MONSERRAT_SEMIBOLD_LIGHTBLACK_17}>
                {CONSTANTS.ITEM_DETAIL}
              </Text>
            </View>
            <VendorDetail
              avatar={Config.SERVER_URL + order.vendor.logo_thumbnail_path}
              name={order.vendor.title}
              description={order.vendor.description}
              order={order}
              hide_payment_method
              // onAddReceipt={() => { }}
            />
            {productList}
          </View>
          <View style={styles.info_container}>
            <View style={styles.detail_container}>
              <Text style={Typography.MONSERRAT_SEMIBOLD_LIGHTBLACK_17}>
                {CONSTANTS.LOCATION}
              </Text>
            </View>
            <IconLabelLocation
              icon={
                <Icon
                  name="location"
                  size={Spacing.SCALE_20}
                  color={Colors.RED_100}
                />
              }
              label="To"
              location={
                order.address.street +
                (order.address.notes ? ', ' + order.address.notes : '')
              }
            />
            <DashWithDivider />
            <IconLabelLocation
              icon={
                <FeatherIcon
                  name="compass"
                  size={Spacing.SCALE_20}
                  color={Colors.GRAY_600}
                />
              }
              label="My Location"
              location={address}
            />
          </View>
          <View style={styles.info_container}>
            <View
              style={[
                Globals.flex_row_space_between,
                {marginTop: 6, marginBottom: 10},
              ]}>
              <Text style={styles.subject_title}>{CONSTANTS.BILL_DETAIL}</Text>
              <PaymentMethod order={order} />
            </View>
            <BillDetail
              item_total={parseInt(order.sub_total)}
              total={parseInt(order.total_price)}
              fee={parseInt(order.delivery_fee)}
              tip={order.tip_rider}
              discount={parseInt(order.discount_amount)}
            />
          </View>
          <View style={styles.info_container}>
            <View style={[styles.detail_container, {marginBottom: 16}]}>
              <Text style={Typography.MONSERRAT_SEMIBOLD_LIGHTBLACK_17}>
                {CONSTANTS.CUSTOMER_DETAIL}
              </Text>
            </View>
            <View>
              <ClientDetail
                customer_data={order.customer}
                navigation={navigation}
                right
              />
            </View>
            <DashDivider />
            <View>
              <View style={styles.detail_container}>
                <View style={styles.comment_container}>
                  <Text style={styles.subject_title}>{CONSTANTS.COMMENTS}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('Comments', {currentOrder: order})
                    }>
                    <Text style={Typography.MONSERRAT_MEDIUM_PRIMARY_12}>
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>{commentList}</View>
            </View>
          </View>
          {order.status == ORDER_STATUS.accepted && (
            <PrimaryBtn
              title={CONSTANTS.PICKUP_ORDER_RESTAURANT}
              style={{marginTop: 25, marginBottom: 38}}
              onPress={() => onPickup()}
            />
          )}
          {order.status == ORDER_STATUS.picked_by_rider && (
            <PrimaryBtn
              title={CONSTANTS.MARK_DELIVERED}
              style={{marginTop: 25, marginBottom: 38}}
              onPress={() => showConfirmModal(true)}
            />
          )}
        </ImageBackground>
        <OrderDeliveredModal
          showModal={isConfrimModal}
          onOk={() => {
            showConfirmModal(false);
            markAsDelivered();
          }}
          onClose={() => {
            showConfirmModal(false);
          }}
        />
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {latitude, longitude, address} = state.locationInfo;
  const {currentOrder, orderStatus} = state.currentOrder;
  return {
    latitude,
    longitude,
    address,
    orderStatus,
    order: currentOrder,
    user: state.personalInfo,
  };
};
const mapDispatchToProps = {increaseDelivered, setCurrentOrder};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
