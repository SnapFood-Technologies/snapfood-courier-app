import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-elements';
import {Spacing, Colors, Typography} from '_styles';
import Moment from 'react-moment';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Spacing.SCALE_12,
    paddingHorizontal: Spacing.SCALE_16,
    backgroundColor: 'white'
  },
  inner_container: {
    flex: 1,
    justifyContent: 'center',
  },
  nametime_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.SCALE_4,
  },
  avatar: {
    width: Spacing.SCALE_48,
    height: Spacing.SCALE_48,
    borderRadius: Spacing.SCALE_24,
    marginRight: Spacing.SCALE_12,
  },
  divider: {
    backgroundColor: Colors.LIGHTGRAY,
  },
});
const ChatItem = (props) => {
  const {data} = props;
  console.log('ChatItem', data);
  return ( 
      <View style={styles.container}>
        <FastImage source={{uri: data.avatar}} style={styles.avatar} />
        <View style={styles.inner_container}>
          <View style={styles.nametime_container}>
            <Text style={Typography.MONSERRAT_BOLD_DARKBLACK_15}>
              {data.name}
            </Text>
            <Moment
              element={Text}
              fromNow
              style={Typography.MONSERRAT_MEDIUM_LIGHTGRAY_11}>
              {data.time}
            </Moment>
          </View>
          <Text
            style={
              data.seen
                ? Typography.MONSERRAT_MEDIUM_LIGHTGRAY_12
                : Typography.MONSERRAT_BOLD_LIGHTBLACK_12
            }>
            {data.message}
          </Text>
        </View>
      </View> 
  );
};
export default ChatItem;
