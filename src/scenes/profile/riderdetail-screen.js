import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Globals } from '_styles';
import { HeaderBackBtn } from '_molecules';
import FastImage from 'react-native-fast-image';
import { Badge, Button } from 'react-native-elements';
import { RiderDetailStyles as styles } from './profile-styles';
import { CustomInput, LoadingSpinner } from '_atoms';
import { API, CONSTANTS, CHAT } from '_service';
import { handleErrorMsg } from '_utils';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import ConfirmModal from 'components/modals/ConfirmModal';
// svgs
import Svg_location from '../../assets/svgs/profile/location.svg'
import moment from 'moment';
import { CHANNEL_TYPE } from 'service/constants';

const RiderDetailScreen = (props) => {
  const { route, navigation, user } = props;
  const { friend_id } = route.params;

  const [spinner, setSpinner] = useState(false);
  const [isRemoveConfrimModal, setRemoveConfirmModal] = useState(false);
  const [rider, setRider] = useState(null);
  useEffect(() => {
    API.fetchRiderDetail({
      friend_id,
    })
      .then((response) => {
        console.log('FetchRiderDetail', response.data);
        setRider(response.data.rider);
        const riderData = response.data.rider;
        if (riderData.friend_status === 'received') {
          API.setFriendRequestNotificationSeen({ friend_id: riderData.id }).catch(
            (err) => {
              handleErrorMsg(err);
            },
          );
        }
      })
      .catch((err) => {
        handleErrorMsg(err);
      });
  }, [friend_id]);

  const sendFriendRequest = () => {
    setSpinner(true);
    API.sendFriendRequest({
      friendID: rider.id,
    })
      .then((response) => {
        setSpinner(false);
        Toast.show({
          type: 'success',
          text1: CONSTANTS.APP_NAME,
          text2: response.data.message,
        });
        navigation.goBack();
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };
  const acceptRequest = () => {
    setSpinner(true);
    API.acceptFriendRequest({ friendID: rider.id })
      .then((response) => {
        setSpinner(false);
        navigation.goBack();
        console.log(response.data);
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };
  const declineRequest = () => {
    setSpinner(true);
    API.declineFriendRequest({ friendID: rider.id })
      .then((response) => {
        setSpinner(false);
        navigation.goBack();
        console.log(response.data);
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  };

  const onChat = async () => {
    let found_channel = await CHAT.findSingleChannel(user.unique_id, rider.unique_id);
    let channel_id = null;
    if (found_channel != null) {
      channel_id = found_channel.id;
    }
    else {
      let partner = {
        id: rider.unique_id,
        full_name: rider.name,
        photo: rider.profile_img,
        phone: rider.phone_number,
        email: rider.email,
        role: CONSTANTS.ROLE_RIDER
      };

      channel_id = await CHAT.createSingleChannel(user, partner);
    }

    if (channel_id != null) {
      navigation.navigate('ChatMessage', { channelId: channel_id, channel: CHANNEL_TYPE.single })
    }
    else {
      handleErrorMsg('Something went wrong')
    }
  }


  return (
    <>
      {rider === null ? (
        <LoadingSpinner visible={true} />
      ) : (
        <View style={Globals.flex_1}>
          <LoadingSpinner visible={spinner} />
          <View style={Globals.header}>
            <HeaderBackBtn
              title="Rider Details"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={Globals.container}>
            <View style={styles.avatar_container}>
              <FastImage
                source={{ uri: rider.profile_img }}
                style={Globals.profileImg}
              />
              <Badge
                containerStyle={styles.badge_container}
                status={rider.status ? 'success' : 'error'}
                badgeStyle={styles.badge}
              />
            </View>
            <View style={styles.detail_container}>
              <Text style={styles.name}>{rider.name}</Text>
              {
                rider.birthdate != null && <Text style={styles.age}>{moment().diff(moment(rider.birthdate), 'years')} years</Text>
              }
            </View>
            <View style={[styles.detail_container, Globals.flex_1]}>
              <View style={Globals.h_center}>
                <Svg_location />
                {
                  <Text style={[styles.name, { marginLeft: 12, }]}>${rider.distance != -1 ? rider.distance.toString() : 0} Km</Text>
                }
              </View>
              <Text style={styles.age}>Distance</Text>
            </View>
            {rider.friend_status == undefined && (
              <View style={styles.btn_container}>
                <Button
                  title={CONSTANTS.SEND_REQUEST}
                  buttonStyle={styles.btn}
                  titleStyle={styles.btn_title}
                  onPress={sendFriendRequest}
                />
              </View>
            )}
            {rider.friend_status == 'sent' && (
              <View style={styles.btn_container}>
                <Button
                  title={`Waiting for ${rider.name} to accept your request.`}
                  buttonStyle={styles.btn}
                  titleStyle={styles.btn_title}
                  onPress={sendFriendRequest}
                  disabled
                />
              </View>
            )}
            {rider.friend_status == 'received' && (
              <View style={styles.btn_container}>
                <Button
                  type="outline"
                  buttonStyle={styles.btn_outline}
                  title={CONSTANTS.DECLINE_REQUEST}
                  titleStyle={styles.btn_title_outline}
                  onPress={declineRequest}
                />
                <Button
                  buttonColor="red"
                  title={CONSTANTS.ACCEPT_REQUEST}
                  buttonStyle={styles.btn}
                  titleStyle={styles.btn_title}
                  onPress={acceptRequest}
                />
              </View>
            )}

            {rider.friend_status == 'accepted' && (
              <View style={styles.btn_container}>
                <Button
                  onPress={onChat}
                  type="outline"
                  buttonStyle={styles.btn_outline}
                  title={CONSTANTS.CHAT_RIDER}
                  titleStyle={styles.btn_title_outline}
                />
                <Button
                  buttonColor="red"
                  title={CONSTANTS.REMOVE_FRIEND}
                  buttonStyle={styles.btn}
                  titleStyle={styles.btn_title}
                  onPress={() => setRemoveConfirmModal(true)}
                />
              </View>
            )}
          </View>
          <ConfirmModal
            showModal={isRemoveConfrimModal}
            title='Are you sure you want to Remove as a Friend?'
            yes='YES'
            no='NO'
            onYes={() => {
              setRemoveConfirmModal(false)
              declineRequest()
            }}
            onClose={() => {
              setRemoveConfirmModal(false)
            }}
          />
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { user: state.personalInfo };
};
export default connect(mapStateToProps, null)(RiderDetailScreen);
