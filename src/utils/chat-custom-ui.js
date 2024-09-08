import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Spacing} from '_styles';
import {MessageText, Bubble, Time, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomActions} from '_molecules';
const styles = StyleSheet.create({
  sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.SCALE_12,
  },
});
export const renderBubble = (prop) => {
  return (
    <Bubble
      {...prop}
      messageTextProps={{
        textStyle: {
          right: {
            text: {color: 'black'},
          },
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: '#EAECF2',
        },
        right: {
          backgroundColor: Colors.PRIMARY,
        },
      }}
    />
  );
};
export const renderMessageText = (prop) => {
  return (
    <MessageText
      {...prop}
      textStyle={{
        right: {color: 'white'},
        left: {color: '#63697B'},
      }}
    />
  );
};
export const renderTime = (prop) => {
  return (
    <Time
      {...prop}
      timeTextStyle={{
        right: {color: 'white'},
        left: {color: '#63697B'},
      }}
    />
  );
};
export const renderSend = (prop) => {
  return (
    <Send {...prop} containerStyle={styles.sendBtn}>
      <Icon name="send" size={Spacing.SCALE_24} color={Colors.PRIMARY} />
    </Send>
  );
};
export const renderCustomActions = (prop) => <CustomActions {...prop} />;
