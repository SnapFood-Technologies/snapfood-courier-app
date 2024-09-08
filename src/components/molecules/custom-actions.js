import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {Spacing, Colors} from '_styles';
import ActionSheet from 'react-native-actionsheet';
import {API} from '_service';
import {handleErrorMsg} from '_utils';
const styles = StyleSheet.create({
  container: {
    marginLeft: Spacing.SCALE_8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
const CustomActions = (props) => {
  const {onSend} = props;
  const refAction = useRef();
  const uplaodAndSend = (image_data) => {
    API.uploadChatImage({image: image_data})
      .then((response) => {
        console.log(response.data);
        onSend({
          image: response.data.url,
        });
      })
      .catch((err) => {
        handleErrorMsg(err);
        console.log(err.response);
      });
  };
  const chooseGallery = () => {
    console.log('chooseGallery');
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
      multiple: false,
      includeBase64: true,
    }).then((image) => {
      uplaodAndSend(image.data);
    });
  };
  const takePhoto = () => {
    console.log('takePhoto');
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
      useFrontCamera: false,
      includeBase64: true,
    }).then((image) => {
      uplaodAndSend(image.data);
    });
  };
  const onActionsPress = () => {
    refAction.current.show();
  };
  const onHandleAction = (index) => {
    console.log('onHandleAction', index);
    switch (index) {
      case 0:
        chooseGallery();
        break;
      case 1:
        console.log('Take Photo');
        takePhoto();
        break;
      default:
        return;
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={onActionsPress} style={styles.container}>
        <Icon name="image" size={Spacing.SCALE_24} color={Colors.PRIMARY} />
      </TouchableOpacity>
      <ActionSheet
        ref={refAction}
        options={['Choose Gallery', 'Take Photo', 'Cancel']}
        cancelButtonIndex={2}
        onPress={(index) => onHandleAction(index)}
      />
    </View>
  );
};

export default CustomActions;
