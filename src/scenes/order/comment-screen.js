import React, { useState, useEffect } from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  View,
  Platform,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { CommentCell, HeaderBackBtn, LoadingSpinner } from '_components';
import { CONSTANTS, API } from '_service';
import { Globals, Spacing, Colors } from '_styles';
import { OrderStyles as styles } from './order-styles';
import { connect } from 'react-redux';
import { handleErrorMsg } from '_utils';
import moment from 'moment-timezone';
import Config from 'react-native-config';
import { getImageFullURL } from 'utils/common';
import EmojiBoard from '../../components/react-native-emoji-board'
import ImgPickOptionModal from '../../components/modals/ImgPickOptionModal';
// svgs  
import Svg_emoji from 'assets/svgs/chat/ic_emoji.svg';
import Svg_img from 'assets/svgs/chat/ic_img.svg';
import Svg_send from 'assets/svgs/chat/ic_sender.svg'

const CommentScreen = (props) => {
  const { navigation, name, profile_img, route } = props;
  const keyExtractor = (item, index) => index.toString();
  const [spinner, setSpinner] = useState(false);
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState('');

  const { currentOrder } = route.params;

  const [showEmoji, setShowEMoji] = useState(false);
  const [isShowImgPickModal, ShowImgPickModal] = useState(false)
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (currentOrder === null) {
      return;
    }
    setSpinner(true);
    API.getOrderComments({
      order_id: currentOrder.id,
      is_all: true,
    })
      .then((response) => {
        setSpinner(false);
        console.log(response.data.comments);
        setComments(response.data.comments);
      })
      .catch((err) => {
        setSpinner(false);
        handleErrorMsg(err);
      });
  }, [currentOrder]);

  const onPostComment = () => {
    console.log('onPostComment', myComment);
    API.addComment({
      type: 'text',
      text: myComment,
      vendor_id: currentOrder.vendor.id,
      order_id: currentOrder.id,
    })
      .then((response) => {
        setComments((oldComments) => [
          {
            type: 'text',
            text: myComment,
            name: name,
            avatar: getImageFullURL(profile_img),
            created_at: moment.tz(moment(), Config.TIME_ZONE),
          },
          ...oldComments,
        ]);
        setMyComment('');
      })
      .catch((err) => {
        handleErrorMsg(err);
      });
  };

  const onPostImage = async (image_data) => {
    try {
      let res = await API.uploadChatImage({ image: image_data });
      if (res != null && res.data != null && res.data.url != null) {
        API.addComment({
          type: 'image',
          text : '',
          image: res.data.url,
          vendor_id: currentOrder.vendor.id,
          order_id: currentOrder.id,
        })
          .then((response) => {
            setComments((oldComments) => [
              {
                type: 'image',
                image: res.data.url,
                name: name,
                avatar: getImageFullURL(profile_img),
                created_at: moment.tz(moment(), Config.TIME_ZONE),
              },
              ...oldComments,
            ]);
            setMyComment('');
          })
          .catch((err) => {
            console.log(err)
            handleErrorMsg(err);
          });
      }
    }
    catch (error) {
      console.log('uploadChatImage error', error)
    }
  }

  const onImageUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    }).then(image => {
      ShowImgPickModal(false)
      onPostImage(image.data)
    });
  }
  const onCapture = () => {
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
    }).then(image => {
      ShowImgPickModal(false)
      onPostImage(image.data)
    });
  }

  const onSelectEmoji = emoji => {
    setMyComment(val => val.concat(emoji.code))
  }

  const renderItem = ({ item }) => {
    console.log(item.avatar);
    return (
      <CommentCell
        data={item}
        name={item.name} 
        avatar={item.avatar}
        created_at={item.created_at}
      />
    );
  };
  return (
    <KeyboardAvoidingView
      style={Globals.flex_1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LoadingSpinner visible={spinner} />
      <View style={Globals.header}>
        <HeaderBackBtn
          title={CONSTANTS.COMMENTS}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={[Globals.container, Globals.flex_1,]}>
        <FlatList
          style={styles.list_content}
          keyExtractor={keyExtractor}
          data={comments}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <View style={[Globals.flex_row,]}>
          <TouchableOpacity onPress={() => ShowImgPickModal(true)} style={{ marginRight: 8 }}>
            <Svg_img />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEMoji(true)} style={{ marginRight: 8 }}>
            <Svg_emoji />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.text_input}
          placeholder="Type something"
          value={myComment}
          onChangeText={(val) => setMyComment(val)}
        />
        <TouchableOpacity onPress={onPostComment} disabled={myComment === ''}>
          <Svg_send />
        </TouchableOpacity>
      </View>
      <EmojiBoard showBoard={showEmoji} tabBarPosition='top' tabBarStyle={{ height: 50, paddingTop: 12 }}
        onRemove={() => setShowEMoji(false)}
        onClick={onSelectEmoji} />
      <ImgPickOptionModal
        showModal={isShowImgPickModal}
        onCapture={onCapture}
        onImageUpload={onImageUpload}
        onClose={() => ShowImgPickModal(false)} />
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state) => {
  const { profile_img, name } = state.personalInfo;
  return { profile_img, name };
};
export default connect(mapStateToProps, null)(CommentScreen);
