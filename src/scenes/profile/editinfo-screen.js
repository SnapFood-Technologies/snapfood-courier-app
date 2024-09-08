/* eslint-disable no-shadow */
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { Divider, Overlay } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Globals, Spacing, Typography, Colors } from '_styles';
import { HeaderBackBtn } from '_molecules';
import {
  CustomInput,
  DismissKeyboard,
  PrimaryBtn,
  ImageSelectPopup,
} from '_atoms';
import { setProfile } from '_redux/slices/personalInfo';
import { connect } from 'react-redux';
import { API, CONSTANTS } from '_service';
import { LoadingSpinner } from '_components';
import Toast from 'react-native-toast-message';
import { handleErrorMsg } from '_utils';
import { isEmpty, getImageFullURL } from 'utils/common';
import { EditInfoStyels as styles } from './profile-styles';
import ImgPickOptionModal from 'components/modals/ImgPickOptionModal';
// svgs
import Svg_user from 'assets/svgs/profile/user.svg';
import Svg_email from 'assets/svgs/profile/email.svg';
import Svg_phone from 'assets/svgs/profile/phone.svg';
import Svg_calendar from 'assets/svgs/earning/calendar.svg';

const EditInfoScreen = (props) => {
  const [spinner, setSpinner] = useState(false);
  const [isShowImgPickModal, ShowImgPickModal] = useState(false);
  const [isDateModal, ShowDateModal] = useState(false);

  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [phone_number, setPhoneNumber] = useState(props.phone_number);
  const [profile_img, setProfileImage] = useState(getImageFullURL(props.profile_img));
  const [birthday, setBirthday] = useState(props.birthdate == null ? new Date() : (moment(props.birthdate).toDate() || new Date()))

  let img_data = useRef(null);
  const onClkSave = () => {
    if (isEmpty(name) || isEmpty(email) || isEmpty(phone_number) || isEmpty(birthday)) { return }
    setSpinner(true);
    API.updatePersonalInfo({
      name: name,
      email: email,
      phone_number: phone_number,
      profile_img: img_data == null ? null : img_data.current,
      birthday: moment(birthday).format('YYYY-MM-DD'),
    })
      .then((response) => {
        setSpinner(false);
        const { setProfile, navigation } = props;
        if (response.data.rider != null) {
          setProfile({
            id : props.rider_id,
            name: response.data.rider.name,
            email: response.data.rider.email,
            phone_number: response.data.rider.phone_number,
            profile_img: response.data.rider.profile_img,
            birthdate: response.data.rider.birthdate,
          });
          navigation.goBack();
          Toast.show({
            type: 'success',
            text1: CONSTANTS.APP_NAME,
            text2: response.data.message,
          });
        }
      })
      .catch((err) => {
        console.log('updatePersonalInfo', err)
        setSpinner(false);
        handleErrorMsg(err);
      });
  };

  const onImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
      multiple: false,
      cropperCircleOverlay: true,
      includeBase64: true,
    }).then(image => {
      ShowImgPickModal(false)
      onSelect(image.path, image.data);
    });
  }
  const onCapture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
      useFrontCamera: true,
      cropperCircleOverlay: true,
      includeBase64: true,
    }).then(image => {
      ShowImgPickModal(false)
      onSelect(image.path, image.data);
    });
  }
  const onSelect = (path, data) => {
    setProfileImage(path);
    img_data.current = data;
  };

  const onSheetDateChange = (date) => {
    setBirthday(date);
    ShowDateModal(false);
  };

  const renderDatepickerModal = () => {
    return <Overlay visible={isDateModal} onBackdropPress={() => ShowDateModal(false)}>
      <CalendarPicker
        disabledDates={(date) => date.startOf('day') > moment()}
        width={Dimensions.get('window').width - 40}
        allowRangeSelection={false}
        selectedStartDate={birthday}
        initialDate={birthday}
        onDateChange={onSheetDateChange}
        showDayStragglers={true}
        selectedDayColor="#50B7ED"
        todayBackgroundColor="white"
        textStyle={Typography.POPPINS_MEDIUM_GRAY_600_14}
        monthTitleStyle={Typography.POPPINS_SEMIBOLD_BLACK_18}
        yearTitleStyle={Typography.POPPINS_SEMIBOLD_BLACK_18}
        customDayHeaderStyles={(dayOfWeek, month, year) => {
          return {
            style: {
              borderWidth: 0,
            },
            textStyle: Typography.POPPINS_SEMIBOLD_BLACK_12,
          };
        }}
        previousComponent={
          <View style={styles.chevron_container}>
            <MaterialIcon
              name="chevron-left"
              size={Spacing.SCALE_24}
              color={Colors.GRAY_500}
            />
          </View>
        }
        nextComponent={
          <View style={styles.chevron_container}>
            <MaterialIcon
              name="chevron-right"
              size={Spacing.SCALE_24}
              color={Colors.GRAY_500}
            />
          </View>
        }
      />
    </Overlay>
  }

  return (
    <DismissKeyboard>
      <View style={Globals.flex_1}>
        <LoadingSpinner visible={spinner} />
        <View style={Globals.header}>
          <HeaderBackBtn
            title="Personal Information"
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={[Globals.container, Globals.padding_horiz_20]}>
          <ScrollView>
            <View style={styles.innerContainer}>
              <View style={styles.imgContainer}>
                <FastImage
                  source={{ uri: profile_img }}
                  style={Globals.profileImg}
                />
                <TouchableOpacity
                  onPress={() => ShowImgPickModal(true)}
                  style={styles.editBtn_container}
                  activeOpacity={0.8}>
                  <Icon name="pencil" color="white" size={Spacing.SCALE_32} />
                </TouchableOpacity>
              </View>
              <CustomInput
                editable
                label="User name"
                icon={<Svg_user />}
                value={name}
                onChangeText={setName}
              />
              <CustomInput
                label="Email"
                icon={<Svg_email />}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                editable
              />
              <CustomInput
                label="Phone Number"
                icon={<Svg_phone />}
                keyboardType="phone-pad"
                value={phone_number}
                onChangeText={setPhoneNumber}
                editable
              />
              <TouchableOpacity style={{marginBottom: 20,}} activeOpacity={0.9} onPress={() => ShowDateModal(true)}>
                <View style={{width: '100%', paddingHorizontal: 7,}}>
                  <Text style={[Typography.POPPINS_MEDIUM_LIGHTGRAY_12, {color: '#888'}]}>Birth Date</Text>
                  <View style={[Globals.h_center, {width: '100%', marginVertical: 12,}]}>
                    <Svg_calendar />
                    <Text style={[{flex: 1, marginLeft: 4,}, Typography.POPPINS_MEDIUM_LIGHTBLACK_16]}>{moment(birthday).format('DD/MM/YYYY')}</Text>
                  </View>
                  <View style={{width: '100%', height: 0.5, backgroundColor : '#333'}}/>
                </View>
              </TouchableOpacity>
            </View>
            <PrimaryBtn title="Save info" onPress={onClkSave} />
          </ScrollView>
        </View>
        <ImgPickOptionModal showModal={isShowImgPickModal}
          onCapture={onCapture}
          onImageUpload={onImageUpload}
          onClose={() => ShowImgPickModal(false)} />
        {renderDatepickerModal()}
      </View>
    </DismissKeyboard>
  );
};
const mapStateToProps = (state) => {
  const { id, name, email, phone_number, profile_img, birthdate } = state.personalInfo;
  return { rider_id : id, name, email, phone_number, profile_img, birthdate };
};
const mapDispatchToProps = { setProfile };
export default connect(mapStateToProps, mapDispatchToProps)(EditInfoScreen);
