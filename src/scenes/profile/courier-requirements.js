import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Globals, Colors, Spacing } from '_styles';
import { HeaderBackBtn, RiderReqItem } from '_molecules';
import ImgPickOptionModal from 'components/modals/ImgPickOptionModal';
import VehicleTypeModal from 'components/modals/VehicleTypeModal';

const CourierRequirements = ({ navigation }) => {

  const [isShowDocPickModal, ShowDocPickModal] = useState(false);
  const [isShowVehicleModal, ShowVehicleModal] = useState(false);
  const [vehicleType, SetVehicleType] = useState('Car');

  const data = [
    { title: 'Driver License', value: '1 document attached', checked: true },
    { title: 'Profile Photo', value: 'No', checked: false },
    { title: 'Proof of work', value: 'No', checked: false },
    { title: 'Vehicle Type', value: 'Car', checked: true },
    { title: 'Vehicle Registration', value: 'No', checked: false },
    { title: 'Vehicle Insurance', value: '1 document attached', checked: true },
    { title: 'Vehicle Work Contract Signed', value: '1 document attached', checked: true },
  ]

  const onImageUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    }).then(image => {
      ShowDocPickModal(false);
    });
  }
  const onCapture = () => {
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
    }).then(image => {
      ShowDocPickModal(false);
    });
  }
  const onFilePick = () => {
  }

  const onSelectVehicle = (value) => {
    SetVehicleType(value)
  }

  const onPressItem = (item) => {
    if (item.title == 'Driver License' || item.title == 'Vehicle Insurance' || item.title == 'Vehicle Work Contract Signed') {
      ShowDocPickModal(true);
    }
    else if (item.title == 'Vehicle Type') {
      ShowVehicleModal(true)
    }
  }

  const keyExtractor = (item, index) => item.title;
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
      >
        <RiderReqItem
          data={item}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={Globals.flex_1}>
      <View style={Globals.header}>
        <HeaderBackBtn
          title="Rider Requirements"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={Globals.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          style={Globals.padding_horiz_20}
          contentContainerStyle={[Globals.flex_grow_1,]}
        />
      </View>
      <ImgPickOptionModal showModal={isShowDocPickModal}
        onCapture={onCapture}
        onImageUpload={onImageUpload}
        onFilePick={onFilePick}
        onClose={() => ShowDocPickModal(false)} />
      <VehicleTypeModal showModal={isShowVehicleModal}
        curValue={vehicleType}
        onSelect={onSelectVehicle}
        onClose={() => ShowVehicleModal(false)} />
    </View>
  );
};
export default CourierRequirements;
