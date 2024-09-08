import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography, Spacing, Colors } from '_styles';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import Config from 'react-native-config';
import Lightbox from 'react-native-lightbox';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: Spacing.SCALE_10,
    padding: 20,
    borderRadius: Spacing.SCALE_12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62,
    elevation: 2,
  },
  flat_container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: Spacing.SCALE_10,
  },
  profile: {
    width: Spacing.SCALE_32,
    height: Spacing.SCALE_32,
    borderRadius: Spacing.SCALE_16,
    marginRight: Spacing.SCALE_16,
  },
  inner_container: {
    flex: 1,
  },
  nametime_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  readmore: {
    fontSize: 12,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.PRIMARY,
    marginTop: 10,
    lineHeight: 18,
  },
});
const CommentCell = (props) => {
  const { data, name, avatar, created_at, hide_wrapper } = props;
  const [showLen, setShowLen] = useState(60)

  const getMessage = () => {
    if (data.text == null) { return '' }
    return data.text;
  }

  return (
    <View style={hide_wrapper ? styles.flat_container : styles.container}>
      <FastImage source={{ uri: avatar }} style={styles.profile} />
      <View style={styles.inner_container}>
        <View style={styles.nametime_container}>
          <Text style={Typography.MONSERRAT_BOLD_DARKBLACK_13}>{name}</Text>
          <Moment
            tz="Europe/Tirane"
            element={Text}
            fromNow
            style={Typography.MONSERRAT_MEDIUM_LIGHTGRAY_11}>
            {moment.tz(created_at, Config.TIME_ZONE)}
          </Moment>
        </View>
        {
          data.type != "image" ?
            <View>
              <Text style={Typography.MONSERRAT_MEDIUM_LIGHTGRAY_11}>{getMessage().slice(0, showLen)}{getMessage().length > showLen && '...'}</Text>
              {
                getMessage().length > showLen &&
                <TouchableOpacity onPress={() => setShowLen(getMessage().length)}>
                  <Text style={styles.readmore}>Read more</Text>
                </TouchableOpacity>
              }
            </View>
            :
            <Lightbox activeProps={{
              style: { flex: 1, resizeMode: 'contain', },
            }}  >
              <FastImage
                style={[{
                  width: '100%',
                  height: 120,
                  marginRight: 20,
                  borderRadius: 5,
                  resizeMode: 'cover',
                }]}
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: data.image }}
              />
            </Lightbox>
        } 
      </View>
    </View>
  );
};
export default CommentCell;
