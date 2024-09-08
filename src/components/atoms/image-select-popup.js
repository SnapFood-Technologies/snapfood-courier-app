import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Spacing, Typography} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.SCALE_40,
  },
  innerContainer: {
    alignItems: 'center',

    justifyContent: 'center',
    flex: 1,
  },
  btnContainer: {
    backgroundColor: '#7B7B7B',
    width: Spacing.SCALE_64,
    height: Spacing.SCALE_64,
    borderRadius: Spacing.SCALE_32,
    marginBottom: Spacing.SCALE_16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const ImageSelectPopup = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          {borderRightColor: 'white', borderRightWidth: 1},
        ]}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() =>
            ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
              mediaType: 'photo',
              multiple: false,
              cropperCircleOverlay: true,
              includeBase64: true,
            }).then((image) => {
              props.onSelect(image.path, image.data);
              console.log(image);
            })
          }>
          <Icon name="image-outline" color="white" size={Spacing.SCALE_32} />
        </TouchableOpacity>
        <Text style={Typography.MONSERRAT_SEMIBOLD_WHITE_14}>
          CHOOSE GALLERY
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() =>
            ImagePicker.openCamera({
              width: 300,
              height: 300,
              cropping: true,
              mediaType: 'photo',
              useFrontCamera: true,
              cropperCircleOverlay: true,
              includeBase64: true,
            }).then((image) => {
              props.onSelect(image.path, image.data);
              console.log(image);
            })
          }>
          <Icon name="camera-outline" color="white" size={Spacing.SCALE_32} />
        </TouchableOpacity>
        <Text style={Typography.MONSERRAT_SEMIBOLD_WHITE_14}>TAKE PHOTO</Text>
      </View>
    </View>
  );
};
export default ImageSelectPopup;
